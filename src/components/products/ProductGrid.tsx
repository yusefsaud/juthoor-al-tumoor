import { Product } from "@/data/types";
import { ProductCard } from "@/components/products/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl2 border border-dashed border-gold-300 bg-sand-50 py-16 text-center">
        <p className="font-display text-lg font-bold text-espresso-700">
          لا توجد منتجات مطابقة لاختيارك
        </p>
        <p className="mt-2 text-sm text-espresso-400">
          جرّب تعديل الفلاتر أو إعادة ضبطها لعرض جميع المنتجات.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
