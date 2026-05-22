import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  TrendingUp, 
  BrainCircuit, 
  Wallet, 
  Database, 
  Info, 
  Camera, 
  Key, 
  Smartphone, 
  Monitor, 
  Sun, 
  Moon, 
  Check, 
  Copy, 
  Plus, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  LogOut,
  Download,
  AlertTriangle,
  Mail,
  Lock,
  Globe,
  Settings as GearIcon
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  
  // Active Tab State
  const [activeTab, setActiveTab] = useState("PROFILE");
  const [toastMessage, setToastMessage] = useState(null);
  
  // Custom Toast handler
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State: Accent Color
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem("settings-accent") || "green";
  });
  
  // State: Theme
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("settings-theme") || "dark";
  });

  // Live Theme Application Effect
  useEffect(() => {
    const applyTheme = (theme) => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    };
    applyTheme(themeMode);
  }, [themeMode]);

  // State: Profile Form
  const [profileForm, setProfileForm] = useState({
    fullName: auth.user?.fullName || "Atul Dwivedi",
    username: auth.user?.email ? auth.user.email.split("@")[0] : "atuld",
    email: auth.user?.email || "atuld@google.com",
    phone: "+91 98765 43210",
    bio: "Trading crypto & building premium web apps. HODLer since 2019.",
    country: "India",
    timezone: "IST (UTC+5:30)",
    photo: null
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Sync profileForm if auth.user changes
  useEffect(() => {
    if (auth.user) {
      setProfileForm((prev) => ({
        ...prev,
        fullName: auth.user.fullName || prev.fullName,
        email: auth.user.email || prev.email,
        username: auth.user.email ? auth.user.email.split("@")[0] : prev.username
      }));
    }
  }, [auth.user]);

  // Accent styles helper
  const getAccentColorClass = () => {
    if (accentColor === "cyan") return "from-cyan-500 to-blue-600";
    if (accentColor === "purple") return "from-violet-500 to-purple-600";
    if (accentColor === "orange") return "from-orange-500 to-amber-600";
    return "from-emerald-500 to-teal-600"; // Green default
  };
  
  const getAccentBorderClass = () => {
    if (accentColor === "cyan") return "border-cyan-500/30 hover:border-cyan-500/50";
    if (accentColor === "purple") return "border-purple-500/30 hover:border-purple-500/50";
    if (accentColor === "orange") return "border-orange-500/30 hover:border-orange-500/50";
    return "border-emerald-500/30 hover:border-emerald-500/50";
  };

  const getAccentBgClass = () => {
    if (accentColor === "cyan") return "bg-cyan-500";
    if (accentColor === "purple") return "bg-purple-600";
    if (accentColor === "orange") return "bg-orange-500";
    return "bg-emerald-500";
  };

  const getAccentTextClass = () => {
    if (accentColor === "cyan") return "text-cyan-400";
    if (accentColor === "purple") return "text-purple-400";
    if (accentColor === "orange") return "text-orange-400";
    return "text-emerald-400";
  };

  const getAccentLightBg = () => {
    if (accentColor === "cyan") return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
    if (accentColor === "purple") return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
    if (accentColor === "orange") return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
    return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
  };

  // State: Security
  const [securityForm, setSecurityForm] = useState({
    twoFactor: true,
    hideBalance: false,
    privateProfile: false,
    requireOtpWithdraw: true,
    showPasswordForm: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // State: Notifications
  const [notifToggles, setNotifToggles] = useState({
    priceAlerts: true,
    watchlistAlerts: true,
    portfolioUpdates: false,
    tradeConfirmations: true,
    newsAlerts: true,
    emailAlerts: true,
    pushAlerts: false
  });

  // State: Preferences
  const [prefForm, setPrefForm] = useState({
    currency: "USD",
    showPlPercent: true,
    showTotalBalance: true,
    autoRefresh: true,
    riskLevel: "medium", // low, medium, high
    chartInterval: "1d",
    preferredExchange: "TradePulse Pro"
  });

  // State: AI Assistant
  const [aiSettings, setAiSettings] = useState({
    enablePulseAi: true,
    responseStyle: "analytical", // concise, detailed, analytical, playful
    suggestedPrompts: true,
    sentimentAnalysis: true
  });

  // State: Payments
  const [payments, setPayments] = useState({
    upiId: "atuld@okaxis",
    btcAddress: "bc1qxy2kg3ut75rkfdwsnn3zgpq290ftc7a5xl4vga",
    solAddress: "HN7cAB2183QW4A4K2K2N7cAB2183QW4A4K2K2NHN",
    withdrawalPref: "instant",
    copiedField: null,
    bankAccounts: [
      { id: 1, name: "HDFC Bank Ltd", type: "Savings Account", number: "•••• •••• 8392" },
      { id: 2, name: "Chase Premium", type: "Checking Account", number: "•••• •••• 2049" }
    ],
    savedCards: [
      { id: 1, brand: "VISA", name: "Atul Dwivedi", expiry: "08/29", last4: "8492" }
    ]
  });

  // State: Data simulations
  const [dataSim, setDataSim] = useState({
    downloadProgress: -1, // -1 idle, 0 to 100 progress
    isClearingCache: false
  });

  // Handle Copy to Clipboard
  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setPayments(prev => ({ ...prev, copiedField: field }));
    showToast(`${field} copied successfully!`);
    setTimeout(() => {
      setPayments(prev => ({ ...prev, copiedField: null }));
    }, 2000);
  };

  // Tab definition
  const TABS = [
    { id: "PROFILE", label: "Profile Settings", icon: User },
    { id: "SECURITY", label: "Security & Privacy", icon: Shield },
    { id: "NOTIFICATIONS", label: "Notification settings", icon: Bell },
    { id: "APPEARANCE", label: "Appearance Preferences", icon: Palette },
    { id: "PORTFOLIO", label: "Portfolio Preferences", icon: TrendingUp },
    { id: "AI", label: "AI Assistant", icon: BrainCircuit },
    { id: "PAYMENTS", label: "Payments & Wallets", icon: Wallet },
    { id: "PRIVACY", label: "Data & Data Privacy", icon: Database },
    { id: "ABOUT", label: "About & Info", icon: Info }
  ];

  // Custom switch component
  const CustomSwitch = ({ checked, onChange }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
        checked ? getAccentBgClass() : "bg-neutral-800"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="flex flex-col items-center min-h-[90vh] bg-[#050a0e] text-white pt-6 px-4 md:px-8 pb-16 relative">
      
      {/* Background Glowing Accents */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-radial-gradient(circle, rgba(16,185,129,0.01) 0%, transparent 70%) pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] rounded-full bg-radial-gradient(circle, rgba(16,185,129,0.02) 0%, transparent 70%) pointer-events-none -z-10" />

      {/* Modern Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#0d151c]/90 border border-emerald-500/20 backdrop-blur-md text-white rounded-xl shadow-2xl animate-fade-in-up font-body-md text-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-6xl mt-2">
        {/* Title Header */}
        <div className="flex items-center gap-3.5 mb-6 pl-1 animate-fade-in-up [animation-delay:50ms]">
          <div className="p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center shadow-lg">
            <GearIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
              Settings & Preferences
            </h1>
            <p className="text-gray-500 text-xs mt-0.5 leading-relaxed font-body-md">
              Configure your dashboard profile, security protocols, payments, AI parameters, and interface.
            </p>
          </div>
        </div>

        {/* SPLIT SCREEN CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* LEFT SIDEBAR: Tab Navigators */}
          <div className="lg:col-span-1 space-y-2.5 bg-[#0a0f12]/50 border border-[#1c242b] p-3 rounded-2xl backdrop-blur-md shadow-xl animate-fade-in-up [animation-delay:100ms]">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest pl-3 mb-2 font-sans">
              Settings Sections
            </p>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 custom-scrollbar pb-2 lg:pb-0">
              {TABS.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 border whitespace-nowrap cursor-pointer ${
                      isActive
                        ? `bg-[#162028] text-white border-[#2c3b49] shadow-inner font-bold`
                        : "bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-[#12191f]/50"
                    }`}
                  >
                    <TabIcon className={`w-4 h-4 ${isActive ? getAccentTextClass() : "text-gray-500 group-hover:text-white"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT CONFIG PANEL: active content details */}
          <div className="lg:col-span-3 animate-fade-in-up [animation-delay:150ms]">
            <Card className="bg-[#0b1217]/60 backdrop-blur-md border border-[#272a2e]/60 rounded-2xl shadow-2xl overflow-hidden min-h-[620px] flex flex-col">
              
              {/* TAB 1: PROFILE SETTINGS */}
              {activeTab === "PROFILE" && (
                <div className="p-6 space-y-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Profile Settings</h3>
                    <p className="text-gray-500 text-xs mt-1">Manage your basic details, avatar image, bio, and localization tags.</p>
                  </div>

                  {/* Upper Row: Photo and Bio info */}
                  <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-[#080d11]/80 border border-[#192128]">
                    <div className="relative group">
                      <Avatar className="h-20 w-20 border-2 border-outline-variant hover:scale-105 transition-transform duration-300">
                        <AvatarImage src={profileForm.photo || ""} />
                        <AvatarFallback className="bg-surface-container-high text-2xl font-bold text-primary font-sans">
                          {profileForm.fullName[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <button 
                        onClick={() => showToast("Avatar upload trigger simulated")}
                        className={`absolute bottom-0 right-0 p-1.5 rounded-full ${getAccentBgClass()} text-white border border-[#111] hover:scale-110 transition-transform`}
                        title="Upload Photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <p className="text-sm font-semibold text-white font-sans">{profileForm.fullName}</p>
                      <p className="text-xs text-gray-500">@{profileForm.username} &bull; {profileForm.email}</p>
                      <textarea
                        disabled={!isEditingProfile}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full bg-[#0a0f12]/80 border border-outline-variant/30 rounded-lg p-2 text-xs text-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none h-14"
                        placeholder="Write a brief bio about yourself..."
                      />
                    </div>
                  </div>

                  {/* Form fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-gray-500 pl-1 font-sans">Full Name</label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full bg-[#080c0f] border border-[#1e262c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 disabled:opacity-60 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-gray-500 pl-1 font-sans">Username</label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        value={profileForm.username}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full bg-[#080c0f] border border-[#1e262c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 disabled:opacity-60 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-gray-500 pl-1 font-sans">Email Address</label>
                      <input
                        type="email"
                        disabled={true} // Email locked for security
                        value={profileForm.email}
                        className="w-full bg-[#080c0f] border border-[#1e262c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none disabled:opacity-40 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-gray-500 pl-1 font-sans">Phone Number</label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-[#080c0f] border border-[#1e262c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 disabled:opacity-60 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-gray-500 pl-1 font-sans">Country</label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        value={profileForm.country}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full bg-[#080c0f] border border-[#1e262c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 disabled:opacity-60 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-gray-500 pl-1 font-sans">Timezone</label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        value={profileForm.timezone}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, timezone: e.target.value }))}
                        className="w-full bg-[#080c0f] border border-[#1e262c] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 disabled:opacity-60 transition-all"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 justify-end pt-4 border-t border-[#1e262c]">
                    {!isEditingProfile ? (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className={`px-5 py-2.5 rounded-xl border border-gray-700/60 hover:bg-[#12191f]/50 text-white font-semibold text-xs transition-all tracking-wider cursor-pointer`}
                      >
                        EDIT PROFILE
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setIsEditingProfile(false)}
                          className="px-5 py-2.5 rounded-xl border border-transparent hover:bg-white/5 text-gray-400 hover:text-white font-semibold text-xs transition-all tracking-wider cursor-pointer"
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingProfile(false);
                            showToast("Profile details saved successfully!");
                          }}
                          className={`px-5 py-2.5 rounded-xl bg-[#e1e2e7] hover:bg-white text-[#050a0e] font-bold text-xs transition-all tracking-wider cursor-pointer`}
                        >
                          SAVE CHANGES
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: SECURITY SETTINGS */}
              {activeTab === "SECURITY" && (
                <div className="p-6 space-y-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Security & Privacy</h3>
                    <p className="text-gray-500 text-xs mt-1">Crucial configurations for multi-factor authentication, device logging, and portfolio visibility.</p>
                  </div>

                  {/* Warning Info Card */}
                  <div className="p-4 rounded-2xl bg-[#ffb4ab]/5 border border-[#ffb4ab]/15 flex items-start gap-3 text-xs leading-relaxed text-[#ffb4ab]/90">
                    <AlertTriangle className="w-5 h-5 shrink-0 text-[#ffb4ab]" />
                    <div className="space-y-1">
                      <strong>High Security Environment:</strong> Since you are trading digital crypto assets, always ensure Two-Factor Verification (2FA) is active and session limits are short.
                    </div>
                  </div>

                  {/* Toggle items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                      <div>
                        <p className="text-xs font-semibold text-white">Two-Factor Authentication (2FA)</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Require OTP for all logins and trades.</p>
                      </div>
                      <CustomSwitch
                        checked={securityForm.twoFactor}
                        onChange={() => setSecurityForm(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                      <div>
                        <p className="text-xs font-semibold text-white">Hide Portfolio Balance</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Hide balance figures on the dashboard page.</p>
                      </div>
                      <CustomSwitch
                        checked={securityForm.hideBalance}
                        onChange={() => setSecurityForm(prev => ({ ...prev, hideBalance: !prev.hideBalance }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                      <div>
                        <p className="text-xs font-semibold text-white">Private Profile Toggle</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Prevent other users from seeing asset lists.</p>
                      </div>
                      <CustomSwitch
                        checked={securityForm.privateProfile}
                        onChange={() => setSecurityForm(prev => ({ ...prev, privateProfile: !prev.privateProfile }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                      <div>
                        <p className="text-xs font-semibold text-white">OTP for Withdrawals</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Extra verification step on withdrawal requests.</p>
                      </div>
                      <CustomSwitch
                        checked={securityForm.requireOtpWithdraw}
                        onChange={() => setSecurityForm(prev => ({ ...prev, requireOtpWithdraw: !prev.requireOtpWithdraw }))}
                      />
                    </div>
                  </div>

                  {/* Password section */}
                  <div className="p-4 rounded-2xl bg-[#080d11]/50 border border-[#1c242b]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs font-semibold text-white">Change Account Password</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">It is recommended to change password every 90 days.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSecurityForm(prev => ({ ...prev, showPasswordForm: !prev.showPasswordForm }))}
                        className={`px-3 py-1.5 rounded-lg border border-gray-700/60 hover:bg-[#12191f]/50 text-xs font-semibold text-white tracking-wide transition-all cursor-pointer`}
                      >
                        {securityForm.showPasswordForm ? "HIDE" : "MANAGE"}
                      </button>
                    </div>

                    {securityForm.showPasswordForm && (
                      <div className="mt-4 pt-4 border-t border-[#1c242b] grid grid-cols-1 gap-3 animate-fade-in-up">
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-500 uppercase font-semibold pl-0.5">Current Password</label>
                          <input
                            type="password"
                            value={securityForm.currentPassword}
                            onChange={(e) => setSecurityForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full bg-[#05080a] border border-[#1e262c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-semibold pl-0.5">New Password</label>
                            <input
                              type="password"
                              value={securityForm.newPassword}
                              onChange={(e) => setSecurityForm(prev => ({ ...prev, newPassword: e.target.value }))}
                              className="w-full bg-[#05080a] border border-[#1e262c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-semibold pl-0.5">Confirm New Password</label>
                            <input
                              type="password"
                              value={securityForm.confirmPassword}
                              onChange={(e) => setSecurityForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="w-full bg-[#05080a] border border-[#1e262c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => {
                              setSecurityForm(prev => ({
                                ...prev,
                                showPasswordForm: false,
                                currentPassword: "",
                                newPassword: "",
                                confirmPassword: ""
                              }));
                              showToast("Account password updated successfully!");
                            }}
                            className="px-4 py-2 bg-[#e1e2e7] hover:bg-white text-black font-semibold text-xs rounded-xl tracking-wide cursor-pointer"
                          >
                            CONFIRM PASSWORD CHANGE
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Active Devices / Session List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">Active Device Sessions</p>
                      <button
                        onClick={() => showToast("Logged out of all secondary sessions.")}
                        className="text-[11px] font-semibold text-red-400 hover:text-red-300 hover:underline bg-transparent border-0 cursor-pointer flex items-center gap-1"
                      >
                        <LogOut className="w-3 h-3" /> Logout all devices
                      </button>
                    </div>

                    <div className="border border-[#1e262c] rounded-xl bg-[#080c0f] divide-y divide-[#1e262c] overflow-hidden">
                      <div className="p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Monitor className={`w-5 h-5 ${getAccentTextClass()}`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-semibold text-white">Apple Mac mini Studio (Apple M2 Pro)</p>
                              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] px-1.5 py-0.2 rounded font-sans uppercase">Active Now</Badge>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-0.5">India &bull; Chrome &bull; IP: 103.49.201.88</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-500">Last Active: Today, 2:38 PM</span>
                      </div>

                      <div className="p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-xs font-semibold text-white">Apple iPhone 15 Pro Max</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">India &bull; TradePulse iOS v3.4.1 &bull; IP: 103.49.201.88</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-500">Last Active: Yesterday, 9:15 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: NOTIFICATIONS SETTINGS */}
              {activeTab === "NOTIFICATIONS" && (
                <div className="p-6 space-y-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Notification Settings</h3>
                    <p className="text-gray-500 text-xs mt-1">Configure your real-time alerts, pricing signals, trade feedback, and media delivery.</p>
                  </div>

                  <div className="border border-[#1e262c] rounded-2xl bg-[#080d11]/80 border border-[#192128] divide-y divide-[#1e262c] overflow-hidden">
                    
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex gap-3.5 items-start pr-6">
                        <Bell className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-white">Price Alerts</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Get notified immediately when monitored assets experience a +/-5% spike or drop.</p>
                        </div>
                      </div>
                      <CustomSwitch
                        checked={notifToggles.priceAlerts}
                        onChange={() => setNotifToggles(prev => ({ ...prev, priceAlerts: !prev.priceAlerts }))}
                      />
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <div className="flex gap-3.5 items-start pr-6">
                        <TrendingUp className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-white">Watchlist Alerts</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Recieve daily/weekly summaries on trending movements inside your personal watchlist.</p>
                        </div>
                      </div>
                      <CustomSwitch
                        checked={notifToggles.watchlistAlerts}
                        onChange={() => setNotifToggles(prev => ({ ...prev, watchlistAlerts: !prev.watchlistAlerts }))}
                      />
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <div className="flex gap-3.5 items-start pr-6">
                        <Info className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-white">Portfolio Balance Updates</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Weekly breakdown summaries of absolute capital growth, losses, and asset holdings ratios.</p>
                        </div>
                      </div>
                      <CustomSwitch
                        checked={notifToggles.portfolioUpdates}
                        onChange={() => setNotifToggles(prev => ({ ...prev, portfolioUpdates: !prev.portfolioUpdates }))}
                      />
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <div className="flex gap-3.5 items-start pr-6">
                        <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-white">Trade Confirmations</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Instant notification receipts for buy orders, limit triggers, and withdrawal processing approvals.</p>
                        </div>
                      </div>
                      <CustomSwitch
                        checked={notifToggles.tradeConfirmations}
                        onChange={() => setNotifToggles(prev => ({ ...prev, tradeConfirmations: !prev.tradeConfirmations }))}
                      />
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <div className="flex gap-3.5 items-start pr-6">
                        <Globe className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-white">Crypto News Alerts</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Curated summaries of breaking blocktech events, federal policy regulations, and market trends.</p>
                        </div>
                      </div>
                      <CustomSwitch
                        checked={notifToggles.newsAlerts}
                        onChange={() => setNotifToggles(prev => ({ ...prev, newsAlerts: !prev.newsAlerts }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">Delivery Channels</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs font-semibold text-white">Email Digest Alerts</p>
                            <p className="text-[10px] text-gray-500">Send notifications to your verified email.</p>
                          </div>
                        </div>
                        <CustomSwitch
                          checked={notifToggles.emailAlerts}
                          onChange={() => setNotifToggles(prev => ({ ...prev, emailAlerts: !prev.emailAlerts }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs font-semibold text-white">Browser Push Notifications</p>
                            <p className="text-[10px] text-gray-500">Enable in-browser instant system banners.</p>
                          </div>
                        </div>
                        <CustomSwitch
                          checked={notifToggles.pushAlerts}
                          onChange={() => setNotifToggles(prev => ({ ...prev, pushAlerts: !prev.pushAlerts }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: APPEARANCE SETTINGS */}
              {activeTab === "APPEARANCE" && (
                <div className="p-6 space-y-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Appearance Settings</h3>
                    <p className="text-gray-500 text-xs mt-1">Customize the visual theme, layout accents, default charting graphs, and pricing models.</p>
                  </div>

                  {/* Core Theme Selectors */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">Application Theme Mode</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "dark", label: "Dark Mode", desc: "Sleek low-light surface", icon: Moon },
                        { id: "light", label: "Light Mode", desc: "High contrast canvas style", icon: Sun },
                        { id: "system", label: "System Sync", desc: "Match hardware settings", icon: Monitor }
                      ].map((item) => {
                        const isSel = themeMode === item.id;
                        const ThemeIcon = item.icon;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              setThemeMode(item.id);
                              localStorage.setItem("settings-theme", item.id);
                              showToast(`Theme set to ${item.label}`);
                            }}
                            className={`p-4 rounded-2xl border text-center cursor-pointer transition-all duration-300 ${
                              isSel 
                                ? `bg-[#0e161c] border-[#2c3b49] shadow-md` 
                                : "bg-[#080c0f]/80 border-[#1e262c] hover:border-gray-700"
                            }`}
                          >
                            <ThemeIcon className={`w-6 h-6 mx-auto mb-2 ${isSel ? getAccentTextClass() : "text-gray-500"}`} />
                            <p className="text-xs font-semibold text-white">{item.label}</p>
                            <p className="text-[9px] text-gray-500 mt-1 leading-normal">{item.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Accent Colors Picker */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">Layout Accent Accentuation</p>
                    <div className="flex gap-4 p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] items-center">
                      {[
                        { id: "green", color: "bg-emerald-500", name: "Premium Sage Green" },
                        { id: "cyan", color: "bg-cyan-500", name: "Electric Cyan" },
                        { id: "purple", color: "bg-purple-600", name: "Royal Purple" },
                        { id: "orange", color: "bg-orange-500", name: "Stellar Orange" }
                      ].map((item) => {
                        const isSel = accentColor === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setAccentColor(item.id);
                              localStorage.setItem("settings-accent", item.id);
                              showToast(`Accent color updated to ${item.name}!`);
                            }}
                            className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center relative transition-transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-transparent`}
                            title={item.name}
                          >
                            {isSel && (
                              <Check className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                            )}
                          </button>
                        );
                      })}
                      <p className="text-xs text-gray-400 pl-2">Accent dynamically formats buttons, badges, and toggle switches.</p>
                    </div>
                  </div>

                  {/* Chart Preferences and Currencies */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] space-y-3">
                      <p className="text-xs font-semibold text-white">Default Chart Preferences</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "candlestick", name: "Candle" },
                          { id: "line", name: "Line Graph" },
                          { id: "area", name: "Area Glow" }
                        ].map((chart) => {
                          const isSel = prefForm.chartType === chart.id || (!prefForm.chartType && chart.id === "candlestick");
                          return (
                            <button
                              key={chart.id}
                              onClick={() => {
                                setPrefForm(prev => ({ ...prev, chartType: chart.id }));
                                showToast(`Default chart set to ${chart.name}`);
                              }}
                              className={`py-2 rounded-lg text-xs font-semibold tracking-wide border cursor-pointer transition-all duration-300 ${
                                isSel
                                  ? "bg-[#162028] border-[#2c3b49] text-white"
                                  : "bg-transparent border-transparent text-gray-400 hover:text-white"
                              }`}
                            >
                              {chart.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] space-y-3">
                      <p className="text-xs font-semibold text-white">Pricing Currency Format</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "USD", symbol: "$" },
                          { id: "INR", symbol: "₹" },
                          { id: "EUR", symbol: "€" }
                        ].map((cur) => {
                          const isSel = prefForm.currency === cur.id;
                          return (
                            <button
                              key={cur.id}
                              onClick={() => {
                                setPrefForm(prev => ({ ...prev, currency: cur.id }));
                                showToast(`Preferred currency switched to ${cur.id} (${cur.symbol})`);
                              }}
                              className={`py-2 rounded-lg text-xs font-semibold tracking-wide border cursor-pointer transition-all duration-300 ${
                                isSel
                                  ? "bg-[#162028] border-[#2c3b49] text-white"
                                  : "bg-transparent border-transparent text-gray-400 hover:text-white"
                              }`}
                            >
                              {cur.symbol} {cur.id}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PORTFOLIO PREFERENCES */}
              {activeTab === "PORTFOLIO" && (
                <div className="p-6 space-y-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Portfolio Preferences</h3>
                    <p className="text-gray-500 text-xs mt-1">Specify localized base pricing models, risk thresholds, and dashboard auto-feed updates.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                      <div>
                        <p className="text-xs font-semibold text-white">Show Profit / Loss Percentage</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Display 24h P&L % ratios alongside raw asset figures.</p>
                      </div>
                      <CustomSwitch
                        checked={prefForm.showPlPercent}
                        onChange={() => setPrefForm(prev => ({ ...prev, showPlPercent: !prev.showPlPercent }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                      <div>
                        <p className="text-xs font-semibold text-white">Show Total Portfolio Balance</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Enable cumulative portfolio value headers.</p>
                      </div>
                      <CustomSwitch
                        checked={prefForm.showTotalBalance}
                        onChange={() => setPrefForm(prev => ({ ...prev, showTotalBalance: !prev.showTotalBalance }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                      <div>
                        <p className="text-xs font-semibold text-white">Auto-Refresh Market Prices</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Feed real-time crypto prices every 15s in background.</p>
                      </div>
                      <CustomSwitch
                        checked={prefForm.autoRefresh}
                        onChange={() => setPrefForm(prev => ({ ...prev, autoRefresh: !prev.autoRefresh }))}
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-white">Default Chart Interval</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Standard timeframe period loaded by charts.</p>
                      </div>
                      <select 
                        value={prefForm.chartInterval}
                        onChange={(e) => {
                          setPrefForm(prev => ({ ...prev, chartInterval: e.target.value }));
                          showToast(`Default chart interval updated to ${e.target.value}`);
                        }}
                        className="bg-[#05080a] border border-[#1e262c] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                      >
                        <option value="1m">1 minute</option>
                        <option value="5m">5 minutes</option>
                        <option value="15m">15 minutes</option>
                        <option value="1h">1 hour</option>
                        <option value="1d">1 day (Default)</option>
                      </select>
                    </div>
                  </div>

                  {/* Risk Profile segment */}
                  <div className="p-4 rounded-2xl bg-[#080d11]/50 border border-[#1c242b] space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-white">Risk Level Profiling</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Determine the system's recommended trading volatility guardrails.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "low", label: "Low Risk", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                        { id: "medium", label: "Medium Balanced", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                        { id: "high", label: "High Aggressive", color: "text-red-400 bg-red-500/10 border-red-500/20" }
                      ].map((risk) => {
                        const isSel = prefForm.riskLevel === risk.id;
                        return (
                          <button
                            key={risk.id}
                            onClick={() => {
                              setPrefForm(prev => ({ ...prev, riskLevel: risk.id }));
                              showToast(`Risk profile set to ${risk.label}`);
                            }}
                            className={`py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                              isSel 
                                ? risk.color 
                                : "bg-transparent border-transparent text-gray-400 hover:text-white"
                            }`}
                          >
                            {risk.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Exchanges selection */}
                  <div className="p-4 rounded-2xl bg-[#080d11]/50 border border-[#1c242b] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">Preferred Exchange Liquidity Source</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Select standard ledger network used to execute orders.</p>
                    </div>
                    <div className="flex gap-2">
                      {["TradePulse Pro", "Binance Pool", "Coinbase Ledger"].map((ex) => {
                        const isSel = prefForm.preferredExchange === ex;
                        return (
                          <button
                            key={ex}
                            onClick={() => {
                              setPrefForm(prev => ({ ...prev, preferredExchange: ex }));
                              showToast(`Exchange source changed to ${ex}`);
                            }}
                            className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold tracking-wider uppercase cursor-pointer transition-all ${
                              isSel
                                ? "bg-[#162028] border-[#2c3b49] text-white"
                                : "bg-transparent border-transparent text-gray-500 hover:text-white"
                            }`}
                          >
                            {ex.split(" ")[0]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: AI ASSISTANT SETTINGS */}
              {activeTab === "AI" && (
                <div className="p-6 space-y-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Pulse AI Assistant Settings</h3>
                    <p className="text-gray-500 text-xs mt-1">Fine-tune your cognitive trading assistant, response layouts, and prompt catalogs.</p>
                  </div>

                  {/* AI switches */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                      <div>
                        <p className="text-xs font-semibold text-white">Enable Pulse AI Copilot</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Activate the floating assistant chatbot.</p>
                      </div>
                      <CustomSwitch
                        checked={aiSettings.enablePulseAi}
                        onChange={() => setAiSettings(prev => ({ ...prev, enablePulseAi: !prev.enablePulseAi }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                      <div>
                        <p className="text-xs font-semibold text-white">Automate Sentiment Analysis</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Automatically analyze market news for positive/negative signs.</p>
                      </div>
                      <CustomSwitch
                        checked={aiSettings.sentimentAnalysis}
                        onChange={() => setAiSettings(prev => ({ ...prev, sentimentAnalysis: !prev.sentimentAnalysis }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#080c0f] border border-[#1e262c]">
                      <div>
                        <p className="text-xs font-semibold text-white">Show Suggested Prompts</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Display quick command chips in chat window.</p>
                      </div>
                      <CustomSwitch
                        checked={aiSettings.suggestedPrompts}
                        onChange={() => setAiSettings(prev => ({ ...prev, suggestedPrompts: !prev.suggestedPrompts }))}
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-white">AI Response Style</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Specify standard styling of generated charts/text.</p>
                      </div>
                      <select 
                        value={aiSettings.responseStyle}
                        onChange={(e) => {
                          setAiSettings(prev => ({ ...prev, responseStyle: e.target.value }));
                          showToast(`AI response tone set to ${e.target.value}`);
                        }}
                        className="bg-[#05080a] border border-[#1e262c] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                      >
                        <option value="concise">Concise Summary</option>
                        <option value="detailed">In-depth Breakdown</option>
                        <option value="analytical">Data & Metrics (Default)</option>
                        <option value="playful">Conversational</option>
                      </select>
                    </div>
                  </div>

                  {/* Chat logs & prompt actions */}
                  <div className="p-4 rounded-2xl bg-[#080d11]/50 border border-[#1c242b] space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-white">Suggested Assistant Direct Prompt Commands</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Predefined shortcuts used to trigger deep analysis immediately:</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Analyze Solana 24h sentiment",
                        "Optimize my portfolio holdings ratio",
                        "Evaluate tax liability on completed transactions",
                        "What is the resistance level of BTC?"
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => showToast(`Trigger prompt: "${prompt}"`)}
                          className="px-3 py-1.5 rounded-lg bg-[#121920] border border-[#1e262c] hover:border-gray-600 text-[10px] text-gray-400 hover:text-white transition-all cursor-pointer"
                        >
                          &ldquo;{prompt}&rdquo;
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#1c242b] flex justify-between items-center">
                      <div>
                        <p className="text-xs font-semibold text-white">Clear Pulse AI Chat History</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Erase all past messages, prompt tokens, and context histories from local cache.</p>
                      </div>
                      <button
                        onClick={() => showToast("Pulse AI chat history has been permanently erased.")}
                        className="px-3.5 py-2 rounded-xl border border-red-500/20 hover:bg-red-500/10 text-xs font-semibold text-red-400 transition-all cursor-pointer"
                      >
                        CLEAR HISTORY
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: PAYMENT & WALLET SETTINGS */}
              {activeTab === "PAYMENTS" && (
                <div className="p-6 space-y-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Payment Methods & Cryptographic Wallets</h3>
                    <p className="text-gray-500 text-xs mt-1">Verify connected credit cards, linked bank routing accounts, UPI IDs, and public payout ledger keys.</p>
                  </div>

                  {/* Linked Bank Accounts */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">Connected Bank Accounts</p>
                      <button 
                        onClick={() => showToast("Add bank account form trigger simulated")}
                        className="text-[10px] font-bold tracking-wider text-white bg-[#162028] hover:bg-[#1f2c38] border border-[#2c3b49] px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> CONNECT NEW BANK
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {payments.bankAccounts.map((bank) => (
                        <div key={bank.id} className="p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-[#121c24] flex items-center justify-center border border-outline-variant/30 text-xs font-bold">
                              {bank.name.split(" ")[0][0]}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">{bank.name}</p>
                              <p className="text-[10px] text-gray-500 mt-0.5">{bank.type} &bull; {bank.number}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setPayments(prev => ({ ...prev, bankAccounts: prev.bankAccounts.filter(b => b.id !== bank.id) }));
                              showToast(`Successfully disconnected ${bank.name}.`);
                            }}
                            className="text-gray-500 hover:text-red-400 transition-colors p-1.5 rounded-md hover:bg-neutral-800 border-0 bg-transparent cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UPI and Card Mocks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] space-y-3.5">
                      <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">UPI / Unified Payment ID</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={payments.upiId}
                          onChange={(e) => setPayments(prev => ({ ...prev, upiId: e.target.value }))}
                          className="flex-1 bg-[#05080a] border border-[#1e262c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                        />
                        <button
                          onClick={() => showToast("UPI ID saved successfully!")}
                          className="px-3.5 py-2 bg-[#162028] border border-[#2c3b49] text-xs font-bold rounded-xl hover:bg-[#1f2c38] transition-all cursor-pointer"
                        >
                          SAVE
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] space-y-3">
                      <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">Saved Cards Preferences</p>
                      {payments.savedCards.map((card) => (
                        <div key={card.id} className="p-2.5 rounded-lg bg-[#121c24] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold bg-[#1f2c38] px-2 py-0.5 rounded text-white">{card.brand}</span>
                            <p className="text-[11px] font-medium text-white">{card.name} (•••• {card.last4})</p>
                          </div>
                          <span className="text-[10px] text-gray-500">Exp: {card.expiry}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Public Ledger addresses */}
                  <div className="p-4 rounded-2xl bg-[#080d11]/50 border border-[#1c242b] space-y-3.5">
                    <div>
                      <p className="text-xs font-semibold text-white">Your Public Crypto Receiving Addresses</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Use these public addresses to receive payouts from other exchange wallets.</p>
                    </div>

                    <div className="space-y-2.5">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-gray-500 pl-0.5">Bitcoin (BTC) Wallet address</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            readOnly
                            value={payments.btcAddress}
                            className="flex-1 bg-[#05080a] border border-[#1e262c] rounded-xl px-3 py-2 text-xs text-gray-400 focus:outline-none select-all font-data-mono"
                          />
                          <button
                            onClick={() => handleCopy(payments.btcAddress, "BTC Address")}
                            className="p-2 rounded-xl bg-[#162028] hover:bg-[#1f2c38] border border-[#2c3b49] text-white flex items-center justify-center cursor-pointer"
                          >
                            {payments.copiedField === "BTC Address" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-gray-500 pl-0.5">Solana (SOL) Wallet address</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            readOnly
                            value={payments.solAddress}
                            className="flex-1 bg-[#05080a] border border-[#1e262c] rounded-xl px-3 py-2 text-xs text-gray-400 focus:outline-none select-all font-data-mono"
                          />
                          <button
                            onClick={() => handleCopy(payments.solAddress, "SOL Address")}
                            className="p-2 rounded-xl bg-[#162028] hover:bg-[#1f2c38] border border-[#2c3b49] text-white flex items-center justify-center cursor-pointer"
                          >
                            {payments.copiedField === "SOL Address" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: DATA & PRIVACY */}
              {activeTab === "PRIVACY" && (
                <div className="p-6 space-y-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Data & Data Privacy</h3>
                    <p className="text-gray-500 text-xs mt-1">Download personal ledger transactions logs, export trade activities, clear cache registries, or close accounts.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Download user data */}
                    <div className="p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-white">Download Personal User Data Profile</p>
                        <p className="text-[10px] text-gray-500 mt-1 leading-normal">Get a structured ZIP archive containing all security logs, bio metrics, session records, and account metadata files.</p>
                      </div>
                      
                      {dataSim.downloadProgress === -1 ? (
                        <button
                          onClick={() => {
                            setDataSim(prev => ({ ...prev, downloadProgress: 0 }));
                            const interval = setInterval(() => {
                              setDataSim(prev => {
                                if (prev.downloadProgress >= 100) {
                                  clearInterval(interval);
                                  showToast("Personal Data Archive downloaded successfully!");
                                  return { ...prev, downloadProgress: -1 };
                                }
                                return { ...prev, downloadProgress: prev.downloadProgress + 20 };
                              });
                            }, 500);
                          }}
                          className={`w-full py-2.5 rounded-xl border border-gray-700/60 hover:bg-[#12191f]/50 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer`}
                        >
                          <Download className="w-4 h-4" /> REQUEST DATA ARCHIVE
                        </button>
                      ) : (
                        <div className="space-y-1.5 pt-2">
                          <div className="flex justify-between text-[10px] text-gray-500">
                            <span>Generating Archive...</span>
                            <span>{dataSim.downloadProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#05080a] border border-[#1e262c] rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${dataSim.downloadProgress}%` }}></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Export transaction history */}
                    <div className="p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-white">Export Complete Transaction History</p>
                        <p className="text-[10px] text-gray-500 mt-1 leading-normal">Compile and export a structured tax-compliant ledger record (CSV/PDF format) detailing all buy, sell, deposit, and withdrawal actions.</p>
                      </div>
                      <button
                        onClick={() => showToast("Tax Transaction Ledger exported (CSV/PDF)!")}
                        className={`w-full py-2.5 rounded-xl border border-gray-700/60 hover:bg-[#12191f]/50 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer`}
                      >
                        <ExternalLink className="w-4 h-4" /> EXPORT EXCEL/PDF LEDGER
                      </button>
                    </div>

                    {/* Clear cache */}
                    <div className="p-4 rounded-xl bg-[#080c0f] border border-[#1e262c] flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-white">Clear Client Cache Registry</p>
                        <p className="text-[10px] text-gray-500 mt-1 leading-normal">Clear locally stored token configurations, coin index records, and UI layout states to resolve sync loading errors.</p>
                      </div>
                      <button
                        onClick={() => {
                          setDataSim(prev => ({ ...prev, isClearingCache: true }));
                          setTimeout(() => {
                            setDataSim(prev => ({ ...prev, isClearingCache: false }));
                            showToast("Cache registry cleared! App refreshed.");
                          }, 1500);
                        }}
                        className={`w-full py-2.5 rounded-xl border border-gray-700/60 hover:bg-[#12191f]/50 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50`}
                        disabled={dataSim.isClearingCache}
                      >
                        {dataSim.isClearingCache ? "CLEARING LOCAL CACHE..." : "CLEAR CACHE REGISTER"}
                      </button>
                    </div>

                    {/* Dangerous: Delete account */}
                    <div className="p-4 rounded-xl bg-[#ffb4ab]/5 border border-[#ffb4ab]/15 flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-red-400">Permanently Delete Account</p>
                        <p className="text-[10px] text-[#ffb4ab]/70 mt-1 leading-normal">Permanently purge your email, trading ledgers, profile details, and wallet key records from the database. **Action is absolute and cannot be reversed.**</p>
                      </div>
                      <button
                        onClick={() => {
                          const confirmDelete = window.confirm("WARNING: Are you absolutely sure you want to delete your TradePulse account permanently? This will wipe all portfolio balances.");
                          if (confirmDelete) {
                            showToast("Purge simulation trigger initiated.");
                          }
                        }}
                        className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold text-xs tracking-wider transition-all cursor-pointer"
                      >
                        CLOSE & DELETE ACCOUNT
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: ABOUT SECTION */}
              {activeTab === "ABOUT" && (
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-wide">About & Info</h3>
                      <p className="text-gray-500 text-xs mt-1">Application version control, licensing terms, corporate documentation, and support contacts.</p>
                    </div>

                    {/* Branding layout info */}
                    <div className="p-6 rounded-2xl bg-[#080d11]/80 border border-[#192128] flex flex-col items-center justify-center text-center space-y-3">
                      <div className="text-2xl font-extrabold tracking-wide text-white">
                        <span>TRADE</span>
                        <span className={getAccentTextClass()}>-</span>
                        <span>PULSE</span>
                      </div>
                      <p className="text-[11px] text-gray-500">Institutional Digital Cryptographic Ledger Terminal</p>
                      <Badge className="bg-[#121c24] hover:bg-[#1a2935] text-white font-semibold text-[10px] px-2.5 py-0.5 border border-[#2c3b49] font-data-mono">
                        VERSION 2.4.1-STABLE
                      </Badge>
                    </div>

                    {/* Navigation document links */}
                    <div className="border border-[#1e262c] rounded-xl bg-[#080c0f] divide-y divide-[#1e262c] overflow-hidden">
                      <a 
                        href="#terms" 
                        onClick={(e) => { e.preventDefault(); showToast("Terms & Conditions document loading simulated..."); }}
                        className="p-3.5 flex items-center justify-between text-xs text-gray-400 hover:text-white hover:bg-neutral-800/40 transition-all font-semibold"
                      >
                        <span>Terms & Service Licensing agreement</span>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </a>

                      <a 
                        href="#privacy" 
                        onClick={(e) => { e.preventDefault(); showToast("Privacy Policy document loading simulated..."); }}
                        className="p-3.5 flex items-center justify-between text-xs text-gray-400 hover:text-white hover:bg-neutral-800/40 transition-all font-semibold"
                      >
                        <span>Global Privacy Policy guidelines</span>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </a>

                      <button
                        onClick={() => navigate("/support")}
                        className="w-full text-left p-3.5 flex items-center justify-between text-xs text-gray-400 hover:text-white hover:bg-neutral-800/40 transition-all font-semibold border-0 bg-transparent cursor-pointer"
                      >
                        <span>Contact Helpdesk Support & FAQs</span>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Copyright Footer */}
                  <div className="text-center pt-8 border-t border-[#1e262c]">
                    <p className="text-[10px] text-gray-500">&copy; 2026 TradePulse Financial Inc. All rights reserved. Cryptographic asset trading involves extreme volatility risks.</p>
                  </div>
                </div>
              )}

            </Card>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Settings;
