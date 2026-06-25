// أداة بناء روابط واتساب للطلب السريع
// رقم الواتساب التجريبي لمرحلة MVP — استبدله برقم العمل الرسمي عند الإطلاق
export const STORE_WHATSAPP_NUMBER = "966580518814";

export interface QuickOrderDetails {
  customerName?: string;
  productName?: string;
  quantity?: number;
  city?: string;
  notes?: string;
}

export function buildWhatsAppMessage(details: QuickOrderDetails): string {
  const lines = ["مرحباً جذور التمور 🌴، أرغب بطلب سريع:"];
  if (details.productName) {
    lines.push(`المنتج: ${details.productName}`);
  }
  if (details.quantity) {
    lines.push(`الكمية: ${details.quantity}`);
  }
  if (details.customerName) {
    lines.push(`الاسم: ${details.customerName}`);
  }
  if (details.city) {
    lines.push(`المدينة: ${details.city}`);
  }
  if (details.notes) {
    lines.push(`ملاحظات: ${details.notes}`);
  }
  return lines.join("\n");
}

export function buildWhatsAppLink(details: QuickOrderDetails = {}): string {
  const message = buildWhatsAppMessage(details);
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
