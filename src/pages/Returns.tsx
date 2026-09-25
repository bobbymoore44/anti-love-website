import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Returns = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6">
          Returns Policy
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-16">
          We want you to love your purchase. If you are not completely satisfied, you can return items in accordance with this policy.
        </p>

        <div className="space-y-16">
          {/* In-Stock Items */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              In-Stock Items
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>You may return in-stock items within 14 days of receipt for a full refund.</p>
              <p>Items must be unused, in their original condition, and with all tags attached.</p>
              <p>Refunds will be processed to the original payment method once the item has been received and inspected.</p>
            </div>
          </section>

          {/* Pre-Order Items */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Pre-Order Items
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Pre-order items are eligible for cancellation at any time before despatch for a full refund.</p>
              <p>Once a pre-order item has been despatched, standard returns rules apply.</p>
            </div>
          </section>

          {/* How to Return an Item */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              How to Return an Item
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Contact us at [your email] to initiate a return.</p>
              <p>Include your order number and reason for return.</p>
              <p>Send the item back to the address provided.</p>
            </div>
          </section>

          {/* Return Shipping Costs */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Return Shipping Costs
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Customers are responsible for return postage unless the item is faulty or incorrect.</p>
              <p>We recommend using a tracked service to ensure safe delivery.</p>
            </div>
          </section>

          {/* Faulty or Incorrect Items */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Faulty or Incorrect Items
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>If your item arrives damaged, defective, or incorrect, please contact us immediately at [your email].</p>
              <p>We will provide instructions and cover return postage.</p>
            </div>
          </section>

          {/* Refunds */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight uppercase mb-6">
              Refunds
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Refunds will be issued to the original payment method within 14 days of receiving your returned item.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Returns;
