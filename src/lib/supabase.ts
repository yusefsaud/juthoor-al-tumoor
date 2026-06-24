/**
 * طبقة الربط مع Supabase — غير مفعّلة في مرحلة MVP.
 *
 * خطوات التفعيل لاحقًا:
 * 1) ثبّت الحزمة: npm install @supabase/supabase-js
 * 2) أضف المتغيرات البيئية في .env.local:
 *      NEXT_PUBLIC_SUPABASE_URL=...
 *      NEXT_PUBLIC_SUPABASE_ANON_KEY=...
 * 3) أنشئ جدول "products" بنفس حقول Product في src/data/types.ts
 * 4) فعّل الكود أدناه، واستبدل الاستيراد من src/data/products.ts
 *    في الصفحات بدوال fetch من هذا الملف (نفس التوقيعات تقريبًا
 *    لتقليل التعديلات في المكوّنات).
 *
 * مثال الاستخدام بعد التفعيل:
 *   const { data } = await supabase.from("products").select("*");
 */

// import { createClient } from "@supabase/supabase-js";
//
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
//
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SUPABASE_READY = false;
