import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// ── Icons ────────────────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="18" height="18">
    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.4 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.2 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.1 0 9.8-1.7 13.4-4.7l-6.2-5.2C29.2 35.7 26.7 36.5 24 36.5c-5.2 0-9.5-3.5-11.1-8.2l-6.5 5C9.5 39.7 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.2 5.2C41 35.3 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
  </svg>
);

// ── LoginForm ────────────────────────────────────────────────────────────────
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { toast } = useToast();
  const [showPass, setShowPass] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(login(data));
    console.log("login form", data);
  };

/*   Oauth must use browser Redirects 
this is old code and need to be updated ... 
const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setGoogleError(null);
    try {
      // const response = await fetch("http://localhost:5454/login/google");                      // before 
      const response = await fetch("http://localhost:5454/login/oauth2/authorization/google");    // after
      const data = await response.json();
      if (data.token) {
        console.log("Redirect user to dashboard", data);
      } else {
        setGoogleError("Google authentication failed. Please try again.");
      }
    } catch (error) {
      setGoogleError("Could not connect to Google sign-in.");
    } finally {
      setGoogleLoading(false);
    }
  };
*/
  // replaced new function for handleGoogleLogin functionality :-
  const handleGoogleLogin = () => {

    window.location.href =
      "http://localhost:5454/login/oauth2/authorization/google";

  };

  return (
    <div>
      <p className="form-heading">Sign in</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="tp-input-wrap">
                    <span className="tp-input-icon"><MailIcon /></span>
                    <input
                      {...field}
                      className="tp-input"
                      placeholder="Email address"
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                </FormControl>
                <FormMessage className="tp-error" />
              </FormItem>
            )}
          />

          {/* Password */}
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
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="tp-eye-btn"
                      onClick={() => setShowPass((v) => !v)}
                      tabIndex={-1}
                    >
                      {showPass ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="tp-error" />
              </FormItem>
            )}
          />

          {/* Submit */}
          {!auth.loading ? (
            <button type="submit" className="tp-btn-primary">
              SIGN IN
            </button>
          ) : (
            <div className="tp-spinner" />
          )}

        </form>
      </Form>

      {/* OR divider */}
      <div className="or-row">or</div>

      {/* Google button */}
      <button
        className="tp-btn-google"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        style={{
          opacity: googleLoading ? 0.6 : 1,
          cursor: googleLoading ? "not-allowed" : "pointer",
        }}
      >
        <GoogleIcon />
        {googleLoading ? "Connecting..." : "Continue with Google"}
      </button>

      {googleError && (
        <p className="tp-error" style={{ textAlign: "center", marginTop: "8px" }}>
          {googleError}
        </p>
      )}
    </div>
  );
};

export default LoginForm;