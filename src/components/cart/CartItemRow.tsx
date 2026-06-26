"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "@/data/types";
import { ProductVisual } from "@/components/ui/DateClusterMark";
import { formatPrice, formatGrams } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export function CartItemRow({
  product,
  quantity,
  customNote,
}: {
  product: Product;
  quantity: number;
  customNote?: string;
}) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-gold-200/60 py-5 last:border-0">
      <Link href={`/products/${product.slug}`} className="h-20 w-20 shrink-0 sm:h-24 sm:w-24">
        <ProductVisual swatch={product.swatch} />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-display text-[15px] font-bold text-espresso-800">
                {product.name}
              </h3>
            </Link>
            <p className="mt-0.5 text-xs text-espresso-400">
              {product.variety} • {formatGrams(product.weightGrams)}
            </p>
            {customNote && (
              <p className="mt-1 rounded-lg bg-gold-50 px-2.5 py-1 text-[11px] text-espresso-600">
                ✉️ {customNote}
              </p>
            )}
          </div>
          <button
            onClick={() => removeItem(product.id)}
            className="text-espresso-300 transition-colors hover:text-date-maroon"
            aria-label="حذف من السلة"
          >
            <Trash2 size={17} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-full border border-espresso-200 px-2 py-1">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="flex h-6 w-6 items-center justify-center text-espresso-600 hover:text-gold-600"
              aria-label="تقليل الكمية"
            >
              <Minus size={14} />
            </button>
            <span className="w-5 text-center text-sm font-bold text-espresso-800">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="flex h-6 w-6 items-center justify-center text-espresso-600 hover:text-gold-600"
              aria-label="زيادة الكمية"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="font-display text-base font-bold text-espresso-800">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

