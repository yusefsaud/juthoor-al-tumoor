import { NextRequest, NextResponse } from "next/server";
import { generateGiftMessage, GiftMessageInput } from "@/lib/giftMessageGenerator";

/**
 * POST /api/gift-message
 * المدخل: { occasion, recipientName?, senderName?, tone }
 * المخرج: { message: string }
 *
 * الحالة الحالية: قوالب نصية جاهزة — راجع src/lib/giftMessageGenerator.ts
 * للربط بنموذج Anthropic Claude لاحقًا لتوليد نص فصيح مخصص، استبدل المنطق
 * بنفس فكرة الاستدعاء الموضّحة في src/app/api/gift-assistant/route.ts
 * مع تعديل الطلب (prompt) لطلب نص بطاقة إهداء بالأسلوب المحدد.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GiftMessageInput;

    if (!body.occasion || !body.tone) {
      return NextResponse.json(
        { error: "حقل المناسبة والأسلوب مطلوبان" },
        { status: 400 }
      );
    }

    const message = generateGiftMessage(body);
    return NextResponse.json({ message });
  } catch {
    return NextResponse.json({ error: "حدث خطأ غير متوقع" }, { status: 500 });
  }
}

