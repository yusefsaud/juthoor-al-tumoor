"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { DateVariety, Product } from "@/data/types";
import {
  ProductFilters,
  ProductFiltersState,
  defaultFilters,
} from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";

export function ProductsExplorer({
  products,
  initialVariety,
}: {
  products: Product[];
  initialVariety?: DateVariety;
}) {
  const [filters, setFilters] = useState<ProductFiltersState>(
    initialVariety ? { ...defaultFilters, varieties: [initialVariety] } : defaultFilters
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (filters.varieties.length > 0 && !filters.varieties.includes(p.variety)) return false;
      if (
        filters.occasions.length > 0 &&
        !p.occasions.some((o) => filters.occasions.includes(o))
      )
        return false;
      if (p.price > filters.maxPrice) return false;
      return true;
    });

    switch (filters.sort) {
      case "الأقل سعرًا":
        result = result.slice().sort((a, b) => a.price - b.price);
        break;
      case "الأعلى سعرًا":
        result = result.slice().sort((a, b) => b.price - a.price);
        break;
      case "الأعلى تقييمًا":
        result = result.slice().sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = result.slice().sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
    return result;
  }, [products, filters]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* الفلاتر - سطح المكتب */}
      <aside className="hidden lg:block">
        <div className="card-luxury sticky top-28 p-5">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            resultCount={filtered.length}
          />
        </div>
      </aside>

      <div>
        <div className="mb-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="btn-outline-gold lg:hidden"
          >
            <SlidersHorizontal size={16} />
            الفلاتر ({filtered.length})
          </button>
          <p className="hidden text-sm text-espresso-400 lg:block">{filtered.length} منتج</p>
        </div>
        <ProductGrid products={filtered} />
      </div>

      {/* الفلاتر - الجوال (Drawer) */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            className="absolute inset-0 bg-espresso-900/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-sand-50 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-espresso-800">الفلاتر</h3>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="إغلاق">
                <X size={22} className="text-espresso-600" />
              </button>
            </div>
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              resultCount={filtered.length}
            />
            <button onClick={() => setMobileFiltersOpen(false)} className="btn-gold mt-6 w-full">
              عرض {filtered.length} منتج
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
