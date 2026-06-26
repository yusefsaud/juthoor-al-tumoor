import { NextRequest, NextResponse } from "next/server";
import { recommendGifts, GiftAssistantInput } from "@/lib/gift-recommender";

/**
 * POST /api/gift-assistant
 * المدخل: { occasion, relationship, budget, taste }
 * المخرج: { recommendations: [{ product, reason }] }
 *
 * الحالة الحالية: منطق قواعد محلي (بدون استدعاء شبكة) — راجع src/lib/gift-recommender.ts
 *
 * للربط بنموذج Anthropic Claude لاحقًا، استبدل المنطق أدناه بشيء شبيه بـ:
 *
 *   const response = await fetch("https://api.anthropic.com/v1/messages", {
 *     method: "POST",
 *     headers: {
 *       "x-api-key": process.env.ANTHROPIC_API_KEY!,
 *       "anthropic-version": "2023-06-01",
 *       "Content-Type": "application/json",
 *     },
 *     body: JSON.stringify({
 *       model: "claude-sonnet-4-6",
 *       max_tokens: 600,
 *       messages: [{
 *         role: "user",
 *         content: `بناءً على هذه التفضيلات ${JSON.stringify(input)}
 *                    رشّح 3 منتجات من هذه القائمة ${JSON.stringify(products)}
 *                    مع تبرير كل اختيار بجملة واحدة باللغة العربية فقط بصيغة JSON.`,
 *       }],
 *     }),
 *   });
 *
 * تذكّر إبقاء مفتاح API على الخادم فقط (متغير بيئة) وعدم كشفه في المتصفح.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GiftAssistantInput;

    if (!body.occasion || !body.budget || !body.taste || !body.relationship) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة: المناسبة، العلاقة، الميزانية، الأسلوب" },
        { status: 400 }
      );
    }

    const recommendations = recommendGifts(body);
    return NextResponse.json({ recommendations });
  } catch {
    return NextResponse.json({ error: "حدث خطأ غير متوقع" }, { status: 500 });
  }
}

