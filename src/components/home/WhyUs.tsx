import { Leaf, PackageCheck, Gift, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    icon: Leaf,
    title: "انتقاء مباشر من المزارع",
    text: "نتعامل مباشرة مع مزارعين موثوقين في المدينة المنورة والقصيم والأحساء لضمان أعلى درجات الجودة.",
  },
  {
    icon: PackageCheck,
    title: "تغليف يحفظ النضارة",
    text: "تغليف محكم متعدد الطبقات يحافظ على طراوة التمر ونكهته من لحظة التعبئة حتى استلامك.",
  },
  {
    icon: Gift,
    title: "هدايا بطابع شخصي",
    text: "صمّم صندوقك الخاص، واكتب رسالتك، ودعنا نوصلها كما تتخيلها بالضبط.",
  },
  {
    icon: Truck,
    title: "توصيل سريع وموثوق",
    text: "شحن لكافة مناطق المملكة مع تتبّع للطلب وخيار التوصيل السريع للمناسبات العاجلة.",
  },
];

export function WhyUs() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="لماذا مِذواق" title="جودة تبدأ من الاختيار" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div
              key={point.title}
              className="rounded-xl2 border border-gold-200/70 bg-white p-6 transition-shadow hover:shadow-lift"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                <point.icon size={22} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-espresso-800">
                {point.title}
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-espresso-500">{point.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

