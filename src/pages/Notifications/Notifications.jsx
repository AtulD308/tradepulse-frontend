import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { readableDate } from "@/Util/readableDate";
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  ShieldAlert,
  BellRing,
  Trash2,
  Inbox,
  ArrowRight,
  TrendingDown
} from "lucide-react";

// Mockup notifications for fallbacks/enrichment
const STATIC_NOTIFICATIONS = [
  {
    id: "static_txn_cancelled",
    type: "TRANSACTION",
    status: "CANCELLED",
    title: "Order Cancelled",
    description: "Limit order to buy 15.0 SOL at $148.50 was cancelled because it expired or was manually cancelled.",
    date: "21 May",
    time: "11:15 AM",
    read: false,
  },
  {
    id: "static_trend_1",
    type: "TREND",
    title: "Upward Trend Alert: SOL",
    description: "SOL (Solana) is in a strong upward trend, surging +8.45% in the last 24 hours. Volume increased by 42%.",
    date: "21 May",
    time: "10:30 AM",
    read: false,
    coinId: "solana",
  },
  {
    id: "static_security_1",
    type: "SYSTEM",
    title: "Security: 2FA Setup",
    description: "Your account 2-Step Verification (2FA) has been successfully verified and active.",
    date: "20 May",
    time: "03:45 PM",
    read: true,
  },
  {
    id: "static_trend_2",
    type: "TREND",
    title: "Upward Trend Alert: ETH",
    description: "ETH (Ethereum) broke past the immediate $3,500 resistance, climbing +5.12% today. Volume spikes indicate solid buyer support.",
    date: "20 May",
    time: "01:20 PM",
    read: true,
    coinId: "ethereum",
  },
  {
    id: "static_deposit_1",
    type: "TRANSACTION",
    status: "COMPLETED",
    title: "Deposit Completed",
    description: "Successfully added $5,000.00 to your USD Wallet via linked Bank Account transfer.",
    date: "19 May",
    time: "09:00 AM",
    read: true,
  },
  {
    id: "static_trend_3",
    type: "TREND",
    title: "Upward Trend Alert: DOGE",
    description: "DOGE (Dogecoin) shows extreme upward momentum, climbing +12.30% with high volume in 6 hours.",
    date: "19 May",
    time: "08:15 AM",
    read: true,
    coinId: "dogecoin",
  },
];

