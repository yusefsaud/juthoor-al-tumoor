import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, Award } from "lucide-react";
import { DateClusterMark } from "@/components/ui/DateClusterMark";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Hero() {
  const whatsappHref = buildWhatsAppLink({
    notes: "أرغب بطلب تمور من مِذواق",
  });

  return (
    <section className="relative overflow-hidden bg-espresso-800">
      <div className="absolute inset-0 bg-gold-radial" />
      <DateClusterMark
        className="pointer-events-none absolute -left-16 top-1/2 h-[420px] w-[420px] -translate-y-1/2 text-gold-400/10 animate-frond-sway"
      />

      <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div className="text-center lg:text-right">
          <span className="eyebrow justify-center lg:justify-start">
            <span className="h-px w-5 bg-gold-400" />
            مِذواق — تمور سعودية مختارة بعناية
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.2] text-sand-50 sm:text-5xl lg:text-[3.4rem]">
            تمور سعودية مختارة بعناية
            <br />
            <span className="text-gradient-gold">لمائدتك وضيافتك</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-sand-100/70 lg:mx-0">
            سكري، خلاص، مجدول وباقات تمور فاخرة مختارة من أجود المزارع،
            بتغليف أنيق وتوصيل سريع داخل الرياض.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-gold w-full sm:w-auto">
              اطلب عبر واتساب
              <ArrowLeft size={16} />
            </a>

            <Link href="/products" className="btn-outline-gold w-full !border-sand-100/30 !text-sand-50 hover:!bg-sand-50/10 sm:w-auto">
              تصفح التمور
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 text-sand-100/80">
            {[
              { icon: Award, label: "تمور منتقاة بعناية" },
              { icon: Truck, label: "توصيل سريع داخل الرياض" },
              { icon: ShieldCheck, label: "جودة ونضارة مضمونة" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                <item.icon size={20} className="text-gold-400" />
                <span className="text-[12px] leading-4">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-full bg-seal-ring opacity-30 blur-2xl" />
          <div className="absolute inset-6 rounded-full border border-gold-400/30" />
          <div className="absolute inset-14 flex items-center justify-center rounded-full bg-gradient-to-br from-espresso-600 to-espresso-900 shadow-2xl">
            <DateClusterMark className="h-2/3 w-2/3 text-gold-300" strokeWidth={1.3} />
          </div>
        </div>
      </Container>
    </section>
  );
}
