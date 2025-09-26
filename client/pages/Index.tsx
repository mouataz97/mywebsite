import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Globe, Smartphone, Palette, Workflow, Megaphone, CheckCircle2, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-new";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="group relative card-elevated dark:bg-card/80 dark:border-border/40 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-primary/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
    {/* Light mode: Gradient overlay on hover */}
    <div className="absolute inset-0 rounded-xl bg-gradient-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gradient-to-br dark:from-primary/5 dark:to-transparent" />
    {/* Floating animation for icon */}
    <div className="relative z-10">
      <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:animate-pulse transition-all duration-300 group-hover:bg-primary/20 dark:group-hover:bg-primary/30">
        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
    {/* Shimmer effect on hover - different for light/dark */}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent bg-[length:200%_100%] animate-shimmer" />
  </div>
);

export default function Index() {
  const { t, locale } = useI18n();
  const location = useLocation();
  
  const isArabic = locale === 'ar';
  
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
      icon: Megaphone,
      title: t('service.mkt.title'),
      description: t('service.mkt.desc')
    }
  ];

  // Sample portfolio images - replace with your actual images
  const portfolioItems = [
    {
      src: "/placeholder-1.jpg",
      alt: "Web Design Project",
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
      alt: "E-commerce Solution",
      width: 800,
      height: 600
    },
    {
      src: "/placeholder-5.jpg",
      alt: "Dashboard Design",
      width: 800,
      height: 600
    },
    {
      src: "/placeholder-6.jpg",
      alt: "Marketing Campaign",
      width: 800,
      height: 600
    }
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Light mode: Beautiful mesh gradient background */}
          <div className="absolute inset-0 bg-mesh-gradient"></div>
          {/* Light mode: Subtle dot pattern overlay */}
          <div className="absolute inset-0 bg-pattern-dots"></div>
          {/* Light mode gradient overlay */}
          <div className="absolute inset-0 bg-gradient-hero-light"></div>
          
          {/* Dark mode: Clean minimal background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background hidden dark:block"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.18),transparent_70%)] hidden dark:block"></div>
        </div>
        
        <div className="container relative z-10">
          <div className={`${isArabic ? 'max-w-6xl' : 'max-w-4xl'} mx-auto text-center`} dir="auto">
            <span className={`inline-flex items-center rounded-full bg-primary/10 text-xs font-medium leading-5 text-primary ring-1 ring-inset ring-primary/20 mb-6 ${isArabic ? 'px-4 py-2' : 'px-3 py-1'}`}>
              {t("home.badge")}
            </span>
            <h1 className={`font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 ${isArabic ? 'text-3xl md:text-5xl lg:text-6xl leading-tight px-4 py-6 md:px-8 md:py-8' : 'text-4xl md:text-6xl lg:text-7xl'}`}>
              {t("home.title")}
            </h1>
            <p className={`mt-6 text-muted-foreground mx-auto ${isArabic ? 'text-xl md:text-2xl max-w-4xl leading-relaxed' : 'text-lg md:text-xl max-w-2xl'}`}>
              {t("home.sub")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className={`text-base ${isArabic ? 'h-14 px-12' : 'h-12 px-8'}`}>
                <Link to="/contact" state={{ modal: true, backgroundLocation: location }} className="group">
                  {t("home.ctaPrimary")}
                  <span className={`opacity-70 group-hover:translate-x-1 transition-transform ${isArabic ? 'mr-2' : 'ml-2'}`}>→</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className={`text-base ${isArabic ? 'h-14 px-12' : 'h-12 px-8'}`}>
                <Link to="/services">
                  {t("home.ctaSecondary")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 bg-gradient-light dark:bg-muted/30">
        <div className="absolute inset-0 overflow-hidden">
          {/* Light mode: Diagonal pattern */}
          <div className="absolute inset-0 bg-pattern-diagonal dark:hidden"></div>
          {/* Light mode: Subtle grid overlay */}
          <div className="absolute inset-0 bg-pattern-grid opacity-30 dark:hidden"></div>
          
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
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-gradient-light dark:bg-background">
        <div className="container">
          <div className="glass-effect dark:bg-card/50 dark:border-border/40 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Light mode: Floating background elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl dark:hidden"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl dark:hidden"></div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="md:col-span-5">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {t("who.title")}
                  </h2>
                </div>
                <div className="md:col-span-7 text-muted-foreground text-lg leading-relaxed space-y-4">
                  {t("who.copy")}
                  <div className="mt-6">
                    <Button asChild variant="outline" className="group">
                      <Link to="/about" className="flex items-center">
                        {t("who.learnMore")}
                        <span className="ml-2 opacity-70 group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20 bg-background">
        <div className="container">
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
            <Button asChild variant="outline" className="group">
              <Link to="/portfolio" className="inline-flex items-center">
                {t("portfolio.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="rounded-2xl border bg-card/40 p-8 md:p-12 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                {t("what.title")}
              </h3>
              <p className="text-lg text-muted-foreground">
                {t("what.copy")}
              </p>
              
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Globe className="h-5 w-5 text-primary" />,
                    title: t("what.items.web.title"),
                    description: t("what.items.web.desc"),
                  },
                  {
                    icon: <Smartphone className="h-5 w-5 text-primary" />,
                    title: t("what.items.mobile.title"),
                    description: t("what.items.mobile.desc"),
                  },
                  {
                    icon: <Palette className="h-5 w-5 text-primary" />,
                    title: t("what.items.design.title"),
                    description: t("what.items.design.desc"),
                  },
                  {
                    icon: <Workflow className="h-5 w-5 text-primary" />,
                    title: t("what.items.strategy.title"),
                    description: t("what.items.strategy.desc"),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("ourServices.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("ourServices.subtitle")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: t("service.web.title"),
                desc: t("service.web.desc"),
                Icon: Globe,
              },
              {
                title: t("service.mobile.title"),
                desc: t("service.mobile.desc"),
                Icon: Smartphone,
              },
              {
                title: t("service.brand.title"),
                desc: t("service.brand.desc"),
                Icon: Palette,
              },
              {
                title: t("service.opt.title"),
                desc: t("service.opt.desc"),
                Icon: Workflow,
              },
              {
                title: t("service.mkt.title"),
                desc: t("service.mkt.desc"),
                Icon: Megaphone,
              }
            ].map(({ title, desc, Icon }) => (
              <div key={title} className="rounded-xl border p-6 bg-card/40 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/15">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("why.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("why.subtitle")}
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: t("why.point1"),
                icon: <CheckCircle2 className="h-5 w-5 text-primary" />
              },
              {
                title: t("why.point2"),
                icon: <CheckCircle2 className="h-5 w-5 text-primary" />
              },
              {
                title: t("why.point3"),
                icon: <CheckCircle2 className="h-5 w-5 text-primary" />
              },
              {
                title: t("why.point4"),
                icon: <CheckCircle2 className="h-5 w-5 text-primary" />
              }
            ].map((item, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/40 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <h3 className="font-medium">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <p className="mt-8 text-center text-muted-foreground">
            {t("why.partners")}
          </p>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20 bg-muted/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("portfolio.recentTitle")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("portfolio.recentSubtitle")}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "E-commerce Platform",
                description: "A modern online store with seamless checkout experience"
              },
              {
                title: "Mobile App Design",
                description: "Intuitive mobile interface for a fintech application"
              },
              {
                title: "Brand Identity",
                description: "Complete brand refresh for a tech startup"
              },
              {
                title: "Web Dashboard",
                description: "Analytics dashboard with real-time data visualization"
              },
              {
                title: "Marketing Site",
                description: "High-converting landing pages for digital products"
              },
              {
                title: "UI/UX Audit",
                description: "Comprehensive analysis and recommendations for improvement"
              }
            ].map((project, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] w-full">
                  <PlaceholderImage 
                    text={project.title}
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex justify-end">
                    <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors">
                      {t("portfolio.viewProject")}
                      <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="group">
              <Link to="/portfolio" className="inline-flex items-center">
                {t("portfolio.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-r from-primary/15 via-transparent to-transparent p-8 md:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <h2 className="text-2xl md:text-3xl font-semibold">{t("cta.banner.title")}</h2>
            <div className="mt-6">
              <Button asChild className="h-11 px-6">
                <Link to="/contact" state={{ modal: true, backgroundLocation: location }}>{t("cta.banner.btn")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Teaser */}
      <section className="container pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">{t("contact.teaser.title")}</h3>
            <p className="mt-2 text-muted-foreground max-w-xl">{t("contact.teaser.copy")}</p>
          </div>
          <div className="md:text-right">
            <Button asChild variant="outline" className="h-11 px-6">
              <Link to="/contact" state={{ modal: true, backgroundLocation: location }}>{t("contact.teaser.btn")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
