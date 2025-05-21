import { FeaturesSection } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { Working } from "@/components/working";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow md:px-8 lg:px-16">
        <HeroSection />;
        <FeaturesSection />
        <Working />
      </main>
      <Footer />
    </div>
  );
}
