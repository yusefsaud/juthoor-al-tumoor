import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RatingStars } from "@/components/ui/RatingStars";
import { testimonials } from "@/data/products";

export function Testimonials() {
  return (
    <section className="bg-espresso-800 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="ثقة عملائنا"
          title="ماذا يقول عملاؤنا"
          align="center"
          variant="dark"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-xl2 border border-gold-400/15 bg-espresso-700/50 p-6"
            >
              <Quote size={22} className="text-gold-400" />
              <p className="mt-4 text-[14px] leading-7 text-sand-100/85">{t.text}</p>
              <div className="mt-5 flex items-center justify-between border-t border-gold-400/15 pt-4">
                <div>
                  <p className="font-display text-sm font-bold text-sand-50">{t.name}</p>
                  <p className="text-[12px] text-sand-100/50">{t.city}</p>
                </div>
                <RatingStars rating={t.rating} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

