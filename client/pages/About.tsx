import { useI18n } from "@/lib/i18n-new";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Users, Target, Lightbulb, Award, ArrowRight } from "lucide-react";

export default function About() {
  const { t, locale } = useI18n();
  const location = useLocation();
  const isArabic = locale === 'ar';

  const values = [
    {
      icon: Users,
      titleKey: "about.values.collaboration.title",
      descKey: "about.values.collaboration.desc"
    },
    {
      icon: Target,
      titleKey: "about.values.excellence.title", 
      descKey: "about.values.excellence.desc"
    },
    {
      icon: Lightbulb,
      titleKey: "about.values.innovation.title",
      descKey: "about.values.innovation.desc"
    },
    {
      icon: Award,
      titleKey: "about.values.quality.title",
      descKey: "about.values.quality.desc"
    }
  ];

  const team = [
    {
      nameKey: "about.team.founder.name",
      roleKey: "about.team.founder.role",
      descKey: "about.team.founder.desc"
    },
    {
      nameKey: "about.team.manager.name",
      roleKey: "about.team.manager.role",
      descKey: "about.team.manager.desc"
    },
    {
      nameKey: "about.team.designer.name",
      roleKey: "about.team.designer.role",
      descKey: "about.team.designer.desc"
    },
    {
      nameKey: "about.team.lead.name", 
      roleKey: "about.team.lead.role",
      descKey: "about.team.lead.desc"
    }
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-rose-50 via-pink-50/40 to-red-50/30 dark:bg-background overflow-hidden">
        {/* Light mode: Elegant background elements */}
        <div className="absolute inset-0 dark:hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-200/20 to-rose-200/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/10 to-pink-200/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container relative z-10">
          <div className={`${isArabic ? 'max-w-6xl' : 'max-w-4xl'} mx-auto text-center`} dir="auto">
            <h1 className={`font-bold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent dark:text-foreground ${isArabic ? 'text-4xl md:text-6xl lg:text-7xl leading-tight' : 'text-5xl md:text-7xl lg:text-8xl'}`}>
              {t("about.hero.title")}
            </h1>
            <p className={`mt-6 text-slate-700 dark:text-muted-foreground mx-auto ${isArabic ? 'text-xl md:text-2xl max-w-4xl leading-relaxed' : 'text-lg md:text-xl max-w-3xl'}`}>
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className={`text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 ${isArabic ? 'text-right' : ''}`}>
                  {t("about.story.title")}
                </h2>
                <div className="space-y-4 text-foreground/80 dark:text-muted-foreground leading-relaxed">
                  <p>{t("about.story.paragraph1")}</p>
                  <p>{t("about.story.paragraph2")}</p>
                  <p>{t("about.story.paragraph3")}</p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-100 dark:from-card dark:to-muted rounded-3xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-4">300k</div>
                    <div className="text-lg font-semibold text-foreground/70">Studio</div>
                    <div className="text-sm text-muted-foreground mt-2">{t("about.story.tagline")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30 dark:bg-muted/10">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 ${isArabic ? 'text-right' : ''}`}>
                {t("about.values.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("about.values.subtitle")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(value.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 ${isArabic ? 'text-right' : ''}`}>
                {t("about.team.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("about.team.subtitle")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {team.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="aspect-square w-48 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-card dark:to-muted flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-6xl">👨‍💻</div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {t(member.nameKey)}
                  </h3>
                  <p className="text-primary font-semibold mb-4">
                    {t(member.roleKey)}
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    {t(member.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-rose-50 via-pink-50/40 to-red-50/30 dark:bg-muted/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 ${isArabic ? 'text-right' : ''}`}>
              {t("about.cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("about.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Link
                  to="/contact"
                  state={{ modal: true, backgroundLocation: location }}
                  className="group flex items-center"
                >
                  {t("about.cta.primary")}
                  <ArrowRight className={`h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform ${isArabic ? 'mr-2' : 'ml-2'}`} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-foreground/20 text-foreground hover:bg-foreground hover:text-background">
                <Link to="/services">
                  {t("about.cta.secondary")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
