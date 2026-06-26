import { Star } from "lucide-react";

export function RatingStars({
  rating,
  reviewsCount,
  size = 14,
}: {
  rating: number;
  reviewsCount?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-gold-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            fill={i < Math.round(rating) ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-espresso-600">{rating.toFixed(1)}</span>
      {reviewsCount !== undefined && (
        <span className="text-xs text-espresso-400">({reviewsCount})</span>
      )}
    </div>
  );
}

