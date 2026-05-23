/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "@/Api/api";
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Lock, 
  Smartphone, 
  Search, 
  Bell, 
  ArrowRight, 
  Sparkles, 
  Brain, 
  Compass, 
  Shield, 
  Zap, 
  Star, 
  Check, 
  Download, 
  QrCode, 
  MessageSquare, 
  Activity, 
  CircleDot, 
  PieChart,
  LineChart,
  ShieldCheck,
  Flame,
  ChevronRight,
  Mail,
  Twitter,
  Github
} from "lucide-react";

// Tickers for Top Live Market Strip
const LIVE_TICKERS = [
  { sym: "BTC", price: "67,420.50", chg: "+2.34%", up: true },
  { sym: "ETH", price: "3,512.80", chg: "+1.87%", up: true },
  { sym: "NVDA", price: "924.15", chg: "+3.21%", up: true },
  { sym: "AAPL", price: "213.40", chg: "-0.45%", up: false },
  { sym: "MSFT", price: "415.20", chg: "+0.92%", up: true },
  { sym: "SOL", price: "168.33", chg: "+4.76%", up: true },
  { sym: "AMZN", price: "198.65", chg: "-1.13%", up: false },
];

const INFINITE_TICKERS = [...LIVE_TICKERS, ...LIVE_TICKERS, ...LIVE_TICKERS];



