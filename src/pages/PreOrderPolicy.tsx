import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PreOrderPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6">
          Pre-Order Policy
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-16">
          Some of our pieces are available on a pre-order basis. This allows us to create items with intention, reduce waste, and offer limited designs without mass production.
        </p>

        <div className="space-y-16">
          {/* How Pre-Orders Work */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              How Pre-Orders Work
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>When you place a pre-order, you reserve a piece that has not yet been completed. Your order is added to our production schedule, and your item will be crafted especially for you.</p>
            </div>
          </section>

          {/* Despatch Timeframes */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Despatch Timeframes
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Pre-order items do not despatch immediately.</p>
              <p>Estimated despatch timeframes are provided once your piece is in progress, and we will keep you updated as your order moves through production.</p>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Payment
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Payment is taken at the time of ordering to secure your piece and begin the production process.</p>
            </div>
          </section>

          {/* Cancellations */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Cancellations
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>You may cancel your pre-order at any time before despatch for a full refund.</p>
            </div>
          </section>

          {/* Returns */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Returns
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Pre-order items are eligible for return under our standard returns policy once delivered.</p>
            </div>
          </section>

          {/* Mixed Orders */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Mixed Orders
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>If your order contains both in-stock and pre-order items, they may be shipped separately.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PreOrderPolicy;
