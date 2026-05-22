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
import { sendResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ForgotPasswordForm = () => {
  const [verificationType, setVerificationType] = useState("EMAIL");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: auth?.user?.email || "" },
  });

  useEffect(() => {
    if (auth?.user?.email) {
      form.setValue("email", auth.user.email);
    }
  }, [auth?.user?.email, form]);

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(
      sendResetPassowrdOTP({ sendTo: data.email, navigate, verificationType })
    );
    console.log("login form", data);
  };

  return (
    <div>
      <p className="form-heading">Reset password</p>

      <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "18px", lineHeight: "1.6" }}>
        Enter your email and we'll send a one-time code to reset your password.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      type="email"
                      className="tp-input"
                      placeholder="Email address"
                      autoComplete="email"
                    />
                  </div>
                </FormControl>
                <FormMessage className="tp-error" />
              </FormItem>
            )}
          />

          <button type="submit" className="tp-btn-primary">
            SEND OTP
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;