export const Landing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("popular");
  
  // Interactive Modals State
  const [isMarketExplorerOpen, setIsMarketExplorerOpen] = useState(false);
  const [selectedQuickViewCoin, setSelectedQuickViewCoin] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [explorerCategory, setExplorerCategory] = useState("all");


  
  // Real-time Assets State with Extended Attributes
  const [assets, setAssets] = useState({
    BTC: { 
      price: 77336.62, chg: -0.28, name: "Bitcoin", logo: "₿", color: "text-amber-500", up: false, high24h: 3.2,
      bars: [40, 55, 30, 60, 80],
      history: Array.from({length: 20}, (_, i) => 77336.62 + Math.sin(i * 0.8) * 150 + (Math.random() * 80 - 40)),
      volume: "$28.4B", cap: "$1.52T", high: "$78,200", low: "$76,500", text: "Pulse AI technical evaluation identifies strong key support at $76k, projecting target targets at $82k."
    },
    ETH: { 
      price: 2118.40, chg: -0.73, name: "Ethereum", logo: "Ξ", color: "text-blue-400", up: false, high24h: 1.8,
      bars: [30, 45, 35, 55, 70],
      history: Array.from({length: 20}, (_, i) => 2118.40 + Math.sin(i * 0.8) * 8 + (Math.random() * 4 - 2)),
      volume: "$14.2B", cap: "$254.8B", high: "$2,180", low: "$2,090", text: "Network activity has surged following the gas drop, consolidating support desks for a test of $2,300."
    },
    BNB: { 
      price: 650.46, chg: 0.89, name: "Binance", logo: "🔶", color: "text-yellow-400", up: true, high24h: 4.1,
      bars: [25, 35, 45, 50, 65],
      history: Array.from({length: 20}, (_, i) => 650.46 + Math.sin(i * 0.8) * 3 + (Math.random() * 2 - 1)),
      volume: "$1.8B", cap: "$95.2B", high: "$660.20", low: "$642.10", text: "Strong breakout over high resistance clusters, showing positive spot inflows in local exchange orderbooks."
    },
    SOL: { 
      price: 145.20, chg: -0.40, name: "Solana", logo: "◎", color: "text-purple-400", up: false, high24h: -0.4,
      bars: [60, 45, 35, 25, 20],
      history: Array.from({length: 20}, (_, i) => 145.20 + Math.sin(i * 0.8) * 1.5 + (Math.random() * 0.8 - 0.4)),
      volume: "$3.6B", cap: "$68.4B", high: "$151.10", low: "$142.30", text: "Derivatives order flow suggests volume squeeze consolidation, targeting near-term resistance zones."
    },
    XRP: { 
      price: 0.5218, chg: -0.45, name: "Ripple", logo: "✕", color: "text-sky-300", up: false, high24h: 1.1,
      bars: [30, 25, 40, 35, 42],
      history: Array.from({length: 20}, (_, i) => 0.5218 + Math.sin(i * 0.8) * 0.01 + (Math.random() * 0.004 - 0.002)),
      volume: "$980M", cap: "$28.9B", high: "$0.5420", low: "$0.5110", text: "Low volatility consolidation pattern inside key legal and regulatory corridors. Projection neutral."
    },
    DOGE: { 
      price: 0.1425, chg: 8.12, name: "Dogecoin", logo: "Ð", color: "text-yellow-500", up: true, high24h: 8.1,
      bars: [15, 30, 50, 45, 75],
      history: Array.from({length: 20}, (_, i) => 0.1425 + Math.sin(i * 0.8) * 0.005 + (Math.random() * 0.002 - 0.001)),
      volume: "$840M", cap: "$20.5B", high: "$0.1550", low: "$0.1380", text: "Social media index and retail volume velocity surges, maintaining high bullish momentum parameters."
    }
  });

  // Track price flash states
  const [flashStates, setFlashStates] = useState({});

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hello! I am Pulse AI. Ask me about real-time market sentiment or trading projections." },
    { role: "user", content: "Is Bitcoin bullish right now?" },
    { role: "assistant", content: "Yes! Bitcoin is strongly bullish, with spot ETF net inflows of $340M daily and strong consolidation above the $72K support range. Technical indicators support a run to $92K-100K in Q3." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  


  // Sparkline path calculator for dynamic drawing
  const getSparklinePath = (history, width = 120, height = 40) => {
    if (!history || history.length === 0) return "";
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;
    
    return history.map((val, idx) => {
      const x = (idx / (history.length - 1)) * width;
      const y = height - 4 - ((val - min) / range) * (height - 8);
      return `${idx === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");
  };

  const canvasRef = useRef(null);

  // Canvas drawing effect for reactive asset history visualization
  useEffect(() => {
    if (!selectedQuickViewCoin || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    
    const width = rect.width;
    const height = rect.height;
    
    const coinSym = selectedQuickViewCoin.sym;
    const liveCoin = assets[coinSym];
    if (!liveCoin || !liveCoin.history || liveCoin.history.length === 0) return;
    
    const history = liveCoin.history;
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;
    const isUp = liveCoin.chg >= 0;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw subtle grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    const cols = 6;
    const rows = 4;
    for (let i = 1; i < cols; i++) {
      const x = (i / cols) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let i = 1; i < rows; i++) {
      const y = (i / rows) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw area gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    if (isUp) {
      grad.addColorStop(0, "rgba(0, 255, 163, 0.25)");
      grad.addColorStop(1, "rgba(0, 255, 163, 0.0)");
    } else {
      grad.addColorStop(0, "rgba(255, 77, 109, 0.25)");
      grad.addColorStop(1, "rgba(255, 77, 109, 0.0)");
    }
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    history.forEach((val, idx) => {
      const x = (idx / (history.length - 1)) * width;
      const y = height - 20 - ((val - min) / range) * (height - 40);
      if (idx === 0) {
        ctx.moveTo(x, height);
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
    
    // Draw neon path stroke
    ctx.shadowColor = isUp ? "rgba(0, 255, 163, 0.4)" : "rgba(255, 77, 109, 0.4)";
    ctx.shadowBlur = 6;
    ctx.strokeStyle = isUp ? "#00ffa3" : "#ff4d6d";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    history.forEach((val, idx) => {
      const x = (idx / (history.length - 1)) * width;
      const y = height - 20 - ((val - min) / range) * (height - 40);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    
    // Pulsing end coordinates dot
    const lastIdx = history.length - 1;
    const lastX = width;
    const lastY = height - 20 - ((history[lastIdx] - min) / range) * (height - 40);
    
    ctx.fillStyle = isUp ? "#00ffa3" : "#ff4d6d";
    ctx.beginPath();
    ctx.arc(lastX - 2, lastY, 4.5, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.strokeStyle = isUp ? "rgba(0, 255, 163, 0.4)" : "rgba(255, 77, 109, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const pulseRadius = 6.5 + Math.sin(Date.now() / 150) * 2;
    ctx.arc(lastX - 2, lastY, pulseRadius, 0, 2 * Math.PI);
    ctx.stroke();
  }, [selectedQuickViewCoin, assets]);

  // Keep selected Quick View coin reactive to main state updates
  useEffect(() => {
    if (selectedQuickViewCoin) {
      const live = assets[selectedQuickViewCoin.sym];
      if (live) {
        setSelectedQuickViewCoin(prev => ({
          ...prev,
          price: live.price,
          chg: live.chg,
          up: live.up,
          bars: live.bars,
          history: live.history
        }));
      }
    }
  }, [assets]);

  // Fetch Live Prices on Mount and Fallback to Simulation
  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/coins?page=1`);
        if (res.data && Array.isArray(res.data)) {
          setAssets((prev) => {
            const updated = { ...prev };
            res.data.slice(0, 6).forEach((coin) => {
              const sym = coin.symbol.toUpperCase();
              if (updated[sym]) {
                const currentPrice = coin.current_price;
                const change = coin.price_change_percentage_24h;
                updated[sym] = {
                  ...updated[sym],
                  price: currentPrice,
                  chg: change,
                  up: change >= 0,
                  high24h: Math.abs(change).toFixed(1),
                  history: Array.from({length: 20}, (_, i) => currentPrice + Math.sin(i * 0.8) * (currentPrice * 0.002) + (Math.random() * (currentPrice * 0.001) - (currentPrice * 0.0005)))
                };
              }
            });
            return updated;
          });
        }
      } catch (e) {
        console.log("Using seed data with simulated telemetry loop.");
      }
    };

    fetchLivePrices();

    // High-Frequency Price Fluctuating Telemetry Interval (every 2 seconds)
    const interval = setInterval(() => {
      setAssets((prev) => {
        const next = { ...prev };
        const newFlash = {};
        
        Object.keys(next).forEach((key) => {
          const coin = next[key];
          // fluctuate price by +/- 0.05%
          const pct = (Math.random() * 0.10 - 0.05) / 100;
          const diff = coin.price * pct;
          const newPrice = coin.price + diff;
          
          if (Math.abs(diff) > 0.0001) {
            newFlash[key] = diff > 0 ? "flash-up" : "flash-down";
          }

          // Compute new dynamic sparkline bar height
          const barsCopy = [...coin.bars];
          const lastBar = barsCopy[barsCopy.length - 1];
          const shiftPct = diff > 0 ? Math.random() * 12 + 2 : -(Math.random() * 12 + 2);
          const newBarHeight = Math.max(12, Math.min(95, lastBar + shiftPct));
          barsCopy.shift();
          barsCopy.push(Math.round(newBarHeight));

          // Append new history point
          const historyCopy = [...(coin.history || [])];
          historyCopy.push(newPrice);
          if (historyCopy.length > 22) {
            historyCopy.shift();
          }

          next[key] = {
            ...coin,
            price: newPrice,
            chg: coin.chg + (pct * 100),
            up: coin.chg + (pct * 100) >= 0,
            bars: barsCopy,
            history: historyCopy
          };
        });

        setFlashStates(newFlash);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);



  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I've analyzed that ticker's order book velocity and social media sentiment. Bullish volume is rising in derivatives desks, projecting a +3.2% near-term push.";
      if (userMsg.toLowerCase().includes("sol")) {
        reply = `Solana (SOL) is trading live around $${assets.SOL.price.toFixed(2)}. RSI velocity on the 4-hour chart remains strong. Overhead resistance sits at $175, with solid support at $162. Bullish outlook maintained.`;
      } else if (userMsg.toLowerCase().includes("eth")) {
        reply = `Ethereum (ETH) is valued at $${assets.ETH.price.toFixed(2)}. Network activity has surged following the Dencun upgrade gas drops, strengthening consolidation for a test of $3,800.`;
      } else if (userMsg.toLowerCase().includes("btc")) {
        reply = `Bitcoin (BTC) is trading live at $${assets.BTC.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}. Institutional spot ETF inflows continue to provide support, projecting testing targets in the $82K range.`;
      }
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen text-[#e8f0eb] select-none overflow-x-hidden font-sans relative bg-[#04090c]"
      style={{
        background: "radial-gradient(circle at top right, #0a1715, #04090c, #020406)",
      }}
    >
      {/* Dynamic Flash CSS Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flashGreen {
          0% { background-color: rgba(0, 229, 160, 0.15); color: #00ffa3; }
          100% { background-color: transparent; }
        }
        @keyframes flashRed {
          0% { background-color: rgba(255, 77, 109, 0.15); color: #ff4d6d; }
          100% { background-color: transparent; }
        }
        .flash-up {
          animation: flashGreen 0.8s ease-out;
        }
        .flash-down {
          animation: flashRed 0.8s ease-out;
        }
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ticker-scroll-track {
          display: flex;
          animation: infiniteScroll 25s linear infinite;
          width: max-content;
          will-change: transform;
        }
        .ticker-scroll-track:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* BACKGROUND DECORATIONS */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 160, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 160, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute top-1/4 -left-[20%] w-[600px] h-[600px] bg-[#00e5a0]/[0.02] blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute top-2/3 -right-[20%] w-[700px] h-[700px] bg-[#00ffa3]/[0.03] blur-[180px] rounded-full pointer-events-none" />

      {/* ====================================================
          1. TOP LIVE MARKET TICKER
          ==================================================== */}
      <div className="sticky top-0 z-50 bg-[#04090c]/90 border-b border-[#00e5a0]/15 backdrop-blur-md h-10 flex items-center overflow-hidden">
        <div className="ticker-scroll-track">
          {INFINITE_TICKERS.map((t, idx) => {
            const sym = t.sym;
            const liveCoin = assets[sym];
            const priceText = liveCoin ? liveCoin.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : t.price;
            const chgText = liveCoin ? `${liveCoin.chg >= 0 ? "+" : ""}${liveCoin.chg.toFixed(2)}%` : t.chg;
            const isUp = liveCoin ? liveCoin.chg >= 0 : t.up;

            return (
              <div 
                key={idx} 
                onClick={() => {
                  const live = assets[sym];
                  if (live) {
                    setSelectedQuickViewCoin({ sym, name: live.name, ...live });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-2 border-r border-[#00e5a0]/10 text-xs font-mono tracking-wider group cursor-pointer hover:bg-[#00e5a0]/5 transition-colors"
              >
                <span className="text-[#8aa898] font-bold">{sym}</span>
                <span className={`text-white font-medium transition-all ${flashStates[sym] || ""}`}>{priceText}</span>
                <span className={`inline-flex items-center gap-1 font-semibold ${isUp ? "text-[#00ffa3]" : "text-[#ff4d6d]"}`}>
                  <span>{isUp ? "▲" : "▼"}</span>
                  <span>{chgText}</span>
                </span>
                <span className={`w-1 h-1 rounded-full ${isUp ? "bg-[#00ffa3]" : "bg-[#ff4d6d]"} opacity-50 group-hover:scale-150 transition-transform`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ====================================================
          2. NAVBAR
          ==================================================== */}
      <header className="sticky top-0 z-40 bg-[#1a1a1c]/80 border-b border-white/5 backdrop-blur-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Icon */}
          <div 
            onClick={() => navigate("/")} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <svg className="w-5 h-5 stroke-white fill-none stroke-[2.5]" viewBox="0 0 24 24">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span className="text-lg font-bold text-white tracking-tight font-sans">
              TradePulse
            </span>
          </div>

          {/* Center Navigation menu links */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: "Markets", path: "/" },
              { label: "Trade", path: "/signin" },
              { label: "Portfolio", path: "/signin" },
              { label: "News", path: "/signin" },
              { label: "Support", path: "/support" },
            ].map((menu, idx) => (
              <a
                key={idx}
                onClick={() => {
                  if (menu.label === "Markets") {
                    setIsMarketExplorerOpen(true);
                  } else if (menu.label === "News") {
                    const el = document.getElementById("top-crypto");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  } else {
                    navigate(menu.path);
                  }
                }}
                className="py-2 text-sm text-gray-400 font-medium hover:text-white cursor-pointer transition-colors"
              >
                {menu.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsMarketExplorerOpen(true);
                }}
                onClick={() => setIsMarketExplorerOpen(true)}
                placeholder="Search markets..."
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 pl-9 pr-12 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/20 w-52 transition-all cursor-pointer"
              />
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 pointer-events-none" />
              <span className="absolute right-2 text-[10px] text-gray-600 border border-white/10 rounded px-1.5 py-0.5 bg-white/5 font-mono pointer-events-none">
                ⌘K
              </span>
            </div>

            <button 
              onClick={() => navigate("/signin")}
              className="text-sm font-semibold text-gray-400 hover:text-white transition-colors px-2 py-2"
            >
              Sign In
            </button>

            <button 
              onClick={() => navigate("/signup")}
              className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 active:scale-95 transition-all duration-200"
            >
              Create Account
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================
          3. HERO SECTION (Aligned with User Screenshot)
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          
          {/* Centered Hero Text */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto font-sans">
              Trade Smarter With <br/>
              Real-Time Market <br/>
              Intelligence
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
              Professional crypto trading platform with portfolio analytics, <br/>
              market insights, and real-time trading tools.
            </p>
          </div>

          {/* Action buttons (Perfectly Matched with Screenshot) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button 
              onClick={() => navigate("/signup")}
              className="bg-white text-black font-semibold px-8 py-3.5 rounded-lg text-sm hover:bg-gray-200 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsMarketExplorerOpen(true)}
              className="border border-white/15 hover:border-white/30 bg-transparent px-8 py-3.5 rounded-lg text-sm font-semibold text-white transition-all duration-300"
            >
              Explore Markets
            </button>
          </div>

          {/* Bottom stats grid (Directly Matched with Screenshot) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-16 w-full max-w-4xl mx-auto">
            {/* Stat 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white leading-none">250+</p>
                <p className="text-xs text-gray-500 font-medium mt-1.5">Assets</p>
              </div>
            </div>
            
            {/* Divider line for MD screen */}
            <div className="hidden md:block w-px h-8 bg-white/10" />

            {/* Stat 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white leading-none">99.9%</p>
                <p className="text-xs text-gray-500 font-medium mt-1.5">Uptime</p>
              </div>
            </div>

            {/* Divider line for MD screen */}
            <div className="hidden md:block w-px h-8 bg-white/10" />

            {/* Stat 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white leading-none">Real-time</p>
                <p className="text-xs text-gray-500 font-medium mt-1.5">Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ====================================================
          4. FEATURES SECTION
          ==================================================== */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00e5a0]/[0.02] blur-[80px] rounded-full pointer-events-none" />

        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            One Platform, Endless Possibilities
          </h2>
          <p className="text-sm sm:text-base text-[#8aa898] mt-3">
            Deploy cutting-edge features optimized for modern digital assets and institutional liquidity networks.
          </p>
        </div>

        {/* Feature Cards Grid (Pristine Monochrome Aligned with Mockup Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[
            { 
              title: "Spot Trading", 
              desc: "Instantly buy and sell 500+ cryptocurrencies with deepest orderbook depth and narrowest spreads.", 
              icon: <Globe className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" /> 
            },
            { 
              title: "Futures Trading", 
              desc: "Access high-leverage perpetual swaps with cross and isolated margin presets up to 100x.", 
              icon: <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" /> 
            },
            { 
              title: "Portfolio Tracker", 
              desc: "Synchronize multiple bank accounts, transaction ledgers, and live tokens inside one responsive dashboard.", 
              icon: <PieChart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" /> 
            },
            { 
              title: "AI Watchlist", 
              desc: "Automate technical charting alerts, volume breakouts, and support detections on your favorite assets.", 
              icon: <Star className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" /> 
            },
            { 
              title: "Smart Alerts", 
              desc: "Receive immediate notifications via Email, SMS, or Push notifications for +/-5% price swings.", 
              icon: <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" /> 
            },
            { 
              title: "AI Market Assistant", 
              desc: "Query technical indicators, support clusters, and news digests directly inside an active terminal.", 
              icon: <Shield className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" /> 
            },
            { 
              title: "Real-Time Charts", 
              desc: "Draw layouts directly on fully optimized TradingView layouts equipped with custom accent-colored indicators.", 
              icon: (
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  <line x1="9" y1="9" x2="21" y2="9" />
                </svg>
              ) 
            },
            { 
              title: "Secure Wallet", 
              desc: "Store credentials in absolute multi-party cold archives supported by institutional insurance pools.", 
              icon: <Lock className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" /> 
            },
            { 
              title: "Sentiment Analysis", 
              desc: "Aggregate global headlines, social media channels, and whale trackers to forecast daily trends.", 
              icon: <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" /> 
            },
            { 
              title: "Trading Signals", 
              desc: "Leverage advanced technical alerts from core neural networks to capture swift scalp opportunities.", 
              icon: (
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              ) 
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="rounded-xl bg-[#0b0c0e] border border-white/5 p-6 hover:border-white/10 transition-all duration-300 cursor-pointer group text-left"
            >
              <div className="space-y-4">
                <div>
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          5. TOP CRYPTO TODAY SECTION
          ==================================================== */}
      <section id="top-crypto" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative">
        <div className="flex items-center justify-between mb-12">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Top Crypto Today</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Live exchange indexes from major trading pairs</p>
          </div>
          <button 
            onClick={() => navigate("/signup")}
            className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1 group"
          >
            <span>View All Markets</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Horizontal Slider/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 text-left">
          {[
            { name: "Bitcoin", sym: "BTC", cap: "$1.55T" },
            { name: "Ethereum", sym: "ETH", cap: "$423.6B" },
            { name: "Solana", sym: "SOL", cap: "$78.3B" },
            { name: "Ripple", sym: "XRP", cap: "$28.9B" },
            { name: "Binance Coin", sym: "BNB", cap: "$87.7B" },
            { name: "Dogecoin", sym: "DOGE", cap: "$20.5B" }
          ].map((row, i) => {
            const coin = assets[row.sym];
            const formattedPrice = coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: coin.price < 1 ? 4 : 2 });
            const formattedChg = `${coin.chg >= 0 ? "+" : ""}${coin.chg.toFixed(2)}%`;
            const sparkPath = getSparklinePath(coin.history, 120, 40);
            const isLoss = coin.chg < 0;
            
            return (
              <div 
                key={i} 
                onClick={() => setSelectedQuickViewCoin({ sym: row.sym, name: row.name, ...coin })}
                className="rounded-xl bg-[#0b0c0e] border border-white/5 p-5 hover:border-white/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-white">
                      {coin.logo}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-white">{row.name}</h3>
                      <span className="text-[10px] text-gray-500 font-bold font-mono uppercase">{row.sym}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${!isLoss ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                    {formattedChg}
                  </span>
                </div>

                <div>
                  <p className={`text-sm font-extrabold text-white font-mono transition-all ${flashStates[row.sym] || ""}`}>${formattedPrice}</p>
                  <p className="text-[10px] text-gray-500 font-semibold mt-0.5">Cap: {row.cap}</p>
                </div>

                {/* Mini Sparkline Chart */}
                <div className="mt-4 h-12 w-full flex items-center">
                  <svg className="w-full h-10 fill-none stroke-2" viewBox="0 0 120 40">
                    <path d={sparkPath} stroke={!isLoss ? "#10b981" : "#f87171"} />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Linear Gradients for Sparklines */}
        <svg className="hidden">
          <defs>
            <linearGradient id="upGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ffa3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="downGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff4d6d" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </section>











      {/* ====================================================
          10. PREMIUM MULTI-COLUMN FOOTER
          ==================================================== */}
      <footer className="border-t border-white/5 bg-[#0b0c0e]/40 backdrop-blur-md pt-16 pb-8 px-6 mt-16 z-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand info */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-sans tracking-wider">
                TradePulse
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-[280px]">
              AI-powered cryptocurrency intelligence & transaction execution platform. Empowering retail traders with institutional-grade data.
            </p>
            <div className="flex items-center gap-2.5 mt-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-300 font-mono tracking-wider">API STATUS: ONLINE</span>
            </div>
          </div>

          {/* Product links */}
          <div className="flex flex-col gap-3.5 text-left">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white font-mono">Product</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
              <li><a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">Trading Terminal</a></li>
              <li><a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">Market Screener</a></li>
              <li><a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">AI Intelligence</a></li>
              <li><a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">Pro Membership</a></li>
            </ul>
          </div>

          {/* Resources links */}
          <div className="flex flex-col gap-3.5 text-left">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white font-mono">Resources</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-400">
              <li><a onClick={() => navigate("/support")} className="hover:text-white cursor-pointer transition-colors">Support Center</a></li>
              <li><a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">Developer APIs</a></li>
              <li><a onClick={() => navigate("/support")} className="hover:text-white cursor-pointer transition-colors">Market Risks</a></li>
              <li><a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3.5 text-left">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white font-mono">Connect</h4>
            <div className="flex gap-3 mb-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[10px] text-gray-500 leading-normal">
              Join our global intelligence network for real-time crypto telemetry updates.
            </p>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-semibold gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <span>© 2026 TradePulse Financial Inc. All rights reserved.</span>
            <a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">Privacy Policy</a>
            <a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">Terms of Service</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-gray-400">Operational</span>
          </div>
        </div>
      </footer>

      {/* ====================================================
          11. INTERACTIVE MARKETS EXPLORER DRAWER (SLIDE-DOWN)
          ==================================================== */}
      {isMarketExplorerOpen && (
        <div className="fixed inset-0 z-50 bg-[#04090c]/80 backdrop-blur-xl flex justify-center items-start overflow-y-auto transition-all duration-500 animate-in fade-in slide-in-from-top-10">
          <div className="w-full max-w-7xl mx-auto px-6 py-12 relative min-h-screen flex flex-col">
            {/* Close button */}
            <button 
              onClick={() => setIsMarketExplorerOpen(false)}
              className="absolute top-8 right-8 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-white hover:border-white/20 hover:bg-white/10 hover:rotate-90 transition-all duration-300 text-lg font-bold"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-10 text-left">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                <Compass className="w-8 h-8 text-white animate-pulse" />
                Live Markets Explorer
              </h2>
              <p className="text-sm text-[#8aa898] mt-1.5 font-semibold">Real-time orderbook feeds and institutional market indexes</p>
            </div>

            {/* Controls Row (Search and Tabs) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-[#0b0c0e] border border-white/5 p-4 rounded-2xl">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { id: "all", label: "All Assets" },
                  { id: "gainers", label: "Top Gainers" },
                  { id: "losers", label: "Top Losers" },
                  { id: "ai", label: "AI Projections" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setExplorerCategory(tab.id)}
                    className={`px-5 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all duration-300 ${
                      explorerCategory === tab.id 
                        ? "bg-white text-black font-extrabold" 
                        : "bg-white/5 text-[#8aa898] hover:bg-white/10 hover:text-white border border-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Live search input */}
              <div className="relative flex items-center w-full md:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by asset name or symbol..."
                  className="bg-black/35 border border-white/10 rounded-xl px-5 py-2.5 pl-11 text-xs text-[#e8f0eb] placeholder-[#5a7a6a] focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 w-full transition-all duration-300"
                />
                <Search className="w-4 h-4 text-[#5a7a6a] absolute left-4 pointer-events-none" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 text-xs text-[#5a7a6a] hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Markets Table */}
            <div className="bg-[#0b0c0e] border border-white/5 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/5 text-[#8aa898] uppercase tracking-wider font-extrabold text-[10px]">
                      <th className="px-6 py-4.5">Asset</th>
                      <th className="px-6 py-4.5 text-right">Live Price</th>
                      <th className="px-6 py-4.5 text-right">24H Change</th>
                      <th className="px-6 py-4.5 text-right">24H High / Low</th>
                      <th className="px-6 py-4.5 text-right">24H Volume</th>
                      <th className="px-6 py-4.5 text-right">Market Cap</th>
                      <th className="px-6 py-4.5 text-right">AI Signal</th>
                      <th className="px-6 py-4.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {Object.keys(assets)
                      .map((sym) => ({ sym, ...assets[sym] }))
                      .filter((coin) => {
                        const matchesSearch = 
                          coin.sym.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          coin.name.toLowerCase().includes(searchQuery.toLowerCase());
                        
                        if (!matchesSearch) return false;

                        if (explorerCategory === "gainers") return coin.chg >= 0;
                        if (explorerCategory === "losers") return coin.chg < 0;
                        if (explorerCategory === "ai") return coin.high24h >= 2.5 || coin.chg >= 2;
                        
                        return true;
                      })
                      .sort((a, b) => {
                        if (explorerCategory === "gainers") return b.chg - a.chg;
                        if (explorerCategory === "losers") return a.chg - b.chg;
                        return 0; // retain default ordering otherwise
                      })
                      .map((coin) => {
                        const formattedPrice = coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: coin.sym === "DOGE" || coin.sym === "XRP" ? 4 : 2 });
                        const formattedChg = `${coin.chg >= 0 ? "+" : ""}${coin.chg.toFixed(2)}%`;
                        const isUp = coin.chg >= 0;
                        const aiSignal = coin.chg >= 1.5 
                          ? { txt: "Strong Buy", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" } 
                          : coin.chg <= -1.5 
                          ? { txt: "Strong Sell", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" } 
                          : coin.chg >= 0 
                          ? { txt: "Accumulate", color: "bg-white/5 text-gray-300 border-white/10" }
                          : { txt: "Consolidate", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };

                        return (
                          <tr 
                            key={coin.sym}
                            onClick={() => setSelectedQuickViewCoin(coin)}
                            className="hover:bg-white/5 transition-all duration-200 cursor-pointer border-b border-white/5"
                          >
                            <td className="px-6 py-4.5 flex items-center gap-3">
                              <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${coin.color} bg-white/5`}>
                                {coin.logo}
                              </span>
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-bold text-white tracking-wider">{coin.sym}</span>
                                <span className="text-[10px] text-[#5a7a6a] font-medium">{coin.name}</span>
                              </div>
                            </td>
                            <td className={`px-6 py-4.5 text-right font-mono font-bold text-xs transition-all ${flashStates[coin.sym] || "text-white"}`}>
                              ${formattedPrice}
                            </td>
                            <td className={`px-6 py-4.5 text-right font-mono font-black text-xs ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                              {formattedChg}
                            </td>
                            <td className="px-6 py-4.5 text-right font-mono text-[10px] text-white/80">
                              {coin.high} / {coin.low}
                            </td>
                            <td className="px-6 py-4.5 text-right font-mono text-[10px] text-white/80">
                              {coin.volume}
                            </td>
                            <td className="px-6 py-4.5 text-right font-mono text-[10px] text-white/80">
                              {coin.cap}
                            </td>
                            <td className="px-6 py-4.5 text-right">
                              <span className={`inline-flex items-center text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${aiSignal.color}`}>
                                {aiSignal.txt}
                              </span>
                            </td>
                            <td className="px-6 py-4.5 text-center" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={() => navigate("/signup")}
                                className="bg-white text-black text-[10px] font-extrabold uppercase px-3 py-1.5 rounded hover:bg-gray-200 transition-all duration-200 font-sans"
                              >
                                Trade
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          12. INTERACTIVE ASSET QUICK VIEW PANEL (SLIDE-IN)
          ==================================================== */}
      {selectedQuickViewCoin && (() => {
        const coinSym = selectedQuickViewCoin.sym;
        const liveCoin = assets[coinSym] || selectedQuickViewCoin;
        const formattedPrice = liveCoin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: coinSym === "DOGE" || coinSym === "XRP" ? 4 : 2 });
        const formattedChg = `${liveCoin.chg >= 0 ? "+" : ""}${liveCoin.chg.toFixed(2)}%`;
        const isUp = liveCoin.chg >= 0;

        return (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end transition-all duration-500 animate-in fade-in">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={() => setSelectedQuickViewCoin(null)} />

            {/* Sidebar drawer content */}
            <div className="relative w-full sm:w-[440px] h-screen bg-[#0b0c0e]/95 border-l border-white/10 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col z-10 transition-transform duration-300 animate-in slide-in-from-right-20">
              
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-sm bg-white/5 ${liveCoin.color}`}>
                    {liveCoin.logo}
                  </span>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      {liveCoin.name}
                      <span className="text-[10px] text-[#5a7a6a] font-black uppercase font-mono tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {coinSym}
                      </span>
                    </h3>
                    <p className="text-[10px] text-[#8aa898] font-semibold mt-0.5">Real-time asset telemetry</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedQuickViewCoin(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#8aa898] hover:text-white hover:border-white/20 transition-all duration-200 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-container custom-scrollbar">
                
                {/* Price Display */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[9px] text-[#5a7a6a] font-extrabold uppercase tracking-widest">Mark Price</p>
                    <p className={`text-2xl font-black text-white font-mono mt-1 transition-all ${flashStates[coinSym] || ""}`}>
                      ${formattedPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-black font-mono px-3 py-1 rounded-full ${
                      isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                    }`}>
                      <span>{isUp ? "▲" : "▼"}</span>
                      <span>{formattedChg}</span>
                    </span>
                    <p className="text-[8px] text-[#5a7a6a] font-bold uppercase tracking-wider mt-1.5">24h dynamic delta</p>
                  </div>
                </div>

                {/* Real-time canvas chart */}
                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-[#8aa898] uppercase tracking-wide">Live Trend Canvas</span>
                    <span className="text-white font-mono flex items-center gap-1 font-extrabold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      Ticking
                    </span>
                  </div>
                  
                  {/* Canvas container with neon border */}
                  <div className="w-full h-48 bg-[#04090c] border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-[inset_0_4px_24px_rgba(0,0,0,0.8)]">
                    <canvas 
                      ref={canvasRef} 
                      className="w-full h-full block"
                    />
                  </div>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Market Cap", val: liveCoin.cap || "$0.00" },
                    { label: "24h Volume", val: liveCoin.volume || "$0.00" },
                    { label: "24h High", val: liveCoin.high || "$0.00" },
                    { label: "24h Low", val: liveCoin.low || "$0.00" }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-3 text-left">
                      <p className="text-[9px] text-[#5a7a6a] font-extrabold uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xs font-bold text-white font-mono mt-1">{stat.val}</p>
                    </div>
                  ))}
                </div>

                {/* Pulse AI Projections Box */}
                <div className="rounded-2xl border border-white/10 bg-[#0b0c0e] p-5 text-left space-y-3 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 text-white">
                    <Brain className="w-4.5 h-4.5 animate-pulse" />
                    <h4 className="text-xs font-black uppercase tracking-wider">Pulse AI Projections</h4>
                  </div>
                  
                  <p className="text-xs text-[#8aa898] leading-relaxed font-medium">
                    {liveCoin.text}
                  </p>
                  
                  {/* Confidence block */}
                  <div className="flex justify-between items-center text-[10px] pt-1 border-t border-white/5">
                    <span className="text-[#5a7a6a] font-bold">Signal Confidence:</span>
                    <span className="text-white font-black font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      94.2% ACCURATE
                    </span>
                  </div>
                </div>

              </div>

              {/* Footer action CTA */}
              <div className="p-6 border-t border-white/5 bg-black/20">
                <button 
                  onClick={() => navigate("/signup")}
                  className="w-full bg-white text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-gray-200 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 font-sans"
                >
                  Start Trading {coinSym} Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
};

export default Landing;
