import { Hero } from "@/components/home/Hero";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyUs } from "@/components/home/WhyUs";
import { GiftAssistantBanner } from "@/components/home/GiftAssistantBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <WhyUs />
      <GiftAssistantBanner />
      <Testimonials />
      <NewsletterCTA />
    </>
  );
}

