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
  BookOpen, 
  ExternalLink, 
  ArrowUpRight, 
  ShieldCheck, 
  Flame,
  ChevronRight,
  Bookmark,
  Share2,
  ArrowRight,
  Shield
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
};const LEARN_COURSES = [
  {
    id: "order-book",
    tag: "Beginner",
    duration: "5 min read",
    icon: "BookOpen",
    title: "Understanding Order Book Velocity & Depth",
    description: "Deconstruct Level 2 trading grids, order matching algorithms, bid-ask spreads, and identifying whale accumulation walls.",
    content: [
      "Order books are the reactive heartbeat of all liquid markets. Rather than looking at simple line charts, institutional proprietary desks evaluate the two-sided limit order queue to measure shifting supply and demand pressure.",
      "### Core Components of Level 2 Data",
      "Level 2 data provides the full depth of the market by displaying the quantity of bids (buyers) and asks (sellers) clustered at specific price boundaries. Analyzing these zones reveals where large market participants are placing limit orders.",
      "1. Bid Depth: The aggregate volume of buy limit orders waiting below the current spread.",
      "2. Ask Depth: The aggregate volume of sell limit orders waiting above the spread.",
      "3. The Spread: The structural gap between the highest active bid and the lowest active ask.",
      "### Order Book Imbalance Formula",
      "We can mathematically model the immediate buying/selling velocity bias by evaluating the Volume Imbalance (VI) ratio:",
      "```\nVI = (Bid Volume - Ask Volume) / (Bid Volume + Ask Volume)\n```",
      "A high positive VI (e.g. > +0.3) indicates significant buy interest stacking at near-market ranges, suggesting an imminent short-term upward price pressure.",
      "### Spotting Liquidity Walls",
      "Whales and market-making desks often place large structural limit blocks (known as 'walls') to defend key levels or accumulate positions without triggering slippage. Watch for static volume clusters on the depth chart to locate true support grids."
    ]
  },
  {
    id: "ai-signals",
    tag: "Advanced",
    duration: "8 min read",
    icon: "Sparkles",
    title: "Trading with AI-Generated Sentiment Vectors",
    description: "Learn how to parse natural language processing (NLP) models, social volume rates, and incorporate AI signals into RSI trends.",
    content: [
      "In the modern fintech era, trading is no longer limited to standard mathematical averages. Natural Language Processing (NLP) models parse thousands of media streams, regulatory filings, and social channels per second to formulate sentiment trends.",
      "### What is a Sentiment Vector?",
      "A sentiment vector is a multidimensional score computed by neural network models that measures the momentum and velocity of market discussions. TradePulse's sentiment parser processes these scores into three indices:",
      "1. Hype Index: The raw volume velocity of asset mentions.",
      "2. Polarity Score: The negative-to-positive ratio of sentiment (ranging from -1.0 to +1.0).",
      "3. Fear & Greed Index: An aggregated dial capturing order book imbalances, volatility changes, and sentiment vectors.",
      "### Neural Signal Indicator Strategy",
      "Advanced quantitative strategies combine standard oscillators with sentiment polarity thresholds. Below is a mock algorithmic ledger:",
      "```javascript\n// Neural-RSI Overbought Filter\nif (RSI_4H < 30 && AISentimentPolarity > 0.45) {\n  triggerSignal('STRONG_BUY');\n} else if (RSI_4H > 70 && AISentimentPolarity < -0.30) {\n  triggerSignal('STRONG_SELL');\n}\n```",
      "### Avoiding Sentiment Traps",
      "Be cautious of sudden social hype surges that lack corresponding order book volume. A retail sentiment spike without institutional spot order book buying represents a retail liquidity trap, which often results in sudden liquidation cascades."
    ]
  },
  {
    id: "risk-calibration",
    tag: "Intermediate",
    duration: "6 min read",
    icon: "Shield",
    title: "Dynamic Volatility Stop-Loss Calibration",
    description: "Safeguard trading capital during systemic market cascades using the Kelly Criterion and Average True Range (ATR) models.",
    content: [
      "Surviving high-volatility liquidations is the absolute priority of professional asset management. Without systematic risk parameters, even the most accurate trading algorithms will inevitably experience capital ruin.",
      "### The Kelly Criterion Model",
      "The Kelly Criterion is an allocation sizing formula designed to maximize the long-term compounding rate of capital by balancing win probability against payout ratios:",
      "```\nKelly Fraction (f*) = (p * b - q) / b\n```",
      "Where:\n- p = Probability of win\n- q = Probability of loss (1 - p)\n- b = Payout ratio (Profit / Loss)",
      "Always employ a 'fractional Kelly' (e.g. 0.25f*) to safeguard against variance and model estimation errors.",
      "### ATR-Based Stop-Loss Placement",
      "Fixed percentage stop-losses (e.g. always placing stops at -2%) fail to account for current market volatility. Instead, calibrate stop offsets using the Average True Range (ATR) indicator over a 14-period window.",
      "```\nStop-Loss Distance = Entry Price - (2.5 * ATR_14)\n```",
      "This ensures your stop lies outside standard noise levels, preventing you from being prematurely shaken out of positions during volatile sweeps."
    ]
  }
];

