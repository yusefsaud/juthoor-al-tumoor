// أنواع البيانات الأساسية للمتجر
// هذا الملف يعرّف الشكل (shape) الذي يجب أن تُرجعه جداول Supabase لاحقًا
// راجع: src/lib/supabase.ts للملاحظات الخاصة بالربط الفعلي

export type DateVariety =
  | "عجوة"
  | "صفاوي"
  | "سكري"
  | "خلاص"
  | "مجدول"
  | "برني"
  | "صقعي"
  | "صناديق هدايا";

export type Occasion =
  | "رمضان"
  | "عيد"
  | "زواج"
  | "تخرج"
  | "ضيافة يومية"
  | "هدايا شركات"
  | "مولود جديد";

export type ProductBadge =
  | "الأكثر طلباً"
  | "إصدار محدود"
  | "جديد"
  | "عرض خاص"
  | "اختيار المحررين";

// ألوان illustration مرتبطة بصنف التمر (تُستخدم في بديل الصورة لمرحلة MVP)
export type SwatchTheme = "maroon" | "gold" | "amber" | "espresso" | "rose";

export interface Product {
  id: string;
  slug: string;
  name: string;
  variety: DateVariety;
  occasions: Occasion[];
  price: number;
  originalPrice?: number;
  currency: "SAR";
  weightGrams: number;
  origin: string;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string[];
  badges: ProductBadge[];
  stock: number;
  featured: boolean;
  swatch: SwatchTheme;
  packaging: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  // عناصر مخصّصة (مثل صندوق "صمم هديتك" أو رسالة الهدية)
  customNote?: string;
  giftWrap?: boolean;
}

export interface GiftBoxOption {
  id: string;
  name: string;
  price: number;
  capacity: number; // عدد الأصناف التي يمكن وضعها بالصندوق
  swatch: SwatchTheme;
  description: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  frequency: "أسبوعي" | "شهري" | "كل شهرين";
  price: number;
  originalPrice?: number;
  perks: string[];
  swatch: SwatchTheme;
  recommended?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
}
