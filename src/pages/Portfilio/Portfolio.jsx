/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { getUserWallet } from "@/Redux/Wallet/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

// Custom sparkbar visual reflecting trend
const TrendSparkbars = ({ trend = [50, 50, 50, 50, 50], isPositive = true }) => {
  return (
    <div className="flex items-end gap-1 h-8 w-16">
      {trend.map((height, i) => {
        const isLast = i === trend.length - 1;
        let barColor = isPositive
          ? isLast ? "bg-[#00e290] shadow-[0_0_8px_rgba(0,226,144,0.5)]" : "bg-[#00e290]/20 group-hover:bg-[#00e290]/35"
          : isLast ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-red-500/20 group-hover:bg-red-500/35";
        return (
          <div
            key={i}
            className={`w-[6px] rounded-t-sm transition-all duration-200 ${barColor}`}
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
};

// Sleek mini SVG trend line for 24H profit/loss card
const MiniPortfolioTrendline = ({ isPositive = true }) => {
  const strokeColor = isPositive ? "#00e290" : "#ef4444";
  const gradId = isPositive ? "grad-pos" : "grad-neg";
  return (
    <div className="w-full h-10 mt-3 opacity-95">
      <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.22" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 32 Q 20 28 40 31 T 80 27 T 120 20 T 160 12 T 200 8"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 0 32 Q 20 28 40 31 T 80 27 T 120 20 T 160 12 T 200 8 L 200 40 L 0 40 Z"
          fill={`url(#${gradId})`}
        />
      </svg>
    </div>
  );
};

const Portfolio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { asset, wallet } = useSelector((store) => store);

  // Layout sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const newVal = !prev;
      localStorage.setItem("sidebar-collapsed", String(newVal));
      return newVal;
    });
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Active Portfolio Mode: "live" (redux backend values) or "demo" (for gorgeous mockup values)
  const [portfolioMode, setPortfolioMode] = useState("live");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(getUserAssets(jwt));
    dispatch(getUserWallet(jwt));
  }, [dispatch]);

  // Seeding high-fidelity mockup portfolio assets from the user's uploaded screen
  const demoAssets = [
    {
      id: "demo-btc",
      coin: {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        current_price: 77524.42,
        price_change_percentage_24h: 0.42,
      },
      quantity: 1.2504,
      trend: [40, 55, 45, 70, 100],
    },
    {
      id: "demo-eth",
      coin: {
        id: "ethereum",
        name: "Ethereum",
        symbol: "eth",
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        current_price: 2126.79,
        price_change_percentage_24h: -0.06,
      },
      quantity: 8.4200,
      trend: [80, 70, 55, 45, 35],
    },
    {
      id: "demo-sol",
      coin: {
        id: "solana",
        name: "Solana",
        symbol: "sol",
        image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
        current_price: 86.33,
        price_change_percentage_24h: 1.85,
      },
      quantity: 42.5000,
      trend: [30, 40, 65, 75, 100],
    },
    {
      id: "demo-bnb",
      coin: {
        id: "binancecoin",
        name: "Binance Coin",
        symbol: "bnb",
        image: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
        current_price: 651.09,
        price_change_percentage_24h: 1.25,
      },
      quantity: 9.3410,
      trend: [50, 60, 55, 80, 100],
    },
    {
      id: "demo-ada",
      coin: {
        id: "cardano",
        name: "Cardano",
        symbol: "ada",
        image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
        current_price: 0.52,
        price_change_percentage_24h: -1.2,
      },
      quantity: 1200.0,
      trend: [70, 65, 50, 40, 30],
    },
    {
      id: "demo-ripple",
      coin: {
        id: "ripple",
        name: "Ripple",
        symbol: "xrp",
        image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
        current_price: 0.58,
        price_change_percentage_24h: 0.95,
      },
      quantity: 3400.0,
      trend: [40, 50, 45, 60, 75],
    },
    {
      id: "demo-doge",
      coin: {
        id: "dogecoin",
        name: "Dogecoin",
        symbol: "doge",
        image: "https://assets.coingecko.com/coins/images/325/large/dogecoin.png",
        current_price: 0.14,
        price_change_percentage_24h: 4.25,
      },
      quantity: 15000.0,
      trend: [20, 35, 50, 70, 100],
    },
    {
      id: "demo-dot",
      coin: {
        id: "polkadot",
        name: "Polkadot",
        symbol: "dot",
        image: "https://assets.coingecko.com/coins/images/12171/large/a93330cd-e0b9-47e2-87fd-a7ed94c9beaa.png",
        current_price: 6.85,
        price_change_percentage_24h: -0.45,
      },
      quantity: 180.0,
      trend: [60, 55, 50, 52, 48],
    },
  ];

  // Dynamic Live computations from database Redux assets
  const liveAssetsRaw = asset.userAssets || [];
  const liveAssets = liveAssetsRaw.map((item) => ({
    ...item,
    trend: item.coin?.price_change_percentage_24h >= 0 
      ? [30, 45, 40, 75, 100] 
      : [85, 70, 60, 45, 30],
  }));

  const liveCryptoBalance = liveAssets.reduce(
    (acc, item) => acc + (item.coin?.current_price || 0) * (item.quantity || 0),
    0
  );

  // Total Portfolio Balance is synced to be exactly the Wallet Cash Balance
  const liveTotalBalance = wallet.userWallet?.balance || 0;

  const liveTotal24hChange = liveAssets.reduce(
    (acc, item) => acc + (item.coin?.price_change_24h || 0) * (item.quantity || 0),
    0
  );

  const liveTotal24hPercentageChange = liveCryptoBalance > 0
    ? (liveTotal24hChange / liveCryptoBalance) * 100
    : 0;

  let liveMaxWeightAsset = null;
  let liveMaxWeightPercentage = 0;
  if (liveAssets.length > 0 && liveCryptoBalance > 0) {
    const sortedByValue = [...liveAssets].sort(
      (a, b) => ((b.coin?.current_price || 0) * (b.quantity || 0)) - ((a.coin?.current_price || 0) * (a.quantity || 0))
    );
    const topAsset = sortedByValue[0];
    const topValue = (topAsset.coin?.current_price || 0) * (topAsset.quantity || 0);
    liveMaxWeightAsset = topAsset;
    liveMaxWeightPercentage = (topValue / liveCryptoBalance) * 100;
  }

  // Active Portfolio properties selection
  const isDemo = portfolioMode === "demo";
  const activeAssets = isDemo ? demoAssets : liveAssets;
  const displayTotalBalance = isDemo ? 124592.42 : liveTotalBalance;
  const display24hProfitLoss = isDemo ? 1215.30 : liveTotal24hChange;
  const display24hPercentChange = isDemo ? 0.98 : liveTotal24hPercentageChange; // dynamic average change

  // Find max weight asset for display
  const displayTopAsset = isDemo ? demoAssets[0] : liveMaxWeightAsset;
  const displayTopWeight = isDemo ? 62.4 : liveMaxWeightPercentage;

  // Pagination logic
  const totalAssetsCount = activeAssets.length;
  const totalPages = Math.max(1, Math.ceil(totalAssetsCount / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = activeAssets.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] text-body-md relative overflow-hidden bg-background text-on-surface">
      {/* SideBar for Desktop (Persistent) */}
      <aside className={`hidden md:flex flex-col h-[calc(100vh-64px)] ${isSidebarCollapsed ? "w-20" : "w-64"} fixed left-0 top-16 z-40 transition-all duration-300`}>
        <SideBar isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />
      </aside>

      {/* Main content viewport */}
      <div className={`flex-1 ${isSidebarCollapsed ? "md:pl-20" : "md:pl-64"} flex flex-col min-h-full z-10 transition-all duration-300`}>
        <div className="p-6 md:p-8 flex flex-col gap-8 max-w-[1600px] w-full mx-auto animate-fade-in-up">
          
          {/* Top Panel Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: TOTAL BALANCE */}
            <div className="bg-surface-container-low border border-outline-variant shadow-sm p-6 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-outline transition-all duration-200 group">
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant/75 tracking-wider font-title-sm">TOTAL BALANCE</p>
                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-wide mt-2 font-title-lg">
                  ${displayTotalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
              <p className="text-xs font-semibold text-[#00e290] flex items-center gap-1 mt-4 font-label-sm">
                <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
                +12.50% <span className="text-on-surface-variant font-normal">30D</span>
              </p>
            </div>

            {/* Card 2: 24H PROFIT/LOSS */}
            <div className="bg-surface-container-low border border-outline-variant shadow-sm p-6 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-outline transition-all duration-200 group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant/75 tracking-wider font-title-sm">24H PROFIT/LOSS</p>
                  <h3 className={`text-2xl md:text-3xl font-extrabold tracking-wide mt-2 font-title-lg ${display24hProfitLoss >= 0 ? "text-[#00e290]" : "text-red-500"}`}>
                    {display24hProfitLoss >= 0 ? "+" : "-"}${Math.abs(display24hProfitLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                </div>
              </div>
              <MiniPortfolioTrendline isPositive={display24hProfitLoss >= 0} />
            </div>

            {/* Card 3: PORTFOLIO WEIGHT */}
            <div className="bg-surface-container-low border border-outline-variant shadow-sm p-6 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-outline transition-all duration-200 group">
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant/75 tracking-wider font-title-sm">PORTFOLIO WEIGHT</p>
                {displayTopAsset ? (
                  <div className="flex items-center gap-4 mt-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/15 to-orange-500/25 flex items-center justify-center border border-orange-500/20 shadow-inner group-hover:scale-105 transition-transform duration-200">
                      {displayTopAsset.coin?.image ? (
                        <img src={displayTopAsset.coin.image} alt={displayTopAsset.coin.name} className="w-7 h-7 object-contain" />
                      ) : (
                        <span className="font-bold text-orange-400 text-sm">{displayTopAsset.coin?.symbol?.toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-foreground font-title-md uppercase tracking-wider">{displayTopAsset.coin?.name}</h4>
                      <p className="text-xs text-on-surface-variant mt-0.5 font-label-xs font-semibold uppercase tracking-wider">{displayTopWeight.toFixed(1)}% ALLOCATION</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-on-surface-variant mt-4 font-body-md">No assets allocated</p>
                )}
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-4">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${displayTopWeight}%` }} />
              </div>
            </div>

          </div>

          {/* ASSETS SECTION CARD */}
          <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6 shadow-md flex flex-col gap-6">
            
            {/* Asset card header */}
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider font-title-sm">ASSETS</h3>
              
              <div className="flex items-center gap-3">
                {/* Dual portfolio toggle */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-outline-variant hover:border-outline text-foreground rounded-xl px-4 py-2 bg-surface-container/50 hover:bg-surface-container text-xs font-semibold tracking-wider transition-all duration-200">
                      <span>{isDemo ? "ALL PORTFOLIOS" : "LIVE PORTFOLIO"}</span>
                      <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-surface-container-low border border-outline-variant text-foreground p-1 rounded-xl shadow-lg">
                    <DropdownMenuItem onClick={() => { setPortfolioMode("demo"); setCurrentPage(1); }} className="hover:bg-surface-container-high rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer transition-colors duration-150">
                      All Portfolios (Demo Mockup)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setPortfolioMode("live"); setCurrentPage(1); }} className="hover:bg-surface-container-high rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer transition-colors duration-150">
                      Live Wallet (Dynamic Holdings)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Styled square layout display grid button */}
                <button className="w-9 h-9 border border-outline-variant hover:border-outline text-on-surface-variant hover:text-foreground rounded-xl flex items-center justify-center bg-surface-container/50 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">grid_view</span>
                </button>
              </div>
            </div>

            {/* Assets Table */}
            <div className="overflow-x-auto rounded-xl border border-outline-variant/50">
              <Table>
                <TableHeader className="bg-surface-container/30">
                  <TableRow className="border-b border-outline-variant/35 hover:bg-transparent">
                    <TableHead className="py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider pl-6">ASSET</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">PRICE</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">BALANCE</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">24H CHANGE</TableHead>
                    <TableHead className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">TREND</TableHead>
                    <TableHead className="text-right text-xs font-bold text-on-surface-variant uppercase tracking-wider pr-6">VALUE (USD)</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedAssets.length > 0 ? (
                    paginatedAssets.map((item) => {
                      const coin = item.coin || {};
                      const value = (coin.current_price || 0) * (item.quantity || 0);
                      const isChangePositive = (coin.price_change_percentage_24h || 0) >= 0;
                      
                      return (
                        <TableRow
                          key={item.id}
                          onClick={() => navigate(`/market/${coin.id || "bitcoin"}`)}
                          className="border-b border-outline-variant/20 hover:bg-surface-container/40 transition-colors cursor-pointer group"
                        >
                          {/* Column 1: Asset Profile */}
                          <TableCell className="py-4 font-semibold pl-6 flex items-center gap-3">
                            <Avatar className="w-8 h-8 ring-1 ring-outline-variant/25 group-hover:scale-105 transition-transform duration-200">
                              <AvatarImage src={coin.image} alt={coin.symbol} />
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-foreground tracking-wide group-hover:text-[#00e290] transition-colors">{coin.name}</span>
                              <span className="text-[10px] text-on-surface-variant font-bold uppercase mt-0.5 tracking-wider">{coin.symbol}</span>
                            </div>
                          </TableCell>

                          {/* Column 2: Current Price */}
                          <TableCell className="text-sm font-medium text-foreground tracking-wide">
                            ${(coin.current_price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                          </TableCell>

                          {/* Column 3: Balance units */}
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-foreground tracking-wide">{(item.quantity || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
                              <span className="text-[10px] text-on-surface-variant font-semibold mt-0.5 tracking-wider">Available</span>
                            </div>
                          </TableCell>

                          {/* Column 4: 24H Price Change Percentage */}
                          <TableCell className={`text-sm font-bold tracking-wide ${isChangePositive ? "text-[#00e290]" : "text-red-500"}`}>
                            {isChangePositive ? "+" : ""}{(coin.price_change_percentage_24h || 0).toFixed(2)}%
                          </TableCell>

                          {/* Column 5: Trend Sparkbars */}
                          <TableCell>
                            <TrendSparkbars trend={item.trend} isPositive={isChangePositive} />
                          </TableCell>

                          {/* Column 6: Total holdings value */}
                          <TableCell className="text-right text-sm font-bold text-foreground tracking-wide pr-6">
                            ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-on-surface-variant text-sm font-medium">
                        No live assets in your wallet. Select "ALL PORTFOLIOS" above to view demo statistics.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {totalAssetsCount > itemsPerPage && (
              <div className="flex justify-between items-center pt-2">
                <span className="text-[11px] font-bold text-on-surface-variant/80 tracking-wider">
                  SHOWING {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalAssetsCount)} OF {totalAssetsCount} ASSETS
                </span>

                <div className="flex items-center gap-1.5">
                  <Button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="border-outline-variant text-xs text-on-surface-variant hover:text-foreground rounded-xl h-8 px-3.5 bg-surface-container/30 hover:bg-surface-container/70 disabled:opacity-40"
                  >
                    Prev
                  </Button>
                  
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <Button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        variant="outline"
                        className={`h-8 w-8 text-xs font-bold rounded-xl transition-all duration-200 ${
                          isActive 
                            ? "bg-[#00e290] text-[#003920] border-[#00e290] hover:bg-[#00e290]"
                            : "border-outline-variant text-on-surface-variant hover:text-foreground bg-surface-container/30 hover:bg-surface-container/70"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="border-outline-variant text-xs text-on-surface-variant hover:text-foreground rounded-xl h-8 px-3.5 bg-surface-container/30 hover:bg-surface-container/70 disabled:opacity-40"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Portfolio;
