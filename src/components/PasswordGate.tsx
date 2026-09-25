import { useState, FormEvent, useEffect } from "react";
import antiLoveLogo from "@/assets/anti-love-logo.svg";

interface PasswordGateProps {
  onAuthenticated: () => void;
}

const PasswordGate = ({ onAuthenticated }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const isValidPassword = (value: string) =>
    value.trim().toLowerCase().replace(/\s+/g, "") === "yogsnonstop";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (isValidPassword(password)) {
      setIsLoading(true);
      setError("");
      
      // Brief loading state
      setTimeout(() => {
        sessionStorage.setItem("antiLoveAccess", "true");
        onAuthenticated();
      }, 500);
    } else {
      setError("Incorrect code. Please try again.");
      setIsShaking(true);
      setAttemptCount(prev => prev + 1);
      
      // Reset shake animation
      setTimeout(() => setIsShaking(false), 350);
      
      // Clear error styling after 3 seconds
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleInputFocus = () => {
    // Clear error state when user focuses input
    setError("");
  };

  const getHintText = () => {
    if (attemptCount === 0) {
      return "Refer to our socials @antiloveclothing to get the password.";
    }
    return "Hint: one word, no spaces.";
  };

  return (
    <div className="password-gate-wrapper">
      {/* Background with gradient and subtle glow orbs */}
      <div className="password-gate-background">
        <div className="password-gate-orb password-gate-orb-1" />
        <div className="password-gate-orb password-gate-orb-2" />
        <div className="password-gate-grain" />
      </div>

      {/* Main centered card */}
      <div className={`password-gate-card ${isVisible ? 'password-gate-card-visible' : ''} ${isShaking ? 'password-gate-shake' : ''}`}>
        <div className="password-gate-content">
          {/* Logo */}
          <img 
            src={antiLoveLogo} 
            alt="Anti-Love" 
            className="password-gate-logo"
          />

          {/* Early Access Label */}
          <div className="password-gate-label">EARLY ACCESS</div>

          {/* Main Heading */}
          <h1 className="password-gate-heading">Enter the Anti-Love website</h1>

          {/* Supporting Text */}
          <p className="password-gate-subtitle">
            This private preview is for those who know the code. Type it in to step inside.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="password-gate-form">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Password"
              className={`password-gate-input ${error ? 'password-gate-input-error' : ''}`}
              autoFocus
              disabled={isLoading}
            />

            {error && (
              <div className="password-gate-error">{error}</div>
            )}

            <button
              type="submit"
              disabled={!password.trim() || isLoading}
              className="password-gate-button"
            >
              {isLoading ? (
                <span className="password-gate-button-loading">ENTERING...</span>
              ) : (
                "ENTER"
              )}
            </button>

            <div className="password-gate-hint">{getHintText()}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordGate;
