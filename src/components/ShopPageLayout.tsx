import { useEffect } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface ShopPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ShopPageLayout = ({ title, description, children }: ShopPageLayoutProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase">
            {title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
        </section>

        {/* Content */}
        <section className="max-w-[1680px] mx-auto px-4 md:px-6 lg:px-8 pb-24">
          {children}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ShopPageLayout;
