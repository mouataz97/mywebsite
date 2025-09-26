import { useI18n } from "@/lib/i18n-new";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AboutSection } from "@/components/AboutSection";

export default function Index() {
  const { t, locale } = useI18n();
  
  const isArabic = locale === 'ar';

  const portfolioItems = [
    {
      src: "/placeholder-1.jpg",
      alt: t("portfolio.items.web.alt"),
      width: 800,
      height: 600
    },
    {
      src: "/placeholder-2.jpg",
      alt: "Mobile App UI",
      width: 800,
      height: 600
    },
    {
      src: "/placeholder-3.jpg",
      alt: "Brand Identity",
      width: 800,
      height: 600
    },
    {
      src: "/placeholder-4.jpg",
      alt: "E-commerce Platform",
      width: 800,
      height: 600
    },
    {
      src: "/placeholder-5.jpg",
      alt: "Marketing Campaign",
      width: 800,
      height: 600
    }
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection isArabic={isArabic} />

      {/* Features Section */}
      <FeaturesSection />

      {/* About Section */}
      <AboutSection />

      {/* Portfolio Showcase */}
      <section className="relative py-20 bg-sophisticated dark:bg-background overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Light mode: Subtle texture overlay */}
          <div className="absolute inset-0 bg-pattern-grid opacity-10 dark:hidden"></div>
          <div className="absolute inset-0 bg-warm-gradient opacity-30 dark:hidden"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("portfolio.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("portfolio.subtitle")}
            </p>
          </div>
          
          <div className="mb-12">
            <ImageGallery images={portfolioItems} />
          </div>

          <div className="text-center">
            <PlaceholderImage 
              width={800} 
              height={400} 
              text="Portfolio Gallery"
              className="mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="relative py-20 bg-texture-light dark:bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Light mode: Layered background effects */}
          <div className="absolute inset-0 bg-cool-gradient opacity-50 dark:hidden"></div>
          <div className="absolute inset-0 bg-pattern-diagonal opacity-30 dark:hidden"></div>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-background/20 dark:hidden"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {t("what.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("what.copy")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
