import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6">
          Terms & Conditions
        </h1>
        <p className="text-sm text-muted-foreground italic mb-16">
          These Terms & Conditions govern your use of the Anti-Love website and your purchases from us. By using this site, you agree to these terms. This is general template content and does not replace legal advice.
        </p>

        <div className="space-y-16">
          {/* Use of the Website */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Use of the Website
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>You agree to use the site for lawful purposes only and not to attempt to disrupt or compromise the website or its security.</p>
            </div>
          </section>

          {/* Products & Availability */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Products & Availability
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We do our best to display products, colours and details accurately, but slight variation can occur.</p>
              <p>All products are subject to availability. We may change or discontinue items at any time without notice.</p>
            </div>
          </section>

          {/* Pricing & Payment */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Pricing & Payment
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Prices are shown in the displayed currency and may change without notice.</p>
              <p>You are responsible for any local taxes, duties or fees applied by your country.</p>
              <p>Orders are only accepted once payment is successfully processed.</p>
            </div>
          </section>

          {/* Order Acceptance */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Order Acceptance
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We reserve the right to refuse or cancel any order, for example due to suspected fraud, pricing errors or stock issues. If your order is cancelled, any payment will be refunded.</p>
            </div>
          </section>

          {/* Shipping, Returns & Refunds */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Shipping, Returns & Refunds
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Shipping, delivery estimates, returns and refunds are governed by our <a href="/delivery" className="text-foreground underline hover:no-underline">Delivery</a> and <a href="/returns" className="text-foreground underline hover:no-underline">Returns</a> policies, which form part of these Terms.</p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Intellectual Property
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>All content on this site (such as logos, graphics, product photography, designs and text) is owned by or licensed to Anti-Love and protected by intellectual property laws.</p>
              <p>You may not reproduce, distribute or use our content without our written permission.</p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Limitation of Liability
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>To the maximum extent permitted by law, we are not liable for any indirect, incidental or consequential damages arising from your use of the site or purchase of products.</p>
            </div>
          </section>

          {/* Governing Law & Disputes */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Governing Law & Disputes
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>These Terms & Conditions are governed by applicable law. Any disputes will be handled by the appropriate courts, unless local law requires otherwise.</p>
            </div>
          </section>

          {/* Changes to These Terms */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Changes to These Terms
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We may update these Terms & Conditions from time to time. The latest version will always be available on this page.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;
