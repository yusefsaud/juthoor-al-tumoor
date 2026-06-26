"use client";

import { useState } from "react";
import { Copy, Check, Wand2 } from "lucide-react";
import { GiftTone, giftTones } from "@/lib/giftMessageGenerator";
import { allOccasions } from "@/data/products";

export function GiftMessageGenerator({
  onMessageGenerated,
}: {
  onMessageGenerated?: (message: string) => void;
}) {
  const [occasion, setOccasion] = useState<string>(allOccasions[0]);
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [tone, setTone] = useState<GiftTone>("ودّي");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch("/api/gift-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occasion, recipientName, senderName, tone }),
      });
      const data = await res.json();
      setMessage(data.message);
      onMessageGenerated?.(data.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!message) return;
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="card-luxury p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <Wand2 size={18} className="text-gold-600" />
        <h3 className="font-display text-base font-bold text-espresso-800">
          مولّد نص بطاقة الإهداء
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-luxury">المناسبة</label>
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="input-luxury">
            {allOccasions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-luxury">الأسلوب</label>
          <select value={tone} onChange={(e) => setTone(e.target.value as GiftTone)} className="input-luxury">
            {giftTones.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-luxury">اسم المُهدى إليه (اختياري)</label>
          <input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="input-luxury"
            placeholder="مثال: أحمد"
          />
        </div>
        <div>
          <label className="label-luxury">اسمك (اختياري)</label>
          <input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="input-luxury"
            placeholder="مثال: سارة"
          />
        </div>
      </div>

      <button onClick={handleGenerate} disabled={loading} className="btn-gold mt-5 w-full">
        {loading ? "جاري الصياغة..." : "ولّد نص البطاقة"}
        <Wand2 size={15} />
      </button>

      {message && (
        <div className="mt-5 rounded-xl border border-gold-300 bg-gold-50 p-4">
          <p className="whitespace-pre-line text-[14px] leading-7 text-espresso-700">{message}</p>
          <button
            onClick={handleCopy}
            className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-gold-700 hover:text-gold-800"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "تم النسخ" : "نسخ النص"}
          </button>
        </div>
      )}
    </div>
  );
}

