import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductVisual } from "@/components/ui/DateClusterMark";
import { ProductBadgePill } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { PriceTag } from "@/components/ui/PriceTag";
import { ProductDetailActions } from "@/components/products/ProductDetailActions";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { formatGrams } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  return { title: product ? `${product.name} | مِذواق` : "المنتج غير موجود" };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="py-12">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-lg">
            <ProductVisual swatch={product.swatch} />
            {product.badges.length > 0 && (
              <div className="absolute right-5 top-5 flex flex-col items-end gap-1.5">
                {product.badges.map((b) => (
                  <ProductBadgePill key={b} badge={b} />
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="eyebrow">
              <span className="h-px w-4 bg-gold-400" />
              {product.variety} • {product.origin}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold text-espresso-800 sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-3">
              <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size={16} />
            </div>

            <p className="mt-4 text-base leading-7 text-espresso-500">
              {product.shortDescription}
            </p>

            <div className="mt-5">
              <PriceTag price={product.price} originalPrice={product.originalPrice} size="lg" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <InfoRow label="الوزن" value={formatGrams(product.weightGrams)} />
              <InfoRow label="المنشأ" value={product.origin} />
              <InfoRow label="التغليف" value={product.packaging} />
              <InfoRow label="الصنف" value={product.variety} />
            </div>

            <div className="mt-7 border-t border-gold-200/60 pt-7">
              <ProductDetailActions product={product} />
            </div>

            <div className="mt-8 space-y-3 border-t border-gold-200/60 pt-7">
              {product.description.map((paragraph, i) => (
                <p key={i} className="flex items-start gap-2.5 text-[14px] leading-7 text-espresso-600">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold-500" />
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <RelatedProducts products={related} />
        </div>
      </Container>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-sand-200/50 px-3.5 py-2.5">
      <p className="text-[11px] text-espresso-400">{label}</p>
      <p className="font-semibold text-espresso-800">{value}</p>
    </div>
  );
}
