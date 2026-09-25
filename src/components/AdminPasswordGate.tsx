import { useState, FormEvent, useEffect } from "react";
import antiLoveLogo from "@/assets/anti-love-logo.svg";

interface AdminPasswordGateProps {
  onAuthenticated: () => void;
}

const AdminPasswordGate = ({ onAuthenticated }: AdminPasswordGateProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const validEmail = "team@anti-loveclothing.com";
    const validPassword = "AL2026!";
    
    if (email.toLowerCase().trim() === validEmail && password === validPassword) {
      setIsLoading(true);
      setError("");
      
      setTimeout(() => {
        sessionStorage.setItem("antiLoveAdminAccess", "true");
        onAuthenticated();
      }, 500);
    } else {
      setError("Invalid email or password.");
      setIsShaking(true);
      
      setTimeout(() => setIsShaking(false), 350);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleInputFocus = () => {
    setError("");
  };

  return (
    <div className="password-gate-wrapper">
      <div className="password-gate-background">
        <div className="password-gate-orb password-gate-orb-1" />
        <div className="password-gate-orb password-gate-orb-2" />
        <div className="password-gate-grain" />
      </div>

      <div className={`password-gate-card ${isVisible ? 'password-gate-card-visible' : ''} ${isShaking ? 'password-gate-shake' : ''}`}>
        <div className="password-gate-content">
          <img 
            src={antiLoveLogo} 
            alt="Anti-Love" 
            className="password-gate-logo"
          />

          <div className="password-gate-label">ADMIN ACCESS</div>

          <h1 className="password-gate-heading">Admin Dashboard</h1>

          <p className="password-gate-subtitle">
            This area is restricted to Anti-Love staff only. Enter your credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="password-gate-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Email"
              className={`password-gate-input ${error ? 'password-gate-input-error' : ''}`}
              autoFocus
              disabled={isLoading}
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Password"
              className={`password-gate-input ${error ? 'password-gate-input-error' : ''}`}
              disabled={isLoading}
            />

            {error && (
              <div className="password-gate-error">{error}</div>
            )}

            <button
              type="submit"
              disabled={!email.trim() || !password.trim() || isLoading}
              className="password-gate-button"
            >
              {isLoading ? (
                <span className="password-gate-button-loading">ACCESSING...</span>
              ) : (
                "LOGIN"
              )}
            </button>

            <div className="password-gate-hint">
              Contact Anti-Love management for access credentials.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPasswordGate;
