import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoBanner } from "@/components/home/PromoBanner";
import { BestSellers } from "@/components/home/BestSellers";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { VideoFeedbackSection } from "@/components/home/VideoFeedbackSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <FeaturedProducts />
      <PromoBanner />
      <BestSellers />
      <TestimonialsSection />
      <VideoFeedbackSection />
    </Layout>
  );
};

export default Index;
