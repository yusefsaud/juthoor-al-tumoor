import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GiftAIAssistant } from "@/components/gift/GiftAIAssistant";
import { GiftBoxBuilder } from "@/components/gift/GiftBoxBuilder";

export const metadata = {
  title: "صمّم هديتك | مِذواق",
};

export default function GiftBuilderPage() {
  return (
    <div className="py-12">
      <Container>
        <SectionHeading
          eyebrow="هدايا بطابعك الخاص"
          title="صمّم هديتك"
          description="ابدأ بمساعد اختيار الهدية الذكي إن لم تكن متأكدًا، أو انتقل مباشرة لتركيب صندوقك الخاص أصنافًا برسالة إهداء مخصصة."
        />

        <div className="mt-12">
          <h2 className="mb-5 text-center font-display text-xl font-bold text-espresso-800">
            لست متأكدًا ماذا تختار؟ جرّب المساعد الذكي
          </h2>
          <div className="mx-auto max-w-xl">
            <GiftAIAssistant />
          </div>
        </div>

        <div className="my-14 divider-seal">
          <span className="px-3 text-sm font-semibold text-espresso-400">أو ابدأ التصميم بنفسك</span>
        </div>

        <div>
          <h2 className="mb-6 text-center font-display text-xl font-bold text-espresso-800">
            ركّب صندوقك الخاص خطوة بخطوة
          </h2>
          <GiftBoxBuilder />
        </div>
      </Container>
    </div>
  );
}

