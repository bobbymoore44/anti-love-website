import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import PagePreloader from "./components/PagePreloader";
import PasswordGate from "./components/PasswordGate";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import ShopNew from "./pages/ShopNew";
import ShopHoodies from "./pages/ShopHoodies";
import ShopTShirts from "./pages/ShopTShirts";
import ShopJoggers from "./pages/ShopJoggers";
import ShopCaps from "./pages/ShopCaps";
import CollectionsBasics from "./pages/CollectionsBasics";
import CollectionsTracksuits from "./pages/CollectionsTracksuits";
import CollectionsFracturedLove from "./pages/CollectionsFracturedLove";
import CollectionsOuterwear from "./pages/CollectionsOuterwear";
import CollectionsSignature from "./pages/CollectionsSignature";
import CollectionsCreative from "./pages/CollectionsCreative";
import Cart from "./pages/Cart";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import Delivery from "./pages/Delivery";
import Returns from "./pages/Returns";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import CookiesPolicy from "./pages/CookiesPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import PreOrderPolicy from "./pages/PreOrderPolicy";
import ApplyBlackFridayDiscount from "./pages/ApplyBlackFridayDiscount";
import AdminInterests from "./pages/AdminInterests";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => {
      const authStatus = sessionStorage.getItem("antiLoveAccess") === "true";
      console.log("🔐 [AUTH FLOW] Initial auth status:", authStatus);
      return authStatus;
    }
  );
  const [showPreloader, setShowPreloader] = useState(false);

  // Store the originally requested URL IMMEDIATELY when component mounts, before anything else
  useEffect(() => {
    const fullPath = location.pathname + location.search + location.hash;
    console.log("🌐 [AUTH FLOW] Current location:", fullPath);
    
    // Always store on first render if not authenticated
    if (!isAuthenticated) {
      sessionStorage.setItem("antiLoveRedirect", fullPath);
      console.log("💾 [AUTH FLOW] Stored redirect path:", fullPath);
      console.log("💾 [AUTH FLOW] SessionStorage now contains:", {
        antiLoveAccess: sessionStorage.getItem("antiLoveAccess"),
        antiLoveRedirect: sessionStorage.getItem("antiLoveRedirect")
      });
    } else {
      console.log("✅ [AUTH FLOW] Already authenticated, skipping redirect storage");
    }
  }, []); // Empty dependency array - runs once on mount

  const handleAuthenticated = () => {
    console.log("🔓 [AUTH FLOW] Password authenticated! Starting preloader...");
    console.log("🔓 [AUTH FLOW] Stored redirect path is:", sessionStorage.getItem("antiLoveRedirect"));
    setIsAuthenticated(true);
    setShowPreloader(true);
  };

  const handlePreloaderComplete = () => {
    console.log("⏰ [AUTH FLOW] Preloader complete!");
    setShowPreloader(false);
    
    // Navigate to the originally intended path after preloader
    const redirectTo = sessionStorage.getItem("antiLoveRedirect") || "/";
    console.log("🎯 [AUTH FLOW] Retrieved redirect path:", redirectTo);
    console.log("🎯 [AUTH FLOW] Using path:", redirectTo);
    
    // Clear the stored redirect
    sessionStorage.removeItem("antiLoveRedirect");
    console.log("🧹 [AUTH FLOW] Cleared stored redirect from sessionStorage");
    
    // Always navigate to the stored or fallback path
    console.log("🚀 [AUTH FLOW] Navigating to:", redirectTo);
    navigate(redirectTo, { replace: true });
    console.log("✅ [AUTH FLOW] Navigation command executed");
  };

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    console.log("🚪 [AUTH FLOW] Showing password gate");
    return <PasswordGate onAuthenticated={handleAuthenticated} />;
  }

  // Show preloader after authentication
  if (showPreloader) {
    console.log("⏳ [AUTH FLOW] Showing preloader");
    return <PagePreloader onComplete={handlePreloaderComplete} />;
  }

  // Show the site - URL is already set correctly, React Router will handle routing
  console.log("🎨 [AUTH FLOW] Rendering main application at:", location.pathname);
  return (
    <>
      <ScrollToTop />
      <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products/:family/:color" element={<ProductDetail />} />
            {/* Shop pages */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/hoodies" element={<ShopHoodies />} />
            <Route path="/shop/tshirts" element={<ShopTShirts />} />
            <Route path="/shop/joggers" element={<ShopJoggers />} />
            <Route path="/shop/caps" element={<ShopCaps />} />
            {/* Collections pages - exact Shopify slugs */}
            <Route path="/collections/new-arrivals" element={<ShopNew />} />
            <Route path="/collections/fractured-love" element={<CollectionsFracturedLove />} />
            <Route path="/collections/creative-collection" element={<CollectionsCreative />} />
            <Route path="/collections/anti-love-basics" element={<CollectionsBasics />} />
            <Route path="/collections/anti-love-signature" element={<CollectionsSignature />} />
            <Route path="/collections/caps" element={<ShopCaps />} />
            <Route path="/collections/outerwear" element={<CollectionsOuterwear />} />
            <Route path="/collections/tracksuits" element={<CollectionsTracksuits />} />
            <Route path="/collections/joggers" element={<ShopJoggers />} />
            <Route path="/collections/hoodies" element={<ShopHoodies />} />
            <Route path="/collections/t-shirts" element={<ShopTShirts />} />
            {/* Legacy redirects */}
            <Route path="/collections/signature" element={<CollectionsSignature />} />
            <Route path="/collections/basics" element={<CollectionsBasics />} />
            <Route path="/collections/creative" element={<CollectionsCreative />} />
            <Route path="/collections/limited" element={<CollectionsFracturedLove />} />
            {/* Cart and Search */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} />
            {/* Info pages */}
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/pre-order-policy" element={<PreOrderPolicy />} />
            {/* Admin utility */}
            <Route path="/apply-black-friday-discount" element={<ApplyBlackFridayDiscount />} />
            <Route path="/admin/interests" element={<AdminInterests />} />
            {/* Legacy routes */}
            <Route path="/product/:slug" element={<ProductDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsent />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
