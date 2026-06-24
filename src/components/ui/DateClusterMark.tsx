// العنصر البصري المميز للهوية: عنقود تمر برسم خطي ذهبي
// يُستخدم كعلامة مائية في الأقسام، وكبديل صورة المنتج بألوان متغيرة حسب الصنف

import { SwatchTheme } from "@/data/types";

const swatchColors: Record<SwatchTheme, { from: string; to: string; ring: string }> = {
  maroon: { from: "#5A2A1D", to: "#8C4A38", ring: "#C49A3D" },
  gold: { from: "#C49A3D", to: "#8A6622", ring: "#F3E6C2" },
  amber: { from: "#D6B161", to: "#8C6845", ring: "#E6CC8E" },
  espresso: { from: "#3A2718", to: "#1C110A", ring: "#C49A3D" },
  rose: { from: "#8C4A38", to: "#5A2A1D", ring: "#E6CC8E" },
};

export function DateClusterMark({
  className = "",
  strokeWidth = 1.4,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* الجريدة (السعفة) */}
      <path
        d="M100 18 C 86 30, 70 36, 50 34 M100 18 C 92 34, 86 50, 86 68 M100 18 C 114 34, 130 36, 150 34 M100 18 C 108 34, 114 50, 114 68"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* الساق المركزية */}
      <path d="M100 18 L100 70" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* عناقيد التمر */}
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 76 + i * 20;
        const spread = 14 + i * 7;
        return (
          <g key={i}>
            <path
              d={`M100 70 Q ${100 - spread / 2} ${y - 8}, ${100 - spread} ${y}`}
              stroke="currentColor"
              strokeWidth={strokeWidth * 0.8}
              strokeLinecap="round"
            />
            <path
              d={`M100 70 Q ${100 + spread / 2} ${y - 8}, ${100 + spread} ${y}`}
              stroke="currentColor"
              strokeWidth={strokeWidth * 0.8}
              strokeLinecap="round"
            />
            <ellipse
              cx={100 - spread}
              cy={y + 6}
              rx="5.5"
              ry="8"
              fill="currentColor"
              opacity={0.85}
            />
            <ellipse
              cx={100 + spread}
              cy={y + 6}
              rx="5.5"
              ry="8"
              fill="currentColor"
              opacity={0.85}
            />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * بديل صورة المنتج لمرحلة MVP — دائرة بإطار ذهبي وتدرّج لوني حسب صنف التمر
 * مع رسم عنقود التمر في المنتصف. عند الربط مع Supabase/تخزين الصور،
 * استبدل هذا المكوّن بـ next/image يعرض الصورة الحقيقية للمنتج.
 */
export function ProductVisual({
  swatch,
  size = "md",
  className = "",
}: {
  swatch: SwatchTheme;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const colors = swatchColors[swatch];
  const sizes = {
    sm: "h-20 w-20",
    md: "h-full w-full",
    lg: "h-full w-full",
  };

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl2 ${sizes[size]} ${className}`}
      style={{
        background: `radial-gradient(circle at 35% 25%, ${colors.from}, ${colors.to})`,
      }}
    >
      <div
        className="absolute inset-2 rounded-[1rem] opacity-40"
        style={{ boxShadow: `inset 0 0 0 1.5px ${colors.ring}` }}
      />
      <DateClusterMark
        className="h-[70%] w-[70%] opacity-90 drop-shadow-sm"
        strokeWidth={1.6}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
    </div>
  );
}
