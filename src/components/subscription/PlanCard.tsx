"use client";

import { Check, Star } from "lucide-react";
import { SubscriptionPlan } from "@/data/types";
import { ProductVisual } from "@/components/ui/DateClusterMark";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function PlanCard({ plan }: { plan: SubscriptionPlan }) {
  function handleSubscribe() {
    const link = buildWhatsAppLink({
      productName: `اشتراك: ${plan.name}`,
      notes: `أرغب بالاشتراك في باقة "${plan.name}" (${plan.frequency}) بسعر ${formatPrice(plan.price)}`,
    });
    window.open(link, "_blank");
  }

  return (
    <div
      className={`relative flex flex-col rounded-xl2 border p-7 transition-all ${
        plan.recommended
          ? "border-gold-500 bg-gold-50 shadow-gold lg:-translate-y-3"
          : "border-gold-200/70 bg-white"
      }`}
    >
      {plan.recommended && (
        <span className="absolute -top-3 right-1/2 flex translate-x-1/2 items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold text-espresso-900">
          <Star size={12} fill="currentColor" />
          الأكثر طلبًا
        </span>
      )}
      <div className="mx-auto h-16 w-16">
        <ProductVisual swatch={plan.swatch} />
      </div>
      <h3 className="mt-4 text-center font-display text-lg font-bold text-espresso-800">
        {plan.name}
      </h3>
      <p className="text-center text-xs font-semibold text-gold-600">{plan.frequency}</p>

      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="font-display text-3xl font-bold text-espresso-800">
          {formatPrice(plan.price)}
        </span>
        {plan.originalPrice && (
          <span className="text-sm text-espresso-300 line-through">
            {formatPrice(plan.originalPrice)}
          </span>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-[13px] text-espresso-600">
            <Check size={15} className="mt-0.5 shrink-0 text-gold-500" />
            {perk}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        className={`mt-7 w-full ${plan.recommended ? "btn-gold" : "btn-dark"}`}
      >
        اشترك الآن
      </button>
    </div>
  );
}
