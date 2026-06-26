import { RefreshCw, PauseCircle, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlanCard } from "@/components/subscription/PlanCard";
import { subscriptionPlans } from "@/data/products";

const features = [
  { icon: RefreshCw, text: "تشكيلات متجددة من أفخر أنواع التمور في كل شحنة" },
  { icon: PauseCircle, text: "إيقاف أو تعديل أو إلغاء الاشتراك في أي وقت دون شروط" },
  { icon: Truck, text: "شحن منظم حسب الجدول الذي تختاره دون أي متابعة منك" },
];

export const metadata = {
  title: "الاشتراك الشهري | مِذواق",
};

export default function SubscriptionPage() {
  return (
    <div className="py-12">
      <Container>
        <SectionHeading
          eyebrow="ضيافة بلا انقطاع"
          title="باقات الاشتراك في التمور"
          description="اختر الباقة التي تناسب استهلاكك المنزلي، واستلم أفخر التمور بانتظام دون عناء الطلب كل مرة."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {features.map((f) => (
            <div key={f.text} className="flex items-center gap-2 text-sm text-espresso-600">
              <f.icon size={17} className="text-gold-600" />
              {f.text}
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-espresso-400">
          الدفع الدوري التلقائي قيد التفعيل حاليًا — عند الاشتراك سيتم تأكيد الباقة وموعد
          الشحنة الأولى معك مباشرة عبر واتساب.
        </p>
      </Container>
    </div>
  );
}

