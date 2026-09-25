import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: string, currencyCode: string): string {
  const numericAmount = parseFloat(amount).toFixed(0); // Remove decimals for cleaner look
  
  // Always use £ symbol for consistent GBP display
  return `£${numericAmount}`;
}
