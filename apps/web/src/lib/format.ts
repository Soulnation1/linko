export function formatPrice(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function formatItemCount(count: number) {
  return `${count} item${count === 1 ? '' : 's'}`;
}
