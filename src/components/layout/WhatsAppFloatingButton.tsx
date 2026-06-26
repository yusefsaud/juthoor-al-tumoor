"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { QuickOrderForm } from "@/components/products/QuickOrderForm";

export function WhatsAppFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white shadow-lift transition-transform hover:scale-105 active:scale-95"
        aria-label="طلب سريع عبر واتساب"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">طلب سريع</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-espresso-900/50 p-0 sm:items-center sm:p-4">
          <div className="relative w-full max-w-md rounded-t-2xl bg-sand-50 p-6 shadow-2xl sm:rounded-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute left-4 top-4 text-espresso-400 hover:text-espresso-700"
              aria-label="إغلاق"
            >
              <X size={20} />
            </button>
            <h3 className="font-display text-lg font-bold text-espresso-800">
              طلب سريع عبر واتساب
            </h3>
            <p className="mt-1 mb-5 text-sm text-espresso-500">
              عبّئ بياناتك وسنفتح لك محادثة واتساب جاهزة لإرسال طلبك مباشرة.
            </p>
            <QuickOrderForm onSubmitted={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

