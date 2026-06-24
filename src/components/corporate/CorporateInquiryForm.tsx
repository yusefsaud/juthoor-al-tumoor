"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function CorporateInquiryForm() {
  const [form, setForm] = useState({
    company: "",
    contactName: "",
    phone: "",
    quantity: "",
    budget: "",
    details: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const link = buildWhatsAppLink({
      customerName: `${form.contactName} (${form.company})`,
      notes: `طلب هدايا شركات — الكمية: ${form.quantity}، الميزانية التقريبية: ${form.budget}. التفاصيل: ${form.details}. للتواصل: ${form.phone}`,
    });
    window.open(link, "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="card-luxury space-y-4 p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-luxury">اسم الشركة</label>
          <input
            required
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className="input-luxury"
            placeholder="شركتك"
          />
        </div>
        <div>
          <label className="label-luxury">اسم المسؤول</label>
          <input
            required
            value={form.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            className="input-luxury"
            placeholder="اسمك"
          />
        </div>
        <div>
          <label className="label-luxury">رقم التواصل</label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="input-luxury"
            placeholder="05xxxxxxxx"
          />
        </div>
        <div>
          <label className="label-luxury">الكمية التقريبية</label>
          <input
            required
            value={form.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            className="input-luxury"
            placeholder="مثال: 100 علبة"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label-luxury">الميزانية التقريبية (اختياري)</label>
          <input
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className="input-luxury"
            placeholder="مثال: 5000 - 8000 ر.س"
          />
        </div>
      </div>
      <div>
        <label className="label-luxury">تفاصيل إضافية</label>
        <textarea
          required
          value={form.details}
          onChange={(e) => update("details", e.target.value)}
          rows={3}
          className="input-luxury resize-none"
          placeholder="مثال: نرغب بطباعة شعار الشركة، وموعد التسليم قبل 15 رمضان"
        />
      </div>
      <button type="submit" className="btn-gold w-full">
        <Send size={16} />
        إرسال الطلب وتواصل معنا
      </button>
    </form>
  );
}
