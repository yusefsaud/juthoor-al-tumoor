import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatSAR(amount: number): string {
  return new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPrice(amount: number): string {
  return `${formatSAR(amount)} ر.س`;
}

export function calcDiscountPercent(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function formatGrams(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    return `${kg.toFixed(kg % 1 === 0 ? 0 : 1)} كجم`;
  }
  return `${grams} جرام`;
}
