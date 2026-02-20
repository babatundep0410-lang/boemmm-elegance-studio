/**
 * Format a price in Ghana Cedis (GHS).
 */
export const formatPrice = (amount: number): string => {
  return `GH₵${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
