/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssetTable } from "./AssetTable";
import { Button } from "@/components/ui/button";
import StockChart from "../StockDetails/StockChart";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import SideBar from "../SideBar/SideBar";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import {
  ChevronLeftIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoinDetails,
  fetchCoinList,
  fetchTreadingCoinList,
  getTop50CoinList,
} from "@/Redux/Coin/Action";
import { getUserWallet } from "@/Redux/Wallet/Action";
import { 
  MessageCircle, 
  Brain, 
  Sparkles, 
  Send, 
  Terminal, 
  Newspaper, 
  ExternalLink, 
  ArrowUpRight, 
  ShieldCheck, 
  Flame,
  ChevronRight,
  Bookmark,
  Share2,
  ArrowRight
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { sendMessage } from "@/Redux/Chat/Action";
import chatbotIcon from "@/assets/chatbot_icon.png";

// AI Market Insights - Preset responses
const PRESET_ANSWERS = {
  btc: "Based on current technical indicators and macro liquidity projections, Bitcoin (BTC) exhibits strong accumulation patterns in the $72,000–$75,000 range. Institutional inflows via spot ETFs are averaging $340M daily. Moving average convergence-divergence (MACD) on the weekly chart remains securely bullish. We project a realistic testing of the $92,000–$100,000 range in Q3 2026, supported by decreasing exchange reserves and positive regulatory tailwinds.",
  flipping: "While Solana (SOL) has temporarily flipped Ethereum in daily DEX trading volume due to high meme-token velocity and lower transaction fees, Ethereum (ETH) retains massive structural dominance in total value locked (TVL), layer-2 security settlement, and institutional trust (including spot ETFs). A permanent flip in market cap is statistically unlikely in the short term, but Solana remains a premium high-beta asset outperforming in network usage.",
  dencun: "The Ethereum Dencun upgrade (specifically EIP-4844 'proto-danksharding') introduced transient data blobs to drastically lower transaction fees on Layer-2 rollup networks like Arbitrum, Optimism, and Base. Average gas fees on L2s dropped by over 90% (often below $0.01 per trade). This changes the game for consumer applications and retail trades, strengthening Ethereum's role as a global security layer while shifting active transaction execution to Layer-2s."
};

// Premium High-Fidelity Crypto News
const NEWS_DATA = [
  {
    id: 1,
    title: "Bitcoin Surges past $75k: Institutional Inflow Reaches Unprecedented Peak",
    summary: "Institutional demand for Bitcoin continues to break records as net inflows into spot ETFs hit a new peak of $1.2B in a single week. Analysts cite sovereign wealth fund interest as the primary driver behind the massive liquidity squeeze.",
    tag: "ETF INFLOWS",
    tagColor: "bg-[#00ffa3]/15 text-[#00ffa3]",
    time: "2 hours ago",
    readTime: "3 min read",
    author: "Elena Rostova, Chief Editor",
    content: "The cryptocurrency market reached a historic milestone today as Bitcoin (BTC) surged past the $75,000 resistance level, propelled by an unprecedented wave of institutional capital. Weekly data reveals that net inflows into newly launched Spot Bitcoin ETFs surged past $1.2 Billion, representing a massive liquidity compression across major exchanges.\n\nSovereign wealth funds and pension managers are reportedly beginning to allocate capital into digital assets as part of a hedge against global fiat inflation. 'We are seeing a paradigm shift in wealth distribution,' remarked Elena Rostova, Chief Editor of TradePulse Macro. 'Supply on exchanges has fallen to multi-year lows, meaning any incremental buy order triggers exaggerated positive volatility.'\n\nShort-term technical setups indicate that if Bitcoin holds above $73,500 on weekly close, the path is clear for a continuation towards the $82,000 level. Retail volumes are also showing signs of life, though they remain considerably lower than the institutional block-trades currently dominating the order book."
  },
  {
    id: 2,
    title: "Dencun Upgrade Gas Optimization Slashes Ethereum Layer-2 Fees by 90%",
    summary: "The implementation of EIP-4844 proto-danksharding has successfully lowered gas fees across Layer-2 rollups like Base, Arbitrum, and Optimism. Micro-transactions are now highly viable for retail applications.",
    tag: "UPGRADE",
    tagColor: "bg-purple-500/15 text-purple-300",
    time: "5 hours ago",
    readTime: "4 min read",
    author: "Dr. Adrian Vance, Core Developer",
    content: "Following the successful deployment of the Ethereum Dencun upgrade, average transaction fees on leading Layer-2 scaling networks have plummeted by more than 90%. The highly anticipated integration of EIP-4844, colloquially known as proto-danksharding, has introduced a new transaction structure called 'data blobs.'\n\nPreviously, L2 rollups were forced to post transaction data directly into Ethereum's expensive call-data space. Blobs provide a temporary, dedicated database partition that automatically prunes after 18 days, dramatically reducing the fees L2 nodes pay to settle trades on mainnet. Gas fees on Base and Optimism dropped from $0.25 to fractions of a cent ($0.002), facilitating instant micro-transactions.\n\nThis upgrade lays the foundation for global-scale consumer decentralization. 'This is the dial-up to broadband moment for Web3,' noted Dr. Adrian Vance. 'We can finally run fully on-chain gaming, social networking, and micro-payment networks without pricing out everyday users.'"
  },
  {
    id: 3,
    title: "Solana Flips Ethereum in Decentralized Exchange Weekly Trading Volume",
    summary: "High throughput and negligible transaction fees have driven immense DEX activity on Solana, flipping Ethereum in weekly trading volume for the first time. MEME velocity and active wallets surge.",
    tag: "VOLUME SPIKE",
    tagColor: "bg-orange-500/15 text-orange-300",
    time: "1 day ago",
    readTime: "3 min read",
    author: "Marcus Aurelius, Quantitative Analyst",
    content: "In a stunning display of network momentum, Solana (SOL) has flipped Ethereum (ETH) in weekly decentralized exchange (DEX) volume. Weekly charts showed Solana-based exchanges settling $11.4 Billion in trades, compared to Ethereum's $10.1 Billion.\n\nMarket analysis shows this activity is heavily concentrated in Raydium and Orca, powered by continuous token launches, low slippage, and fees under $0.001. Active addresses on Solana reached a peak of 2.1 Million daily, surpassing all Ethereum-settled rollups combined.\n\nCritics point out that a large percentage of Solana's volume consists of automated arbitrage and wash-trading of low-liquidity pairs. However, the sheer transaction throughput proves Solana's hardware-centric approach is capable of processing extreme scale under massive load. SOL prices surged 12% in response, testing resistance near $185."
  },
  {
    id: 4,
    title: "SEC Establishes Clear Legislative Framework for Digital Asset Custody",
    summary: "In a surprise regulatory shift, the SEC has released a comprehensive rulebook for institutional cryptocurrency custody, clearing the runway for major US banks to offer full crypto-asset services.",
    tag: "REGULATION",
    tagColor: "bg-blue-500/15 text-blue-300",
    time: "2 days ago",
    readTime: "5 min read",
    author: "Sarah Jenkins, Regulatory Counsel",
    content: "The Securities and Exchange Commission (SEC) has officially approved a comprehensive legislative framework detailing how regulated banks and broker-dealers can custody digital assets. This unexpected regulatory alignment clears major hurdles for institutional financial services in the United States.\n\nUnder the new guidelines, banks will no longer be forced to list custody assets as liabilities on their balance sheets, an old rule that made digital asset custody financially prohibitive. The new rulebook mandates state-of-the-art multi-party computation (MPC) cold-storage key management, comprehensive insurance backing, and quarterly audits.\n\nSarah Jenkins, Regulatory Counsel at TradePulse, commented: 'This is the single most important regulatory decision since the approval of Bitcoin ETFs. By allowing Tier-1 financial institutions to offer secure custody services, the SEC has effectively normalized crypto-assets within the global financial architecture. We expect billions in traditional asset-management funds to flow into this space over the next 18 months.'"
  }
];

// Sub-component: Fear & Greed Index Dial
const FearGreedIndex = () => {
  const value = 76; // Greed
  const radius = 50;
  const strokeWidth = 8;
  const circumference = Math.PI * radius; // ~157.1
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-md relative overflow-hidden h-full group hover:border-[#00ffa3]/30 transition-all duration-300">
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#00ffa3]/5 blur-3xl rounded-full group-hover:bg-[#00ffa3]/10 transition-all duration-300"></div>
      
      <div className="flex items-center gap-1.5 self-start mb-1 text-primary">
        <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
        <p className="text-sm font-bold">Fear & Greed Index</p>
      </div>
      <p className="text-[11px] text-on-surface-variant self-start mb-4">Real-time market sentiment aggregate</p>
      
      <div className="relative w-40 h-24 flex items-center justify-center mt-2">
        <svg className="w-full h-full" viewBox="0 0 120 70">
          <defs>
            <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffb4ab" />
              <stop offset="50%" stopColor="#ffe082" />
              <stop offset="100%" stopColor="#00e290" />
            </linearGradient>
          </defs>
          {/* Track */}
          <path
            d="M 15 60 A 45 45 0 0 1 105 60"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Value Arc */}
          <path
            d="M 15 60 A 45 45 0 0 1 105 60"
            fill="none"
            stroke="url(#sentimentGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute bottom-0 text-center flex flex-col items-center">
          <span className="text-2xl font-black text-primary font-data-mono">{value}</span>
          <span className="text-[9px] font-bold text-[#00e290] uppercase tracking-widest bg-[#00e290]/10 px-2 py-0.5 rounded-full border border-[#00e290]/20">
            Greed
          </span>
        </div>
      </div>
      
      <div className="flex justify-between w-full text-[9px] text-on-surface-variant font-semibold mt-4 px-1 border-t border-outline-variant/15 pt-3">
        <span>Fear (20)</span>
        <span>Neutral (50)</span>
        <span>Greed (80)</span>
      </div>
    </div>
  );
};

