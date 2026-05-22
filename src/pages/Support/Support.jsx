import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Copy, Check, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, Send } from "lucide-react";

const Support = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("support.tradepulse@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitted(true);
  };

  return (
    <div className="px-4 md:px-10 py-6 max-w-7xl mx-auto mt-6 text-body-md animate-fade-in-up">
      {/* Ambient glows inside page */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[#00ffa3]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-[#00e290]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-title tracking-tight text-primary">TradePulse Support Center</h1>
        </div>
        <p className="text-on-surface-variant text-sm mt-1 max-w-xl">
          Access guides, learn about cryptocurrency market risks, and connect directly with our dedicated support team.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        
        {/* LEFT COLUMN: Contact Form & Gmail Direct Card (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Gmail Card */}
          <div className="bg-surface-container-low/40 border border-outline-variant/30 backdrop-blur-md rounded-2xl p-5 hover:scale-[1.01] hover:bg-surface-container-low/60 transition-all duration-300 relative overflow-hidden group">
            <div className="chart-shimmer animate-shimmer"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#00e290] mb-1 font-title">Official Email Support</p>
                <h3 className="text-base font-bold text-primary mb-2">Connect Directly via Gmail</h3>
                <p className="text-xs text-on-surface-variant max-w-xs mb-4 leading-relaxed">
                  Send us an email directly at any time. Our customer relations team typically replies within 2 hours.
                </p>
                <div className="flex items-center gap-2 bg-[#121517] border border-outline-variant/50 px-3.5 py-2.5 rounded-xl text-xs font-data-mono font-medium text-[#00e290] shadow-inner select-all">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>support.tradepulse@gmail.com</span>
                </div>
              </div>
              
              <button
                onClick={handleCopyEmail}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-center shrink-0 ${
                  copied 
                    ? "text-[#00e290] bg-[#00ffa3]/10 border-[#00e290]/50" 
                    : "text-on-surface-variant hover:text-white border-outline-variant/40 hover:bg-surface-container-high"
                }`}
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 animate-scale-up" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-surface-container-low/40 border border-outline-variant/30 backdrop-blur-md rounded-2xl p-6">
            <h3 className="text-lg font-bold text-primary mb-1">Direct Support Inquiry</h3>
            <p className="text-xs text-on-surface-variant mb-6">Ask us! Our specialist team will review your message and contact you shortly.</p>

            {formSubmitted ? (
              <div className="py-8 px-4 text-center animate-fade-in-up">
                <div className="w-14 h-14 rounded-full bg-[#00e290]/10 border border-[#00e290]/40 flex items-center justify-center mx-auto mb-4 text-[#00e290]">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-[#00e290] mb-2 font-title">Inquiry Submitted</h4>
                <p className="text-xs text-on-surface-variant max-w-xs mx-auto leading-relaxed mb-6">
                  Thank you, <span className="font-bold text-primary">{formData.name}</span>. We have received your inquiry. A support specialist will contact you at <span className="font-bold text-primary font-data-mono">{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="text-xs text-[#00e290] font-semibold hover:underline flex items-center gap-1.5 mx-auto"
                >
                  Submit another inquiry <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-[#121517] border ${formErrors.name ? "border-[#ffb4ab]" : "border-outline-variant/40"} focus:border-[#00e290] focus:ring-1 focus:ring-[#00e290] rounded-xl px-4 py-2.5 text-xs text-primary transition-all font-body-md outline-none`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && <p className="text-[10px] text-[#ffb4ab] mt-1 font-medium">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-[#121517] border ${formErrors.email ? "border-[#ffb4ab]" : "border-outline-variant/40"} focus:border-[#00e290] focus:ring-1 focus:ring-[#00e290] rounded-xl px-4 py-2.5 text-xs text-primary transition-all font-body-md outline-none`}
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && <p className="text-[10px] text-[#ffb4ab] mt-1 font-medium">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full bg-[#121517] border ${formErrors.subject ? "border-[#ffb4ab]" : "border-outline-variant/40"} focus:border-[#00e290] focus:ring-1 focus:ring-[#00e290] rounded-xl px-4 py-2.5 text-xs text-primary transition-all font-body-md outline-none`}
                    placeholder="What is your inquiry about?"
                  />
                  {formErrors.subject && <p className="text-[10px] text-[#ffb4ab] mt-1 font-medium">{formErrors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">Message Description</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full bg-[#121517] border ${formErrors.message ? "border-[#ffb4ab]" : "border-outline-variant/40"} focus:border-[#00e290] focus:ring-1 focus:ring-[#00e290] rounded-xl px-4 py-2.5 text-xs text-primary transition-all font-body-md outline-none resize-none`}
                    placeholder="Describe your issue or question in detail..."
                  />
                  {formErrors.message && <p className="text-[10px] text-[#ffb4ab] mt-1 font-medium">{formErrors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00e290] text-[#003920] font-bold py-3 rounded-xl hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-body-md shadow-lg shadow-[#00e290]/10 mt-2"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Guides & Security Hub (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Guidelines Card */}
          <div className="bg-surface-container-low/40 border border-outline-variant/30 backdrop-blur-md rounded-2xl p-6">
            <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00e290] text-xl">menu_book</span>
              Guidelines for Buying Cryptocurrency
            </h3>
            
            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-[#00ffa3]/10 border border-[#00e290]/30 text-[#00e290] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wide">Fund Your Wallet Securly</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                    Go to your **Wallet** tab, add a linked payment account, and secure your deposit details. All platform deposits are processed through fully encrypted payment gateways.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-[#00ffa3]/10 border border-[#00e290]/30 text-[#00e290] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wide">Research & Asset Selection</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                    Browse active crypto listings on the Home terminal. Study historical trends, 24H volume movements, and price charts. Never buy assets blindly without assessing daily market patterns.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-[#00ffa3]/10 border border-[#00e290]/30 text-[#00e290] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wide">Place Buy Order</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                    Select your coin in the terminal list, examine the buy module on the details screen, input the desired USD amount, and confirm the execution. Your trade updates in your portfolio instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Warning Card */}
          <div className="bg-surface-container-low/40 border border-[#ffb4ab]/25 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffb4ab]/5 blur-2xl rounded-full pointer-events-none"></div>
            
            <h3 className="text-lg font-bold text-[#ffb4ab] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#ffb4ab]" />
              Cryptocurrency Market Risks
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-outline-variant/20 bg-[#171515]/30 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-primary mb-1">Extreme Price Volatility</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Cryptocurrency prices fluctuate rapidly 24 hours a day. Massive swings in value can happen within minutes, posing a direct threat to capital if trades are unhedged.
                </p>
              </div>
              
              <div className="border border-outline-variant/20 bg-[#171515]/30 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-primary mb-1">Regulatory Fluctuations</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Digital currencies are subject to changing global regulations. Local legislative crackdowns, bans, or heavy tax adjustments can strongly affect coin liquidity and value.
                </p>
              </div>

              <div className="border border-outline-variant/20 bg-[#171515]/30 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-primary mb-1">Low Liquidity Slippage</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Lower-tier utility tokens can suffer from massive trade spreads. During severe market sell-offs, closing large positions at a desired threshold might prove highly difficult.
                </p>
              </div>

              <div className="border border-outline-variant/20 bg-[#171515]/30 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-primary mb-1">Zero Insured Capital</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Cryptocurrencies are highly speculative assets and are not backed by central bank guarantees. You assume all risk of loss. Only trade with funds you can afford to lose.
                </p>
              </div>
            </div>
          </div>

          {/* Protective Measures Card */}
          <div className="bg-surface-container-low/40 border border-outline-variant/30 backdrop-blur-md rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#00e290]" />
                  Recommended Protective Measures
                </h3>
                <ul className="text-xs text-on-surface-variant flex flex-col gap-2 list-disc pl-4 leading-relaxed">
                  <li>
                    <span className="font-bold text-primary">Enable 2-Step Verification (2FA)</span> immediately to block unauthorized wallet withdrawal or transfer attempts.
                  </li>
                  <li>
                    Always use robust, highly secure account passwords and never share private API keys or verification codes.
                  </li>
                  <li>
                    Double check the recipient address strings and blockchain protocols (e.g. ERC20 vs TRC20) before confirming fund transfers.
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => navigate("/profile")}
                className="bg-surface-container-high border border-outline-variant/40 hover:border-[#00e290]/50 hover:bg-[#1f2224] text-[#00e290] font-bold px-4.5 py-3 rounded-xl text-xs flex items-center gap-1.5 transition-all shrink-0 self-start md:self-center shadow-md active:scale-95"
              >
                <span>Setup 2-Step Verification</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Support;
