import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground italic mb-16">
          This Privacy Policy explains how we collect, use and protect your personal data when you interact with Anti-Love. It is general information and not legal advice.
        </p>

        <div className="space-y-16">
          {/* Who We Are */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Who We Are
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Anti-Love is an online apparel brand and store. When we say 'we', 'us' or 'our', we're talking about the Anti-Love brand and its operators.</p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Information We Collect
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Information you provide directly</strong> (e.g., when you create an account, place an order or contact support): name, email address, shipping address, billing details and any messages you send us.
              </p>
              <p>
                <strong className="text-foreground">Information automatically collected:</strong> device information, IP address, browser type, pages visited, and interactions with our site (via cookies and similar technologies).
              </p>
              <p>
                <strong className="text-foreground">Order and transaction details:</strong> products purchased, order value, payment method (processed securely via our payment provider).
              </p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              How We Use Your Information
            </h2>
            <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
              <li>To process and deliver your orders.</li>
              <li>To provide customer support.</li>
              <li>To improve our products, website and user experience.</li>
              <li>To send important updates about your order or account.</li>
              <li>With your consent, to send marketing communications about drops, releases and offers (you can opt out at any time).</li>
            </ul>
          </section>

          {/* Sharing Your Information */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Sharing Your Information
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We share data only with trusted third parties that help us run the store, such as: payment processors, shipping partners, email service providers and analytics tools.</p>
              <p>These partners only receive the information necessary to perform their services and are expected to protect your data.</p>
              <p>We do not sell your personal information.</p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Data Retention
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We keep your information for as long as necessary to provide our services, fulfil legal obligations and resolve disputes.</p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Your Rights
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>You may have the right to access, correct or delete your personal information, as well as to object to or restrict certain processing, depending on your location.</p>
              <p>To exercise these rights, contact us via the <a href="/support" className="text-foreground underline hover:no-underline">Support page</a>.</p>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Security
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We use reasonable technical and organisational measures to protect your data. No method of transmission or storage is completely secure, but we work to keep your information safe.</p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Contact
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Questions about this policy or your data? Contact us via the <a href="/support" className="text-foreground underline hover:no-underline">Support page</a> or at team@anti-loveclothing.com.</p>
            </div>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Changes to This Policy
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We may update this Privacy Policy occasionally. Any changes will be posted here with a new 'Last updated' date.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