const LearnIcon = ({ name, className }) => {
  if (name === "BookOpen") return <BookOpen className={className} />;
  if (name === "Sparkles") return <Sparkles className={className} />;
  if (name === "Shield") return <Shield className={className} />;
  return <BookOpen className={className} />;
};

const levelDetails = {
  beginner: {
    title: "Understanding Order Book Depth",
    colorClass: "from-[#00ffa3]/10 to-teal-500/5 hover:border-[#00ffa3]/30",
    glowClass: "bg-[#00ffa3]/5",
    badgeColor: "bg-[#00ffa3]/15 text-[#00ffa3] border-[#00ffa3]/30",
    summary: "Master bid-ask spreads, order book imbalance ratio, and identifying key accumulation zones.",
    cta: "Launch Depth Academy Module",
    courseIndex: 0
  },
  intermediate: {
    title: "Dynamic Volatility Stop-Loss Calibration",
    colorClass: "from-[#00e290]/10 to-blue-500/5 hover:border-[#00e290]/30",
    glowClass: "bg-[#00e290]/5",
    badgeColor: "bg-[#00e290]/15 text-[#00e290] border-[#00e290]/30",
    summary: "Limit drawdown and systematic risk using Kelly Criterion and Average True Range (ATR) models.",
    cta: "Calibrate Stop-Loss Simulator",
    courseIndex: 2
  },
  advanced: {
    title: "AI Sentiment Polarity Vectors",
    colorClass: "from-purple-500/10 to-fuchsia-500/5 hover:border-purple-500/30",
    glowClass: "bg-purple-500/5",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    summary: "Leverage natural language processing streams, sentiment vectors, and social hype signals in your strategy.",
    cta: "Optimize Neural Signal Engine",
    courseIndex: 1
  }
};

