/* eslint-disable no-unused-vars */
import "./Auth.css";
import { Button } from "@/components/ui/button";
import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ForgotPasswordForm from "./ForgotPassword";
import { useSelector } from "react-redux";
import CustomeToast from "@/components/custome/CustomeToast";

// ── Ticker data ──────────────────────────────────────────────────────────────
const TICKERS = [
  { sym: "BTC", price: "67,420.50", chg: "+2.34%", up: true },
  { sym: "ETH", price: "3,512.80", chg: "+1.87%", up: true },
  { sym: "NVDA", price: "924.15", chg: "+3.21%", up: true },
  { sym: "AAPL", price: "213.40", chg: "-0.45%", up: false },
  { sym: "TSLA", price: "178.90", chg: "+5.12%", up: true },
  { sym: "SOL", price: "168.33", chg: "+4.76%", up: true },
  { sym: "MSFT", price: "415.20", chg: "+0.92%", up: true },
  { sym: "AMZN", price: "198.65", chg: "-1.13%", up: false },
  { sym: "BNB", price: "592.40", chg: "+2.05%", up: true },
  { sym: "GOOGL", price: "173.80", chg: "+0.61%", up: true },
];

const TickerTape = () => {
  const items = [...TICKERS, ...TICKERS]; // duplicate for seamless loop
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-sym">{t.sym}</span>
            <span className="ticker-price">{t.price}</span>
            <span className={`ticker-chg ${t.up ? "up" : "down"}`}>{t.chg}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Brand logo SVG ───────────────────────────────────────────────────────────
const BrandLogo = ({ onClick }) => (
  <div onClick={onClick} className="brand-row cursor-pointer select-none">
    <div className="brand-icon">
      <svg viewBox="0 0 24 24">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    </div>
    <span className="brand-name">
      TRADE<span>-</span>PULSE
    </span>
  </div>
);

// ── Main Auth component ──────────────────────────────────────────────────────
const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((store) => store);

  const [animate, setAnimate] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  console.log("---------- ", auth.error);

  return (
    <div className="authContainer h-screen relative">
      {/* Ticker tape */}
      <TickerTape />

      {/* Second ambient glow bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Auth card */}
      <div className="auth-card">
        <CustomeToast show={auth.error} message={auth.error?.error} />

        <BrandLogo onClick={() => navigate("/")} />
        <div className="auth-divider" />

        {/* ── SIGNUP ── */}
        {location.pathname === "/signup" ? (
          <section className={`w-full ${animate ? "slide-down" : "slide-up"}`}>
            <SignupForm />
            <div className="auth-nav-row">
              <span>Already have an account?</span>
              <button className="auth-nav-link" onClick={() => handleNavigation("/signin")}>
                Sign in
              </button>
            </div>
          </section>

        /* ── FORGOT PASSWORD ── */
        ) : location.pathname === "/forgot-password" ? (
          <section className="w-full">
            <ForgotPasswordForm />
            <div className="auth-nav-row" style={{ marginTop: "18px" }}>
              <span>Back to</span>
              <button className="auth-nav-link" onClick={() => navigate(auth.user ? "/profile" : "/signin")}>
                {auth.user ? "Profile" : "Sign in"}
              </button>
            </div>
          </section>

        /* ── SIGN IN (default) ── */
        ) : (
          <section className="w-full">
            <LoginForm />
            <div className="auth-nav-row">
              <span>New to Trade-Pulse?</span>
              <button className="auth-nav-link" onClick={() => handleNavigation("/signup")}>
                Create account
              </button>
            </div>
            <button
              className="tp-btn-ghost"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;