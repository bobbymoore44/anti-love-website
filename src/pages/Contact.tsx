import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Instagram } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Hero / Intro */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6">
          Contact Anti-Love
        </h1>
        <p className="text-lg text-muted-foreground mb-16 leading-relaxed">
          For questions, collaborations or anything you can't find in Support, reach out below.
        </p>

        <div className="space-y-16">
          {/* General Enquiries */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              General Enquiries
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                For general questions about collections, sizing, orders or the brand, reach us here and we'll get back to you.
              </p>
              <p>
                <strong className="text-foreground">Email:</strong>{" "}
                <a href="mailto:team@anti-loveclothing.com" className="hover:text-foreground transition-colors">
                  team@anti-loveclothing.com
                </a>
              </p>
              <p className="text-sm">
                We usually respond within 1–2 working days (Mon–Fri, excluding public holidays).
              </p>
            </div>
          </section>

          {/* Order & Delivery Questions */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Order & Delivery Questions
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>If you're contacting us about an order, please include:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Your full name</li>
                <li>Order number</li>
                <li>Any relevant photos (for sizing issues, faults or delivery damage)</li>
              </ul>
              <p className="text-sm pt-2">
                For quick answers on shipping and returns, check our{" "}
                <a href="/delivery" className="text-foreground hover:underline">Delivery</a> and{" "}
                <a href="/returns" className="text-foreground hover:underline">Returns</a> pages first.
              </p>
            </div>
          </section>

          {/* Collaborations & Press */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Collaborations & Press
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                For collaborations, wholesale or press enquiries, email{" "}
                <a href="mailto:team@anti-loveclothing.com?subject=ANTI-LOVE%20COLLAB" className="text-foreground hover:underline">
                  team@anti-loveclothing.com
                </a>{" "}
                with <strong className="text-foreground">'ANTI-LOVE COLLAB'</strong> in the subject line.
              </p>
            </div>
          </section>

          {/* Social & Community */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Social & Community
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                You can also reach us through our social channels. For order-specific issues, email is always the fastest way.
              </p>
              <div className="flex gap-6 pt-2">
                <a
                  href="https://www.instagram.com/antiloveclothing?igsh=MTd4b201eTZkNjR2cg%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="text-sm">Instagram</span>
                </a>
                   <a
                   href="https://www.tiktok.com/@antiloveclothing?_r=1&_t=ZN-93hZVSJs9FG"
                   target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span className="text-sm">TikTok</span>
                </a>
                   <a
                   href="https://youtube.com/@antiloveclothing?si=E9f2w9ypiFbgkl0Q"
                   target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="text-sm">YouTube</span>
                </a>
              </div>
            </div>
          </section>

          {/* Google Form Embed */}
          <section>
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSeKlO5pEqx9N0fEO6SO27ilxVK-j3YVGr04ChBHH4WiNgVxOA/viewform?embedded=true"
              className="w-full rounded-xl border border-border/20 shadow-lg"
              style={{ height: '1600px' }}
              title="Contact Form"
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
