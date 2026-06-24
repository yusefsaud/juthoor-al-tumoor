"use client";

import { useState, FormEvent } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function QuickOrderForm({
  defaultProductName,
  onSubmitted,
}: {
  defaultProductName?: string;
  onSubmitted?: () => void;
}) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const link = buildWhatsAppLink({
      customerName: name,
      city,
      quantity,
      productName: defaultProductName,
      notes,
    });
    window.open(link, "_blank");
    onSubmitted?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {defaultProductName && (
        <div className="rounded-xl bg-gold-50 px-4 py-2.5 text-sm font-semibold text-espresso-700">
          المنتج: {defaultProductName}
        </div>
      )}
      <div>
        <label className="label-luxury">الاسم</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-luxury"
          placeholder="اسمك الكريم"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-luxury">المدينة</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-luxury"
            placeholder="الرياض"
          />
        </div>
        <div>
          <label className="label-luxury">الكمية</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input-luxury"
          />
        </div>
      </div>
      <div>
        <label className="label-luxury">ملاحظات (اختياري)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="input-luxury resize-none"
          placeholder="مثال: أرغب بتغليف هدية"
        />
      </div>
      <button type="submit" className="btn-gold w-full">
        إرسال الطلب عبر واتساب
      </button>
    </form>
  );
}
