# جذور التمور 🌴 (Roots of Dates)

متجر إلكتروني فاخر لبيع التمور السعودية — مبني بـ **Next.js 14 (App Router)** و **TypeScript** و **Tailwind CSS**.

هذه نسخة **MVP** ببيانات وهمية (Mock Data) جاهزة الآن، ومُعدّة بنية واضحة للربط لاحقًا مع
**Supabase** (قاعدة البيانات) وبوابة دفع سعودية (مدى / Apple Pay / فيزا).

---

## 🚀 التشغيل محليًا

```bash
npm install
npm run dev
```

ثم افتح: http://localhost:3000

للبناء للإنتاج:

```bash
npm run build
npm run start
```

---

## 🗂️ هيكل المشروع

```
src/
├── app/                     # صفحات Next.js (App Router)
│   ├── page.tsx              → الصفحة الرئيسية
│   ├── products/              → قائمة المنتجات + فلترة
│   ├── products/[slug]/       → تفاصيل المنتج
│   ├── cart/                  → السلة
│   ├── checkout/              → الدفع/إتمام الطلب
│   ├── gift-builder/          → صمّم هديتك (مساعد AI + بناء صندوق + رسالة)
│   ├── corporate-gifts/       → هدايا الشركات
│   ├── subscription/          → الاشتراك الشهري
│   ├── about/                 → من نحن
│   ├── contact/                → التواصل
│   └── api/
│       ├── gift-assistant/    → API لمساعد اختيار الهدية
│       └── gift-message/      → API لمولّد نص بطاقة الإهداء
├── components/                # جميع مكوّنات الواجهة (مقسّمة حسب الوظيفة)
├── context/CartContext.tsx    # سياق إدارة السلة (مع حفظ محلي localStorage)
├── data/
│   ├── types.ts                → تعريف الأنواع (Product, CartItem...)
│   └── products.ts             → بيانات وهمية حالية (راجع أدناه للربط الفعلي)
└── lib/
    ├── supabase.ts             → طبقة الربط مع Supabase (غير مفعّلة بعد)
    ├── whatsapp.ts              → بناء روابط الطلب السريع عبر واتساب
    ├── gift-recommender.ts      → منطق ترشيح الهدايا (قائم على قواعد الآن)
    └── giftMessageGenerator.ts  → منطق توليد نص بطاقة الإهداء (قوالب الآن)
```

---

## 🔌 الربط مع Supabase (الخطوات)

1. ثبّت الحزمة:
   ```bash
   npm install @supabase/supabase-js
   ```
2. أنشئ ملف `.env.local` في جذر المشروع:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. أنشئ في Supabase جدول `products` بنفس الحقول الموجودة في `src/data/types.ts` (واجهة `Product`).
4. فعّل الكود الموجود (كتعليقات) في `src/lib/supabase.ts`.
5. استبدل الاستيراد من `src/data/products.ts` بدوال `fetch` فعلية من Supabase
   في الصفحات التي تستخدمها (`app/page.tsx`، `app/products/page.tsx`، `app/products/[slug]/page.tsx`، إلخ).
   بنية الحقول متطابقة، فالتعديلات المطلوبة على المكوّنات تكون بسيطة جدًا.
6. لإتمام الطلبات، أنشئ جدول `orders` واربطه بـ `src/components/checkout/CheckoutForm.tsx`.

---

## 💳 الربط مع بوابة الدفع الإلكتروني

طرق الدفع الإلكتروني (مدى، Apple Pay، فيزا/ماستركارد) موجودة في الواجهة لكنها **غير مفعّلة** حاليًا
(مُعلَّمة بـ "قريبًا" في صفحة الدفع). للتفعيل:

1. اختر بوابة دفع سعودية مثل **Moyasar** أو **Tap Payments** أو **HyperPay**.
2. أنشئ مسار API جديد (مثل `src/app/api/create-payment/route.ts`) يستقبل تفاصيل الطلب
   ويستدعي API البوابة لإنشاء عملية دفع.
3. عدّل `src/components/checkout/CheckoutForm.tsx` (دالة `handleSubmit`) لاستدعاء هذا المسار
   بدلًا من التحويل المؤقت لواتساب، ثم أعد توجيه المستخدم لصفحة الدفع الفعلية أو نتيجة العملية.
4. عند نجاح الدفع، احفظ الطلب في جدول `orders` بـ Supabase وأرسل تأكيدًا للعميل.

---

## 🤖 الربط مع نموذج ذكاء اصطناعي حقيقي (Claude API)

ميزتا "مساعد اختيار الهدية" و "مولّد نص بطاقة الإهداء" تعملان حاليًا بمنطق قواعد محلي
(بدون أي استدعاء شبكة)، وهما جاهزتان للاستبدال باستدعاء Anthropic Messages API:

- `src/app/api/gift-assistant/route.ts` — يحتوي تعليقًا تفصيليًا بصيغة الاستدعاء المطلوبة.
- `src/app/api/gift-message/route.ts` — نفس الفكرة لتوليد نص بطاقة الإهداء.

ضع مفتاح API كمتغير بيئة على الخادم فقط (`ANTHROPIC_API_KEY` في `.env.local`)، ولا تكشفه
أبدًا في كود الواجهة (Client Components).

---

## 🎨 الهوية البصرية

- الألوان: إسبريسو غامق (`espresso`)، ذهبي (`gold`)، بيج رملي (`sand`)، وألوان عجوة/وردي (`date`) —
  معرّفة بالكامل في `tailwind.config.ts`.
- الخطوط: **Amiri** للعناوين (طابع تراثي)، **Tajawal** للنصوص (وضوح عصري) — تُحمَّل من Google Fonts
  في `src/app/layout.tsx`.
- العنصر البصري المميز: رسم "عنقود التمر" الخطي (`DateClusterMark`) المستخدم كبديل صور المنتجات
  وكعلامة مائية في الأقسام، بألوان متغيرة حسب نوع التمر.

## 🖼️ ملاحظة حول الصور

لمرحلة MVP، تُستخدم رسومات SVG (`ProductVisual`) بدلًا من صور حقيقية للمنتجات لتفادي الاعتماد
على روابط خارجية غير مستقرة. عند توفر صور تصوير فعلية للمنتجات، استبدل مكوّن `ProductVisual`
في `src/components/ui/DateClusterMark.tsx` بـ `next/image` يعرض الصورة الحقيقية (يمكن تخزينها
في Supabase Storage أو أي CDN).

---

## 📞 رقم واتساب التجريبي

رقم واتساب الطلب السريع حاليًا تجريبي (`966500000000+`) — عدّله في `src/lib/whatsapp.ts`
(ثابت `STORE_WHATSAPP_NUMBER`) برقم العمل الفعلي قبل الإطلاق.
