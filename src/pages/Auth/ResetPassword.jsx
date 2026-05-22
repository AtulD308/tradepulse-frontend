import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { verifyResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate, useParams } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import * as yup from "yup";
import { useState } from "react";
import "./Auth.css";

const formSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords & Confirm Password must match")
    .min(8, "Password must be at least 8 characters long")
    .required("Confirm password is required"),
  otp: yup
    .string()
    .min(6, "OTP must be at least 6 characters long")
    .required("OTP is required"),
});

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { session } = useParams();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: { confirmPassword: "", password: "", otp: "" },
  });

  const onSubmit = (data) => {
    dispatch(
      verifyResetPassowrdOTP({ otp: data.otp, password: data.password, session, navigate })
    );
    console.log("login form", data);
  };

  return (
    <div className="reset-container">
      <div className="reset-card">

        {/* Brand */}
        <div className="brand-row" style={{ marginBottom: "20px" }}>
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#050a0e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <span className="brand-name">TRADE<span style={{ color: "var(--green)" }}>-</span>PULSE</span>
        </div>

        <div className="auth-divider" style={{ marginBottom: "24px" }} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

            {/* OTP */}
            <p className="form-heading">Verify OTP</p>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP {...field} maxLength={6}>
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
                  </FormControl>
                  <FormMessage className="tp-error" />
                </FormItem>
              )}
            />

            {/* New password */}
            <p className="form-heading" style={{ marginTop: "24px" }}>New password</p>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="tp-input-wrap">
                      <span className="tp-input-icon"><LockIcon /></span>
                      <input
                        {...field}
                        type={showPass ? "text" : "password"}
                        className="tp-input"
                        placeholder="New password"
                        autoComplete="new-password"
                      />
                      <button type="button" className="tp-eye-btn" onClick={() => setShowPass((v) => !v)} tabIndex={-1}>
                        {showPass ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="tp-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="tp-input-wrap">
                      <span className="tp-input-icon"><LockIcon /></span>
                      <input
                        {...field}
                        type={showConfirm ? "text" : "password"}
                        className="tp-input"
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                      />
                      <button type="button" className="tp-eye-btn" onClick={() => setShowConfirm((v) => !v)} tabIndex={-1}>
                        {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="tp-error" />
                </FormItem>
              )}
            />

            <button type="submit" className="tp-btn-primary">
              CHANGE PASSWORD
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;