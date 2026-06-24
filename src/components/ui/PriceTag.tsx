import { formatPrice, calcDiscountPercent } from "@/lib/utils";

export function PriceTag({
  price,
  originalPrice,
  size = "md",
}: {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
}) {
  const discount = calcDiscountPercent(price, originalPrice);
  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-display font-bold text-espresso-800 ${sizeClasses[size]}`}>
        {formatPrice(price)}
      </span>
      {originalPrice && (
        <span className="text-sm text-espresso-300 line-through">
          {formatPrice(originalPrice)}
        </span>
      )}
      {discount && (
        <span className="rounded-full bg-date-maroon/10 px-2 py-0.5 text-[11px] font-bold text-date-maroon">
          خصم {discount}%
        </span>
      )}
    </div>
  );
}
