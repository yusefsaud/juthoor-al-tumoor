import { Building2, Users, Truck, Palette } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductVisual } from "@/components/ui/DateClusterMark";
import { CorporateInquiryForm } from "@/components/corporate/CorporateInquiryForm";
import { products } from "@/data/products";

const perks = [
  { icon: Palette, title: "تغليف بشعار شركتك", text: "نطبع شعاركم على الصناديق والبطاقات لتعزيز هويتكم." },
  { icon: Users, title: "كميات مرنة", text: "من 20 إلى آلاف العلب، مع خصومات تدريجية حسب الكمية." },
  { icon: Truck, title: "توصيل منسّق", text: "تنسيق مواعيد تسليم دقيقة لمكاتب متعددة أو فعالية واحدة." },
  { icon: Building2, title: "فاتورة ضريبية رسمية", text: "إصدار فواتير ضريبية معتمدة لجميع طلبات الشركات." },
];

const corporateProducts = products.filter((p) => p.occasions.includes("هدايا شركات"));

export const metadata = {
  title: "هدايا الشركات | مِذواق",
};

export default function CorporateGiftsPage() {
  return (
    <div className="py-12">
      <Container>
        <SectionHeading
          eyebrow="للشركات والمؤسسات"
          title="هدايا شركات بطابع فاخر"
          description="عزّزوا علاقتكم بعملائكم وموظفيكم بهدايا تمور فاخرة قابلة للتخصيص بشعار شركتكم."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.title} className="rounded-xl2 border border-gold-200/70 bg-white p-5">
              <perk.icon size={22} className="text-gold-600" />
              <h3 className="mt-3 font-display text-sm font-bold text-espresso-800">{perk.title}</h3>
              <p className="mt-1.5 text-[13px] leading-6 text-espresso-500">{perk.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="mb-5 font-display text-xl font-bold text-espresso-800">
              مقترحات مناسبة لهدايا الشركات
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {corporateProducts.slice(0, 6).map((p) => (
                <div key={p.id} className="rounded-xl border border-gold-200/70 bg-white p-3 text-center">
                  <div className="mx-auto h-16 w-16">
                    <ProductVisual swatch={p.swatch} />
                  </div>
                  <p className="mt-2 text-[12px] font-bold text-espresso-800">{p.name}</p>
                  <p className="text-[11px] text-gold-600">من {p.price} ر.س</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 font-display text-xl font-bold text-espresso-800">
              اطلب عرض سعر مخصص
            </h2>
            <CorporateInquiryForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

