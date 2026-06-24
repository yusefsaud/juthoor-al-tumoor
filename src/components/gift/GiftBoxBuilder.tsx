"use client";

import { useMemo, useState } from "react";
import { Check, ShoppingBag, PackageOpen } from "lucide-react";
import { products } from "@/data/products";
import { ProductVisual } from "@/components/ui/DateClusterMark";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { GiftMessageGenerator } from "@/components/gift/GiftMessageGenerator";

const BOX_IDS = ["box-classic", "box-royal", "box-velvet"] as const;
const BOX_CAPACITY: Record<string, number> = {
  "box-classic": 2,
  "box-royal": 4,
  "box-velvet": 3,
};

const boxProducts = products.filter((p) => BOX_IDS.includes(p.id as typeof BOX_IDS[number]));
const fillableProducts = products.filter(
  (p) => p.variety !== "صناديق هدايا"
);

export function GiftBoxBuilder() {
  const { addItem } = useCart();
  const [selectedBoxId, setSelectedBoxId] = useState(boxProducts[0]?.id);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const selectedBox = boxProducts.find((b) => b.id === selectedBoxId);
  const capacity = selectedBoxId ? BOX_CAPACITY[selectedBoxId] : 0;

  const selectedItems = useMemo(
    () => fillableProducts.filter((p) => selectedItemIds.includes(p.id)),
    [selectedItemIds]
  );

  const total =
    (selectedBox?.price ?? 0) + selectedItems.reduce((sum, p) => sum + p.price, 0);

  function toggleItem(id: string) {
    setAdded(false);
    setSelectedItemIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= capacity) return prev; // الصندوق مكتمل
      return [...prev, id];
    });
  }

  function handleAddToCart() {
    if (!selectedBox) return;
    addItem(selectedBox.id, 1, message ? { customNote: message } : undefined);
    selectedItems.forEach((item) => addItem(item.id, 1));
    setAdded(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-10">
        {/* الخطوة 1: اختيار الصندوق */}
        <div>
          <StepLabel number={1} title="اختر الصندوق" />
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {boxProducts.map((box) => {
              const active = selectedBoxId === box.id;
              return (
                <button
                  key={box.id}
                  onClick={() => {
                    setSelectedBoxId(box.id);
                    setSelectedItemIds([]);
                    setAdded(false);
                  }}
                  className={`flex flex-col items-center gap-3 rounded-xl2 border p-5 text-center transition-all ${
                    active
                      ? "border-gold-500 bg-gold-50 shadow-gold"
                      : "border-gold-200/70 bg-white hover:border-gold-300"
                  }`}
                >
                  <div className="h-20 w-20">
                    <ProductVisual swatch={box.swatch} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-espresso-800">{box.name}</p>
                    <p className="mt-1 text-xs text-espresso-400">
                      يتسع لـ {BOX_CAPACITY[box.id]} أنواع
                    </p>
                    <p className="mt-1 text-sm font-bold text-gold-600">{formatPrice(box.price)}</p>
                  </div>
                  {active && <Check size={16} className="text-gold-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* الخطوة 2: اختيار محتوى الصندوق */}
        <div>
          <StepLabel
            number={2}
            title={`اختر محتوى الصندوق (${selectedItemIds.length}/${capacity})`}
          />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {fillableProducts.map((p) => {
              const active = selectedItemIds.includes(p.id);
              const disabled = !active && selectedItemIds.length >= capacity;
              return (
                <button
                  key={p.id}
                  disabled={disabled}
                  onClick={() => toggleItem(p.id)}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                    active ? "border-gold-500 bg-gold-50" : "border-gold-200/70 hover:border-gold-300"
                  }`}
                >
                  {active && (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-espresso-900">
                      <Check size={12} />
                    </span>
                  )}
                  <div className="h-14 w-14">
                    <ProductVisual swatch={p.swatch} />
                  </div>
                  <p className="text-[12px] font-bold leading-4 text-espresso-700">{p.name}</p>
                  <p className="text-[11px] text-gold-600">{formatPrice(p.price)}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* الخطوة 3: رسالة الإهداء */}
        <div>
          <StepLabel number={3} title="أضف رسالة إهداء (اختياري)" />
          <div className="mt-4">
            <GiftMessageGenerator onMessageGenerated={setMessage} />
          </div>
        </div>
      </div>

      {/* ملخص الهدية */}
      <div className="card-luxury sticky top-28 self-start p-6">
        <div className="mb-4 flex items-center gap-2">
          <PackageOpen size={18} className="text-gold-600" />
          <h3 className="font-display text-base font-bold text-espresso-800">ملخص هديتك</h3>
        </div>

        {selectedBox && (
          <div className="flex items-center justify-between border-b border-gold-200/60 py-2 text-sm">
            <span className="text-espresso-600">{selectedBox.name}</span>
            <span className="font-semibold text-espresso-800">{formatPrice(selectedBox.price)}</span>
          </div>
        )}
        {selectedItems.length === 0 && (
          <p className="py-3 text-xs text-espresso-400">لم تختر أي تمور بعد</p>
        )}
        {selectedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gold-200/40 py-2 text-sm"
          >
            <span className="text-espresso-600">{item.name}</span>
            <span className="font-semibold text-espresso-800">{formatPrice(item.price)}</span>
          </div>
        ))}

        {message && (
          <p className="mt-3 rounded-lg bg-gold-50 p-2.5 text-[11px] leading-5 text-espresso-600">
            ✉️ تمت إضافة رسالة الإهداء
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-base font-bold text-espresso-800">الإجمالي</span>
          <span className="font-display text-xl font-bold text-espresso-800">
            {formatPrice(total)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedBox || selectedItemIds.length === 0}
          className="btn-gold mt-5 w-full disabled:opacity-40"
        >
          {added ? <Check size={16} /> : <ShoppingBag size={16} />}
          {added ? "تمت الإضافة للسلة" : "أضف الهدية للسلة"}
        </button>
      </div>
    </div>
  );
}

function StepLabel({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-espresso-800 text-[13px] font-bold text-gold-300">
        {number}
      </span>
      <h3 className="font-display text-base font-bold text-espresso-800">{title}</h3>
    </div>
  );
}
