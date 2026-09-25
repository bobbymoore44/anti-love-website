import { Search, Menu, X, Instagram, ChevronDown } from "lucide-react";
import antiLoveLogo from "@/assets/anti-love-logo.svg";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";

const shopMenu = [
  { name: 'Shop All', href: '/shop' },
  { name: 'New Arrivals', href: '/collections/new-arrivals' },
  { name: 'Hoodies', href: '/shop/hoodies' },
  { name: 'T-Shirts', href: '/shop/tshirts' },
  { name: 'Joggers', href: '/shop/joggers' },
  { name: 'Outerwear', href: '/collections/outerwear' },
  { name: 'Caps', href: '/shop/caps' },
];

const collectionsMenu = [
  { name: 'Anti-Love Signature', href: '/collections/anti-love-signature' },
  { name: 'Anti-Love Basics', href: '/collections/basics' },
  { name: 'Tracksuits', href: '/collections/tracksuits' },
  { name: 'Creative Collection', href: '/collections/creative' },
  { name: 'Fractured Love', href: '/collections/fractured-love' },
];

const DesktopDropdown = ({ 
  label, 
  items 
}: { 
  label: string; 
  items: { name: string; href: string }[] 
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>
      <div
        role="menu"
        className={`absolute left-0 mt-2 w-56 rounded-xl backdrop-blur-lg bg-background/95 ring-1 ring-border shadow-xl p-2 z-50 transition-all duration-200 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'pointer-events-none opacity-0 -translate-y-1'
        }`}
      >
        {items.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              role="menuitem"
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                active 
                  ? 'bg-muted text-primary font-medium' 
                  : 'text-foreground/80 hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shopExpanded, setShopExpanded] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Focus trap in drawer
  useEffect(() => {
    if (!drawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        hamburgerRef.current?.focus();
      }

      if (e.key === "Tab") {
        const drawer = drawerRef.current;
        if (!drawer) return;

        const focusableElements = drawer.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md bg-black/30 border-b border-border" : "bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="relative mx-auto max-w-[1440px] px-5">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Left - Hamburger (mobile) or Dropdowns (desktop) */}
            <div className="flex items-center justify-start">
              {/* Hamburger - visible only on mobile */}
              <button
                ref={hamburgerRef}
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring rounded transition-all"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
              >
                <Menu className="w-6 h-6 text-foreground" />
              </button>

              {/* Desktop Dropdowns */}
              <div className="hidden lg:flex items-center gap-4">
                <DesktopDropdown label="Shop" items={shopMenu} />
                <DesktopDropdown label="Collections" items={collectionsMenu} />
              </div>
            </div>

            {/* Center - Logo (absolutely positioned for true centering) */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img
                src={antiLoveLogo}
                alt="Anti-Love"
                className="h-6 lg:h-8 w-auto max-w-[140px] lg:max-w-[180px] object-contain"
              />
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring rounded transition-all"
                aria-label="Search"
              >
                <Search className="w-[22px] h-[22px] text-foreground" />
              </button>
              <CartDrawer />
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/35 z-[999] transition-opacity duration-300 motion-reduce:transition-none"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-[86%] max-w-[420px] bg-background z-[1000] shadow-2xl transition-transform duration-300 motion-reduce:transition-none ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigation menu"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-start p-5 border-b border-border">
            <button
              onClick={() => setDrawerOpen(false)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary rounded transition-all motion-reduce:transition-none"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Drawer Menu Items */}
          <div className="flex-1 overflow-y-auto p-8">
            <nav className="flex flex-col gap-7">
              {/* SHOP - Expandable Accordion */}
              <div>
                <button
                  onClick={() => setShopExpanded(!shopExpanded)}
                  className="w-full text-left text-lg font-semibold tracking-[0.15em] text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded transition-colors uppercase flex items-center justify-between"
                  aria-expanded={shopExpanded}
                  aria-haspopup="menu"
                >
                  SHOP
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      shopExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {shopExpanded && (
                  <div className="mt-4 ml-4 flex flex-col gap-4" role="menu">
                    {shopMenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-base font-medium tracking-[0.1em] text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded transition-colors"
                        onClick={() => setDrawerOpen(false)}
                        role="menuitem"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* COLLECTIONS - Expandable Accordion */}
              <div>
                <button
                  onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                  className="w-full text-left text-lg font-semibold tracking-[0.15em] text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded transition-colors uppercase flex items-center justify-between"
                  aria-expanded={collectionsExpanded}
                  aria-haspopup="menu"
                >
                  COLLECTIONS
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      collectionsExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {collectionsExpanded && (
                  <div className="mt-4 ml-4 flex flex-col gap-4" role="menu">
                    {collectionsMenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-base font-medium tracking-[0.1em] text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded transition-colors"
                        onClick={() => setDrawerOpen(false)}
                        role="menuitem"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Drawer Footer */}
          <div className="p-8 border-t border-border space-y-6">
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/antiloveclothing?igsh=MTd4b201eTZkNjR2cg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary rounded transition-all motion-reduce:transition-none"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-foreground" />
              </a>
                <a
                href="https://www.tiktok.com/@antiloveclothing?_r=1&_t=ZN-93hZVSJs9FG"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary rounded transition-all motion-reduce:transition-none"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@antiloveclothing?si=E9f2w9ypiFbgkl0Q"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary rounded transition-all motion-reduce:transition-none"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Navigation;
