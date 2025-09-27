import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Globe, Smartphone, Palette, Workflow, Megaphone, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n-new";

export default function Services() {
  const { t } = useI18n();
  const location = useLocation();
  const services = [
    {
      title: t("service.web.title"),
      desc: t("service.web.desc"),
      bullets: [
        "Modern, responsive design",
        "SEO-friendly architecture",
        "Scalable development for future needs",
        "Easy-to-manage content",
      ],
      cta: "Start your website project",
      Icon: Globe,
      subject: "Website project inquiry",
    },
    {
      title: t("service.mobile.title"),
      desc: t("service.mobile.desc"),
      bullets: [
        "Native and cross-platform solutions",
        "Engaging UI/UX design",
        "Scalable architecture for growth",
        "Integration with backend systems",
      ],
      cta: "Let’s build your app",
      Icon: Smartphone,
      subject: "Mobile app project inquiry",
    },
    {
      title: t("service.brand.title"),
      desc: t("service.brand.desc"),
      bullets: [
        "Logo and visual identity",
        "Brand guidelines",
        "Marketing assets (flyers, social media, packaging)",
        "UI/UX design for digital products",
      ],
      cta: "Create your brand identity",
      Icon: Palette,
      subject: "Branding and design inquiry",
    },
    {
      title: t("service.opt.title"),
      desc: t("service.opt.desc"),
      bullets: [
        "Process analysis & optimization",
        "Custom software solutions",
        "ERP/CRM integrations (Odoo, and others)",
        "Automation to reduce manual work",
      ],
      cta: "Optimize your business",
      Icon: Workflow,
      subject: "Business optimization inquiry",
    },
    {
      title: t("service.mkt.title"),
      desc: t("service.mkt.desc"),
      bullets: [
        "SEO & content marketing",
        "Social media strategy & management",
        "Paid ads (Google, Meta, LinkedIn)",
        "Analytics & performance tracking",
      ],
      cta: "Boost your visibility",
      Icon: Megaphone,
      subject: "Marketing and growth inquiry",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-200px)]">
      {/* Intro */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.12),transparent_60%)]" />
        <div className="container py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            {t("services.hero")}
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            {t("services.intro")}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="container pb-6 md:pb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{t("ourServices.title")}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, desc, bullets, cta, Icon, subject }) => (
            <article
              key={title}
              className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm shadow-[0_0_0_1px_hsl(var(--border))] hover:shadow-[0_0_0_1px_hsl(var(--primary))] transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/15">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>

              <h4 className="mt-4 text-sm font-medium text-foreground/90">{t("service.whatYouGet")}</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary/80" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <Button asChild>
                  <Link to={`/contact?subject=${encodeURIComponent(subject)}`} state={{ modal: true, backgroundLocation: location }}>{cta}</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="container py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{t("why.title")}</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {[t("why.point1"), t("why.point2"), t("why.point3"), t("why.point4")].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className="container pb-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl border p-6 md:p-10 bg-gradient-to-r from-primary/10 to-transparent">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              {t("services.finalCta")}
            </h2>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/contact" state={{ modal: true, backgroundLocation: location }}>
                {t("services.finalBtn")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
