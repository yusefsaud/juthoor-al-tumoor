import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";
import { products, allVarieties } from "@/data/products";
import { DateVariety } from "@/data/types";

export const metadata = {
  title: "المنتجات | جذور التمور",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { variety?: string };
}) {
  const requested = searchParams.variety as DateVariety | undefined;
  const initialVariety = allVarieties.includes(requested as DateVariety)
    ? (requested as DateVariety)
    : undefined;

  return (
    <div className="py-12">
      <Container>
        <SectionHeading
          eyebrow="المتجر"
          title="جميع المنتجات"
          description="تصفّح تشكيلتنا الكاملة من التمور الفاخرة وصناديق الهدايا، وفلتر حسب النوع والمناسبة والسعر."
        />
        <div className="mt-10">
          <ProductsExplorer products={products} initialVariety={initialVariety} />
        </div>
      </Container>
    </div>
  );
}
