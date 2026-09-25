import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logoTitle from "@/assets/al-logo-title.png";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))] items-start">
          {/* Brand block */}
          <div className="space-y-4">
            <img 
              src={logoTitle} 
              alt="Anti-Love Logo" 
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="max-w-sm text-sm text-[#EAEAEA]/70 leading-relaxed">
              Engineered for cold streets and late nights. <br />
              Designed to move with intent.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EAEAEA]/60 mb-4">
              Explore
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link
                to="/collections/outerwear"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Outerwear
              </Link>
              <Link
                to="/collections/basics"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Basics
              </Link>
              <Link
                to="/collections/tracksuits"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Tracksuits
              </Link>
              <Link
                to="/collections/fractured-love"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Fractured Love
              </Link>
            </nav>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EAEAEA]/60 mb-4">
              Help
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link
                to="/delivery"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Delivery
              </Link>
              <Link
                to="/returns"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Returns
              </Link>
              <Link
                to="/support"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Support
              </Link>
              <Link
                to="/contact"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EAEAEA]/60 mb-4">
              Legal
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link
                to="/cookies-policy"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Cookies Policy
              </Link>
              <Link
                to="/privacy-policy"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                to="/pre-order-policy"
                className="text-[#EAEAEA]/80 text-sm hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Pre-Order Policy
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4 md:items-start lg:items-end">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EAEAEA]/60">
              Connect
            </h4>
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/antiloveclothing?igsh=MTd4b201eTZkNjR2cg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EAEAEA] hover:text-white hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@antiloveclothing?_r=1&_t=ZN-93hZVSJs9FG"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EAEAEA] hover:text-white hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                aria-label="TikTok"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@antiloveclothing?si=E9f2w9ypiFbgkl0Q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EAEAEA] hover:text-white hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                aria-label="YouTube"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-[#EAEAEA]/60 md:flex-row md:items-center md:justify-between">
          <span>© Anti-Love {new Date().getFullYear()}</span>
          <span className="md:text-right">
            Built for presence. Crafted in premium weights.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
