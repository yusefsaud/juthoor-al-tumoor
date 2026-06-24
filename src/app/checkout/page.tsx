"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const { items, subtotal } = useCart();

  if (success) {
    return (
      <Container className="py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-50 text-gold-500">
          <CheckCircle2 size={28} />
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold text-espresso-800">
          تم استلام طلبك بنجاح 🌴
        </h1>
        <p className="mt-2 text-sm text-espresso-500">
          سنتواصل معك قريبًا لتأكيد تفاصيل التوصيل. شكرًا لاختيارك جذور التمور.
        </p>
        <Link href="/products" className="btn-gold mt-6 inline-flex">
          استمر بالتسوّق
          <ArrowLeft size={16} />
        </Link>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-espresso-800">سلتك فارغة</h1>
        <p className="mt-2 text-sm text-espresso-500">أضف منتجات إلى سلتك أولًا لإتمام الطلب.</p>
        <Link href="/products" className="btn-gold mt-6 inline-flex">
          تصفّح المنتجات
          <ArrowLeft size={16} />
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <SectionHeading title="إتمام الطلب" align="right" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="card-luxury p-7">
          <CheckoutForm subtotal={subtotal} />
        </div>
        <div className="card-luxury self-start p-6">
          <h3 className="font-display text-base font-bold text-espresso-800">ملخص الطلب</h3>
          <p className="mt-1 text-xs text-espresso-400">{items.length} منتج في السلة</p>
          <div className="mt-4 flex items-center justify-between border-t border-gold-200/60 pt-4">
            <span className="font-semibold text-espresso-700">الإجمالي</span>
            <span className="font-display text-xl font-bold text-espresso-800">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
