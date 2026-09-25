import { useEffect, useState } from "react";
import antiLoveIcon from "@/assets/anti-love-icon-3.webp";

interface PagePreloaderProps {
  onComplete: () => void;
}

const PagePreloader = ({ onComplete }: PagePreloaderProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Lock scroll while preloader is visible
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Start exit animation after 2300ms
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2300);

    // Complete and unlock scroll after fade out
    const completeTimer = setTimeout(() => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)] flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Loading Anti-Love"
    >
      {/* Logo Only - Centered */}
      <img
        src={antiLoveIcon}
        alt="Anti-Love Logo"
        className="w-28 h-28 md:w-32 md:h-32 object-contain animate-preloader-minimal motion-reduce:animate-preloader-minimal-reduced"
      />
    </div>
  );
};

export default PagePreloader;
