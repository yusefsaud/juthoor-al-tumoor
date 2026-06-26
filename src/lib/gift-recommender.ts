import { Product } from "@/data/types";
import { products } from "@/data/products";

/**
 * هذا الملف يمثّل "عقل" مساعد اختيار الهدية لمرحلة MVP.
 * المنطق الحالي قائم على قواعد (rule-based) ولا يحتاج اتصال إنترنت.
 *
 * للربط بنموذج ذكاء اصطناعي حقيقي لاحقًا (مثل Claude API):
 * استبدل دالة recommendGifts() باستدعاء API route خاص بك على الخادم
 * (راجع src/app/api/gift-assistant/route.ts) يرسل تفضيلات المستخدم
 * إلى Anthropic Messages API ويطلب من النموذج ترتيب أفضل 3 منتجات
 * من قائمة products مع تبرير الاختيار باللهجة العربية الفصحى.
 */

export interface GiftAssistantInput {
  occasion: string;
  relationship: string;
  budget: "اقتصادي" | "متوسط" | "فاخر" | "بدون حدود";
  taste: "تقليدي" | "عصري" | "صحي وخفيف" | "مفاجئ ومميز";
}

const budgetRanges: Record<GiftAssistantInput["budget"], [number, number]> = {
  "اقتصادي": [0, 120],
  "متوسط": [100, 250],
  "فاخر": [220, 450],
  "بدون حدود": [0, 100000],
};

export interface GiftRecommendation {
  product: Product;
  reason: string;
}

export function recommendGifts(input: GiftAssistantInput): GiftRecommendation[] {
  const [min, max] = budgetRanges[input.budget];

  const scored = products.map((product) => {
    let score = 0;

    if (product.occasions.includes(input.occasion as Product["occasions"][number])) {
      score += 4;
    }
    if (product.price >= min && product.price <= max) {
      score += 3;
    }
    if (input.taste === "تقليدي" && ["عجوة", "صفاوي", "برني"].includes(product.variety)) {
      score += 2;
    }
    if (input.taste === "عصري" && product.variety === "صناديق هدايا") {
      score += 2;
    }
    if (input.taste === "مفاجئ ومميز" && product.badges.includes("إصدار محدود")) {
      score += 2;
    }
    if (input.taste === "صحي وخفيف" && ["صقعي", "برني"].includes(product.variety)) {
      score += 2;
    }
    if (product.featured) score += 1;

    return { product, score };
  });

  const top = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // في حال لم تُحقق أي منتجات تطابقًا قويًا، اعرض الأعلى تقييمًا كبديل آمن
  const finalList = top.length > 0
    ? top
    : products
        .slice()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
        .map((product) => ({ product, score: 0 }));

  return finalList.map(({ product }) => ({
    product,
    reason: buildReason(product, input),
  }));
}

function buildReason(product: Product, input: GiftAssistantInput): string {
  const parts: string[] = [];
  parts.push(`خيار راقٍ لإهداء ${input.relationship}`);
  parts.push(`يناسب مناسبة "${input.occasion}"`);
  if (product.price <= budgetRanges[input.budget][1]) {
    parts.push("ضمن الميزانية المحددة");
  }
  if (product.badges.length > 0) {
    parts.push(`مميز بتصنيف "${product.badges[0]}"`);
  }
  parts.push(`بتغليف ${product.packaging}`);
  return parts.join(" • ");
}

