import Link from "next/link";
import { Instagram, Twitter, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { DateClusterMark } from "@/components/ui/DateClusterMark";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    title: "تسوّق",
    links: [
      { href: "/products", label: "جميع المنتجات" },
      { href: "/gift-builder", label: "صمّم هديتك" },
      { href: "/corporate-gifts", label: "هدايا الشركات" },
      { href: "/subscription", label: "الاشتراك الشهري" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { href: "/about", label: "من نحن" },
      { href: "/contact", label: "تواصل معنا" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso-800 text-sand-100">
      <DateClusterMark className="pointer-events-none absolute -left-10 -top-10 h-72 w-72 text-gold-500/10" />
      <Container className="relative py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <DateClusterMark className="h-9 w-9 text-gold-400" />
              <span className="font-display text-xl font-bold">جذور التمور</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-sand-100/70">
              تمور سعودية فاخرة مُنتقاة من أجود المزارع، بتغليف يليق بمناسباتكم
              وهداياكم الأقرب للقلب.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Instagram, Twitter, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/30 text-gold-300 transition-colors hover:bg-gold-400/10"
                  aria-label="تواصل اجتماعي"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-display text-sm font-bold text-gold-300">{col.title}</h4>
              <ul className="space-y-2.5 text-sm text-sand-100/75">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-gold-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 font-display text-sm font-bold text-gold-300">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-sand-100/75">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold-400" /> 966580518814+
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-gold-400" /> متاح عبر واتساب
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-gold-400" /> الرياض، المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gold-400/15 pt-6 text-xs text-sand-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} جذور التمور. جميع الحقوق محفوظة.</p>
          <p>صُنع بفخر سعودي 🇸🇦</p>
        </div>
      </Container>
    </footer>
  );
}
