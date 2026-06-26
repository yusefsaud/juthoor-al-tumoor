"use client";

import { useState, FormEvent } from "react";
import { Send, Check } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // MVP: لا يوجد ربط فعلي بقاعدة بيانات أو خدمة بريد بعد
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card-luxury flex flex-col items-center gap-3 p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-600">
          <Check size={22} />
        </div>
        <h3 className="font-display text-lg font-bold text-espresso-800">تم استلام رسالتك</h3>
        <p className="text-sm text-espresso-500">سيتواصل معك فريقنا في أقرب وقت ممكن.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-luxury space-y-4 p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-luxury">الاسم</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="input-luxury"
            placeholder="اسمك الكريم"
          />
        </div>
        <div>
          <label className="label-luxury">البريد الإلكتروني</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="input-luxury"
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div>
        <label className="label-luxury">الموضوع</label>
        <input
          required
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          className="input-luxury"
          placeholder="استفسار عن طلب، شراكة، إلخ"
        />
      </div>
      <div>
        <label className="label-luxury">الرسالة</label>
        <textarea
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          className="input-luxury resize-none"
          placeholder="اكتب رسالتك هنا..."
        />
      </div>
      <button type="submit" className="btn-gold w-full">
        <Send size={16} />
        إرسال الرسالة
      </button>
    </form>
  );
}

