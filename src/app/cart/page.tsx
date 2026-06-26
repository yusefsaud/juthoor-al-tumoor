"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { useCart } from "@/context/CartContext";
import { products, getFeaturedProducts } from "@/data/products";

export default function CartPage() {
  const { items, subtotal } = useCart();

  const cartProducts = items
    .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
    .filter((x) => x.product);

  if (items.length === 0) {
    return (
      <div className="py-20">
        <Container className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-50 text-gold-500">
            <ShoppingBag size={26} />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-espresso-800">
            سلتك فارغة حاليًا
          </h1>
          <p className="mt-2 text-sm text-espresso-500">
            تصفّح منتجاتنا الفاخرة وابدأ بإضافة ما يناسبك.
          </p>
          <Link href="/products" className="btn-gold mt-6 inline-flex">
            تصفّح المنتجات
            <ArrowLeft size={16} />
          </Link>
          <div className="mt-16 text-right">
            <RelatedProducts products={getFeaturedProducts().slice(0, 4)} title="قد يعجبك" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <SectionHeading title="سلة المشتريات" align="right" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="card-luxury p-6">
            {cartProducts.map(({ item, product }) => (
              <CartItemRow
                key={item.productId}
                product={product!}
                quantity={item.quantity}
                customNote={item.customNote}
              />
            ))}
          </div>
          <CartSummary subtotal={subtotal} />
        </div>
      </Container>
    </div>
  );
}

