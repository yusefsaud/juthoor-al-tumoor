interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "right";
  variant?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "light",
}: SectionHeadingProps) {
  const titleColor = variant === "dark" ? "text-sand-50" : "text-espresso-800";
  const descColor = variant === "dark" ? "text-sand-100/70" : "text-espresso-500";

  return (
    <div className={align === "center" ? "text-center" : "text-right"}>
      {eyebrow && (
        <span className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-4 bg-gold-400" />
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-3 font-display text-3xl font-bold sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-base leading-7 ${descColor} ${
            align === "center" ? "mx-auto max-w-2xl" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
