import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useI18n } from "@/lib/i18n-new";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { t, locale } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const isArabic = locale === 'ar';

  const subjectParam = (searchParams.get("subject") || searchParams.get("service") || "").toLowerCase();
  
  const inferService = () => {
    if (subjectParam.includes("web")) return t("opt.web");
    if (subjectParam.includes("mobile")) return t("opt.mobile");
    if (subjectParam.includes("brand")) return t("opt.brand");
    if (subjectParam.includes("optimiz") || subjectParam.includes("erp") || subjectParam.includes("odoo") || subjectParam.includes("crm")) 
      return t("opt.opt");
    if (subjectParam.includes("market") || subjectParam.includes("seo") || subjectParam.includes("growth")) 
      return t("opt.mkt");
    return t("opt.other");
  };

  const defaultService = inferService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const data = new FormData(form);
      const service = (data.get("service") as string) || t("opt.other");
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Prepare email
      const subject = encodeURIComponent(`${t("contact.newMessage")} — ${service}`);
      const body = encodeURIComponent(
        `${t("contact.name")}: ${data.get("name")}\n` +
        `${t("contact.email")}: ${data.get("email")}\n` +
        `${data.get("company") ? `${t("contact.company")}: ${data.get("company")}\n` : ''}` +
        `${t("contact.service")}: ${service}\n\n` +
        `${t("contact.message")}:\n${data.get("message")}`
      );
      
      // Open default email client
      window.location.href = `mailto:aymane@razani.ma?subject=${subject}&body=${body}`;
      
      // Show success state
      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(t("contact.submitError") || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-200px)]">
      <section className="container py-8 sm:py-12 md:py-16">
        <div className="text-center mb-10 md:mb-16" dir="auto">
          <h1 className={`font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent ${isArabic ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'}`}>
            {t("contact.title")}
          </h1>
          <p className={`mt-3 sm:mt-4 mx-auto text-muted-foreground ${isArabic ? 'max-w-4xl text-lg sm:text-xl' : 'max-w-2xl'}`}>
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              className="space-y-6 p-6 bg-card rounded-xl border border-border/50 shadow-sm"
              onSubmit={handleSubmit}
            >
              {submitSuccess ? (
                <div className="p-4 mb-6 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                  {t("contact.successMessage")}
                </div>
              ) : submitError ? (
                <div className="p-4 mb-6 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                  {submitError}
                </div>
              ) : null}

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80">
                    {t("contact.name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-border bg-background/80 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${isArabic ? 'px-5 py-3 text-right' : 'px-4 py-2.5'}`}
                    placeholder={t("contact.namePlaceholder") || "John Doe"}
                    dir="auto"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80">
                    {t("contact.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-border bg-background/80 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${isArabic ? 'px-5 py-3 text-right' : 'px-4 py-2.5'}`}
                    placeholder={t("contact.emailPlaceholder") || "you@company.com"}
                    dir="auto"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium text-foreground/80">
                    {t("contact.company")}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-border bg-background/80 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${isArabic ? 'px-5 py-3 text-right' : 'px-4 py-2.5'}`}
                    placeholder={t("contact.companyPlaceholder") || "Your company name"}
                    dir="auto"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-foreground/80">
                    {t("contact.service")}
                  </label>
                  <select
                    id="service"
                    name="service"
                    defaultValue={defaultService}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-border bg-background/80 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed appearance-none ${isArabic ? 'px-5 py-3 text-right' : 'px-4 py-2.5'}`}
                    dir="auto"
                  >
                    {[
                      t("opt.web"),
                      t("opt.mobile"),
                      t("opt.brand"),
                      t("opt.opt"),
                      t("opt.mkt"),
                      t("opt.other"),
                    ].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-foreground/80">
                  {t("contact.message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={isArabic ? 6 : 5}
                  required
                  disabled={isSubmitting}
                  className={`w-full rounded-lg border border-border bg-background/80 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${isArabic ? 'px-5 py-4 text-right' : 'px-4 py-3'}`}
                  placeholder={t("contact.messagePlaceholder") || "Tell us about your project..."}
                  dir="auto"
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className={`w-full sm:w-auto font-medium rounded-lg transition-all ${isArabic ? 'min-w-[200px] h-14 px-8' : 'min-w-[160px] h-12 px-6'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className={`h-4 w-4 animate-spin ${isArabic ? 'ml-2' : 'mr-2'}`} />
                      {t("contact.sending")}
                    </>
                  ) : (
                    t("contact.send")
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="p-6 bg-card rounded-xl border border-border/50 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                {t("contact.emailUs")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("contact.directCopy")}
              </p>
              <a 
                href="mailto:aymane@razani.ma" 
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                aymane@razani.ma
              </a>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border/50 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                {t("contact.callUs")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("contact.callUsCopy")}
              </p>
              <a 
                href="tel:+212600000000" 
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                +212 6 00 00 00 00
              </a>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border/50 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                {t("contact.visitUs")}
              </h3>
              <p className="text-muted-foreground">
                {t("contact.locationsCopy")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