// Curated upward trending coins for the right-hand panel
const TRENDING_COINS = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", change: "+4.21%", price: "$67,420.50" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", change: "+5.12%", price: "$3,512.80" },
  { id: "solana", name: "Solana", symbol: "SOL", change: "+8.45%", price: "$168.33" },
  { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", change: "+12.30%", price: "$0.142" },
];

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  // Fetch actual user orders to dynamically enrich transaction notifications
  useEffect(() => {
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  // Combine dynamic Redux orders with static fallback notifications
  useEffect(() => {
    const dynamicTxns = (order.orders || []).map((item) => {
      const orderDate = readableDate(item.timestamp);
      return {
        id: `dynamic_txn_${item.id}`,
        type: "TRANSACTION",
        status: "COMPLETED",
        title: "Order Completed",
        description: `Successfully ${item.orderType === "BUY" ? "bought" : "sold"} ${item.orderItem.coin.name} worth $${item.price} at an average price of $${item.orderItem.buyPrice || item.orderItem.sellPrice}.`,
        date: orderDate.date,
        time: orderDate.time,
        read: false,
      };
    });

    // Merge and set sorted list
    setNotifications([...dynamicTxns, ...STATIC_NOTIFICATIONS]);
  }, [order.orders]);

  // Handle Mark All as Read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Handle Delete Notification
  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Handle Click to Read
  const handleCardClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Handle Clear All
  const handleClearAll = () => {
    setNotifications([]);
  };

  // Filtered notifications
  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "ALL") return true;
    return n.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col items-center min-h-[90vh] bg-[#050a0e] text-white pt-6 px-4 md:px-8 pb-10">
      
      {/* Dynamic Background Glowing Circles */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-radial-gradient(circle, rgba(16,185,129,0.02) 0%, transparent 70%) pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%) pointer-events-none -z-10" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        
        {/* LEFT & CENTER PANEL: Notification List (Grid span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-[#0b1217]/60 backdrop-blur-md border border-[#272a2e]/60 rounded-xl shadow-2xl">
            <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl md:text-2xl font-bold text-white tracking-wide font-sans">
                  Notification Center
                </CardTitle>
                {unreadCount > 0 && (
                  <span className="bg-emerald-500/10 text-emerald-400/90 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-body-md font-bold tracking-wider text-[11px]">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {notifications.length > 0 && (
                  <>
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-xs font-medium text-emerald-300 hover:text-emerald-200 hover:underline transition-all bg-transparent border-0 cursor-pointer"
                    >
                      Mark all read
                    </button>
                    <span className="text-gray-600 text-xs">|</span>
                    <button
                      onClick={handleClearAll}
                      className="text-xs font-medium text-red-400/80 hover:text-red-400 hover:underline transition-all bg-transparent border-0 cursor-pointer"
                    >
                      Clear all
                    </button>
                  </>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {/* Tab Filters with defined boundary capsule for humanized aesthetic */}
              <div className="p-1.5 bg-[#0a0f12] border border-[#1e262c] rounded-xl flex gap-1 mb-6 overflow-x-auto custom-scrollbar">
                {["ALL", "TRANSACTION", "TREND", "SYSTEM"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 border ${
                      activeTab === tab
                        ? "bg-[#162028] text-white border-[#2c3b49] shadow-inner"
                        : "bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-[#12191f]/50"
                    }`}
                  >
                    {tab === "ALL"
                      ? "All Activities"
                      : tab === "TRANSACTION"
                      ? "Transactions"
                      : tab === "TREND"
                      ? "Market Trends"
                      : "System"}
                  </button>
                ))}
              </div>

              {/* Notification List Scroll Area */}
              <ScrollArea className="h-[550px] pr-2">
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="p-4 rounded-full bg-[#181d22]/60 border border-[#272a2e]/30 text-gray-500">
                      <Inbox className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-lg">All caught up!</p>
                      <p className="text-gray-500 text-sm mt-1">No notifications matching this category were found.</p>
                    </div>
                  </div>
                ) : (
                  /* Unified container boundary enclosing all items with inner dividers */
                  <div className="border border-[#1e262c] bg-[#070b0e]/30 rounded-xl overflow-hidden divide-y divide-[#182026]">
                    {filteredNotifications.map((n) => {
                      const isUnread = !n.read;
                      return (
                        <div
                          key={n.id}
                          onClick={() => handleCardClick(n.id)}
                          className={`relative flex items-start gap-4 p-4 transition-all duration-300 cursor-pointer ${
                            isUnread
                              ? "bg-[#0e1a22]/50 hover:bg-[#12222d]/50 border-l-2 border-l-emerald-500/50"
                              : "bg-transparent hover:bg-[#0d141a]/40 border-l-2 border-l-transparent"
                          }`}
                        >
                          {/* Pulsing Unread Indicator dot */}
                          {isUnread && (
                            <span className="absolute top-4 right-4 flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                            </span>
                          )}

                          {/* Status Icon */}
                          <div className="mt-0.5">
                            {n.type === "TRANSACTION" ? (
                              n.status === "CANCELLED" ? (
                                <XCircle className="w-5 h-5 text-red-400/80" />
                              ) : (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              )
                            ) : n.type === "TREND" ? (
                              <TrendingUp className="w-5 h-5 text-amber-400/80" />
                            ) : (
                              <ShieldAlert className="w-5 h-5 text-sky-400" />
                            )}
                          </div>

                          {/* Text Info */}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between pr-4">
                              <h4 className={`text-sm font-semibold tracking-tight ${isUnread ? "text-emerald-300" : "text-white"}`}>
                                {n.title}
                              </h4>
                              <span className="text-[10px] text-gray-500 font-medium font-sans">
                                {n.date} &bull; {n.time}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed font-body-md pr-6">
                              {n.description}
                            </p>

                            {/* Direct Action Link for Trending Coins */}
                            {n.type === "TREND" && n.coinId && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/market/${n.coinId}`);
                                }}
                                className="mt-2 text-[11px] font-semibold text-emerald-300 hover:text-emerald-200 hover:underline flex items-center gap-1 bg-transparent border-0 cursor-pointer font-sans"
                              >
                                View Market & Trade <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {/* Dismiss Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(n.id);
                            }}
                            className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-[#181d22]/50 border-0 bg-transparent cursor-pointer"
                            title="Delete notification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT PANEL: Upward Trending Investment suggestions (Grid span 1) */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-[#0b1217]/60 backdrop-blur-md border border-[#272a2e]/60 rounded-xl shadow-2xl sticky top-24">
            <CardHeader className="pb-3 border-b border-[#272a2e]/60">
              <div className="flex items-center gap-2 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                <CardTitle className="text-lg font-bold tracking-wide text-white font-sans">
                  Trending Investments
                </CardTitle>
              </div>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Assets with significant upward trajectories and high volume surge in the last 24 hours:
              </p>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              {TRENDING_COINS.map((coin) => (
                <div
                  key={coin.id}
                  className="group flex flex-col p-3.5 rounded-xl bg-[#0a0f12]/60 border border-[#1c242b] hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {coin.name}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">
                        {coin.symbol}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-semibold text-white font-data-mono">
                        {coin.price}
                      </p>
                      <Badge className="bg-emerald-950/40 text-emerald-400/90 font-semibold text-[10px] px-2 py-0.5 border border-emerald-900/40">
                        {coin.change}
                      </Badge>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/market/${coin.id}`)}
                    className="mt-4 w-full py-2 rounded-lg bg-[#e1e2e7] hover:bg-white text-[#050a0e] font-bold text-xs transition-all duration-300 tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] border-0 cursor-pointer uppercase"
                  >
                    TRADE NOW
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Warning Alert */}
              <div className="p-3 rounded-lg bg-[#ffb4ab]/5 border border-[#ffb4ab]/15 text-xs text-[#ffb4ab]/80 leading-relaxed font-body-md">
                <strong>Disclaimer:</strong> Trends represent past performance metrics and do not guarantee future gains. Please practice standard risk mitigation.
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default Notifications;
