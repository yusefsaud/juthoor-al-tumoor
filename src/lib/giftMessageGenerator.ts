/**
 * مولّد نص بطاقة الإهداء — قائم على قوالب جاهزة لمرحلة MVP.
 *
 * للربط بنموذج ذكاء اصطناعي حقيقي لاحقًا:
 * استبدل دالة generateGiftMessage() باستدعاء src/app/api/gift-message/route.ts
 * الذي يمكن تعديله لاستدعاء Anthropic Messages API وطلب توليد نص فصيح
 * بالأسلوب واللهجة المطلوبة بدلاً من اختيار قالب جاهز.
 */

export type GiftTone = "رسمي" | "ودّي" | "شعري" | "مختصر";

export interface GiftMessageInput {
  occasion: string;
  recipientName?: string;
  senderName?: string;
  tone: GiftTone;
}

const templates: Record<GiftTone, (i: GiftMessageInput) => string> = {
  "رسمي": (i) =>
    `إلى ${i.recipientName || "الكريم/ة"}،\n\nبمناسبة ${i.occasion}، يسرّنا أن نتقدّم لكم بأطيب التهاني وأخلص الدعوات بدوام التوفيق والازدهار.\n\nمع تحيات ${i.senderName || "فريق جذور التمور"}.`,
  "ودّي": (i) =>
    `يا ${i.recipientName || "غالي"} 🌴\n\nبمناسبة ${i.occasion}، حبيت أوصلك أطيب تهنئة وأقولك إني فرحان/ة لك من قلبي. تستاهل كل خير يا رب.\n\n${i.senderName ? `محبك/ـك ${i.senderName}` : "محبك"}`,
  "شعري": (i) =>
    `كالتمر حلوٌ وداك القلبُ أحلى ... وفي ${i.occasion} تُزهر الأماني\nفلتهنأ يا ${i.recipientName || "عزيزي"} بأيامٍ سعيدة ... ${i.senderName ? `من ${i.senderName}` : ""}`.trim(),
  "مختصر": (i) =>
    `${i.recipientName ? `${i.recipientName}، ` : ""}كل عام وأنتم بخير بمناسبة ${i.occasion} 🌴 ${i.senderName || ""}`.trim(),
};

export function generateGiftMessage(input: GiftMessageInput): string {
  const builder = templates[input.tone] ?? templates["ودّي"];
  return builder(input);
}

export const giftTones: GiftTone[] = ["رسمي", "ودّي", "شعري", "مختصر"];
