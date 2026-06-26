"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Product } from "@/data/types";
import { ProductVisual } from "@/components/ui/DateClusterMark";
import { ProductBadgePill } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { PriceTag } from "@/components/ui/PriceTag";
import { useCart } from "@/context/CartContext";
import { formatGrams } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl2 border border-gold-200/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        <div className="absolute inset-3 transition-transform duration-500 group-hover:scale-105">
          <ProductVisual swatch={product.swatch} />
        </div>
        {product.badges.length > 0 && (
          <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5">
            {product.badges.slice(0, 2).map((b) => (
              <ProductBadgePill key={b} badge={b} />
            ))}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <span className="text-[12px] font-semibold text-gold-600">{product.variety}</span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-base font-bold text-espresso-800 transition-colors group-hover:text-gold-600">
            {product.name}
          </h3>
        </Link>
        <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
        <p className="text-[13px] text-espresso-400">{formatGrams(product.weightGrams)}</p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" />
          <button
            onClick={() => addItem(product.id)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso-800 text-sand-100 transition-colors hover:bg-gold-500 hover:text-espresso-900"
            aria-label="أضف للسلة"
          >
            <Plus size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

