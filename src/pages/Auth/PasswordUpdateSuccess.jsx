import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Auth.css";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PasswordUpdateSuccess = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const isUserLoggedIn = !!auth?.user;

  return (
    <div className="success-container">
      <div className="success-card">

        {/* Animated check */}
        <div className="success-icon-wrap">
          <CheckIcon />
        </div>

        {/* Brand */}
        <div className="brand-row" style={{ margin: "0" }}>
          <div className="brand-icon" style={{ width: "28px", height: "28px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#050a0e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <span className="brand-name" style={{ fontSize: "20px" }}>
            TRADE<span style={{ color: "var(--green)" }}>-</span>PULSE
          </span>
        </div>

        <div className="auth-divider" style={{ width: "100%", margin: "4px 0 8px" }} />

        <p className="success-title">Password Changed!</p>
        <p className="success-sub">
          {isUserLoggedIn 
            ? "Your password has been updated successfully." 
            : "Your password has been updated successfully. You can now sign in with your new password."}
        </p>

        <button
          className="tp-btn-primary"
          style={{ width: "200px", marginTop: "8px" }}
          onClick={() => navigate(isUserLoggedIn ? "/profile" : "/")}
        >
          {isUserLoggedIn ? "BACK TO PROFILE" : "GO TO SIGN IN"}
        </button>
      </div>
    </div>
  );
};

export default PasswordUpdateSuccess;