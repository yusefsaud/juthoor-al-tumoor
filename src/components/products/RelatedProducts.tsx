import { Product } from "@/data/types";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RelatedProducts({
  products,
  title = "قد يعجبك أيضًا",
}: {
  products: Product[];
  title?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="py-4">
      <SectionHeading eyebrow="توصيات لك" title={title} align="right" />
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