const getLevelAdvice = (level, balance) => {
  const isDemo = balance === undefined || balance === null || balance === 0;
  const activeBalance = isDemo ? 10000 : balance;
  const balanceStr = isDemo ? `$${activeBalance.toLocaleString()} (Demo)` : `$${activeBalance.toLocaleString()} (Live)`;

  if (level === "beginner") {
    const maxRisk = (activeBalance * 0.01).toFixed(2);
    const maxPos = (activeBalance * 0.10).toFixed(2);
    return `>>> INITIATING BEGINNER LEVEL ADVISORY Telemetry...
[ACCOUNT STANDING] Available Balance: ${balanceStr}

[RULE 1] Capital Preservation is Priority #1. Never risk more than 1% to 2% of equity per trade.
[CALCULATION] Maximum Risk Capital per trade: $${maxRisk}
[CALCULATION] Suggested Maximum Position Size: $${maxPos} (10% allocation)

[STRATEGY] Spot Market Accumulation & Order Book Walls:
1. Scan for key support blocks on major assets (BTC, ETH) by looking for whale buy walls in the Level 2 order depth.
2. Avoid using leverage (keep leverage at 1x).
3. Always place a hard Stop-Loss order immediately after trade execution.
4. Aim for simple 1:2 risk-to-reward ratio setups.

[NEXT STEP COMPASS] Focus on learning the "Understanding Order Book Velocity & Depth" module in TradePulse Academy.`;
  } else if (level === "intermediate") {
    const maxRisk = (activeBalance * 0.02).toFixed(2);
    const posLimit = (activeBalance * 0.20).toFixed(2);
    const atrBuffer = 2.5;
    return `>>> INITIATING INTERMEDIATE LEVEL ADVISORY Telemetry...
[ACCOUNT STANDING] Available Balance: ${balanceStr}

[RULE 2] Dynamic Systematic Scaling. Limit max risk per trade to 2% under strict volatility stop parameters.
[CALCULATION] Maximum Risk Capital per trade: $${maxRisk}
[CALCULATION] Position Allocation Limit: $${posLimit} (20% allocation)

[STRATEGY] Volatility stop-loss calibration (Average True Range - ATR):
1. Measure the 14-day ATR for the target coin before entry.
2. Place stop-loss at exactly Entry Price - (${atrBuffer} * ATR). This prevents premature shakeouts from random noise.
3. Calculate position size using standard risk formula: Position Size = Risk Capital / Stop-Loss Distance.
4. Scale out of profitable trades using 50% partial take-profits at 1.5x and 3.0x ATR targets.

[NEXT STEP COMPASS] Master "Dynamic Volatility Stop-Loss Calibration" in TradePulse Academy to run advanced simulations.`;
  } else {
    const kellyFraction = 0.25;
    const standardKellyRisk = (activeBalance * 0.05).toFixed(2);
    const maxExposure = (activeBalance * 0.25).toFixed(2);
    return `>>> INITIATING ADVANCED LEVEL ADVISORY Telemetry...
[ACCOUNT STANDING] Available Balance: ${balanceStr}

[RULE 3] Algorithmic compounding via Fractional Kelly Criterion and Sentiment Vectors.
[CALCULATION] Maximum Kelly Exposure Size (25% f*): $${standardKellyRisk} (Assuming 55% Win Rate, 1:1.2 Payout)
[CALCULATION] Max Portfolio Cap per trade: $${maxExposure} (25% maximum)

[STRATEGY] AI-Generated Sentiment Vectors & Polarity Arbitrage:
1. Ingest social polarity scores and volume hype index to overlay on 4-Hour RSI charts.
2. Buy spot or long high-beta assets (SOL) only when the Polarity Score is > 0.45 and RSI is < 35 (extreme value accumulation).
3. Short assets or scale out when Polarity drops below -0.30 and RSI is > 65.
4. Monitor Level 2 volume imbalance ratio (VI) to confirm structural buying before scaling in.

[NEXT STEP COMPASS] Master "Trading with AI-Generated Sentiment Vectors" in TradePulse Academy to backtest high-frequency systems.`;
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
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [hasInitialTriggered, setHasInitialTriggered] = useState(false);

  // News details modal state
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  // Academy Drawer & Simulator States
  const [isAcademyOpen, setIsAcademyOpen] = useState(false);
  const [activeAcademyCourse, setActiveAcademyCourse] = useState(LEARN_COURSES[0]);
  const [backtestRunning, setBacktestRunning] = useState(false);
  const [backtestProgress, setBacktestProgress] = useState(0);
  const [backtestLogs, setBacktestLogs] = useState([
    "SIMULATOR READY: Awaiting Strategy Calibration..."
  ]);
  const [backtestMetrics, setBacktestMetrics] = useState({
    trades: 0,
    yield: 0.0,
    profitFactor: 0.0,
    winRate: 0
  });
  const [sliderValue1, setSliderValue1] = useState(0.35); // Imbalance Threshold or Sentiment Score or Stop ATR
  const [sliderValue2, setSliderValue2] = useState(0.5);  // Orderbook Depth or NLP Weight or Kelly Fraction
  const [backtestChartData, setBacktestChartData] = useState([0, 2, -1, 4, 8, 5, 12, 10, 18, 16, 25]);
  const [selectedLearnArticle, setSelectedLearnArticle] = useState(null);

  // Academy course change triggers custom calibration resets
  useEffect(() => {
    if (activeAcademyCourse.id === "order-book") {
      setSliderValue1(0.35); // Imbalance Threshold (VI)
      setSliderValue2(0.50); // Orderbook Depth (L2)
      setBacktestChartData([0, 3, 1, 6, 9, 7, 13, 11, 16, 14, 21]);
    } else if (activeAcademyCourse.id === "ai-signals") {
      setSliderValue1(0.45); // Sentiment Shift Ratio
      setSliderValue2(0.60); // NLP Social Volume weight
      setBacktestChartData([0, 4, 2, 7, 12, 9, 16, 13, 22, 19, 28]);
    } else {
      setSliderValue1(2.50); // ATR Multiplier offset
      setSliderValue2(0.25); // Kelly Risk sizing fraction
      setBacktestChartData([0, 2, 0, 5, 8, 4, 11, 8, 14, 11, 18]);
    }
    
    // Reset backtest info
    setBacktestRunning(false);
    setBacktestProgress(0);
    setBacktestLogs([
      `SIMULATOR CALIBRATED for Strategy: ${activeAcademyCourse.title.replace("Understanding ", "").replace("Trading with ", "")}`,
      `Awaiting execution...`
    ]);
    setBacktestMetrics({
      trades: 0,
      yield: 0.0,
      profitFactor: 0.0,
      winRate: 0
    });
  }, [activeAcademyCourse]);

  const handleRunBacktest = () => {
    if (backtestRunning) return;
    setBacktestRunning(true);
    setBacktestProgress(0);
    setBacktestChartData([0]);
    
    const logsSeed = [
      `[INIT] INITIALIZING MONTE CARLO INSTANCE FOR STRATEGY: ${activeAcademyCourse.title.toUpperCase()}`,
      `[LOAD] SCANNING EXCHANGE HISTORICAL LEDGER QUEUE...`,
      `[CALIB] TUNING BLUEPRINT TO VALUES: PARAM_A = ${sliderValue1}, PARAM_B = ${sliderValue2}`,
      `[TEST] INGESTING LEVEL-2 DEPTH VELOCITY DATA FOR ALL PAIRS...`,
      `[TEST] EVALUATING 10,000 TICK SAMPLES...`,
      `[CALC] STRATEGY EVALUATION COMPLETE. ASSEMBLING METRIC VECTORS...`
    ];

    setBacktestLogs([logsSeed[0]]);

    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      const progress = count * 20; // 5 steps total
      setBacktestProgress(progress);
      
      // Append log message
      if (count < logsSeed.length) {
        setBacktestLogs(prev => [...prev, logsSeed[count]]);
      }

      // Append dummy simulation chart data steps
      setBacktestChartData(prev => {
        const next = [...prev];
        const last = next[next.length - 1];
        // Strategy performance influenced slightly by slider variables
        let multiplier = 1;
        if (activeAcademyCourse.id === "order-book") {
          multiplier = (sliderValue1 > 0.3 && sliderValue1 < 0.6) ? 1.4 : 0.8;
        } else if (activeAcademyCourse.id === "ai-signals") {
          multiplier = (sliderValue2 > 0.4 && sliderValue2 < 0.8) ? 1.5 : 0.7;
        } else {
          multiplier = (sliderValue2 > 0.1 && sliderValue2 < 0.4) ? 1.6 : 0.5;
        }

        const variance = (Math.random() * 8 - 3) * multiplier;
        next.push(Math.round((last + variance) * 10) / 10);
        return next;
      });

      if (count >= 5) {
        clearInterval(interval);
        setBacktestRunning(false);
        
        // Compute final metrics based on inputs
        let winRate = 50;
        let profitFactor = 1.1;
        let finalYield = 10.0;
        
        if (activeAcademyCourse.id === "order-book") {
          winRate = Math.round(52 + sliderValue1 * 20 + Math.random() * 5);
          profitFactor = (1.1 + sliderValue2 * 1.5 + Math.random() * 0.2).toFixed(2);
          finalYield = (12.5 + sliderValue1 * 40 - sliderValue2 * 10).toFixed(1);
        } else if (activeAcademyCourse.id === "ai-signals") {
          winRate = Math.round(55 + sliderValue2 * 18 + Math.random() * 6);
          profitFactor = (1.2 + sliderValue1 * 1.3 + Math.random() * 0.3).toFixed(2);
          finalYield = (15.0 + sliderValue2 * 35 + sliderValue1 * 8).toFixed(1);
        } else {
          winRate = Math.round(48 + sliderValue1 * 15 + Math.random() * 4);
          profitFactor = (1.0 + (1 - sliderValue2) * 1.8 + Math.random() * 0.2).toFixed(2);
          const kellyRisk = sliderValue2;
          finalYield = (8.0 + kellyRisk * 65 * (winRate > 52 ? 1 : -0.8)).toFixed(1);
        }

        setBacktestMetrics({
          trades: Math.round(150 + Math.random() * 80),
          yield: parseFloat(finalYield),
          profitFactor: parseFloat(profitFactor),
          winRate: winRate
        });

        setBacktestLogs(prev => [...prev, `[COMPLETE] BACKTEST DONE. PROCESSED LEDGER SUCCESSFULLY. TOTAL YIELD = +${finalYield}%`]);
      }
    }, 800);
  };


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
        triggerAiResponse("beginner");
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
    
    if (promptKey === "beginner" || promptKey === "intermediate" || promptKey === "advanced") {
      const balance = wallet?.userWallet?.balance;
      textToStream = getLevelAdvice(promptKey, balance);
      displayPrompt = `Generate customized AI risk parameters and trading directives for level: ${promptKey.toUpperCase()}`;
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

          {/* Learn Crypto Callout Banner */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#00ffa3]/10 to-teal-500/5 border border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#00ffa3]/5 blur-3xl rounded-full pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-1.5 text-[#00ffa3] font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>TradePulse Academy</span>
              </div>
              <h3 className="text-base font-bold text-primary mt-1">New to digital assets? Explore our curated learning tracks</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-1 max-w-xl">
                Master blockchain protocols, decentralized finance telemetry, risk management formulas, and technical indicators from our comprehensive guide.
              </p>
            </div>
            <button 
              onClick={() => setIsAcademyOpen(true)}
              className="bg-surface-bright text-primary border border-outline-variant px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#323538] hover:text-white transition-all flex items-center gap-2 whitespace-nowrap self-start md:self-center"
            >
              Start Learning
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
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
                {["beginner", "intermediate", "advanced"].map((level) => {
                  const isActive = selectedLevel === level;
                  const label = level === "beginner" ? "🔰 Beginner" : level === "intermediate" ? "⚡ Intermediate" : "🔮 Advanced";
                  return (
                    <button
                      key={level}
                      disabled={aiIsTyping}
                      onClick={() => {
                        setSelectedLevel(level);
                        triggerAiResponse(level);
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
                const activeDetails = levelDetails[selectedLevel || "beginner"];
                const balance = wallet?.userWallet?.balance || 0;
                const isDemo = balance === 0;
                const activeBalance = isDemo ? 10000 : balance;
                const maxRiskVal = (activeBalance * (selectedLevel === "beginner" ? 0.01 : selectedLevel === "intermediate" ? 0.02 : 0.05)).toFixed(2);
                const maxPosVal = (activeBalance * (selectedLevel === "beginner" ? 0.10 : selectedLevel === "intermediate" ? 0.20 : 0.25)).toFixed(2);

                return (
                  <div className={`mt-2 p-5 rounded-2xl bg-gradient-to-r ${activeDetails.colorClass} border border-outline-variant/30 relative overflow-hidden transition-all duration-300 group/compass shadow-md text-left`}>
                    <div className={`absolute right-0 top-0 w-48 h-48 ${activeDetails.glowClass} blur-3xl rounded-full pointer-events-none transition-all duration-300`} />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10 w-full">
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Sparkles className="w-4 h-4 text-[#00ffa3] animate-pulse" />
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase border ${activeDetails.badgeColor}`}>
                            {(selectedLevel || "beginner").toUpperCase()} STRATEGY
                          </span>
                          <span className="text-[10px] text-on-surface-variant font-data-mono font-medium bg-black/30 px-2 py-0.5 rounded border border-outline-variant/10">
                            {isDemo ? "Demo Account Allocations" : "Live Account Risk"}
                          </span>
                        </div>
                        
                        <h3 className="text-base font-extrabold text-primary tracking-tight">
                          {activeDetails.title}
                        </h3>
                        
                        <p className="text-xs text-on-surface-variant leading-relaxed mt-1.5 max-w-xl">
                          {activeDetails.summary}
                        </p>

                        {/* Dynamic Sizing Indicators */}
                        <div className="grid grid-cols-2 gap-4 mt-3 max-w-md bg-black/40 border border-outline-variant/20 rounded-xl p-3 font-data-mono">
                          <div>
                            <span className="text-[9px] text-on-surface-variant block font-bold uppercase tracking-wider">Safe Risk Capital (Per Setup)</span>
                            <span className="text-xs font-black text-[#00ffa3] mt-0.5">
                              ${parseFloat(maxRiskVal).toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] text-on-surface-variant block font-bold uppercase tracking-wider">Suggested Exposure Cap</span>
                            <span className="text-xs font-black text-[#00e290] mt-0.5">
                              ${parseFloat(maxPosVal).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setActiveAcademyCourse(LEARN_COURSES[activeDetails.courseIndex]);
                          setIsAcademyOpen(true);
                        }}
                        className="bg-surface-bright text-primary border border-outline-variant px-5 py-3 rounded-xl text-xs font-extrabold hover:bg-[#323538] hover:text-white transition-all flex items-center gap-2 whitespace-nowrap self-start md:self-center hover:shadow-[0_0_15px_rgba(0,255,163,0.15)] group-hover/compass:border-[#00ffa3]/40"
                      >
                        {activeDetails.cta}
                        <ChevronRight className="w-3.5 h-3.5 group-hover/compass:translate-x-0.5 transition-transform" />
                      </button>
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

      {/* ====================================================
          TradePulse Academy Drawer Slide-Down Fullscreen Overlay
          ==================================================== */}
      {isAcademyOpen && (
        <div className="fixed inset-0 z-50 bg-[#04090c]/98 backdrop-blur-xl flex flex-col overflow-y-auto animate-fade-in transition-all duration-300 select-text">
          {/* Header Bar */}
          <div className="w-full max-w-7xl mx-auto px-6 py-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#04090c]/95 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ffa3]/10 border border-[#00ffa3]/25 text-[#00ffa3] text-[10px] font-extrabold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
                Academy Console
              </div>
              <span className="text-xs text-[#8aa898] font-medium hidden sm:inline">/ Algorithmic Quantum Learning Tracks</span>
            </div>
            <button 
              onClick={() => setIsAcademyOpen(false)}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              ✕ Close Console
            </button>
          </div>

          <div className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 text-left">
            <div className="relative z-10 flex flex-col items-start text-left mb-10">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Master Platform Volatility
                <span className="block mt-1.5 bg-gradient-to-r from-[#00ffa3] via-[#00e5a0] to-[#00ffa3] bg-clip-text text-transparent text-lg sm:text-2xl font-bold">
                  Quantitative Algorithmic Simulators
                </span>
              </h2>
            </div>

            {/* Responsive Academy Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
              {/* Left Column (col-span-5): Vertical Courses Deck */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {LEARN_COURSES.map((course) => {
                  const isActive = activeAcademyCourse.id === course.id;
                  return (
                    <div
                      key={course.id}
                      onClick={() => setActiveAcademyCourse(course)}
                      className={`border rounded-2xl p-5 relative overflow-hidden transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between min-h-[170px] ${
                        isActive
                          ? "border-[#00ffa3]/50 shadow-[0_0_20px_rgba(0,255,163,0.1)] bg-[#0c1419]/95"
                          : "border-white/5 bg-[#080d10]/60 hover:border-white/10 hover:bg-[#0c1419]/40"
                      }`}
                    >
                      {/* Subtle active glow line on top */}
                      <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ffa3]/50 to-transparent transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

                      <div>
                        {/* Header: Icon + Metadata */}
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive ? "bg-[#00ffa3]/15 text-[#00ffa3]" : "bg-white/5 text-[#8aa898]"}`}>
                            <LearnIcon name={course.icon} className="w-4.5 h-4.5" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase bg-white/5 border text-[#8aa898] ${isActive ? "border-[#00ffa3]/20 text-[#00ffa3]" : "border-white/10"}`}>
                              {course.tag}
                            </span>
                            <span className="text-[9px] text-[#5a7a6a] font-bold font-data-mono uppercase tracking-wider">
                              {course.duration}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className={`text-base font-extrabold transition-colors leading-snug ${isActive ? "text-[#00ffa3]" : "text-white"}`}>
                          {course.title}
                        </h3>
                        <p className="text-xs text-[#8aa898] leading-relaxed mt-1.5 line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      {/* Actions footer */}
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider font-data-mono">
                        <span className="text-[#5a7a6a]">Module Blueprint</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLearnArticle(course);
                          }}
                          className={`flex items-center gap-1 transition-transform group-hover:translate-x-1 ${isActive ? "text-[#00ffa3]" : "text-[#8aa898] hover:text-white"}`}
                        >
                          Read Blueprint <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column (col-span-7): Quantum Backtest Console */}
              <div className="lg:col-span-7 bg-[#050a0e]/95 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
                {/* Ambient inner glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ffa3]/[0.02] blur-3xl pointer-events-none" />
                
                {/* Header info */}
                <div className="flex items-start justify-between border-b border-white/5 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-ping" />
                      <span className="text-[10px] font-bold tracking-widest font-data-mono uppercase text-[#00ffa3]">
                        Quantum Backtester v1.0.4
                      </span>
                    </div>
                    <h4 className="text-lg font-extrabold text-white mt-1">
                      {activeAcademyCourse.title.replace("Understanding ", "").replace("Trading with ", "")}
                    </h4>
                  </div>
                  <div className="px-3 py-1 rounded bg-[#00ffa3]/5 border border-[#00ffa3]/15 text-[10px] text-[#00ffa3] font-bold font-data-mono">
                    {activeAcademyCourse.id.toUpperCase()}
                  </div>
                </div>

                {/* Strategy Sliders Panel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {activeAcademyCourse.id === "order-book" && (
                    <>
                      <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl text-left">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[10px] text-[#8aa898] font-bold uppercase tracking-wider">Imbalance Threshold</label>
                          <span className="text-[10px] font-data-mono font-bold text-[#00ffa3]">{sliderValue1}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.10" 
                          max="0.90" 
                          step="0.05"
                          value={sliderValue1}
                          onChange={(e) => setSliderValue1(parseFloat(e.target.value))}
                          disabled={backtestRunning}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00ffa3]"
                        />
                        <div className="flex justify-between text-[8px] text-[#5a7a6a] mt-1 font-data-mono">
                          <span>0.10 (LOW BIAS)</span>
                          <span>0.90 (HIGH BIAS)</span>
                        </div>
                      </div>

                      <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl text-left">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[10px] text-[#8aa898] font-bold uppercase tracking-wider">L2 Depth Weight</label>
                          <span className="text-[10px] font-data-mono font-bold text-[#00ffa3]">{Math.round(sliderValue2 * 100)}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.10" 
                          max="1.00" 
                          step="0.05"
                          value={sliderValue2}
                          onChange={(e) => setSliderValue2(parseFloat(e.target.value))}
                          disabled={backtestRunning}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00ffa3]"
                        />
                        <div className="flex justify-between text-[8px] text-[#5a7a6a] mt-1 font-data-mono">
                          <span>10% (SENSITIVE)</span>
                          <span>100% (STABLE)</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeAcademyCourse.id === "ai-signals" && (
                    <>
                      <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl text-left">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[10px] text-[#8aa898] font-bold uppercase tracking-wider">Sentiment Sensitivity</label>
                          <span className="text-[10px] font-data-mono font-bold text-[#00ffa3]">{sliderValue1}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.20" 
                          max="0.80" 
                          step="0.05"
                          value={sliderValue1}
                          onChange={(e) => setSliderValue1(parseFloat(e.target.value))}
                          disabled={backtestRunning}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00ffa3]"
                        />
                        <div className="flex justify-between text-[8px] text-[#5a7a6a] mt-1 font-data-mono">
                          <span>0.20 (SLOW HYPE)</span>
                          <span>0.80 (HYPER FOCUS)</span>
                        </div>
                      </div>

                      <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl text-left">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[10px] text-[#8aa898] font-bold uppercase tracking-wider">NLP Sentiment Weight</label>
                          <span className="text-[10px] font-data-mono font-bold text-[#00ffa3]">{Math.round(sliderValue2 * 100)}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.10" 
                          max="1.00" 
                          step="0.05"
                          value={sliderValue2}
                          onChange={(e) => setSliderValue2(parseFloat(e.target.value))}
                          disabled={backtestRunning}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00ffa3]"
                        />
                        <div className="flex justify-between text-[8px] text-[#5a7a6a] mt-1 font-data-mono">
                          <span>10% (LOW INFLUENCE)</span>
                          <span>100% (MAX SYSTEMATIC)</span>
                        </div>
                      </div>
                    </>
                  )}

                  {activeAcademyCourse.id !== "order-book" && activeAcademyCourse.id !== "ai-signals" && (
                    <>
                      <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl text-left">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[10px] text-[#8aa898] font-bold uppercase tracking-wider">ATR Multiplier Offset</label>
                          <span className="text-[10px] font-data-mono font-bold text-[#00ffa3]">{sliderValue1}x</span>
                        </div>
                        <input 
                          type="range" 
                          min="1.0" 
                          max="4.0" 
                          step="0.1"
                          value={sliderValue1}
                          onChange={(e) => setSliderValue1(parseFloat(e.target.value))}
                          disabled={backtestRunning}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00ffa3]"
                        />
                        <div className="flex justify-between text-[8px] text-[#5a7a6a] mt-1 font-data-mono">
                          <span>1.0x (TIGHT)</span>
                          <span>4.0x (WIDE BAND)</span>
                        </div>
                      </div>

                      <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl text-left">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[10px] text-[#8aa898] font-bold uppercase tracking-wider">Kelly Sizing Fraction</label>
                          <span className="text-[10px] font-data-mono font-bold text-[#00ffa3]">{Math.round(sliderValue2 * 100)}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0.05" 
                          max="0.50" 
                          step="0.05"
                          value={sliderValue2}
                          onChange={(e) => setSliderValue2(parseFloat(e.target.value))}
                          disabled={backtestRunning}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00ffa3]"
                        />
                        <div className="flex justify-between text-[8px] text-[#5a7a6a] mt-1 font-data-mono">
                          <span>5% (SAFE COMPOUND)</span>
                          <span>50% (MAX EXPOSURE)</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Sparkline Canvas / SVG drawing */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-4 mb-4 relative min-h-[160px] flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[8px] font-data-mono text-[#5a7a6a] uppercase">Simulated Equity Curve</span>
                    <span className={`text-[10px] font-data-mono font-bold px-1.5 py-0.5 rounded ${backtestRunning ? "bg-amber-500/10 text-amber-500" : "bg-[#00ffa3]/10 text-[#00ffa3]"}`}>
                      {backtestRunning ? "TESTING..." : "TELEMETRY STABLE"}
                    </span>
                  </div>

                  <div className="w-full h-24 relative mt-2">
                    {backtestChartData && backtestChartData.length > 0 && (
                      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00ffa3" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#00ffa3" stopOpacity="0.00" />
                          </linearGradient>
                        </defs>
                        {(() => {
                          const minVal = Math.min(...backtestChartData);
                          const maxVal = Math.max(...backtestChartData);
                          const range = maxVal - minVal || 1;
                          
                          const svgPoints = backtestChartData.map((val, idx) => {
                            const x = (idx / (backtestChartData.length - 1)) * 100;
                            const y = 90 - ((val - minVal) / range) * 80;
                            return `${x},${y}`;
                          });

                          const pathD = `M ${svgPoints.join(" L ")}`;
                          const areaD = `${pathD} L 100,100 L 0,100 Z`;

                          return (
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                              <path d={areaD} fill="url(#chartGlow)" />
                              <path d={pathD} fill="none" stroke="#00ffa3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              {svgPoints.length > 0 && (
                                <circle
                                  cx={svgPoints[svgPoints.length - 1].split(",")[0]}
                                  cy={svgPoints[svgPoints.length - 1].split(",")[1]}
                                  r="1.8"
                                  fill="#00ffa3"
                                  className="animate-pulse"
                                />
                              )}
                            </svg>
                          );
                        })()}
                      </svg>
                    )}
                  </div>
                </div>

                {/* Scrolling Logs panel */}
                <div className="bg-black/60 border border-white/5 rounded-xl p-3 mb-6 h-28 overflow-y-auto text-left relative">
                  <div className="absolute top-0 right-3 text-[8px] font-data-mono text-[#5a7a6a] uppercase py-1">Strategy Output Logs</div>
                  <div className="space-y-1 font-data-mono text-[9px] text-[#8aa898] leading-tight">
                    {backtestLogs.map((log, idx) => {
                      let color = "text-[#8aa898]";
                      if (log.startsWith("[INIT]")) color = "text-cyan-400";
                      if (log.startsWith("[LOAD]")) color = "text-purple-400";
                      if (log.startsWith("[COMPLETE]")) color = "text-[#00ffa3] font-bold";
                      if (log.startsWith("[CALIB]")) color = "text-amber-400";
                      return (
                        <div key={idx} className={`${color} flex items-start gap-1`}>
                          <span className="text-[#5a7a6a] shrink-0">&gt;</span>
                          <span>{log}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Diagnostics Stats + Run Trigger */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="bg-white/[0.02] border border-white/5 px-3 py-2 rounded-xl text-left">
                    <span className="text-[8px] text-[#5a7a6a] font-bold uppercase tracking-wider block">Simulated Trades</span>
                    <span className="text-sm font-extrabold text-white font-data-mono">{backtestMetrics.trades || "—"}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 px-3 py-2 rounded-xl text-left">
                    <span className="text-[8px] text-[#5a7a6a] font-bold uppercase tracking-wider block">Yield Ratio</span>
                    <span className={`text-sm font-extrabold font-data-mono ${backtestMetrics.yield >= 0 ? "text-[#00ffa3]" : "text-rose-500"}`}>
                      {backtestMetrics.yield ? `+${backtestMetrics.yield}%` : "—"}
                    </span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 px-3 py-2 rounded-xl text-left">
                    <span className="text-[8px] text-[#5a7a6a] font-bold uppercase tracking-wider block">Profit Factor</span>
                    <span className="text-sm font-extrabold text-white font-data-mono">{backtestMetrics.profitFactor || "—"}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 px-3 py-2 rounded-xl text-left">
                    <span className="text-[8px] text-[#5a7a6a] font-bold uppercase tracking-wider block">Win Probability</span>
                    <span className="text-sm font-extrabold text-white font-data-mono">{backtestMetrics.winRate ? `${backtestMetrics.winRate}%` : "—"}</span>
                  </div>
                </div>

                {/* Run Button with Animated Sweep */}
                <div className="relative">
                  {backtestRunning && (
                    <div 
                      className="absolute inset-0 bg-[#00ffa3]/10 transition-all duration-300 rounded-xl"
                      style={{ width: `${backtestProgress}%` }}
                    />
                  )}
                  <button
                    onClick={handleRunBacktest}
                    disabled={backtestRunning}
                    className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-widest relative z-10 transition-all duration-300 border ${
                      backtestRunning
                        ? "border-amber-500/25 text-amber-500 cursor-not-allowed bg-amber-500/5"
                        : "border-[#00ffa3]/30 bg-[#00ffa3]/10 text-[#00ffa3] hover:bg-[#00ffa3]/20 hover:shadow-[0_0_20px_rgba(0,255,163,0.15)] active:scale-[0.98]"
                    }`}
                  >
                    {backtestRunning ? `Simulating Monte Carlo Ledger (${backtestProgress}%)` : "Execute Blueprint Backtest"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          TradePulse Academy Article Reader Modal
          ==================================================== */}
      {selectedLearnArticle && (
        <div className="fixed inset-0 z-[60] bg-[#04090c]/98 backdrop-blur-xl flex flex-col items-center justify-start overflow-y-auto animate-fade-in transition-all duration-300 text-left">
          {/* Header Bar */}
          <div className="w-full max-w-5xl px-6 py-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#04090c]/95 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-[#00ffa3]/15 text-[#00ffa3] rounded border border-[#00ffa3]/20 text-[9px] font-bold uppercase font-data-mono">
                {selectedLearnArticle.tag}
              </span>
              <span className="text-[10px] text-[#5a7a6a] font-bold font-data-mono uppercase tracking-wider">
                {selectedLearnArticle.duration}
              </span>
            </div>
            <button 
              onClick={() => setSelectedLearnArticle(null)}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Article Container */}
          <div className="w-full max-w-3xl px-6 py-12 text-left relative z-10 animate-in fade-in zoom-in-95 duration-300">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
              {selectedLearnArticle.title}
            </h1>
            
            <div className="prose prose-invert max-w-none text-[#8aa898] space-y-6 text-sm sm:text-base leading-relaxed">
              {selectedLearnArticle.content.map((paragraph, pIdx) => {
                if (paragraph.startsWith("###")) {
                  return (
                    <h3 key={pIdx} className="text-xl font-bold text-white tracking-tight pt-4 pb-2 border-b border-white/5">
                      {paragraph.replace("###", "").trim()}
                    </h3>
                  );
                } else if (paragraph.startsWith("```")) {
                  return (
                    <pre key={pIdx} className="bg-black/40 border border-white/5 p-4 rounded-xl font-data-mono text-xs text-[#00ffa3] overflow-x-auto my-4 leading-relaxed">
                      {paragraph.replace(/```/g, "").trim()}
                    </pre>
                  );
                } else {
                  return <p key={pIdx}>{paragraph}</p>;
                }
              })}
            </div>

            {/* Completion Indicator */}
            <div className="mt-16 p-6 rounded-2xl bg-[#00ffa3]/5 border border-[#00ffa3]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h4 className="text-white font-extrabold text-base">Module Completed</h4>
                <p className="text-xs text-[#8aa898] mt-1">You've successfully analyzed the core components of this trading system blueprint.</p>
              </div>
              <button 
                onClick={() => setSelectedLearnArticle(null)}
                className="px-6 py-2.5 rounded-full bg-[#00ffa3] text-[#050a0e] font-extrabold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_#00ffa3] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;