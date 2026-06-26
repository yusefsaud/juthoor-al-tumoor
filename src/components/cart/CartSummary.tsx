"use client";

import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 300;
const SHIPPING_FEE = 25;

export function CartSummary({ subtotal }: { subtotal: number }) {
  const [promo, setPromo] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState<string | null>(null);

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = Math.max(subtotal - appliedDiscount, 0) + shipping;

  function applyPromo() {
    // MVP: كود ترويجي وهمي للتجربة فقط
    if (promo.trim().toUpperCase() === "MITHWAQ10") {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setPromoMsg(`تم تطبيق خصم 10% (${formatPrice(discount)})`);
    } else {
      setAppliedDiscount(0);
      setPromoMsg("الكود غير صالح");
    }
  }

  return (
    <div className="card-luxury sticky top-28 p-6">
      <h3 className="font-display text-lg font-bold text-espresso-800">ملخص الطلب</h3>

      <div className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <Tag size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso-300" />
          <input
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="كود الخصم"
            className="input-luxury pr-9"
          />
        </div>
        <button onClick={applyPromo} className="btn-outline-gold shrink-0 px-4">
          تطبيق
        </button>
      </div>
      {promoMsg && <p className="mt-1.5 text-xs text-gold-600">{promoMsg}</p>}

      <div className="mt-5 space-y-2.5 border-t border-gold-200/60 pt-5 text-sm">
        <div className="flex justify-between text-espresso-600">
          <span>المجموع الفرعي</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {appliedDiscount > 0 && (
          <div className="flex justify-between text-gold-600">
            <span>الخصم</span>
            <span>- {formatPrice(appliedDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between text-espresso-600">
          <span>الشحن</span>
          <span>{shipping === 0 ? "مجاني" : formatPrice(shipping)}</span>
        </div>
        {shipping > 0 && (
          <p className="text-[11px] text-espresso-400">
            أضف {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} للحصول على شحن مجاني
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gold-200/60 pt-4">
        <span className="font-display text-base font-bold text-espresso-800">الإجمالي</span>
        <span className="font-display text-xl font-bold text-espresso-800">
          {formatPrice(total)}
        </span>
      </div>

      <Link href="/checkout" className="btn-gold mt-6 w-full">
        إتمام الطلب
        <ArrowLeft size={16} />
      </Link>
    </div>
  );
}



