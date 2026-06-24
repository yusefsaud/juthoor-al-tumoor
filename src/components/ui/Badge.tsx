import { ProductBadge } from "@/data/types";

const badgeStyles: Record<ProductBadge, string> = {
  "الأكثر طلباً": "bg-espresso-800 text-sand-100",
  "إصدار محدود": "bg-date-maroon text-sand-100",
  "جديد": "bg-gold-400 text-espresso-900",
  "عرض خاص": "bg-gold-600 text-sand-50",
  "اختيار المحررين": "bg-espresso-700 text-gold-200",
};

export function ProductBadgePill({ badge }: { badge: ProductBadge }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${badgeStyles[badge]}`}
    >
      {badge}
    </span>
  );
}