const levelDetails = {
  btc: {
    title: "Bitcoin (BTC) Sentiment Profile",
    colorClass: "from-[#00ffa3]/10 to-teal-500/5 hover:border-[#00ffa3]/30",
    glowClass: "bg-[#00ffa3]/5",
    badgeColor: "bg-[#00ffa3]/15 text-[#00ffa3] border-[#00ffa3]/30",
    summary: "Strong institutional accumulation and positive social hype are keeping Bitcoin in a highly bullish phase.",
    socialHype: "High (84/100)",
    whaleStance: "Bullish Accumulation",
    outlook: "Highly Bullish"
  },
  eth: {
    title: "Ethereum (ETH) Sentiment Profile",
    colorClass: "from-[#00e290]/10 to-blue-500/5 hover:border-[#00e290]/30",
    glowClass: "bg-[#00e290]/5",
    badgeColor: "bg-[#00e290]/15 text-[#00e290] border-[#00e290]/30",
    summary: "Steady network utility and growing retail interest indicate solid medium-term support despite near-term volatility.",
    socialHype: "Moderate (67/100)",
    whaleStance: "Steady Holding",
    outlook: "Mildly Bullish"
  },
  sol: {
    title: "Solana (SOL) Sentiment Profile",
    colorClass: "from-purple-500/10 to-fuchsia-500/5 hover:border-purple-500/30",
    glowClass: "bg-purple-500/5",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    summary: "Massive decentralized finance (DeFi) activity and social media buzz are driving extreme near-term momentum.",
    socialHype: "Extreme (92/100)",
    whaleStance: "Aggressive Buy-ins",
    outlook: "Very Bullish"
  }
};

