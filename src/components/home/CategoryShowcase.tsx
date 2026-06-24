import Link from "next/link";
import { ProductVisual } from "@/components/ui/DateClusterMark";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SwatchTheme } from "@/data/types";

const categories: { name: string; swatch: SwatchTheme; note: string }[] = [
  { name: "عجوة", swatch: "maroon", note: "المدينة المنورة" },
  { name: "سكري", swatch: "gold", note: "القصيم" },
  { name: "خلاص", swatch: "amber", note: "الأحساء" },
  { name: "مجدول", swatch: "rose", note: "الوادي" },
  { name: "صفاوي", swatch: "espresso", note: "المدينة المنورة" },
  { name: "صناديق هدايا", swatch: "gold", note: "تشكيلات فاخرة" },
];

export function CategoryShowcase() {
  return (
    <section className="bg-sand-200/40 py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="تصفّح حسب النوع" title="من كل أنحاء المملكة" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?variety=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center gap-3 rounded-xl2 border border-gold-200/70 bg-white p-4 text-center transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="h-16 w-16 transition-transform group-hover:scale-105">
                <ProductVisual swatch={cat.swatch} />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-espresso-800">{cat.name}</p>
                <p className="text-[11px] text-espresso-400">{cat.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
