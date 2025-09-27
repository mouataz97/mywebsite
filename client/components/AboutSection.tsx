import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n-new";

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:bg-background relative overflow-hidden">
      {/* Light mode: Elegant background elements */}
      <div className="absolute inset-0 dark:hidden">
        {/* Subtle animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/15 to-pink-200/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(99, 102, 241, 0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="container relative z-10">
        <div className="bg-white/80 dark:bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden border border-slate-200/60 dark:border-border/40 shadow-xl shadow-slate-200/20 dark:shadow-none">
          {/* Light mode: Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 rounded-3xl dark:hidden"></div>
          {/* Light mode: Floating elements for depth */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-xl opacity-60 dark:hidden animate-float"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-xl opacity-50 dark:hidden animate-float" style={{animationDelay: '1s'}}></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent dark:text-foreground animate-fade-in">
                  {t("who.title")}
                </h2>
              </div>
              <div className="md:col-span-7 text-slate-700 dark:text-muted-foreground text-lg leading-relaxed space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
                {t("who.copy")}
                <div className="mt-6">
                  <Button asChild variant="default" className="group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.4s'}}>
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
