export type ActionResult = { ok: true } | { ok: false; error: string };

export function failure(error: unknown, fallback = 'Something went wrong. Please try again.'): ActionResult {
  return { ok: false, error: error instanceof Error && error.message ? error.message : fallback };
}

export const success: ActionResult = { ok: true };
