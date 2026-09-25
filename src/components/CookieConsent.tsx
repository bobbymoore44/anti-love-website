import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "al-cookie-consent-v1";

type CookiePrefs = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

const defaultPrefs: CookiePrefs = {
  essential: true,
  analytics: false,
  marketing: false,
};

const CookieConsent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(defaultPrefs);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setIsOpen(true);
      return;
    }

    try {
      const parsed: CookiePrefs = JSON.parse(stored);
      setPrefs({ ...defaultPrefs, ...parsed, essential: true });
      setIsOpen(false);
    } catch {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed: CookiePrefs = JSON.parse(stored);
      if (parsed.analytics) {
        // TODO: Initialize analytics here
        // Example: initAnalytics();
      }
      if (parsed.marketing) {
        // TODO: Initialize marketing pixels here
        // Example: initMarketingPixels();
      }
    } catch {
      // ignore
    }
  }, []);

  const savePrefs = (next: CookiePrefs) => {
    const safe: CookiePrefs = { ...next, essential: true as const };
    setPrefs(safe);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
  };

  const handleAcceptAll = () => {
    savePrefs({
      essential: true,
      analytics: true,
      marketing: true,
    });
    setIsOpen(false);
  };

  const handleDeclineAll = () => {
    savePrefs({
      essential: true,
      analytics: false,
      marketing: false,
    });
    setIsOpen(false);
  };

  const toggleCategory = (key: keyof Omit<CookiePrefs, "essential">) => {
    const next = { ...prefs, [key]: !prefs[key] };
    savePrefs(next);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-white/12 bg-black/90 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)] backdrop-blur shadow-[0_24px_80px_rgba(0,0,0,0.9)] px-5 py-4 sm:px-8 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
              Cookies &amp; Privacy
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to improve your experience, deliver personalised content, and analyse our traffic.
              You can accept or decline non-essential cookies.
            </p>
            <Link
              to="/cookies-policy"
              className="inline-flex text-[11px] font-medium uppercase tracking-[0.18em] text-primary/90 hover:text-primary transition-colors"
            >
              View Cookies Policy
            </Link>
          </div>

          <div className="flex flex-col gap-2 sm:min-w-[260px]">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="w-full rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase shadow-[0_8px_24px_rgba(243,182,193,0.35)] hover:bg-primary/90 transition-all"
            >
              Accept all cookies
            </button>

            <button
              type="button"
              onClick={() => setShowSettings((v) => !v)}
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-foreground/80 hover:bg-white/10 transition-all"
            >
              Cookie settings
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="mt-4 border-t border-white/10 pt-4 grid gap-4 sm:grid-cols-3 text-sm">
            {/* Essential */}
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-foreground">Essential cookies</p>
                <span className="text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                  Always on
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Required for things like cart, checkout and security. You can't turn these off.
              </p>
            </div>

            {/* Analytics */}
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-foreground">Analytics</p>
                <Switch
                  checked={prefs.analytics}
                  onCheckedChange={() => toggleCategory("analytics")}
                />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Helps us understand how the site is used so we can improve the experience.
              </p>
            </div>

            {/* Marketing */}
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-foreground">Marketing</p>
                <Switch
                  checked={prefs.marketing}
                  onCheckedChange={() => toggleCategory("marketing")}
                />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Used to deliver personalised offers and measure the impact of campaigns.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
