"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Phone } from "lucide-react";
import { DateClusterMark } from "@/components/ui/DateClusterMark";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/gift-builder", label: "صمّم هديتك" },
  { href: "/corporate-gifts", label: "هدايا الشركات" },
  { href: "/subscription", label: "الاشتراك الشهري" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-gold-200/60 bg-sand-100/90 backdrop-blur-md">
      <div className="bg-espresso-800 py-1.5 text-center text-[12px] font-medium text-gold-200">
        شحن مجاني داخل المملكة للطلبات فوق 300 ر.س 🌴
      </div>

      <div className="container-luxury flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <DateClusterMark className="h-9 w-9 text-gold-500" strokeWidth={1.6} />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold text-espresso-800">جذور التمور</span>
            <span className="text-[11px] tracking-wide text-gold-600">ROOTS OF DATES</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-[14px] font-semibold transition-colors ${
                  active
                    ? "bg-gold-400/20 text-espresso-800"
                    : "text-espresso-600 hover:bg-gold-100 hover:text-espresso-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/966508988626"
            className="hidden items-center gap-1.5 rounded-full border border-gold-300 px-3 py-2 text-sm font-semibold text-espresso-700 transition-colors hover:bg-gold-50 md:flex"
          >
            <Phone size={15} />
            تواصل
          </a>
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold-300 text-espresso-700 transition-colors hover:bg-gold-50"
            aria-label="السلة"
          >
            <ShoppingBag size={19} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -left-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-date-maroon px-1 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-300 text-espresso-700 lg:hidden"
            aria-label="القائمة"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* قائمة الجوال */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-espresso-900/50"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-sand-50 p-6 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DateClusterMark className="h-7 w-7 text-gold-500" />
              <span className="font-display text-base font-bold text-espresso-800">جذور التمور</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="إغلاق">
              <X size={22} className="text-espresso-600" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors ${
                  pathname === link.href
                    ? "bg-gold-400/20 text-espresso-800"
                    : "text-espresso-600 hover:bg-gold-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a href="https://wa.me/966508988626" className="btn-dark mt-6">
            <Phone size={16} /> تواصل معنا الآن
          </a>
        </div>
      </div>
    </header>
  );
}
