const MIN_MS = 250;
const MAX_MS = 600;

// Artificial latency so loading states look realistic in the demo.
export function simulateLatency(min = MIN_MS, max = MAX_MS): Promise<void> {
  const ms = Math.round(min + Math.random() * (max - min));
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}${random}`;
}
