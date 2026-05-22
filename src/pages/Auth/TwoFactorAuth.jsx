import { twoStepVerification } from "@/Redux/Auth/Action";
import CustomeToast from "@/components/custome/CustomeToast";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Auth.css";

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const TwoFactorAuth = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { session } = useParams();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleTwoFactoreAuth = () => {
    dispatch(twoStepVerification({ otp: value, session, navigate }));
    console.log(value);
  };

  return (
    <div className="twofa-container">
      <CustomeToast show={auth.error} message={auth.error?.error} />

      <div className="twofa-card">

        {/* Icon */}
        <div style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "var(--green-dim)",
          border: "1px solid var(--border-bright)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <ShieldIcon />
        </div>

        {/* Brand */}
        <div>
          <div className="brand-row" style={{ marginBottom: "4px", justifyContent: "center" }}>
            <span className="brand-name" style={{ fontSize: "20px" }}>
              TRADE<span style={{ color: "var(--green)" }}>-</span>PULSE
            </span>
          </div>
          <p className="twofa-title">Two-Step Verification</p>
        </div>

        <div className="auth-divider" style={{ width: "100%", margin: "0" }} />

        {/* OTP */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%" }}>
          <InputOTP
            value={value}
            onChange={(value) => setValue(value)}
            maxLength={6}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="twofa-hint">Check your email for the 6-digit code</p>
        </div>

        <button
          className="tp-btn-primary"
          style={{ marginTop: "4px", width: "100%" }}
          onClick={handleTwoFactoreAuth}
        >
          VERIFY
        </button>
      </div>
    </div>
  );
};

export default TwoFactorAuth;