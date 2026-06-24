import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="مختارات الموسم"
          title="الأكثر طلبًا من عملائنا"
          description="تشكيلة مختارة من أفخر أنواع التمور والصناديق التي يثني عليها عملاؤنا دائمًا."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/products" className="btn-outline-gold">
            عرض كل المنتجات
            <ArrowLeft size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
