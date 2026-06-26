import { Leaf, Heart, Award, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DateClusterMark } from "@/components/ui/DateClusterMark";

const values = [
  {
    icon: Leaf,
    title: "أصالة بلا مساومة",
    text: "نتعامل مباشرة مع مزارعين موثوقين نعرفهم بالاسم، لا مع وسطاء يخفون مصدر المنتج.",
  },
  {
    icon: Award,
    title: "معايير جودة صارمة",
    text: "كل دفعة تُفرز يدويًا حسب الحجم واللون والقوام قبل أن تصل إلى صناديقنا.",
  },
  {
    icon: Heart,
    title: "الهدية كخبرة، لا سلعة",
    text: "نُصمم التغليف والتفاصيل لتكون لحظة فتح الصندوق جزءًا من الهدية نفسها.",
  },
];

const journeySteps = [
  { title: "الانتقاء من المزرعة", text: "زيارات دورية لمزارع مختارة في المدينة المنورة والقصيم والأحساء لانتقاء أفضل المحصول." },
  { title: "الفرز والتدريج", text: "فرز كل حبة يدويًا حسب الحجم والقوام واللون ضمن معايير تصنيف داخلية صارمة." },
  { title: "التغليف الفاخر", text: "تعبئة في صناديق وعلب مصممة خصيصًا للحفاظ على النضارة وإضفاء طابع راقٍ." },
  { title: "التوصيل لباب منزلك", text: "شحن منظم لكافة مناطق المملكة مع تتبّع الطلب حتى لحظة الاستلام." },
];

export const metadata = {
  title: "من نحن | مِذواق",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <section className="relative overflow-hidden bg-espresso-800 py-16 text-center">
        <DateClusterMark className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 text-gold-400/10" />
        <Container className="relative">
          <span className="eyebrow justify-center text-gold-300">
            <Sparkles size={14} />
            قصتنا
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-sand-50 sm:text-4xl">
            بدأنا من حب التمر السعودي، وانتهينا بصياغة هوية فاخرة له
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-sand-100/70">
            &quot;مِذواق&quot; وُلدت من إيمان بسيط: أن التمر السعودي يستحق تقديمًا يوازي
            قيمته الحقيقية — في الجودة، والتغليف، والتجربة الكاملة من المزرعة إلى يدك.
          </p>
        </Container>
      </section>

      <Container className="py-16">
        <SectionHeading eyebrow="ما يحرّكنا" title="قيمنا" />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl2 border border-gold-200/70 bg-white p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                <v.icon size={22} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-espresso-800">{v.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-espresso-500">{v.text}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="bg-sand-200/40 py-16">
        <Container>
          <SectionHeading eyebrow="رحلة التمرة" title="من المزرعة إلى صندوقك" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, i) => (
              <div key={step.title} className="relative rounded-xl2 border border-gold-200/70 bg-white p-6">
                <span className="font-display text-3xl font-bold text-gold-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-espresso-800">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-6 text-espresso-500">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

