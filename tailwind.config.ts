import type { Config } from "tailwindcss";

// نظام الهوية البصرية لـ "جذور التمور"
// إسبريسو غامق + ذهبي عتيق (نخلة محروقة بالشمس) + بيج رملي (لون كثبان نجد)
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        espresso: {
          50: "#F6F1EA",
          100: "#EAE0D2",
          200: "#D2BFA0",
          300: "#B3936A",
          400: "#8C6845",
          500: "#5C3D27",
          600: "#46301F",
          700: "#3A2718",
          800: "#2B1B11", // الخلفية الغامقة الأساسية
          900: "#1C110A",
          950: "#120A05",
        },
        gold: {
          50: "#FBF6E9",
          100: "#F3E6C2",
          200: "#E6CC8E",
          300: "#D6B161",
          400: "#C49A3D", // الذهبي الأساسي (لون النخلة تحت الشمس)
          500: "#A9802C",
          600: "#8A6622",
          700: "#6B4F1B",
          800: "#503B15",
          900: "#382A0F",
        },
        sand: {
          50: "#FDFBF7",
          100: "#F8F1E4", // الخلفية الفاتحة الأساسية
          200: "#F0E4CC",
          300: "#E3D0A8",
          400: "#D2B67E",
        },
        date: {
          maroon: "#5A2A1D", // لون عجوة محمصة
          rose: "#8C4A38",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(circle at 30% 20%, rgba(196,154,61,0.25), transparent 60%)",
        "seal-ring":
          "conic-gradient(from 90deg, #C49A3D, #6B4F1B, #C49A3D, #6B4F1B, #C49A3D)",
      },
      boxShadow: {
        gold: "0 10px 30px -10px rgba(196,154,61,0.45)",
        lift: "0 20px 40px -15px rgba(43,27,17,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "frond-sway": {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
        "frond-sway": "frond-sway 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
