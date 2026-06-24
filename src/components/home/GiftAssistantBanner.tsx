import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DateClusterMark } from "@/components/ui/DateClusterMark";

export function GiftAssistantBanner() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-xl2 border border-gold-300/60 bg-gradient-to-l from-gold-50 via-sand-100 to-gold-50 p-8 sm:p-12">
          <DateClusterMark className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 text-gold-400/20" />
          <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-right">
            <div className="max-w-xl">
              <span className="eyebrow justify-center lg:justify-start">
                <Sparkles size={14} />
                مساعد الهدايا الذكي
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-espresso-800 sm:text-3xl">
                لا تعرف ماذا تختار؟ دع مساعدنا يقترح عليك الهدية المثالية
              </h3>
              <p className="mt-3 text-sm leading-7 text-espresso-500">
                أجب عن أربعة أسئلة سريعة عن المناسبة والميزانية والشخص المُهدى إليه،
                وسنرشّح لك أفضل 3 خيارات تناسبه تمامًا.
              </p>
            </div>
            <Link href="/gift-builder" className="btn-gold shrink-0">
              جرّب مساعد الهدايا
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
