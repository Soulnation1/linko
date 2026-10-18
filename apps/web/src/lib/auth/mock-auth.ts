import type { UserAccount } from '@linko/domain';
import { mockHash } from '@/lib/data/hash';
import { createId, simulateLatency } from '@/lib/data/latency';
import { readDb, updateDb, type StoredUser } from '@/lib/data/storage';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  type ForgotPasswordInput,
  type ResetPasswordInput,
  type SignInInput,
  type SignUpInput,
} from './schemas';

const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;

export type AuthErrorCode =
  | 'INVALID_INPUT'
  | 'EMAIL_TAKEN'
  | 'INVALID_CREDENTIALS'
  | 'INVALID_TOKEN'
  | 'NOT_AUTHENTICATED';

export class AuthError extends Error {
  constructor(
    public code: AuthErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

function toAccount(user: StoredUser): UserAccount {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    businessId: user.businessId,
    createdAt: user.createdAt,
  };
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function invalidInput(error: { issues: { message: string }[] }): AuthError {
  return new AuthError('INVALID_INPUT', error.issues[0]?.message ?? 'Check your details.');
}

// TODO(auth): replace every function in this file with real backend calls.

export async function getSession(): Promise<UserAccount | null> {
  await simulateLatency(120, 300);
  const db = readDb();
  if (!db.session) return null;

  const user = db.users.find((candidate) => candidate.id === db.session?.userId);
  return user ? toAccount(user) : null;
}

export async function signUp(input: SignUpInput): Promise<UserAccount> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) throw invalidInput(parsed.error);
  await simulateLatency();

  return updateDb((db) => {
    const email = normalizeEmail(parsed.data.email);
    if (db.users.some((user) => user.email === email)) {
      throw new AuthError('EMAIL_TAKEN', 'An account with this email already exists.');
    }

    const salt = createId('salt');
    const user: StoredUser = {
      id: createId('user'),
      name: parsed.data.name.trim(),
      email,
      businessId: null,
      createdAt: new Date().toISOString(),
      salt,
      passwordHash: mockHash(parsed.data.password, salt),
    };

    db.users.push(user);
    db.session = { userId: user.id, createdAt: user.createdAt };
    return toAccount(user);
  });
}

export async function signIn(input: SignInInput): Promise<UserAccount> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) throw invalidInput(parsed.error);
  await simulateLatency();

  return updateDb((db) => {
    const email = normalizeEmail(parsed.data.email);
    const user = db.users.find((candidate) => candidate.email === email);

    if (!user || user.passwordHash !== mockHash(parsed.data.password, user.salt)) {
      throw new AuthError('INVALID_CREDENTIALS', 'Incorrect email or password.');
    }

    db.session = { userId: user.id, createdAt: new Date().toISOString() };
    return toAccount(user);
  });
}

export async function signOut(): Promise<void> {
  await simulateLatency(100, 250);
  updateDb((db) => {
    db.session = null;
  });
}

// Mock only: a real backend emails the link. The token is returned so the
// demo UI can show the reset link directly.
export async function requestPasswordReset(
  input: ForgotPasswordInput,
): Promise<{ resetToken: string | null }> {
  const parsed = forgotPasswordSchema.safeParse(input);
  if (!parsed.success) throw invalidInput(parsed.error);
  await simulateLatency();

  return updateDb((db) => {
    const email = normalizeEmail(parsed.data.email);
    const user = db.users.find((candidate) => candidate.email === email);
    if (!user) return { resetToken: null };

    const token = createId('reset');
    db.resetTokens = db.resetTokens.filter((entry) => entry.userId !== user.id);
    db.resetTokens.push({
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS).toISOString(),
    });
    return { resetToken: token };
  });
}

export async function resetPassword(input: ResetPasswordInput): Promise<void> {
  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) throw invalidInput(parsed.error);
  await simulateLatency();

  updateDb((db) => {
    const entry = db.resetTokens.find((candidate) => candidate.token === parsed.data.token);
    const user = entry && db.users.find((candidate) => candidate.id === entry.userId);

    if (!entry || !user || new Date(entry.expiresAt).getTime() < Date.now()) {
      throw new AuthError('INVALID_TOKEN', 'This reset link is invalid or has expired.');
    }

    const salt = createId('salt');
    user.salt = salt;
    user.passwordHash = mockHash(parsed.data.password, salt);
    db.resetTokens = db.resetTokens.filter((candidate) => candidate.userId !== user.id);
  });
}
