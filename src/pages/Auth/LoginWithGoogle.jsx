import { useState } from "react";
import "./Auth.css";

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="18" height="18">
    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.4 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.2 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.1 0 9.8-1.7 13.4-4.7l-6.2-5.2C29.2 35.7 26.7 36.5 24 36.5c-5.2 0-9.5-3.5-11.1-8.2l-6.5 5C9.5 39.7 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.2 5.2C41 35.3 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
  </svg>
);

const LoginWithGoogle = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5454/login/google");
      const data = await response.json();
      if (data.token) {
        console.log("Redirect user to dashboard", data);
      } else {
        setError("Authentication failed");
      }
    } catch (error) {
      setError("Error logging in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        gap: "24px",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Brand */}
      <div className="brand-row">
        <div className="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#050a0e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        </div>
        <span className="brand-name">TRADE<span style={{ color: "var(--green)" }}>-</span>PULSE</span>
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "40px 36px",
          width: "360px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Continue with
        </p>

        <button
          className="tp-btn-google"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
        >
          <GoogleIcon />
          {loading ? "Connecting..." : "Sign in with Google"}
        </button>

        {error && (
          <p style={{ color: "var(--red)", fontSize: "12px", textAlign: "center" }}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default LoginWithGoogle;