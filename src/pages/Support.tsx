import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Support = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6">
          Support
        </h1>
        <p className="text-lg text-muted-foreground mb-16 leading-relaxed">
          Need help with sizing, orders or anything Anti-Love? We've got you.
        </p>

        <div className="space-y-16">
          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Contact Us
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Email:</strong> team@anti-loveclothing.com
              </p>
              <p>
                <strong className="text-foreground">Response time:</strong> usually within 1–2 working days.
              </p>
            </div>
          </section>

          {/* Common Questions */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Common Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Where is my order?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Check your shipping confirmation email for tracking. If it's been more than the estimated timeframe, reach out with your order number.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Can I change or cancel my order?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We start processing orders quickly, so changes aren't always possible. Email us as soon as you can and we'll do our best.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Which size should I choose?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Most pieces are a relaxed streetwear fit. Refer to the size guide on each product page or contact us for tailored advice.
                </p>
              </div>
            </div>
          </section>

          {/* Business Hours */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Business Hours
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Support is available Monday–Friday (excluding public holidays). Messages sent over the weekend will be answered as soon as we're back.</p>
            </div>
          </section>

          {/* Social / Community */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Social / Community
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>For drops, restocks and teasers, follow us on Instagram, TikTok and YouTube via the links in the header and footer.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
