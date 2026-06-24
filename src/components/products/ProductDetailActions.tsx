"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, MessageCircle, Check } from "lucide-react";
import { Product } from "@/data/types";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function ProductDetailActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleQuickOrder() {
    const link = buildWhatsAppLink({ productName: product.name, quantity });
    window.open(link, "_blank");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-espresso-700">الكمية</span>
        <div className="flex items-center gap-4 rounded-full border border-espresso-200 px-3 py-1.5">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-espresso-600 hover:text-gold-600"
            aria-label="تقليل"
          >
            <Minus size={15} />
          </button>
          <span className="w-6 text-center font-bold text-espresso-800">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="text-espresso-600 hover:text-gold-600"
            aria-label="زيادة"
          >
            <Plus size={15} />
          </button>
        </div>
        <span className="text-xs text-espresso-400">
          {product.stock > 0 ? `${product.stock} متوفر بالمخزون` : "غير متوفر حاليًا"}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={handleAdd} className="btn-gold flex-1">
          {added ? <Check size={16} /> : <ShoppingBag size={16} />}
          {added ? "أُضيف للسلة" : "أضف للسلة"}
        </button>
        <button onClick={handleQuickOrder} className="btn-outline-gold flex-1">
          <MessageCircle size={16} />
          طلب سريع عبر واتساب
        </button>
      </div>
    </div>
  );
}
