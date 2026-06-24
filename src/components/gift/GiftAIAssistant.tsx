"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Plus, Check } from "lucide-react";
import { GiftAssistantInput, GiftRecommendation } from "@/lib/gift-recommender";
import { allOccasions } from "@/data/products";
import { ProductVisual } from "@/components/ui/DateClusterMark";
import { PriceTag } from "@/components/ui/PriceTag";
import { useCart } from "@/context/CartContext";

const relationships = ["أحد الوالدين", "زوج / زوجة", "صديق مقرّب", "عميل أو شريك عمل", "زميل عمل"];
const budgets: GiftAssistantInput["budget"][] = ["اقتصادي", "متوسط", "فاخر", "بدون حدود"];
const tastes: GiftAssistantInput["taste"][] = ["تقليدي", "عصري", "صحي وخفيف", "مفاجئ ومميز"];

type Step = 0 | 1 | 2 | 3 | 4;

export function GiftAIAssistant() {
  const [step, setStep] = useState<Step>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GiftRecommendation[] | null>(null);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const { addItem } = useCart();

  const [answers, setAnswers] = useState<GiftAssistantInput>({
    occasion: "",
    relationship: "",
    budget: "متوسط",
    taste: "تقليدي",
  });

  function select<K extends keyof GiftAssistantInput>(key: K, value: GiftAssistantInput[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  async function handleFinish() {
    setStep(4);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gift-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "تعذّر جلب الترشيحات");
      setResults(data.recommendations);
    } catch (e) {
      setError(e instanceof Error ? e.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(0);
    setResults(null);
    setAddedIds([]);
    setAnswers({ occasion: "", relationship: "", budget: "متوسط", taste: "تقليدي" });
  }

  const canProceed =
    (step === 0 && answers.occasion) ||
    (step === 1 && answers.relationship) ||
    step === 2 ||
    step === 3;

  return (
    <div className="card-luxury overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-gold-200/60 bg-gold-50 px-6 py-4">
        <Sparkles size={18} className="text-gold-600" />
        <h3 className="font-display text-base font-bold text-espresso-800">
          مساعد اختيار الهدية
        </h3>
      </div>

      <div className="p-6">
        {step < 4 && (
          <>
            <div className="mb-6 flex items-center gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i <= step ? "bg-gold-500" : "bg-gold-100"
                  }`}
                />
              ))}
            </div>

            {step === 0 && (
              <QuestionBlock title="ما هي المناسبة؟">
                {allOccasions.map((o) => (
                  <OptionPill
                    key={o}
                    label={o}
                    active={answers.occasion === o}
                    onClick={() => select("occasion", o)}
                  />
                ))}
              </QuestionBlock>
            )}

            {step === 1 && (
              <QuestionBlock title="لمن هذه الهدية؟">
                {relationships.map((r) => (
                  <OptionPill
                    key={r}
                    label={r}
                    active={answers.relationship === r}
                    onClick={() => select("relationship", r)}
                  />
                ))}
              </QuestionBlock>
            )}

            {step === 2 && (
              <QuestionBlock title="ما هي ميزانيتك التقريبية؟">
                {budgets.map((b) => (
                  <OptionPill
                    key={b}
                    label={b}
                    active={answers.budget === b}
                    onClick={() => select("budget", b)}
                  />
                ))}
              </QuestionBlock>
            )}

            {step === 3 && (
              <QuestionBlock title="ما الأسلوب الذي تفضّله؟">
                {tastes.map((t) => (
                  <OptionPill
                    key={t}
                    label={t}
                    active={answers.taste === t}
                    onClick={() => select("taste", t)}
                  />
                ))}
              </QuestionBlock>
            )}

            <div className="mt-7 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
                disabled={step === 0}
                className="flex items-center gap-1 text-sm font-semibold text-espresso-500 disabled:opacity-0"
              >
                <ArrowRight size={15} />
                رجوع
              </button>
              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => (s + 1) as Step)}
                  disabled={!canProceed}
                  className="btn-gold disabled:opacity-40"
                >
                  التالي
                  <ArrowLeft size={15} />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  disabled={!answers.taste}
                  className="btn-gold"
                >
                  عرض الترشيحات
                  <Sparkles size={15} />
                </button>
              )}
            </div>
          </>
        )}

        {step === 4 && (
          <div>
            {loading && (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold-200 border-t-gold-500" />
                <p className="text-sm text-espresso-500">نحلل إجاباتك ونرشّح أفضل الخيارات...</p>
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-date-maroon/10 p-4 text-sm text-date-maroon">
                {error}
              </div>
            )}

            {results && !loading && (
              <div>
                <p className="mb-4 text-sm font-semibold text-espresso-600">
                  هذه أفضل 3 ترشيحات بناءً على إجاباتك:
                </p>
                <div className="space-y-3">
                  {results.map(({ product, reason }) => {
                    const added = addedIds.includes(product.id);
                    return (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 rounded-xl border border-gold-200/70 p-3"
                      >
                        <div className="h-16 w-16 shrink-0">
                          <ProductVisual swatch={product.swatch} />
                        </div>
                        <div className="flex-1">
                          <p className="font-display text-sm font-bold text-espresso-800">
                            {product.name}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-5 text-espresso-400">
                            {reason}
                          </p>
                          <div className="mt-1.5">
                            <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            addItem(product.id);
                            setAddedIds((prev) => [...prev, product.id]);
                          }}
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                            added
                              ? "bg-gold-400 text-espresso-900"
                              : "bg-espresso-800 text-sand-100 hover:bg-gold-500 hover:text-espresso-900"
                          }`}
                          aria-label="أضف للسلة"
                        >
                          {added ? <Check size={16} /> : <Plus size={16} />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={reset}
              className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700"
            >
              <RotateCcw size={14} />
              إعادة الإجابة من جديد
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function QuestionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 font-display text-base font-bold text-espresso-800">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function OptionPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
        active
          ? "border-gold-500 bg-gold-400 text-espresso-900"
          : "border-espresso-200 text-espresso-600 hover:border-gold-400"
      }`}
    >
      {label}
    </button>
  );
}
