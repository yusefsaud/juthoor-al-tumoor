"use client";

import { DateVariety, Occasion } from "@/data/types";
import { allVarieties, allOccasions } from "@/data/products";

export interface ProductFiltersState {
  varieties: DateVariety[];
  occasions: Occasion[];
  maxPrice: number;
  sort: "الأكثر شهرة" | "الأقل سعرًا" | "الأعلى سعرًا" | "الأعلى تقييمًا";
}

export const defaultFilters: ProductFiltersState = {
  varieties: [],
  occasions: [],
  maxPrice: 500,
  sort: "الأكثر شهرة",
};

export function ProductFilters({
  filters,
  onChange,
  resultCount,
}: {
  filters: ProductFiltersState;
  onChange: (next: ProductFiltersState) => void;
  resultCount: number;
}) {
  function toggleVariety(v: DateVariety) {
    const exists = filters.varieties.includes(v);
    onChange({
      ...filters,
      varieties: exists ? filters.varieties.filter((x) => x !== v) : [...filters.varieties, v],
    });
  }

  function toggleOccasion(o: Occasion) {
    const exists = filters.occasions.includes(o);
    onChange({
      ...filters,
      occasions: exists ? filters.occasions.filter((x) => x !== o) : [...filters.occasions, o],
    });
  }

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between border-b border-gold-200 pb-3">
        <h3 className="font-display text-base font-bold text-espresso-800">الفلاتر</h3>
        <button
          onClick={() => onChange(defaultFilters)}
          className="text-xs font-semibold text-gold-600 hover:text-gold-700"
        >
          إعادة ضبط
        </button>
      </div>

      <div>
        <p className="mb-3 text-sm font-bold text-espresso-700">نوع التمر</p>
        <div className="flex flex-wrap gap-2">
          {allVarieties.map((v) => {
            const active = filters.varieties.includes(v);
            return (
              <button
                key={v}
                onClick={() => toggleVariety(v)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  active
                    ? "border-gold-500 bg-gold-400 text-espresso-900"
                    : "border-espresso-200 text-espresso-600 hover:border-gold-400"
                }`}
              >
                {v}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-bold text-espresso-700">المناسبة</p>
        <div className="flex flex-wrap gap-2">
          {allOccasions.map((o) => {
            const active = filters.occasions.includes(o);
            return (
              <button
                key={o}
                onClick={() => toggleOccasion(o)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  active
                    ? "border-espresso-700 bg-espresso-800 text-sand-100"
                    : "border-espresso-200 text-espresso-600 hover:border-espresso-500"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-bold text-espresso-700">الحد الأعلى للسعر</p>
          <span className="text-sm font-semibold text-gold-600">{filters.maxPrice} ر.س</span>
        </div>
        <input
          type="range"
          min={50}
          max={500}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-gold-500"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-bold text-espresso-700">الترتيب حسب</p>
        <select
          value={filters.sort}
          onChange={(e) =>
            onChange({ ...filters, sort: e.target.value as ProductFiltersState["sort"] })
          }
          className="input-luxury"
        >
          {(["الأكثر شهرة", "الأقل سعرًا", "الأعلى سعرًا", "الأعلى تقييمًا"] as const).map(
            (opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            )
          )}
        </select>
      </div>

      <p className="text-sm text-espresso-400">{resultCount} منتج مطابق</p>
    </div>
  );
}

