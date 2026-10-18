import type { AuthSession, Business, Listing, UserAccount } from '@linko/domain';
import { createSeedDb } from './seed';

export const DB_VERSION = 1;
const STORAGE_KEY = 'linko-mock-db';

export interface StoredUser extends UserAccount {
  passwordHash: string;
  salt: string;
}

export interface ResetToken {
  token: string;
  userId: string;
  expiresAt: string;
}

export interface MockDb {
  version: number;
  users: StoredUser[];
  session: AuthSession | null;
  businesses: Business[];
  listings: Listing[];
  resetTokens: ResetToken[];
}

let cache: MockDb | null = null;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function persist(db: MockDb): void {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    // Storage full or blocked: the in-memory cache still keeps the demo working.
  }
}

function load(): MockDb {
  if (!isBrowser()) return createSeedDb(DB_VERSION);

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as MockDb;
      if (parsed.version === DB_VERSION) return parsed;
    }
  } catch {
    // Corrupt or unavailable storage falls through to a fresh seed.
  }

  const fresh = createSeedDb(DB_VERSION);
  persist(fresh);
  return fresh;
}

if (isBrowser()) {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) cache = null;
  });
}

export function readDb(): MockDb {
  if (!cache) cache = load();
  return cache;
}

export function updateDb<T>(mutate: (db: MockDb) => T): T {
  const db = readDb();
  const result = mutate(db);
  persist(db);
  return result;
}

export function resetDb(): void {
  cache = createSeedDb(DB_VERSION);
  persist(cache);
}
