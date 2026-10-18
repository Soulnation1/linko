import type { Business } from '@linko/domain';
import { getSlugIssue, slugify } from '@/lib/slug';
import { createId, simulateLatency } from './latency';
import { readDb, updateDb } from './storage';

export class DataError extends Error {
  constructor(
    public code: 'NOT_FOUND' | 'SLUG_TAKEN' | 'INVALID_SLUG' | 'ALREADY_HAS_BUSINESS',
    message: string,
  ) {
    super(message);
    this.name = 'DataError';
  }
}

export type NewBusinessInput = Pick<Business, 'name' | 'location'> &
  Partial<Omit<Business, 'id' | 'name' | 'location'>>;

export type BusinessPatch = Partial<Omit<Business, 'id'>>;

export async function getBusinessById(id: string): Promise<Business | null> {
  await simulateLatency();
  return readDb().businesses.find((business) => business.id === id) ?? null;
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  await simulateLatency();
  return readDb().businesses.find((business) => business.slug === slug) ?? null;
}

export async function getBusinessForUser(userId: string): Promise<Business | null> {
  await simulateLatency();
  const db = readDb();
  const user = db.users.find((candidate) => candidate.id === userId);
  if (!user?.businessId) return null;
  return db.businesses.find((business) => business.id === user.businessId) ?? null;
}

export async function isSlugAvailable(
  slug: string,
  exceptBusinessId?: string,
): Promise<boolean> {
  await simulateLatency(150, 350);
  if (getSlugIssue(slug)) return false;
  return !readDb().businesses.some(
    (business) => business.slug === slug && business.id !== exceptBusinessId,
  );
}

export async function createBusinessForUser(
  userId: string,
  input: NewBusinessInput,
): Promise<Business> {
  await simulateLatency();

  return updateDb((db) => {
    const user = db.users.find((candidate) => candidate.id === userId);
    if (!user) throw new DataError('NOT_FOUND', 'Account not found.');
    if (user.businessId) {
      throw new DataError('ALREADY_HAS_BUSINESS', 'This account already has a business.');
    }

    const slug = input.slug ?? slugify(input.name);
    if (getSlugIssue(slug)) {
      throw new DataError('INVALID_SLUG', 'Choose a different page link.');
    }
    if (db.businesses.some((business) => business.slug === slug)) {
      throw new DataError('SLUG_TAKEN', 'That page link is already taken.');
    }

    const business: Business = { ...input, id: createId('biz'), slug };
    db.businesses.push(business);
    user.businessId = business.id;
    return { ...business };
  });
}

export async function updateBusiness(id: string, patch: BusinessPatch): Promise<Business> {
  await simulateLatency();

  return updateDb((db) => {
    const business = db.businesses.find((candidate) => candidate.id === id);
    if (!business) throw new DataError('NOT_FOUND', 'Business not found.');

    if (patch.slug !== undefined && patch.slug !== business.slug) {
      if (getSlugIssue(patch.slug)) {
        throw new DataError('INVALID_SLUG', 'Choose a different page link.');
      }
      if (db.businesses.some((other) => other.slug === patch.slug && other.id !== id)) {
        throw new DataError('SLUG_TAKEN', 'That page link is already taken.');
      }
    }

    Object.assign(business, patch);
    return { ...business };
  });
}
