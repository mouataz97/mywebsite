import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "@/lib/i18n-new";

interface HeroSectionProps {
  isArabic: boolean;
}

export function HeroSection({ isArabic }: HeroSectionProps) {
  const { t } = useI18n();
  const location = useLocation();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Light mode: Sophisticated layered background */}
        <div className="absolute inset-0 bg-sophisticated dark:hidden"></div>
        {/* Light mode: Enhanced mesh gradient */}
        <div className="absolute inset-0 bg-mesh-gradient dark:hidden"></div>
        {/* Light mode: Subtle dot pattern overlay */}
        <div className="absolute inset-0 bg-pattern-dots opacity-60 dark:hidden"></div>
        
        {/* Dark mode: Clean minimal background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background hidden dark:block"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.18),transparent_70%)] hidden dark:block"></div>
      </div>
      
      <div className="container relative z-10">
        <div className={`${isArabic ? 'max-w-6xl' : 'max-w-4xl'} mx-auto text-center`} dir="auto">
          <span className={`inline-flex items-center rounded-full bg-primary/15 text-sm font-bold leading-6 text-primary ring-2 ring-inset ring-primary/30 mb-8 shadow-lg ${isArabic ? 'px-6 py-3 text-base' : 'px-5 py-2'}`}>
            {t("home.badge")}
          </span>
          <h1 className={`font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 ${isArabic ? 'text-3xl md:text-5xl lg:text-6xl leading-tight px-4 py-6 md:px-8 md:py-8' : 'text-4xl md:text-6xl lg:text-7xl'}`}>
            {t("home.title")}
          </h1>
          <p className={`mt-6 text-foreground/80 dark:text-muted-foreground mx-auto ${isArabic ? 'text-xl md:text-2xl max-w-4xl leading-relaxed' : 'text-lg md:text-xl max-w-2xl'}`}>
            {t("home.sub")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className={`text-base ${isArabic ? 'h-14 px-12' : 'h-12 px-8'}`}>
              <Link to="/contact" state={{ modal: true, backgroundLocation: location }} className="group">
                {t("home.ctaPrimary")}
                <span className={`opacity-70 group-hover:translate-x-1 transition-transform ${isArabic ? 'mr-2' : 'ml-2'}`}>→</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className={`text-base border-2 border-foreground/20 text-foreground hover:bg-foreground hover:text-background dark:border-border dark:text-foreground dark:hover:bg-foreground dark:hover:text-background ${isArabic ? 'h-14 px-12' : 'h-12 px-8'}`}>
              <Link to="/services">
                {t("home.ctaSecondary")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
