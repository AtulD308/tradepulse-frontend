import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Copy, Check, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, Send, BookOpen } from "lucide-react";

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
    <div className="px-4 md:px-10 py-6 max-w-7xl mx-auto mt-6 text-body-md animate-fade-in-up relative">
      {/* Ambient glows inside page - sophisticated white/gray glows matching Landing page */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-white/[0.01] blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.02] blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-white/80" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-title tracking-tight text-white font-display">TradePulse Support Center</h1>
        </div>
        <p className="text-gray-400 text-xs md:text-sm mt-1.5 max-w-xl leading-relaxed">
          Access guides, learn about cryptocurrency market risks, and connect directly with our dedicated support team.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        
        {/* LEFT COLUMN: Contact Form & Gmail Direct Card (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Gmail Card */}
          <div className="bg-[#0b0c0e] border border-white/5 backdrop-blur-md rounded-2xl p-5 hover:border-white/10 transition-all duration-300 relative overflow-hidden group">
            <div className="chart-shimmer animate-shimmer"></div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5 font-mono">Official Email Support</p>
                <h3 className="text-base font-bold text-white mb-2 font-display">Connect Directly via Gmail</h3>
                <p className="text-xs text-gray-400 max-w-xs mb-4 leading-relaxed">
                  Send us an email directly at any time. Our customer relations team typically replies within 2 hours.
                </p>
                <div className="flex items-center gap-2 bg-black/40 border border-white/5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium text-white shadow-inner select-all">
                  <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                  <span>support.tradepulse@gmail.com</span>
                </div>
              </div>
              
              <button
                onClick={handleCopyEmail}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-center shrink-0 ${
                  copied 
                    ? "text-black bg-white border-white" 
                    : "text-gray-400 hover:text-white border-white/10 hover:bg-white/5 hover:border-white/20"
                }`}
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 animate-scale-up" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-[#0b0c0e] border border-white/5 backdrop-blur-md rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-1 font-display">Direct Support Inquiry</h3>
            <p className="text-xs text-gray-400 mb-6">Ask us! Our specialist team will review your message and contact you shortly.</p>

            {formSubmitted ? (
              <div className="py-8 px-4 text-center animate-fade-in-up">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white mb-2 font-display">Inquiry Submitted</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed mb-6">
                  Thank you, <span className="font-bold text-white">{formData.name}</span>. We have received your inquiry. A support specialist will contact you at <span className="font-bold text-white font-mono">{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="text-xs text-white hover:text-gray-300 font-semibold hover:underline flex items-center gap-1.5 mx-auto"
                >
                  Submit another inquiry <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 mb-1.5 uppercase tracking-wider font-mono">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-black/40 border ${formErrors.name ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/5 focus:border-white/30 focus:ring-white/20"} rounded-xl px-4 py-2.5 text-xs text-white transition-all outline-none focus:ring-1`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && <p className="text-[10px] text-rose-400 mt-1 font-medium">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 mb-1.5 uppercase tracking-wider font-mono">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-black/40 border ${formErrors.email ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/5 focus:border-white/30 focus:ring-white/20"} rounded-xl px-4 py-2.5 text-xs text-white transition-all outline-none focus:ring-1`}
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && <p className="text-[10px] text-rose-400 mt-1 font-medium">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 mb-1.5 uppercase tracking-wider font-mono">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full bg-black/40 border ${formErrors.subject ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/5 focus:border-white/30 focus:ring-white/20"} rounded-xl px-4 py-2.5 text-xs text-white transition-all outline-none focus:ring-1`}
                    placeholder="What is your inquiry about?"
                  />
                  {formErrors.subject && <p className="text-[10px] text-rose-400 mt-1 font-medium">{formErrors.subject}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 mb-1.5 uppercase tracking-wider font-mono">Message Description</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full bg-black/40 border ${formErrors.message ? "border-rose-500/50 focus:ring-rose-500/30" : "border-white/5 focus:border-white/30 focus:ring-white/20"} rounded-xl px-4 py-2.5 text-xs text-white transition-all outline-none resize-none focus:ring-1`}
                    placeholder="Describe your issue or question in detail..."
                  />
                  {formErrors.message && <p className="text-[10px] text-rose-400 mt-1 font-medium">{formErrors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black font-extrabold py-3 rounded-xl hover:bg-gray-200 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-sans shadow-lg shadow-white/5 mt-2"
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
          <div className="bg-[#0b0c0e] border border-white/5 backdrop-blur-md rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2 font-display">
              <BookOpen className="w-5 h-5 text-gray-300" />
              Guidelines for Buying Cryptocurrency
            </h3>
            
            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">Fund Your Wallet Securely</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                    Go to your **Wallet** tab, add a linked payment account, and secure your deposit details. All platform deposits are processed through fully encrypted payment gateways.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">Research & Asset Selection</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                    Browse active crypto listings on the Home terminal. Study historical trends, 24H volume movements, and price charts. Never buy assets blindly without assessing daily market patterns.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">Place Buy Order</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                    Select your coin in the terminal list, examine the buy module on the details screen, input the desired USD amount, and confirm the execution. Your trade updates in your portfolio instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Warning Card */}
          <div className="bg-[#0b0c0e] border border-rose-500/10 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/[0.02] blur-2xl rounded-full pointer-events-none"></div>
            
            <h3 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2 font-display">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              Cryptocurrency Market Risks
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/5 bg-black/20 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-white mb-1.5">Extreme Price Volatility</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Cryptocurrency prices fluctuate rapidly 24 hours a day. Massive swings in value can happen within minutes, posing a direct threat to capital if trades are unhedged.
                </p>
              </div>
              
              <div className="border border-white/5 bg-black/20 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-white mb-1.5">Regulatory Fluctuations</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Digital currencies are subject to changing global regulations. Local legislative crackdowns, bans, or heavy tax adjustments can strongly affect coin liquidity and value.
                </p>
              </div>

              <div className="border border-white/5 bg-black/20 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-white mb-1.5">Low Liquidity Slippage</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Lower-tier utility tokens can suffer from massive trade spreads. During severe market sell-offs, closing large positions at a desired threshold might prove highly difficult.
                </p>
              </div>

              <div className="border border-white/5 bg-black/20 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-white mb-1.5">Zero Insured Capital</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Cryptocurrencies are highly speculative assets and are not backed by central bank guarantees. You assume all risk of loss. Only trade with funds you can afford to lose.
                </p>
              </div>
            </div>
          </div>

          {/* Protective Measures Card */}
          <div className="bg-[#0b0c0e] border border-white/5 backdrop-blur-md rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
                  <ShieldCheck className="w-5 h-5 text-gray-300" />
                  Recommended Protective Measures
                </h3>
                <ul className="text-xs text-gray-400 flex flex-col gap-2.5 list-disc pl-4 leading-relaxed">
                  <li>
                    <span className="font-bold text-white">Enable 2-Step Verification (2FA)</span> immediately to block unauthorized wallet withdrawal or transfer attempts.
                  </li>
                  <li>
                    Always use robust, highly secure account passwords and never share private API keys or verification codes.
                  </li>
                  <li>
                    Double check the recipient address strings and blockchain protocols before confirming fund transfers.
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => navigate("/profile")}
                className="bg-white hover:bg-gray-200 text-black font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-1.5 transition-all shrink-0 self-start md:self-center shadow-md active:scale-95 duration-200"
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
