import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { DateClusterMark } from "@/components/ui/DateClusterMark";

const infoCards = [
  { icon: Phone, title: "اتصل بنا", value: "966 50 000 0000+" },
  { icon: Mail, title: "البريد الإلكتروني", value: "hello@juthoor.sa" },
  { icon: MapPin, title: "الموقع", value: "الرياض، المملكة العربية السعودية" },
  { icon: Clock, title: "ساعات العمل", value: "يوميًا من 9 صباحًا - 11 مساءً" },
];

export const metadata = {
  title: "تواصل معنا | جذور التمور",
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <Container>
        <SectionHeading
          eyebrow="نحب أن نسمع منك"
          title="تواصل معنا"
          description="لديك استفسار عن طلب، أو فكرة هدية، أو رغبة بشراكة؟ راسلنا وسنرد عليك في أقرب وقت."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {infoCards.map((card) => (
              <div
                key={card.title}
                className="flex items-center gap-4 rounded-xl2 border border-gold-200/70 bg-white p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                  <card.icon size={19} />
                </div>
                <div>
                  <p className="text-xs text-espresso-400">{card.title}</p>
                  <p className="font-semibold text-espresso-800">{card.value}</p>
                </div>
              </div>
            ))}

            <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl2 bg-espresso-800">
              <DateClusterMark className="h-20 w-20 text-gold-400/60" />
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
