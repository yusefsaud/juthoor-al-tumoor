"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, Banknote, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = "mada" | "apple_pay" | "card" | "cod";

const paymentOptions: { id: PaymentMethod; label: string; icon: typeof CreditCard; note?: string }[] = [
  { id: "mada", label: "مدى", icon: CreditCard, note: "قريبًا" },
  { id: "apple_pay", label: "Apple Pay", icon: Smartphone, note: "قريبًا" },
  { id: "card", label: "فيزا / ماستركارد", icon: CreditCard, note: "قريبًا" },
  { id: "cod", label: "الدفع عند الاستلام", icon: Banknote },
];

export function CheckoutForm({ subtotal }: { subtotal: number }) {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("cod");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    /**
     * ملاحظة الربط لاحقًا:
     * بوابات الدفع الإلكتروني (مدى / Apple Pay / فيزا) غير مفعّلة في MVP.
     * عند الإطلاق، استبدل هذا الجزء باستدعاء API بوابة دفع سعودية
     * مثل Moyasar أو Tap أو HyperPay، ثم أعد توجيه المستخدم بعد نجاح
     * الدفع إلى صفحة تأكيد الطلب وحفظ الطلب في جدول "orders" بـ Supabase.
     */
    if (method === "cod") {
      // محاكاة إرسال الطلب وتفريغ السلة
      setTimeout(() => {
        clearCart();
        router.push("/checkout?success=1");
      }, 700);
      return;
    }

    // طرق الدفع الإلكتروني غير مفعّلة بعد — تحويل مؤقت لإكمال الطلب عبر واتساب
    const summary = items
      .map((i) => {
        const product = products.find((p) => p.id === i.productId);
        return product ? `${product.name} × ${i.quantity}` : "";
      })
      .filter(Boolean)
      .join("، ");

    const link = buildWhatsAppLink({
      customerName: form.name,
      city: form.city,
      notes: `العنوان: ${form.address}. الطلب: ${summary}. الإجمالي: ${formatPrice(subtotal)}. ${
        form.notes
      }`,
    });
    window.open(link, "_blank");
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="mb-4 font-display text-lg font-bold text-espresso-800">بيانات الشحن</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-luxury">الاسم الكامل</label>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input-luxury"
              placeholder="مثال: محمد العتيبي"
            />
          </div>
          <div>
            <label className="label-luxury">رقم الجوال</label>
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
            <label className="label-luxury">المدينة</label>
            <input
              required
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className="input-luxury"
              placeholder="الرياض"
            />
          </div>
          <div>
            <label className="label-luxury">العنوان التفصيلي</label>
            <input
              required
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="input-luxury"
              placeholder="الحي، الشارع، رقم المبنى"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="label-luxury">ملاحظات على الطلب (اختياري)</label>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={2}
            className="input-luxury resize-none"
            placeholder="مثال: التغليف كهدية، وقت تسليم مفضّل..."
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-display text-lg font-bold text-espresso-800">طريقة الدفع</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {paymentOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setMethod(opt.id)}
              className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition-colors ${
                method === opt.id
                  ? "border-gold-500 bg-gold-50"
                  : "border-espresso-200 hover:border-gold-300"
              }`}
            >
              <opt.icon size={20} className="text-espresso-700" />
              <span className="text-[13px] font-semibold text-espresso-700">{opt.label}</span>
              {opt.note && <span className="text-[10px] text-gold-600">{opt.note}</span>}
            </button>
          ))}
        </div>
        {method !== "cod" && (
          <p className="mt-3 text-xs leading-5 text-espresso-400">
            الدفع الإلكتروني قيد التفعيل حاليًا. بالضغط على &quot;تأكيد الطلب&quot; سيتم تحويلك
            لإكمال الطلب وتأكيد الدفع عبر واتساب مباشرة مع فريقنا.
          </p>
        )}
      </div>

      <button type="submit" disabled={submitting} className="btn-gold w-full">
        <Lock size={15} />
        {submitting ? "جاري تأكيد الطلب..." : `تأكيد الطلب • ${formatPrice(subtotal)}`}
      </button>
    </form>
  );
}
