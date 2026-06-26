"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Mail, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // MVP: لا يوجد ربط فعلي بقاعدة بيانات بعد — راجع src/lib/supabase.ts
    setSubmitted(true);
  }

  return (
    <section className="border-y border-gold-200/60 bg-sand-200/40 py-12">
      <Container className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-right">
        <div>
          <h3 className="font-display text-xl font-bold text-espresso-800">
            كن أول من يعرف بعروض موسم التمر
          </h3>
          <p className="mt-1 text-sm text-espresso-500">
            عروض خاصة، إصدارات محدودة، وأفكار هدايا تصل إلى بريدك أولًا.
          </p>
        </div>

        {submitted ? (
          <div className="flex items-center gap-2 rounded-full bg-gold-100 px-5 py-3 text-sm font-semibold text-espresso-700">
            <Check size={16} className="text-gold-600" />
            تم الاشتراك بنجاح، شكرًا لك!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-2">
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-espresso-300"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                className="input-luxury pr-10"
              />
            </div>
            <button type="submit" className="btn-dark shrink-0">
              اشترك
            </button>
          </form>
        )}
      </Container>
      <p className="mt-4 text-center text-xs text-espresso-400">
        أو اكتشف{" "}
        <Link href="/subscription" className="font-semibold text-gold-600 hover:underline">
          باقات الاشتراك الشهري في التمور
        </Link>
      </p>
    </section>
  );
}