const getLevelAdvice = (coin) => {
  if (coin === "btc") {
    return `>>> INITIATING BITCOIN (BTC) SENTIMENT ANALYSIS...
[MARKET STANCE] Overall Sentiment: Highly Bullish (85% Positive)

[SOCIAL HYPE] 84/100 (High Activity)
Social platforms show a strong surge in positive mentions. Discussions are focused on long-term value, spot ETF buying, and general market optimism rather than panic.

[WHALE ACTIVITY] Active Accumulation
Large wallets (whales) are moving their Bitcoin off exchanges into secure cold storage. This indicates they plan to hold for the long term, reducing immediate selling pressure.

[RETAIL BEHAVIOR] FOMO (Fear of Missing Out) is building up gradually, but retail buyers remain mostly rational. Search trends are steady but not yet at bubble-like peaks.

[SUMMARY OUTLOOK] The market is feeling very optimistic. With institutional backing and strong holding behavior from big investors, the path of least resistance remains upward. Avoid emotional trading and watch major support levels.`;
  } else if (coin === "eth") {
    return `>>> INITIATING ETHEREUM (ETH) SENTIMENT ANALYSIS...
[MARKET STANCE] Overall Sentiment: Moderately Bullish (72% Positive)

[SOCIAL HYPE] 67/100 (Steady Interest)
Social media sentiment is steady. Discussions revolve around low Layer-2 fees following the Dencun upgrade and Ethereum's secure position as the leading smart-contract platform.

[WHALE ACTIVITY] Solid Holding
Whale addresses are keeping their funds stable, with slight accumulation noticed in decentralized staking pools. No signs of large panic selling.

[RETAIL BEHAVIOR] Retail traders are actively using Ethereum scaling networks (like Base and Arbitrum) due to low fees, creating a strong utility foundation.

[SUMMARY OUTLOOK] Solid, healthy sentiment. While Ethereum is not moving as fast as high-beta assets, its underlying usage and strong whale base provide a solid floor. A steady, reliable performer for patient market participants.`;
  } else {
    return `>>> INITIATING SOLANA (SOL) SENTIMENT ANALYSIS...
[MARKET STANCE] Overall Sentiment: Extremely Bullish (91% Positive)

[SOCIAL HYPE] 92/100 (Extreme Buzz)
Solana is currently the most talked-about cryptocurrency across all social channels. High excitement around meme tokens, fast transactions, and extremely cheap fees is driving constant hype.

[WHALE ACTIVITY] Aggressive Buying
On-chain data shows high-net-worth investors (whales) aggressively swapping other assets to buy Solana, supporting the rapid price rises.

[RETAIL BEHAVIOR] High Retail Euphoria
A huge number of active retail wallets are trading daily on Solana DEXs. Transaction counts are hitting records, showing high active retail engagement.

[SUMMARY OUTLOOK] Extreme momentum. While the hype is incredibly strong and driving prices higher, keep in mind that high excitement can lead to sudden short-term price swings. A very high-reward but highly active market to navigate.`;
  }
};


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const { coin, chatBot, auth, wallet } = useSelector((store) => store);
  const [selectedCoinId, setSelectedCoinId] = useState("bitcoin");
  const [isBotRelease, setIsBotRelease] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  // AI Insights sandbox state variables
  const [aiPromptText, setAiPromptText] = useState("");
  const [aiTerminalText, setAiTerminalText] = useState("TradePulse Intelligence Node v1.2-AI initialized.\nReady to run technical sentiment and blockchain protocol queries...\nSelect a preset prompt below or type your custom analysis.");
  const [aiIsTyping, setAiIsTyping] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("btc");
  const [hasInitialTriggered, setHasInitialTriggered] = useState(false);

  // News details modal state
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);




  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const newVal = !prev;
      localStorage.setItem("sidebar-collapsed", newVal);
      return newVal;
    });
  };

  const chatContainerRef = useRef(null);
  const containerRef = useRef(null);
  const mainContentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(1200);

  useEffect(() => {
    if (!mainContentRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContentWidth(entry.contentRect.width);
      }
    });

    observer.observe(mainContentRef.current);
    return () => observer.disconnect();
  }, []);

  const minSizePercent = Math.min((450 / contentWidth) * 100, 60);
  const defaultSizePercent = Math.min(Math.max((700 / contentWidth) * 100, 55), 70);

  useEffect(() => {
    dispatch(fetchCoinList(page));
  }, [page]);

  useEffect(() => {
    const jwt = auth.jwt || localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserWallet(jwt));
    }
  }, [auth.jwt, dispatch]);

  useEffect(() => {
    if (wallet?.userWallet?.balance !== undefined && !hasInitialTriggered) {
      setHasInitialTriggered(true);
      setTimeout(() => {
        triggerAiResponse("btc_sentiment");
      }, 500);
    }
  }, [wallet?.userWallet, hasInitialTriggered]);

  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: selectedCoinId,
        jwt: auth.jwt || localStorage.getItem("jwt"),
      })
    );
  }, [selectedCoinId]);

  useEffect(() => {
    if (category === "top50") {
      dispatch(getTop50CoinList());
    } else if (category === "trading") {
      dispatch(fetchTreadingCoinList());
    }
  }, [category]);

  // Real-time Background Polling Engine
  useEffect(() => {
    const jwt = auth.jwt || localStorage.getItem("jwt");

    const pollData = () => {
      // 1. Silently update the active category list of coins
      if (category === "all" || category === "defi") {
        dispatch(fetchCoinList(page, true)); // silent = true
      } else if (category === "top50") {
        dispatch(getTop50CoinList(true)); // silent = true
      } else if (category === "trading") {
        dispatch(fetchTreadingCoinList(true)); // silent = true
      }

      // 2. Silently update the details of the currently selected coin
      if (selectedCoinId) {
        dispatch(
          fetchCoinDetails({
            coinId: selectedCoinId,
            jwt,
            silent: true,
          })
        );
      }
    };

    // Set interval to poll every 10 seconds (10000ms)
    const intervalId = setInterval(pollData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [category, page, selectedCoinId, dispatch, auth.jwt]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatBot.messages]);

  // Cursor tracking coordinates
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        containerRef.current.style.setProperty("--mouse-x", `${x}%`);
        containerRef.current.style.setProperty("--mouse-y", `${y}%`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(
        sendMessage({
          prompt: inputValue,
          jwt: auth.jwt || localStorage.getItem("jwt"),
        })
      );
      setInputValue("");
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Keyboard shortcut listener to close news article modal with 'Escape'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsNewsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Triggering the animated AI Response terminal
  const triggerAiResponse = (promptKey, customPromptValue = "") => {
    if (aiIsTyping) return;
    
    let textToStream = "";
    let displayPrompt = "";
    
    if (promptKey.endsWith("_sentiment")) {
      const coinKey = promptKey.split("_")[0];
      textToStream = getLevelAdvice(coinKey);
      displayPrompt = `Generate real-time AI market sentiment analysis for ${coinKey.toUpperCase()}`;
    } else if (promptKey === "custom") {
      if (!customPromptValue.trim()) return;
      displayPrompt = customPromptValue;
      textToStream = `Analyzing custom query: "${customPromptValue}"...\n\nTradePulse AI Engine Aggregation:\nSentiment index: 68% Bullish.\nLiquidity metrics: Moderate accumulation. Order-book support is highly stable near current EMA channels.\nRecommendation: Maintain structural allocations with strict leverage protection. Volume profiles imply minor near-term expansion.`;
      setAiPromptText("");
    } else {
      displayPrompt = promptKey === "btc" 
        ? "Will BTC hit $100k in 2026?"
        : promptKey === "flipping" 
          ? "Is Solana flipping Ethereum soon?"
          : "Explain the impact of the Dencun upgrade";
      textToStream = PRESET_ANSWERS[promptKey];
    }

    setAiIsTyping(true);
    setAiTerminalText("");
    
    const thinkingLines = [
      `>> Executing prompt: "${displayPrompt}"`,
      ">> Querying neural network databases...",
      ">> Calculating relative volume index & sentiment averages...",
      ">> Processing blockchain transaction telemetry...",
      ">> Analysis complete. Generating structural intelligence:\n\n"
    ];

    let thinkIdx = 0;
    const printThinking = () => {
      if (thinkIdx < thinkingLines.length) {
        setAiTerminalText((prev) => prev + thinkingLines[thinkIdx] + "\n");
        thinkIdx++;
        setTimeout(printThinking, 300);
      } else {
        let charIdx = 0;
        const interval = setInterval(() => {
          if (charIdx < textToStream.length) {
            setAiTerminalText((prev) => prev + textToStream.charAt(charIdx));
            charIdx++;
          } else {
            clearInterval(interval);
            setAiIsTyping(false);
          }
        }, 12);
      }
    };
    printThinking();
  };

  const handleNewsCardClick = (newsItem) => {
    setSelectedNews(newsItem);
    setIsNewsModalOpen(true);
  };

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div 
      ref={containerRef}
      className="flex min-h-[calc(100vh-64px)] mouse-glow-container text-body-md relative overflow-hidden bg-background"
    >
      {/* Ambient background glows */}
      <div className="ambient-glow animate-ambient-float"></div>
      <div className="fixed inset-0 mouse-glow-element pointer-events-none z-0"></div>

      {/* SideBar for Desktop (Persistent & Pin-fixed) */}
      <aside className={`hidden md:flex flex-col h-[calc(100vh-64px)] ${isSidebarCollapsed ? "w-20" : "w-64"} fixed left-0 top-16 z-40 transition-all duration-300`}>
        <SideBar isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />
      </aside>

      {/* Main Content Area (Updated to enable full page vertical scrolling) */}
      <div 
        ref={mainContentRef}
        className={`flex-1 ${isSidebarCollapsed ? "md:pl-20" : "md:pl-64"} flex flex-col h-[calc(100vh-64px)] overflow-y-auto scroll-container z-10 transition-all duration-300 bg-background`}
      >
        {/* Fold 1: Main Trading Console Dashboard (locked to viewport height) */}
        <div className="h-[calc(100vh-64px)] shrink-0 w-full relative border-b border-outline-variant/20 flex flex-col overflow-hidden bg-surface-container-lowest">
          <PanelGroup
            direction="horizontal"
            className="flex-1"
          >
            {/* Left Panel: Coin Market list */}
            <Panel defaultSize={defaultSizePercent} minSize={minSizePercent}>
              <div className="h-full border-r border-outline-variant flex flex-col bg-surface-container-lowest overflow-hidden animate-fade-in-up [animation-delay:100ms]">
                <div className="p-4 flex items-center gap-3 bg-surface-container-lowest">
                  <button
                    onClick={() => setCategory("all")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      category === "all"
                        ? "bg-[#00ffa3] text-[#007146]"
                        : "bg-surface-container-high text-on-surface-variant hover:bg-[#323538] hover:text-white"
                    }`}
                  >
                    All
                  </button>

                  <button
                    onClick={() => setCategory("top50")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      category === "top50"
                        ? "bg-[#00ffa3] text-[#007146]"
                        : "bg-surface-container-high text-on-surface-variant hover:bg-[#323538] hover:text-white"
                    }`}
                  >
                    Top 50
                  </button>

                  <button
                    onClick={() => setCategory("defi")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      category === "defi"
                        ? "bg-[#00ffa3] text-[#007146]"
                        : "bg-surface-container-high text-on-surface-variant hover:bg-[#323538] hover:text-white"
                    }`}
                  >
                    DeFi
                  </button>
                </div>

                <div className="flex-1 overflow-hidden">
                  <AssetTable
                    category={category}
                    coins={
                      category === "all"
                        ? coin.coinList
                        : category === "top50"
                        ? coin.top50
                        : coin.coinList
                    }
                    selectedCoinId={selectedCoinId}
                    onSelectCoin={setSelectedCoinId}
                  />
                </div>

                {category === "all" && (
                  <div className="p-4 border-t border-outline-variant flex justify-between items-center text-label-xs text-on-surface-variant font-medium bg-surface-container-lowest">
                    <button
                      disabled={page === 1}
                      onClick={() => handlePageChange(page - 1)}
                      className="flex items-center gap-1 hover:text-primary transition-colors disabled:opacity-50 disabled:hover:text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-sm">chevron_left</span> Previous
                    </button>
                    <div className="flex gap-2">
                      <span className="text-primary font-bold">{page}</span>
                    </div>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      Next <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                )}
              </div>
            </Panel>

            <PanelResizeHandle className="hidden lg:block w-[1px] bg-outline-variant hover:bg-surface-tint cursor-col-resize transition-all" />

            {/* Right Panel: Trading Chart & Details */}
            <Panel defaultSize={100 - defaultSizePercent} minSize={30}>
              <div className="hidden lg:flex h-full flex-col bg-surface overflow-hidden relative animate-fade-in-up [animation-delay:200ms] p-5">
                {/* Shimmer Overlay */}
                <div className="chart-shimmer animate-shimmer"></div>
                
                <div className="flex-1 min-h-[400px]">
                  <StockChart coinId={selectedCoinId} />
                </div>

                {/* Price / Coin Details snapshot block styled elegantly */}
                {coin.coinDetails && (
                  <div className="px-6 py-4 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50 rounded-xl mt-4 z-10 w-full text-left">
                    <div className="flex gap-5 items-center">
                      <Avatar className="w-10 h-10 border border-outline-variant">
                        <AvatarImage src={coin.coinDetails?.image?.large} />
                        <AvatarFallback className="bg-surface-container-high text-primary font-bold">
                          {coin.coinDetails?.symbol?.toUpperCase() || "C"}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-primary">{coin.coinDetails?.symbol?.toUpperCase()}</p>
                          <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/40"></span>
                          <p className="text-on-surface-variant text-sm">{coin.coinDetails?.name}</p>
                        </div>

                        <div className="flex items-baseline gap-4 mt-1">
                          <p className="text-2xl font-bold text-primary font-data-mono">
                            ${coin.coinDetails?.market_data?.current_price?.usd?.toLocaleString() || "0.00"}
                          </p>

                          <p
                            className={`text-sm font-bold font-data-mono flex items-center animate-pulse-slow ${
                              coin.coinDetails?.market_data?.market_cap_change_percentage_24h < 0
                                ? "text-[#ffb4ab] price-down"
                                : "text-[#00e290] price-up"
                            }`}
                          >
                            <span className="material-symbols-outlined text-lg mr-0.5">
                              {coin.coinDetails?.market_data?.market_cap_change_percentage_24h < 0
                                ? "arrow_drop_down"
                                : "arrow_drop_up"}
                            </span>
                            {coin.coinDetails?.market_data?.market_cap_change_percentage_24h?.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate(`/market/${coin.coinDetails?.id}`)}
                      className="bg-[#00ffa3] hover:bg-[#00ffa3]/80 text-[#007146] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                    >
                      Trade Asset
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Panel>
          </PanelGroup>
          {/* Subtle scroll down indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] text-on-surface-variant font-medium pointer-events-none animate-pulse-slow">
            <span>Scroll for News & Insights</span>
            <span className="material-symbols-outlined text-xs animate-bounce text-[#00ffa3]">keyboard_double_arrow_down</span>
          </div>
        </div>

        {/* Fold 2: Market News Section */}
        <section className="px-8 pt-16 pb-8 max-w-7xl mx-auto w-full z-10 shrink-0">
          <div className="flex items-center gap-2 mb-8 border-b border-outline-variant/20 pb-4">
            <Newspaper className="w-5 h-5 text-[#00ffa3]" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">Market News & Intelligence</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">Latest updates driving digital and decentralized capital markets</p>
            </div>
          </div>

          {/* Grid Layout for horizontal/vertical cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NEWS_DATA.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNewsCardClick(item)}
                className="flex flex-col justify-between p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-md relative overflow-hidden group cursor-pointer hover:border-[#00ffa3]/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Background soft glow on hover */}
                <div className="absolute inset-0 bg-[#00ffa3]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-[#00ffa3]/10 ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-medium">
                      <span>{item.time}</span>
                      <span className="w-1 h-1 rounded-full bg-on-surface-variant/40"></span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-sm md:text-base font-bold text-primary leading-snug group-hover:text-[#00ffa3] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-on-surface-variant/90 leading-relaxed mt-2.5 line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-outline-variant/15 mt-6 pt-4 text-xs font-semibold text-primary">
                  <span className="text-[11px] text-on-surface-variant">By {item.author}</span>
                  <button className="flex items-center gap-1 text-[#00ffa3] hover:text-[#00ffa3]/80 transition-colors font-bold text-[11px]">
                    Read More 
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>


        </section>

        {/* Fold 3: Premium AI Market Insights Section */}
        <section className="px-8 py-12 max-w-7xl mx-auto w-full z-10 shrink-0">
          <div className="flex items-center justify-between mb-8 border-b border-outline-variant/20 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#00ffa3] animate-pulse" />
                <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">AI Market Insights</h2>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">Real-time technical analysis & sentiment aggregation</p>
            </div>
            
            <div className="flex items-center gap-2 bg-[#00ffa3]/10 border border-[#00ffa3]/20 px-3 py-1 rounded-full animate-pulse-slow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3]"></span>
              <span className="text-[10px] font-bold text-[#00ffa3] tracking-widest font-data-mono">INTELLIGENCE NETWORK ONLINE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sentiment Meter Dial */}
            <div className="lg:col-span-1">
              <FearGreedIndex />
            </div>

            {/* AI Custom Query Terminal Sandbox */}
            <div className="lg:col-span-2 flex flex-col p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 backdrop-blur-md relative overflow-hidden h-full group hover:border-[#00ffa3]/30 transition-all duration-300 text-left">
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-[#00ffa3]/5 blur-3xl rounded-full group-hover:bg-[#00ffa3]/10 transition-all duration-300"></div>

              <div className="flex items-center justify-between mb-4 border-b border-outline-variant/10 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400 font-data-mono">tradepulse_ai_sandbox.sh</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
                </div>
              </div>

              {/* Premium Experience Level Selector Tab Group */}
              <div className="flex bg-[#0b0e11] border border-outline-variant/30 rounded-xl p-1 mb-4 w-full">
                {["btc", "eth", "sol"].map((coin) => {
                  const isActive = selectedLevel === coin;
                  const label = coin === "btc" ? "🪙 Bitcoin (BTC)" : coin === "eth" ? "🔷 Ethereum (ETH)" : "☀️ Solana (SOL)";
                  return (
                    <button
                      key={coin}
                      disabled={aiIsTyping}
                      onClick={() => {
                        setSelectedLevel(coin);
                        triggerAiResponse(coin + "_sentiment");
                      }}
                      className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all duration-300 disabled:opacity-50 ${
                        isActive
                          ? "bg-[#00ffa3]/15 text-[#00ffa3] border border-[#00ffa3]/30 shadow-[0_0_10px_rgba(0,255,163,0.08)]"
                          : "text-on-surface-variant hover:text-white border border-transparent hover:bg-white/[0.02]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Glowing Console Output */}
              <div className="flex-1 min-h-[140px] bg-[#0b0e11] border border-outline-variant/30 rounded-xl p-4 mb-4 text-xs font-data-mono text-[#00ffa3]/90 overflow-y-auto max-h-[180px] custom-scrollbar shadow-inner select-text text-left">
                <pre className="whitespace-pre-wrap leading-relaxed">{aiTerminalText}</pre>
                {aiIsTyping && <span className="inline-block w-2 h-4 ml-1 bg-[#00ffa3] animate-blink"></span>}
              </div>

              {/* Input analysis box & Preset Click Prompts wrapper */}
              <div className="flex flex-col md:flex-row gap-3 mb-4 items-stretch md:items-center justify-between">
                {/* Preset Click Prompts */}
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={aiIsTyping}
                    onClick={() => triggerAiResponse("btc")}
                    className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-[#0b0e11] border border-outline-variant/30 text-on-surface-variant hover:border-[#00ffa3] hover:text-white transition-all disabled:opacity-50"
                  >
                    💭 BTC $100k?
                  </button>
                  <button
                    disabled={aiIsTyping}
                    onClick={() => triggerAiResponse("flipping")}
                    className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-[#0b0e11] border border-outline-variant/30 text-on-surface-variant hover:border-[#00ffa3] hover:text-white transition-all disabled:opacity-50"
                  >
                    💭 SOL Flips ETH?
                  </button>
                  <button
                    disabled={aiIsTyping}
                    onClick={() => triggerAiResponse("dencun")}
                    className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold bg-[#0b0e11] border border-outline-variant/30 text-on-surface-variant hover:border-[#00ffa3] hover:text-white transition-all disabled:opacity-50"
                  >
                    💭 Dencun
                  </button>
                </div>

                {/* Input query field */}
                <div className="flex gap-2 flex-1 max-w-lg">
                  <input
                    disabled={aiIsTyping}
                    className="flex-1 bg-[#0b0e11] border border-outline-variant/30 rounded-xl px-4 py-2 text-xs text-primary placeholder-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-[#00ffa3] disabled:opacity-50"
                    placeholder="Ask a custom crypto question..."
                    value={aiPromptText}
                    onChange={(e) => setAiPromptText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && triggerAiResponse("custom", aiPromptText)}
                  />
                  <Button
                    disabled={aiIsTyping || !aiPromptText.trim()}
                    onClick={() => triggerAiResponse("custom", aiPromptText)}
                    className="bg-[#00ffa3] hover:bg-[#00ffa3]/80 text-[#007146] font-bold flex items-center gap-1 text-[11px] px-3.5 py-2 rounded-xl transition-all shadow-lg shadow-[#00ffa3]/10 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Analyze
                  </Button>
                </div>
              </div>

              {/* Dynamic AI Trading Compass Card */}
              {(() => {
                const activeDetails = levelDetails[selectedLevel || "btc"];

                return (
                  <div className={`mt-2 p-5 rounded-2xl bg-gradient-to-r ${activeDetails.colorClass} border border-outline-variant/30 relative overflow-hidden transition-all duration-300 group/compass shadow-md text-left`}>
                    <div className={`absolute right-0 top-0 w-48 h-48 ${activeDetails.glowClass} blur-3xl rounded-full pointer-events-none transition-all duration-300`} />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10 w-full">
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Sparkles className="w-4 h-4 text-[#00ffa3] animate-pulse" />
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase border ${activeDetails.badgeColor}`}>
                            {(selectedLevel || "btc").toUpperCase()} SENTIMENT
                          </span>
                          <span className="text-[10px] text-on-surface-variant font-data-mono font-medium bg-black/30 px-2 py-0.5 rounded border border-outline-variant/10">
                            Real-Time Outlook
                          </span>
                        </div>
                        
                        <h3 className="text-base font-extrabold text-primary tracking-tight">
                          {activeDetails.title}
                        </h3>
                        
                        <p className="text-xs text-on-surface-variant leading-relaxed mt-1.5 max-w-xl">
                          {activeDetails.summary}
                        </p>

                        {/* Dynamic Sentiment Indicators */}
                        <div className="grid grid-cols-3 gap-4 mt-3 max-w-md bg-black/40 border border-outline-variant/20 rounded-xl p-3 font-data-mono">
                          <div>
                            <span className="text-[9px] text-on-surface-variant block font-bold uppercase tracking-wider">Social Hype</span>
                            <span className="text-xs font-black text-[#00ffa3] mt-0.5 block">
                              {activeDetails.socialHype}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] text-on-surface-variant block font-bold uppercase tracking-wider">Whale Stance</span>
                            <span className="text-xs font-black text-[#00e290] mt-0.5 block">
                              {activeDetails.whaleStance}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] text-on-surface-variant block font-bold uppercase tracking-wider">Overall Outlook</span>
                            <span className="text-xs font-black text-[#00e290] mt-0.5 block">
                              {activeDetails.outlook}
                            </span>
                          </div>
                        </div>
                      </div>
                      

                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 rounded-xl bg-surface-container-low/40 border border-outline-variant/20 flex gap-4 items-center">
              <span className="w-10 h-10 rounded-lg bg-[#00e290]/10 flex items-center justify-center text-[#00e290] font-bold text-sm">
                BTC
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Bitcoin Index Position</p>
                <p className="text-sm font-black text-primary mt-0.5">🟢 STRONG BULLISH MOMENTUM</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low/40 border border-outline-variant/20 flex gap-4 items-center">
              <span className="w-10 h-10 rounded-lg bg-[#ffb4ab]/10 flex items-center justify-center text-[#ffb4ab] font-bold text-sm">
                ETH
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Ethereum Core Pivot</p>
                <p className="text-sm font-black text-primary mt-0.5">🔴 TESTING EMA RESISTANCE</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low/40 border border-outline-variant/20 flex gap-4 items-center">
              <span className="w-10 h-10 rounded-lg bg-[#00e290]/10 flex items-center justify-center text-[#00e290] font-bold text-sm">
                SOL
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Solana Telemetry volume</p>
                <p className="text-sm font-black text-primary mt-0.5">🟢 ACCUMULATION BREAKOUT</p>
              </div>
            </div>
          </div>
        </section>

        {/* Fold 4: Platform Footer Component */}
        <footer className="w-full bg-[#0b0e11] border-t border-outline-variant/20 pt-16 pb-8 px-8 mt-16 z-20 shrink-0">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent font-display-lg tracking-wider">
                  TradePulse
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#00ffa3]/10 text-[#00ffa3] border border-[#00ffa3]/20 font-data-mono">
                  v1.2-AI
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed max-w-[240px]">
                AI-powered cryptocurrency intelligence & transaction execution platform. Empowering retail traders with institutional-grade data.
              </p>
              <div className="flex items-center gap-2.5 mt-2 bg-surface-container-low border border-outline-variant/30 px-3 py-1.5 rounded-xl w-fit relative">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute"></span>
                <span className="text-[10px] font-bold text-emerald-400 font-data-mono tracking-wider pl-1">API STATUS: ONLINE</span>
              </div>
            </div>

            {/* Links Column 1 */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-primary uppercase tracking-widest text-[#00ffa3]">Explore</p>
              <ul className="flex flex-col gap-2 text-xs text-on-surface-variant font-medium">
                <li><a href="/" className="hover:text-[#00ffa3] transition-colors">Markets Terminal</a></li>
                <li><a href="/portfolio" className="hover:text-[#00ffa3] transition-colors">My Portfolio</a></li>
                <li><a href="/watchlist" className="hover:text-[#00ffa3] transition-colors">Active Watchlist</a></li>
                <li><a href="/profile" className="hover:text-[#00ffa3] transition-colors">Trader Profile</a></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-primary uppercase tracking-widest text-[#00ffa3]">Resources</p>
              <ul className="flex flex-col gap-2 text-xs text-on-surface-variant font-medium">
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">AI Core Docs</a></li>
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">Trading Tutorials</a></li>
                <li><a href="/support" className="hover:text-[#00ffa3] transition-colors">Support Center</a></li>
              </ul>
            </div>

            {/* Links Column 3 */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-primary uppercase tracking-widest text-[#00ffa3]">Legal</p>
              <ul className="flex flex-col gap-2 text-xs text-on-surface-variant font-medium">
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">Risk Disclosure</a></li>
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">AML Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom row */}
          <div className="max-w-7xl mx-auto border-t border-outline-variant/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-on-surface-variant font-medium">
              © 2026 TradePulse. All rights reserved. Designed for elite cryptocurrency intelligence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-on-surface-variant hover:text-[#00ffa3] transition-all hover:scale-110">
                <span className="material-symbols-outlined text-lg">code</span>
              </a>
              <a href="#" className="text-on-surface-variant hover:text-[#00ffa3] transition-all hover:scale-110">
                <span className="material-symbols-outlined text-lg">terminal</span>
              </a>
              <a href="#" className="text-on-surface-variant hover:text-[#00ffa3] transition-all hover:scale-110">
                <span className="material-symbols-outlined text-lg">forum</span>
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Chat Bot Section */}
      <section className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] flex flex-col justify-end items-end gap-2">
        {isBotRelease && (
          <div className="mb-4 rounded-2xl w-[20rem] md:w-[25rem] h-[55vh] bg-surface-container-low border border-outline-variant shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-outline-variant px-5 py-3 bg-surface-container-high/50">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
                  <img
                    alt="Bot"
                    className="w-full h-full object-cover"
                    src={chatbotIcon}
                  />
                </div>
                <p className="font-bold text-primary font-body-md text-sm">TradePulse Assistant</p>
              </div>
              <Button 
                onClick={handleBotRelease} 
                size="icon" 
                variant="ghost"
                className="h-8 w-8 rounded-full text-on-surface-variant hover:text-white hover:bg-[#323538]"
              >
                <Cross1Icon className="h-3 w-3" />
              </Button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto gap-4 px-4 py-4 scroll-container flex flex-col bg-[#0b0e11]">
              <div className="self-start pb-2 w-auto max-w-[85%]">
                <div className="px-4 py-2.5 rounded-2xl bg-surface-container-low text-primary text-xs border border-outline-variant/30">
                  <p className="font-semibold text-emerald-400 mb-1">hi, {auth.user?.fullName}</p>
                  <p className="text-on-surface-variant leading-relaxed">
                    You can ask crypto related questions. How can I help you today?
                  </p>
                </div>
              </div>

              {chatBot.messages.map((item, index) => (
                <div
                  ref={index === chatBot.messages.length - 1 ? chatContainerRef : null}
                  key={index}
                  className={`${
                    item.role === "user" ? "self-end" : "self-start"
                  } pb-2 w-auto max-w-[85%]`}
                >
                  {item.role === "user" ? (
                    <div className="px-4 py-2 rounded-2xl bg-[#00ffa3] text-[#003920] text-xs font-semibold">
                      {item.prompt}
                    </div>
                  ) : (
                    <div className="px-4 py-2 rounded-2xl bg-surface-container-low text-primary text-xs border border-outline-variant/30">
                      <p className="text-on-surface-variant leading-relaxed">{item.ans}</p>
                    </div>
                  )}
                </div>
              ))}

              {chatBot.loading && (
                <div className="self-start pb-2 w-auto max-w-[85%] flex items-center gap-2 text-[10px] text-on-surface-variant animate-pulse font-data-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-surface-tint"></span>
                  fetching data...
                </div>
              )}
            </div>

            {/* Input field */}
            <div className="p-3 border-t border-outline-variant bg-surface-container-low">
              <input
                className="w-full bg-[#0b0e11] border border-outline-variant rounded-xl px-4 py-2 text-xs text-primary placeholder-on-surface-variant focus:outline-none focus:ring-1 focus:ring-surface-tint"
                placeholder="write prompt..."
                onChange={handleChange}
                value={inputValue}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleBotRelease}
          className="bg-surface-bright text-primary border border-outline-variant shadow-xl px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#323538] transition-all group animate-fade-in-up [animation-delay:400ms]"
        >
          <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
            <img
              alt="Bot"
              className="w-full h-full object-cover"
              src={chatbotIcon}
            />
          </div>
          <span className="font-bold text-xs text-white">AI Assistant</span>
          <div className="w-1.5 h-1.5 rounded-full bg-surface-tint group-hover:animate-ping"></div>
        </button>
      </section>

      {/* Fold 5: High-Fidelity News Details Read Overlay Modal */}
      {isNewsModalOpen && selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-surface-container-low border border-outline-variant/40 rounded-2xl shadow-2xl overflow-hidden animate-scale-up select-text">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-outline-variant/20 bg-surface-container-high/40">
              <div className="pr-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-[#00ffa3]/10 ${selectedNews.tagColor}`}>
                    {selectedNews.tag}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-semibold">
                    <span>{selectedNews.time}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/40"></span>
                    <span>{selectedNews.readTime}</span>
                  </div>
                </div>
                <h2 className="text-base md:text-xl font-bold text-primary leading-snug">
                  {selectedNews.title}
                </h2>
              </div>
              <button
                onClick={() => setIsNewsModalOpen(false)}
                className="p-2 rounded-full text-on-surface-variant hover:bg-[#323538] hover:text-white transition-all border border-transparent hover:border-outline-variant/30 flex-shrink-0"
              >
                <Cross1Icon className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Scrollable Article content) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-container bg-[#0b0e11] text-xs md:text-sm">
              {/* Fake visual header or cover graphic */}
              <div className="w-full h-32 md:h-40 rounded-xl bg-gradient-to-br from-[#00ffa3]/20 via-[#00ffa3]/5 to-transparent border border-outline-variant/30 flex flex-col justify-between p-4 mb-6 relative overflow-hidden">
                <div className="absolute right-[-20%] bottom-[-20%] w-60 h-60 bg-[#00ffa3]/10 blur-3xl rounded-full pointer-events-none"></div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#00ffa3] font-data-mono bg-[#00ffa3]/10 w-fit px-2 py-0.5 rounded border border-[#00ffa3]/10">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VERIFIED TRADE-PULSE INTEL
                </div>
                <span className="text-[10px] text-on-surface-variant font-medium">Published by: {selectedNews.author}</span>
              </div>

              {/* Text content formatted beautifully */}
              <div className="text-on-surface-variant leading-relaxed space-y-4 pr-1 text-justify">
                {selectedNews.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Simulated comment segment */}
              <div className="mt-8 border-t border-outline-variant/20 pt-6">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Simulated Comments (3)</h4>
                <div className="space-y-4">
                  <div className="flex gap-3 bg-surface-container-low/40 border border-outline-variant/10 p-3 rounded-xl">
                    <Avatar className="w-6 h-6 border border-outline-variant">
                      <AvatarFallback className="bg-surface-bright text-[10px] font-bold text-primary">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[10px] font-bold text-primary">John_Doe_Trader</span>
                        <span className="text-[9px] text-on-surface-variant">1 hour ago</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
                        Spot ETF metrics are wild right now. Literally no liquidity on exchanges. Any massive spot buyer pushes prices significantly. Hodling!
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-surface-container-low/40 border border-outline-variant/10 p-3 rounded-xl">
                    <Avatar className="w-6 h-6 border border-outline-variant">
                      <AvatarFallback className="bg-surface-bright text-[10px] font-bold text-primary">SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[10px] font-bold text-primary">SolanaClicker</span>
                        <span className="text-[9px] text-on-surface-variant">4 hours ago</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
                        Flipping weekly volume was bound to happen with standard fees being so high on Ethereum mainnet. L2s are catching up but Solana UX is just single click.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer (Action tools) */}
            <div className="flex items-center justify-between p-4 border-t border-outline-variant/20 bg-surface-container-high/40">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-surface-bright hover:bg-[#323538] text-primary transition-all border border-outline-variant/30">
                  <Bookmark className="w-3.5 h-3.5 text-[#00ffa3]" />
                  Bookmark
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-surface-bright hover:bg-[#323538] text-primary transition-all border border-outline-variant/30">
                  <Share2 className="w-3.5 h-3.5 text-[#00ffa3]" />
                  Share Intel
                </button>
              </div>

              <button
                onClick={() => setIsNewsModalOpen(false)}
                className="bg-[#00ffa3] hover:bg-[#00ffa3]/90 text-[#007146] font-bold text-xs px-5 py-2 rounded-xl transition-all shadow-md"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}




    </div>
  );
};

export default Home;