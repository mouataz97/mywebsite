import { Globe, Smartphone, Palette, Workflow, Megaphone } from "lucide-react";
import { useI18n } from "@/lib/i18n-new";
import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  const { t } = useI18n();

  const features = [
    {
      icon: Smartphone,
      title: t('service.web.title'),
      description: t('service.web.desc')
    },
    {
      icon: Palette,
      title: t('service.brand.title'),
      description: t('service.brand.desc')
    },
    {
      icon: Workflow,
      title: t('service.opt.title'),
      description: t('service.opt.desc')
    },
    {
      icon: Globe,
      title: t('service.mobile.title'),
      description: t('service.mobile.desc')
    },
    {
      icon: Megaphone,
      title: t('service.mkt.title'),
      description: t('service.mkt.desc')
    }
  ];

  return (
    <section className="relative py-20 bg-texture-light dark:bg-muted/30">
      <div className="absolute inset-0 overflow-hidden">
        {/* Light mode: Warm gradient overlay */}
        <div className="absolute inset-0 bg-warm-gradient opacity-40 dark:hidden"></div>
        {/* Light mode: Diagonal pattern */}
        <div className="absolute inset-0 bg-pattern-diagonal opacity-50 dark:hidden"></div>
        {/* Light mode: Subtle grid overlay */}
        <div className="absolute inset-0 bg-pattern-grid opacity-20 dark:hidden"></div>
        
        {/* Dark mode: Clean background */}
        <div className="absolute inset-0 hidden dark:block"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('services.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
