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
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  // Real-time engine matching logs simulation state
  const [engineLogs, setEngineLogs] = useState([
    { id: 1, type: "MATCH", msg: "BTC/USDT LIMIT FILL @ 77,325.50", time: "0.02ms", status: "success" },
    { id: 2, type: "SYNC", msg: "BLOCK #592,842 INTEGRITY VERIFIED", time: "1.10ms", status: "success" },
    { id: 3, type: "AI", msg: "NEURAL SENTIMENT STABILITY: 76%", time: "0.45ms", status: "normal" },
    { id: 4, type: "SECURE", msg: "TUNNEL HANDSHAKE ESTABLISHED", time: "0.85ms", status: "success" },
  ]);

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

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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

  // Interval hook to simulate active engine nodes matching order telemetry
  useEffect(() => {
    const logTypes = ["MATCH", "SYNC", "AI", "SECURE"];
    const statusTypes = ["success", "normal", "info"];
    
    const interval = setInterval(() => {
      const type = logTypes[Math.floor(Math.random() * logTypes.length)];
      const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];
      let msg = "";
      let time = (Math.random() * 1.5).toFixed(2) + "ms";
      
      if (type === "MATCH") {
        const pairs = ["SOL/USDT", "ETH/USDT", "BTC/USDT", "BNB/USDT", "DOGE/USDT"];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const mockPrice = pair === "BTC/USDT" ? "77,336" : pair === "ETH/USDT" ? "2,118" : pair === "SOL/USDT" ? "145.2" : "0.52";
        msg = `${pair} MATCHED AT EXCHANGE DECK @ $${mockPrice}`;
      } else if (type === "SYNC") {
        msg = `BLOCK #${Math.floor(Math.random() * 100000 + 592842)} LEDGER SYNCED`;
      } else if (type === "AI") {
        msg = `NEURAL AGENT CALIBRATED SENTIMENT VECTOR`;
      } else {
        msg = `ENCRYPTED RSA-4096 NODE IP VERIFIED`;
      }
      
      setEngineLogs((prev) => {
        const next = [...prev];
        next.push({ id: Date.now(), type, msg, time, status });
        if (next.length > 4) {
          next.shift();
        }
        return next;
      });
    }, 2500);
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
      <header className="sticky top-10 z-40 bg-[#04090c]/70 border-b border-white/5 backdrop-blur-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Icon */}
          <div 
            onClick={() => navigate("/")} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-[#00e5a0] to-[#00ffa3] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,229,160,0.3)] group-hover:rotate-6 transition-all duration-300">
              <svg className="w-5 h-5 stroke-[#050a0e] fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-widest text-white font-display">
              TRADE<span className="text-[#00e5a0]">-</span>PULSE
            </span>
          </div>

          {/* Center Navigation menu links */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: "Markets", path: "/" },
              { label: "Trade", path: "/signin" },
              { label: "Futures", path: "/signin" },
              { label: "Portfolio", path: "/signin" },
              { label: "AI Assistant", path: "/" },
              { label: "About Us", path: "/" },
            ].map((menu, idx) => (
              <a
                key={idx}
                onClick={() => {
                  if (menu.label === "Markets") {
                    setIsMarketExplorerOpen(true);
                  } else if (menu.label === "AI Assistant") {
                    document.getElementById("ai-assistant")?.scrollIntoView({ behavior: "smooth" });
                  } else if (menu.label === "About Us") {
                    document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate(menu.path);
                  }
                }}
                className="relative py-2 text-sm text-[#8aa898] font-medium hover:text-white cursor-pointer transition-colors group"
              >
                {menu.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00e5a0] shadow-[0_0_8px_#00e5a0] group-hover:w-full transition-all duration-300" />
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
                placeholder="Search assets..."
                className="bg-[#0c1419]/90 border border-white/5 rounded-full px-4 py-1.5 pl-9 text-xs text-[#e8f0eb] placeholder-[#5a7a6a] focus:outline-none focus:border-[#00e5a0]/40 focus:ring-1 focus:ring-[#00e5a0]/40 w-44 transition-all duration-300 cursor-pointer"
              />
              <Search className="w-3.5 h-3.5 text-[#5a7a6a] absolute left-3.5 pointer-events-none" />
            </div>
            
            <button className="text-[#8aa898] hover:text-white p-1 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#00ffa3]" />
            </button>

            <button 
              onClick={() => navigate("/signin")}
              className="text-sm font-semibold hover:text-[#00ffa3] transition-colors"
            >
              Log In
            </button>

            <button 
              onClick={() => navigate("/signup")}
              className="bg-[#00ffa3] text-[#050a0e] text-xs font-bold px-4 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(0,255,163,0.4)] hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              Create Account
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================
          3. HERO SECTION (Aligned with User Screenshot)
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE HERO TEXT */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Trade Smarter With <br/>
              <span className="text-[#00ffa3] drop-shadow-[0_0_20px_rgba(0,255,163,0.15)]">
                AI-Powered
              </span> Market <br /> Intelligence
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-[#8aa898] max-w-xl font-body leading-relaxed">
              Execute high-precision trades with institutional-grade tools and real-time predictive analytics. Join the next generation of digital asset exchange.
            </p>

            {/* Action buttons (Perfectly Matched with Screenshot) */}
            <div className="flex items-center gap-4 pt-2">
              <button 
                onClick={() => navigate("/signup")}
                className="bg-[#00ffa3] text-[#050a0e] font-extrabold px-6 py-3.5 rounded-lg text-sm hover:shadow-[0_0_25px_rgba(0,255,163,0.4)] active:scale-95 transition-all duration-300"
              >
                Start Trading Now
              </button>
              <button 
                onClick={() => setIsMarketExplorerOpen(true)}
                className="border border-white/20 hover:border-white/50 bg-transparent px-6 py-3.5 rounded-lg text-sm font-bold text-white transition-all duration-300"
              >
                View Live Markets
              </button>
            </div>

            {/* Mini stats grid (Directly Matched with Screenshot) */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5 w-full max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-mono">500+</p>
                <p className="text-[10px] text-[#5a7a6a] font-bold tracking-wider uppercase mt-1">GLOBAL ASSETS</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-mono">50K+</p>
                <p className="text-[10px] text-[#5a7a6a] font-bold tracking-wider uppercase mt-1">ACTIVE USERS</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-mono">$2.4B</p>
                <p className="text-[10px] text-[#5a7a6a] font-bold tracking-wider uppercase mt-1">24H VOLUME</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FLOATING CARDS (Layered like real terminal) */}
          <div className="lg:col-span-5 relative w-full h-[380px] flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
            {/* Widget Glow Backdrop */}
            <div className="absolute w-[360px] h-[360px] bg-[#00ffa3]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* CARD 1 — MARKET BOARD */}
            <div className="absolute top-0 right-4 w-[330px] rounded-2xl bg-[#0c1419]/90 border border-white/5 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.7)] hover:border-[#00ffa3]/20 hover:scale-[1.02] transition-all duration-300 z-10 text-left">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <div className="flex gap-4 text-xs font-bold">
                  <button 
                    onClick={() => setActiveTab("popular")}
                    className={`pb-1 relative font-bold tracking-wide transition-colors ${activeTab === 'popular' ? 'text-[#00ffa3]' : 'text-[#5a7a6a]'}`}
                  >
                    Popular
                    {activeTab === 'popular' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00ffa3]" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab("new")}
                    className={`pb-1 relative font-bold tracking-wide transition-colors ${activeTab === 'new' ? 'text-[#00ffa3]' : 'text-[#5a7a6a]'}`}
                  >
                    New Listing
                    {activeTab === 'new' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00ffa3]" />}
                  </button>
                </div>
                <ChevronRight className="w-4 h-4 text-[#5a7a6a] cursor-pointer hover:text-white" />
              </div>
              
              {/* Crypto rows with REAL TIME prices */}
              <div className="space-y-3.5">
                {(activeTab === "popular" 
                  ? [
                      { sym: "BTC", name: "Bitcoin", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
                      { sym: "ETH", name: "Ethereum", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                      { sym: "BNB", name: "Binance", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" }
                    ]
                  : [
                      { sym: "SOL", name: "Solana", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
                      { sym: "XRP", name: "Ripple", color: "bg-sky-500/10 text-sky-300 border-sky-500/20" },
                      { sym: "DOGE", name: "Dogecoin", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" }
                    ]
                ).map((row, i) => {
                  const coin = assets[row.sym];
                  const formattedPrice = coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: row.sym === "DOGE" || row.sym === "XRP" ? 4 : 2 });
                  const formattedChg = `${coin.chg >= 0 ? "+" : ""}${coin.chg.toFixed(2)}%`;
                  
                  return (
                    <div 
                      key={i} 
                      onClick={() => setSelectedQuickViewCoin({ sym: row.sym, name: row.name, ...coin })}
                      className="flex items-center justify-between hover:bg-white/5 p-1 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${row.color}`}>
                          {coin.logo}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">{row.sym}</span>
                          <span className="text-[10px] text-[#5a7a6a] font-medium">{row.name}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-bold text-white font-mono transition-all ${flashStates[row.sym] || ""}`}>
                          ${formattedPrice}
                        </p>
                        <p className={`text-[10px] font-bold font-mono mt-0.5 ${coin.chg >= 0 ? 'text-[#00ffa3]' : 'text-[#ff4d6d]'}`}>
                          {formattedChg}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CARD 2 — PULSE AI INSIGHT (Overlaps layered on bottom left) */}
            <div className="absolute bottom-[-10px] left-4 w-[330px] rounded-2xl bg-[#0c1419]/95 border border-[#00ffa3]/15 p-5 shadow-[0_45px_90px_rgba(0,0,0,0.85)] hover:scale-[1.02] transition-all duration-300 z-20 text-left">
              <div className="flex items-center gap-1.5 text-[#00ffa3] mb-4">
                <Sparkles className="w-4.5 h-4.5 text-[#00ffa3] animate-pulse" />
                <span className="text-xs font-extrabold tracking-wider uppercase">Pulse AI Insight</span>
              </div>

              {/* Bullish Signal Box */}
              <div className="bg-[#111c24]/90 border border-white/5 rounded-xl p-3.5 mb-4 space-y-1">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-ping" />
                  Bullish Signal: BTC/USDT
                </h4>
                <p className="text-[10px] text-[#8aa898] leading-normal font-medium">
                  High volume breakout confirmed on 4h timeframe. Potential target: $79.5k.
                </p>
              </div>

              {/* Progress Sentiment bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-[#8aa898] uppercase tracking-wide">Market Sentiment</span>
                  <span className="text-[#00ffa3] font-mono tracking-wide uppercase bg-[#00ffa3]/10 px-2 py-0.5 rounded border border-[#00ffa3]/20">
                    72% GREED
                  </span>
                </div>
                {/* Progress Bar indicator */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-[#00ffa3] rounded-full shadow-[0_0_8px_#00ffa3]" style={{ width: "72%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3.5 TRENDING ASSETS (Directly Matched with Screenshot)
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative text-left">
        <h2 className="text-xl font-bold text-white mb-6">Trending Assets</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { sym: "BTC", name: "Bitcoin", color: "border-amber-500/20 text-amber-500" },
            { sym: "ETH", name: "Ethereum", color: "border-blue-500/20 text-blue-400" },
            { sym: "SOL", name: "Solana", color: "border-purple-500/20 text-purple-400" },
            { sym: "BNB", name: "BNB Chain", color: "border-yellow-500/20 text-yellow-400" }
          ].map((card, idx) => {
            const coin = assets[card.sym];
            const livePrice = coin.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
            const formattedChg = `${coin.chg >= 0 ? "+" : ""}${coin.chg.toFixed(2)}%`;
            const isLoss = !coin.up;

            return (
              <div 
                key={idx}
                onClick={() => setSelectedQuickViewCoin({ sym: card.sym, name: card.name, ...coin })}
                className="rounded-2xl bg-[#0c1419]/90 border border-white/5 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-[#00ffa3]/20 hover:scale-[1.03] transition-all duration-300 cursor-pointer flex flex-col justify-between h-[170px]"
              >
                {/* Logo and Change */}
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-full bg-white/5 border flex items-center justify-center font-bold text-xs ${card.color}`}>
                    {coin.logo}
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-black font-mono ${isLoss ? "text-[#ff4d6d]" : "text-[#00ffa3]"}`}>
                      {formattedChg}
                    </span>
                    <p className="text-[8px] text-[#5a7a6a] font-bold uppercase mt-0.5">24H CHANGE</p>
                  </div>
                </div>

                {/* Coin Title & Price */}
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-white">{card.name}</h3>
                  <p className={`text-xl font-black text-white font-mono mt-0.5 transition-all ${flashStates[card.sym] || ""}`}>
                    ${livePrice}
                  </p>
                </div>

                {/* Bottom Sparkline Trendbars */}
                <div className="flex items-end justify-between gap-1 h-6 mt-3">
                  {coin.bars.map((height, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-sm transition-all duration-500 ${isLoss ? "bg-[#ff4d6d]/15" : "bg-[#00ffa3]/15"} hover:opacity-100`}
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: isLoss ? "rgba(255, 77, 109, 0.25)" : "rgba(0, 255, 163, 0.25)" 
                      }} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
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

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[
            { title: "Spot Trading", desc: "Instantly buy and sell 500+ cryptocurrencies with deepest orderbook depth and narrowest spreads.", icon: <Zap className="w-5 h-5" />, color: "border-[#00e5a0]/10 hover:border-[#00e5a0]/40" },
            { title: "Futures Trading", desc: "Access high-leverage perpetual swaps with cross and isolated margin presets up to 100x.", icon: <Activity className="w-5 h-5" />, color: "border-cyan-500/10 hover:border-cyan-500/40" },
            { title: "Portfolio Tracker", desc: "Synchronize multiple bank accounts, transaction ledgers, and live tokens inside one responsive dashboard.", icon: <PieChart className="w-5 h-5" />, color: "border-[#00ffa3]/10 hover:border-[#00ffa3]/40" },
            { title: "AI Watchlist", desc: "Automate technical charting alerts, volume breakouts, and support detections on your favorite assets.", icon: <Sparkles className="w-5 h-5" />, color: "border-purple-500/10 hover:border-purple-500/40" },
            { title: "Smart Alerts", desc: "Receive immediate notifications via Email, SMS, or Push notifications for +/-5% price swings.", icon: <Bell className="w-5 h-5" />, color: "border-[#00ffa3]/10 hover:border-[#00ffa3]/40" },
            { title: "AI Market Assistant", desc: "Query technical indicators, support clusters, and news digests directly inside an active terminal.", icon: <Brain className="w-5 h-5" />, color: "border-amber-500/10 hover:border-amber-500/40" },
            { title: "Real-Time Charts", desc: "Draw layouts directly on fully optimized TradingView layouts equipped with custom accent-colored indicators.", icon: <LineChart className="w-5 h-5" />, color: "border-[#00ffa3]/10 hover:border-[#00ffa3]/40" },
            { title: "Secure Wallet", desc: "Store credentials in absolute multi-party cold archives supported by institutional insurance pools.", icon: <Lock className="w-5 h-5" />, color: "border-blue-500/10 hover:border-blue-500/40" },
            { title: "Sentiment Analysis", desc: "Aggregate global headlines, social media channels, and whale trackers to forecast daily trends.", icon: <MessageSquare className="w-5 h-5" />, color: "border-[#00ffa3]/10 hover:border-[#00ffa3]/40" },
            { title: "Trading Signals", desc: "Leverage advanced technical alerts from core neural networks to capture swift scalp opportunities.", icon: <TrendingUp className="w-5 h-5" />, color: "border-emerald-500/10 hover:border-emerald-500/40" }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`rounded-2xl bg-[#0c1419]/80 border ${item.color} p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] cursor-pointer group text-left`}
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00ffa3] group-hover:bg-[#00ffa3] group-hover:text-[#050a0e] transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-[#8aa898] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          5. TOP CRYPTO TODAY SECTION
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative">
        <div className="flex items-center justify-between mb-12">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Top Crypto Today</h2>
            <p className="text-xs sm:text-sm text-[#8aa898] mt-1">Live exchange indexes from major trading pairs</p>
          </div>
          <button 
            onClick={() => navigate("/signup")}
            className="text-xs font-bold text-[#00ffa3] hover:text-[#00ffa3] flex items-center gap-1 group"
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
            
            return (
              <div 
                key={i} 
                onClick={() => setSelectedQuickViewCoin({ sym: row.sym, name: row.name, ...coin })}
                className="rounded-2xl bg-[#0c1419]/90 border border-white/5 p-5 hover:border-[#00ffa3]/30 hover:scale-[1.03] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm ${coin.color}`}>
                      {coin.logo}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-white">{row.name}</h3>
                      <span className="text-[10px] text-[#5a7a6a] font-bold font-mono uppercase">{row.sym}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${coin.chg >= 0 ? "bg-[#00ffa3]/10 text-[#00ffa3]" : "bg-red-500/10 text-red-500"}`}>
                    {formattedChg}
                  </span>
                </div>

                <div>
                  <p className={`text-sm font-extrabold text-white font-mono transition-all ${flashStates[row.sym] || ""}`}>${formattedPrice}</p>
                  <p className="text-[10px] text-[#5a7a6a] font-semibold mt-0.5">Cap: {row.cap}</p>
                </div>

                {/* Mini Sparkline Chart */}
                <div className="mt-4 h-12 w-full flex items-center">
                  <svg className="w-full h-10 stroke-[#00ffa3] fill-none stroke-2" viewBox="0 0 120 40">
                    <path d={sparkPath} stroke={coin.chg >= 0 ? "#00ffa3" : "#ff4d6d"} />
                    <path d={`${sparkPath} L 120 40 L 0 40 Z`} fill={coin.chg >= 0 ? "url(#upGrad)" : "url(#downGrad)"} opacity="0.05" stroke="none" />
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
          6. AI ASSISTANT SECTION
          ==================================================== */}
      <section id="ai-assistant" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00e5a0]/[0.01] blur-[120px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE CHATBOT WINDOW MOCKUP */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#00ffa3] to-cyan-400 opacity-20 blur-lg" />
            
            {/* Chatbox UI Wrapper */}
            <div className="relative rounded-2xl bg-[#0c1419] border border-[#00ffa3]/15 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              {/* Header */}
              <div className="bg-[#111c24] border-b border-white/5 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#00ffa3]/10 border border-[#00ffa3]/30 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-[#00ffa3] animate-pulse" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-white">Pulse AI Assistant</p>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-ping" />
                      <span className="text-[9px] text-[#00ffa3] font-bold uppercase tracking-wider">Engine Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-wider text-[#8aa898]">GPT-4 Premium</span>
                </div>
              </div>

              {/* Message Display Area */}
              <div className="p-5 h-[280px] overflow-y-auto space-y-4 text-xs font-body scroll-container custom-scrollbar">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00ffa3] text-[10px] shrink-0 font-bold">
                        P
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-3 max-w-[80%] text-left leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-tr from-[#00e5a0] to-[#00ffa3] text-[#050a0e] font-medium' 
                        : 'bg-[#111c24] border border-white/5 text-[#8aa898]'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-1.5 text-[#5a7a6a] text-[10px] pl-8">
                    <span className="w-1 h-1 bg-current rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span>Pulse AI is auditing orderbook...</span>
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="bg-[#111c24] border-t border-white/5 p-3 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask Pulse AI (e.g. 'Is Solana bullish?')"
                  className="flex-1 bg-black/30 border border-white/5 rounded-xl px-4 py-2 text-xs text-[#e8f0eb] placeholder-[#5a7a6a] focus:outline-none focus:border-[#00ffa3]/40"
                />
                <button 
                  type="submit"
                  className="w-9 h-9 rounded-xl bg-[#00ffa3] hover:bg-[#00ffa3] flex items-center justify-center text-[#050a0e] transition-colors shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE TEXT & INFO */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start text-left space-y-5">
            <div className="inline-flex items-center gap-1.5 text-[#00ffa3]">
              <Sparkles className="w-4.5 h-4.5" />
              <span className="text-xs font-bold uppercase tracking-wider">Advanced Language Engine</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Meet Pulse AI
            </h2>

            <p className="text-sm sm:text-base text-[#8aa898] leading-relaxed">
              Get instant market insights, portfolio analysis, trading suggestions, and AI-powered sentiment tracking in real time.
            </p>

            <div className="space-y-3.5 pt-2 w-full">
              {[
                "Instantly query real-time Coingecko and blockchain APIs via chat",
                "Generate custom multi-factor technical analysis summaries in 2 seconds",
                "Audit derivative orderbook depth and whales' coin distributions"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-white/95">
                  <Check className="w-4.5 h-4.5 text-[#00ffa3] bg-[#00ffa3]/10 rounded-full p-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={() => navigate("/signup")}
                className="bg-[#00ffa3] text-[#050a0e] font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_15px_rgba(0,255,163,0.3)] hover:opacity-95 transition-all duration-300"
              >
                Try AI Assistant
              </button>
              <button 
                onClick={() => navigate("/signin")}
                className="text-xs sm:text-sm font-semibold hover:text-[#00ffa3] transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. SECURITY SECTION
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative">
        <div className="absolute top-1/2 -right-10 w-96 h-96 bg-cyan-500/[0.01] blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-cyan-400 mb-2">
            <ShieldCheck className="w-4.5 h-4.5 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">Fortress Level Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Institutional-Grade Security
          </h2>
          <p className="text-sm sm:text-base text-[#8aa898] mt-3">
            Your credentials and funds are backed by multiple defensive parameters, state-of-the-art encryption, and independent audits.
          </p>
        </div>

        {/* Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Multi-Factor Authentication", desc: "Every transaction, key export, and profile amendment requires full 2FA credentials backed by native Google or hardware authentication blocks.", icon: <Shield className="w-6 h-6" /> },
            { title: "Encrypted Ledger Wallets", desc: "All user deposits and active balances are protected inside multi-party computation (MPC) cold storage architectures that isolate credentials from network exploits.", icon: <Lock className="w-6 h-6" /> },
            { title: "ISO Certified Infrastructure", desc: "Our core blockchain indexers, SQL connections, and backend nodes operate on fully certified architectures regularly inspected by premium cyber agencies.", icon: <Globe className="w-6 h-6" /> }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-[#0c1419]/90 border border-white/5 p-8 text-left space-y-4 hover:border-cyan-500/30 hover:scale-[1.02] transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.6)] group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-[#050a0e] transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-[#8aa898] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>



      {/* ====================================================
          9. TESTIMONIALS SECTION
          ==================================================== */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#00ffa3]/[0.01] blur-[90px] rounded-full pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved By Elite Traders
          </h2>
          <p className="text-sm sm:text-base text-[#8aa898] mt-3">
            Here's what our global trading community says about Trade Pulse's institutional setups.
          </p>
        </div>

        {/* Testimonials Carousel Wrapper */}
        <div className="max-w-3xl mx-auto relative px-4">
          <div className="relative rounded-2xl bg-[#0c1419]/90 border border-white/5 p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] text-center transition-all duration-500">
            {/* Quote decoration */}
            <div className="text-5xl text-[#00ffa3] font-serif leading-none absolute top-6 left-6 opacity-25">“</div>
            
            {/* Review text */}
            <p className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed italic z-10 relative">
              {TESTIMONIALS[testimonialIndex].review}
            </p>

            {/* Author info */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <span className="w-12 h-12 rounded-full bg-[#00ffa3]/15 border border-[#00ffa3]/30 flex items-center justify-center font-bold text-lg text-[#00ffa3]">
                {TESTIMONIALS[testimonialIndex].author[0]}
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-white">{TESTIMONIALS[testimonialIndex].author}</h4>
                <p className="text-[10px] text-[#5a7a6a] font-bold uppercase tracking-wider mt-0.5">{TESTIMONIALS[testimonialIndex].role}</p>
              </div>
            </div>

            {/* Stars rating */}
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#00ffa3] text-[#00ffa3]" />
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2.5 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setTestimonialIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${testimonialIndex === i ? 'bg-[#00ffa3] w-6' : 'bg-white/10 hover:bg-white/35'}`}
              />
            ))}
          </div>
        </div>
      </section>



      {/* ====================================================
          9.5 ABOUT US SECTION
          ==================================================== */}
      <section id="about-us" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative overflow-hidden">
        {/* Decorative subtle ambient cyan and green gradients */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#00ffa3]/[0.02] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-purple-500/[0.01] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Left Column: Vision, Mission & Core Stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ffa3]/10 border border-[#00ffa3]/25 text-[#00ffa3] text-[10px] font-extrabold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
              Who We Are
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Architecting the Next-Gen
              <span className="block mt-2 bg-gradient-to-r from-[#00ffa3] via-[#00e5a0] to-[#00ffa3] bg-clip-text text-transparent">
                Fintech Engine
              </span>
            </h2>
            
            <p className="text-sm sm:text-base text-[#8aa898] leading-relaxed mt-6 max-w-2xl">
              Trade Pulse was engineered by a decentralized collective of quantitative analysts, low-latency infrastructure engineers, and AI researchers. Frustrated by legacy, slow-executing retail dashboards, we designed a unified routing ledger that delivers microsecond-level precision, neural-network sentiment parsing, and deep institutional liquidity directly to retail traders.
            </p>
            
            <p className="text-xs sm:text-sm text-[#5a7a6a] leading-relaxed mt-4 max-w-xl font-medium">
              We operate under the philosophy that elite trading interfaces shouldn't be locked behind prime brokerage gates. Speed, absolute custody verification, and autonomous insights are baseline human rights.
            </p>

            {/* Key Metrics Bento Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-10">
              
              {/* Stat Block 1 */}
              <div className="bg-[#0c1419]/70 border border-white/5 p-5 rounded-2xl flex flex-col items-start hover:border-[#00ffa3]/20 transition-all duration-300 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:bg-[#00ffa3]/10 transition-colors">
                  <Globe className="w-4.5 h-4.5 text-[#00ffa3]" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">$14.8B+</span>
                <span className="text-[10px] text-[#8aa898] font-bold uppercase tracking-wider mt-1">Quarterly Volume</span>
              </div>
              
              {/* Stat Block 2 */}
              <div className="bg-[#0c1419]/70 border border-white/5 p-5 rounded-2xl flex flex-col items-start hover:border-[#00ffa3]/20 transition-all duration-300 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:bg-[#00ffa3]/10 transition-colors">
                  <Zap className="w-4.5 h-4.5 text-[#00ffa3]" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">&lt; 1.8ms</span>
                <span className="text-[10px] text-[#8aa898] font-bold uppercase tracking-wider mt-1">Engine Latency</span>
              </div>
              
              {/* Stat Block 3 */}
              <div className="bg-[#0c1419]/70 border border-white/5 p-5 rounded-2xl flex flex-col items-start hover:border-[#00ffa3]/20 transition-all duration-300 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:bg-[#00ffa3]/10 transition-colors">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#00ffa3]" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">99.999%</span>
                <span className="text-[10px] text-[#8aa898] font-bold uppercase tracking-wider mt-1">Uptime SLA</span>
              </div>

            </div>
          </div>
          
          {/* Right Column: Live Trading Engine Console */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl bg-[#0c1419]/90 border border-white/5 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ffa3]/[0.02] blur-[40px] pointer-events-none" />
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d6d]/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00ffa3]/40" />
                  <span className="text-[10px] text-[#5a7a6a] font-bold uppercase font-data-mono tracking-wider ml-1.5">
                    matching_engine_01
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#00ffa3] bg-[#00ffa3]/10 px-2 py-0.5 rounded border border-[#00ffa3]/20 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3]" />
                  ONLINE
                </div>
              </div>

              {/* Scrolling Live Ledger Output */}
              <div className="space-y-3 min-h-[220px] font-data-mono text-left">
                {engineLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="p-3 rounded-lg bg-black/40 border border-white/[0.02] flex items-center justify-between gap-3 text-xs text-[#8aa898] transition-all duration-300 hover:border-white/5"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        log.type === "MATCH" ? "bg-[#00ffa3]/10 text-[#00ffa3] border border-[#00ffa3]/20" :
                        log.type === "SYNC" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                        log.type === "AI" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}>
                        {log.type}
                      </span>
                      <span className="text-white truncate font-medium">{log.msg}</span>
                    </div>
                    <span className="text-[10px] text-[#5a7a6a] shrink-0 font-semibold">{log.time}</span>
                  </div>
                ))}
              </div>
              
              {/* Telemetry diagnostics stats inside ledger */}
              <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-white/5 text-left font-data-mono">
                <div>
                  <span className="block text-[8px] text-[#5a7a6a] font-bold uppercase">Active Nodes</span>
                  <span className="text-[11px] text-white font-semibold">12 // DOCKER Swarm</span>
                </div>
                <div>
                  <span className="block text-[8px] text-[#5a7a6a] font-bold uppercase">TPS Rate</span>
                  <span className="text-[11px] text-[#00ffa3] font-semibold">86,432 / sec</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ====================================================
          10. FOOTER
          ==================================================== */}
      <footer className="bg-[#020406] border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-8 gap-8 text-left pb-16 border-b border-white/5">
          {/* Column 1 - Brand description */}
          <div className="col-span-2 flex flex-col items-start space-y-4 pr-0 xl:pr-6">
            <div 
              onClick={() => navigate("/")} 
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-[#00ffa3] rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(0,255,163,0.2)]">
                <svg className="w-4.5 h-4.5 stroke-[#050a0e] fill-none stroke-[2.5]" viewBox="0 0 24 24">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-widest text-white font-display">
                TRADE<span className="text-[#00ffa3]">-</span>PULSE
              </span>
            </div>
            <p className="text-xs text-[#8aa898] leading-relaxed">
              Trade Pulse is a premium, AI-powered multi-market trading infrastructure providing high-precision indicators, deep liquidity access, and lightning-fast execution desks.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#00ffa3] hover:text-[#050a0e] flex items-center justify-center text-[#8aa898] transition-all">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#00ffa3] hover:text-[#050a0e] flex items-center justify-center text-[#8aa898] transition-all">
                <Github className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#00ffa3] hover:text-[#050a0e] flex items-center justify-center text-[#8aa898] transition-all">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Columns 2-8 - Link groups */}
          {[
            { title: "About", links: ["Our Story", "Advisors", "Careers", "Press Kit"] },
            { title: "Markets", links: ["Cryptocurrency", "Spot Assets", "Perpetuals", "Options"] },
            { title: "Trading", links: ["Fee Schedule", "API Docs", "Ledger Key", "Liquidity Pool"] },
            { title: "Support", links: ["Help Center", "Live Tickets", "Status Checker", "Security Audit"] },
            { title: "AI Features", links: ["Pulse AI Agent", "Sentiment Gauge", "Neural Signals", "Predictive Desks"] },
            { title: "Resources", links: ["Knowledge Base", "Weekly Report", "Sitemap Index", "Glossary"] }
          ].map((col, idx) => (
            <div key={idx} className="flex flex-col items-start space-y-3.5">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5 text-xs text-[#8aa898] font-medium">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <a onClick={() => navigate("/signin")} className="hover:text-[#00ffa3] transition-colors cursor-pointer">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer text */}
        <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#5a7a6a] font-semibold gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">Terms of Service</a>
            <a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">Privacy Policy</a>
            <a onClick={() => navigate("/signin")} className="hover:text-white cursor-pointer transition-colors">Risk Disclosure</a>
          </div>
          <p>© 2026 Trade Pulse. All Rights Reserved.</p>
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
              className="absolute top-8 right-8 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#00ffa3] hover:border-[#00ffa3]/30 hover:bg-[#00ffa3]/5 hover:rotate-90 transition-all duration-300 text-lg font-bold"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-10 text-left">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                <Compass className="w-8 h-8 text-[#00ffa3] animate-pulse" />
                Live Markets Explorer
              </h2>
              <p className="text-sm text-[#8aa898] mt-1.5 font-semibold">Real-time orderbook feeds and institutional market indexes</p>
            </div>

            {/* Controls Row (Search and Tabs) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-[#0c1419]/90 border border-white/5 p-4 rounded-2xl">
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
                        ? "bg-[#00ffa3] text-[#050a0e] shadow-[0_0_15px_rgba(0,255,163,0.35)]" 
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
                  className="bg-black/35 border border-white/10 rounded-xl px-5 py-2.5 pl-11 text-xs text-[#e8f0eb] placeholder-[#5a7a6a] focus:outline-none focus:border-[#00ffa3]/50 focus:ring-1 focus:ring-[#00ffa3]/50 w-full transition-all duration-300"
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
            <div className="bg-[#0c1419]/90 border border-white/5 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-[#111c24] border-b border-white/5 text-[#8aa898] uppercase tracking-wider font-extrabold text-[10px]">
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
                          ? { txt: "Accumulate", color: "bg-[#00ffa3]/10 text-[#00ffa3] border-[#00ffa3]/20" }
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
                            <td className={`px-6 py-4.5 text-right font-mono font-black text-xs ${isUp ? "text-[#00ffa3]" : "text-[#ff4d6d]"}`}>
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
                                className="bg-[#00ffa3] text-[#050a0e] text-[10px] font-extrabold uppercase px-3 py-1.5 rounded hover:shadow-[0_0_12px_rgba(0,255,163,0.3)] transition-all duration-200 font-sans"
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
            <div className="relative w-full sm:w-[440px] h-screen bg-[#0c1419]/95 border-l border-[#00ffa3]/15 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col z-10 transition-transform duration-300 animate-in slide-in-from-right-20">
              
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
                <div className="bg-[#111c24]/90 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[9px] text-[#5a7a6a] font-extrabold uppercase tracking-widest">Mark Price</p>
                    <p className={`text-2xl font-black text-white font-mono mt-1 transition-all ${flashStates[coinSym] || ""}`}>
                      ${formattedPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-black font-mono px-3 py-1 rounded-full ${
                      isUp ? "bg-[#00ffa3]/10 text-[#00ffa3]" : "bg-red-500/10 text-red-500"
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
                    <span className="text-[#00ffa3] font-mono flex items-center gap-1 font-extrabold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-ping" />
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
                    <div key={idx} className="bg-[#111c24]/90 border border-white/5 rounded-xl p-3 text-left">
                      <p className="text-[9px] text-[#5a7a6a] font-extrabold uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xs font-bold text-white font-mono mt-1">{stat.val}</p>
                    </div>
                  ))}
                </div>

                {/* Pulse AI Projections Box */}
                <div className="rounded-2xl border border-[#00ffa3]/25 bg-gradient-to-br from-[#0c1419] to-[#0d221c] p-5 text-left space-y-3 relative overflow-hidden shadow-[0_15px_30px_rgba(0,255,163,0.05)]">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ffa3]/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 text-[#00ffa3]">
                    <Brain className="w-4.5 h-4.5 animate-pulse" />
                    <h4 className="text-xs font-black uppercase tracking-wider">Pulse AI Projections</h4>
                  </div>
                  
                  <p className="text-xs text-[#8aa898] leading-relaxed font-medium">
                    {liveCoin.text}
                  </p>
                  
                  {/* Confidence block */}
                  <div className="flex justify-between items-center text-[10px] pt-1 border-t border-[#00ffa3]/10">
                    <span className="text-[#5a7a6a] font-bold">Signal Confidence:</span>
                    <span className="text-[#00ffa3] font-black font-mono bg-[#00ffa3]/10 px-2 py-0.5 rounded border border-[#00ffa3]/20">
                      94.2% ACCURATE
                    </span>
                  </div>
                </div>

              </div>

              {/* Footer action CTA */}
              <div className="p-6 border-t border-white/5 bg-[#111c24]/50">
                <button 
                  onClick={() => navigate("/signup")}
                  className="w-full bg-[#00ffa3] text-[#050a0e] font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,255,163,0.4)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 font-sans"
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

const TESTIMONIALS = [
  {
    review: "Trade Pulse has completely revolutionized my active trading desks. The AI Watchlist alerts and live news integration allow me to isolate breakout candidates with massive high-precision accuracy.",
    author: "Alex Rivera",
    role: "Proprietary Fund Manager"
  },
  {
    review: "The custom accent themes, sleek dark-glass design, and fully integrated live order book sparklines make this the most beautiful trading dashboard I have ever seen. Recruiters immediately stop scrolling.",
    author: "Sarah Chen",
    role: "Quantitative Analyst"
  },
  {
    review: "By syncing my live wallet assets with the order completion desks, Trade Pulse provides a highly unified accounting layout. Zero spinners, clean reactive pages, and excellent cyberpunk aesthetics.",
    author: "Maximilian Roth",
    role: "DeFi Venture Partner"
  }
];

export default Landing;
