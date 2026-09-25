import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6">
          Cookies Policy
        </h1>
        <p className="text-sm text-muted-foreground italic mb-16">
          This page provides general information only and does not constitute legal advice.
        </p>

        <div className="space-y-16">
          {/* What Are Cookies */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              What Are Cookies?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Cookies are small text files stored on your device when you browse websites. They help remember your preferences and improve your experience.</p>
            </div>
          </section>

          {/* How We Use Cookies */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              How We Use Cookies
            </h2>
            <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
              <li>To remember items in your cart and keep you signed in.</li>
              <li>To understand how visitors use our site and improve performance.</li>
              <li>To show relevant content and promotions.</li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Types of Cookies We Use
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Essential cookies:</strong> Required for the site to function (e.g., cart, checkout, security).
              </p>
              <p>
                <strong className="text-foreground">Performance / analytics cookies:</strong> Help us understand traffic and usage (for example, via analytics tools).
              </p>
              <p>
                <strong className="text-foreground">Functional cookies:</strong> Remember choices such as language, region or saved preferences.
              </p>
              <p>
                <strong className="text-foreground">Advertising cookies:</strong> Used to deliver ads that may be more relevant to you on other platforms.
              </p>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Managing Cookies
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>You can control and/or delete cookies in your browser settings. You may also be able to manage optional cookies via our cookie banner.</p>
              <p>If you disable certain cookies, some parts of the site may not work as intended.</p>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Updates to This Policy
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We may update this Cookies Policy from time to time. Changes will be posted on this page with a revised 'Last updated' date.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiesPolicy;
