import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Delivery = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6">
          Delivery Policy
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-16">
          We currently deliver within the UK only.
        </p>

        <div className="space-y-16">
          {/* In-Stock Items */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              In-Stock Items
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>In-stock items are typically despatched within 2–3 working days. You will receive a confirmation email with tracking information once your order has been despatched.</p>
            </div>
          </section>

          {/* Pre-Order Items */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Pre-Order Items
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Pre-order pieces do not despatch immediately.</p>
              <p>These items are created specially for each customer, and despatch timing can vary depending on production.</p>
              <p>An estimated despatch window will be shared once your piece is in progress, and we will keep you updated throughout.</p>
            </div>
          </section>

          {/* Shipping Methods & Costs */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Shipping Methods & Costs (UK Mainland)
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Standard Delivery:</strong> £3.95 (free on orders over £50) — 2–4 working days after despatch
              </p>
              <p>
                <strong className="text-foreground">Express Delivery:</strong> £5.95 — order by 12pm and receive your order within 1–2 working days after despatch
              </p>
            </div>
          </section>

          {/* Split Deliveries */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Split Deliveries
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>If your order includes both in-stock and pre-order items, they may be despatched separately at no additional cost.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Delivery;
