import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n-new";

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section className="py-24 bg-cool-gradient dark:bg-background">
      <div className="container">
        <div className="glass-effect dark:bg-card/50 dark:border-border/40 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Light mode: Enhanced floating background elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/8 rounded-full blur-3xl dark:hidden"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/6 rounded-full blur-3xl dark:hidden"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl dark:hidden"></div>
          
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
  );
}
