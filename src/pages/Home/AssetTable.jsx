import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export function AssetTable({ coins, category, selectedCoinId, onSelectCoin }) {
  const navigate = useNavigate();

  // Short-form Market Cap number formatter
  const formatMarketCap = (val) => {
    if (val === undefined || val === null) return "N/A";
    if (val >= 1e12) {
      return `$${(val / 1e12).toFixed(2)}T`;
    }
    if (val >= 1e9) {
      return `$${(val / 1e9).toFixed(1)}B`;
    }
    if (val >= 1e6) {
      return `$${(val / 1e6).toFixed(1)}M`;
    }
    return `$${val.toLocaleString()}`;
  };

  // Preset list of popular DeFi protocol symbols for client-side category filtering
  const DEFI_SYMBOLS = [
    "link", "uni", "aave", "mkr", "ldo", "snx", "grt", "crv", "ftm", 
    "comp", "yfi", "1inch", "dydx", "lrc", "maker", "fantom", "uniswap", "chainlink"
  ];

  // Dynamically filter coins if DeFi tab is selected
  const displayCoins = category === "defi"
    ? (coins ? coins.filter(item => 
        DEFI_SYMBOLS.includes(item.symbol.toLowerCase()) || 
        DEFI_SYMBOLS.includes(item.id.toLowerCase())
      ) : [])
    : coins;

  return (
    <div className="w-full h-full overflow-hidden border-t border-outline-variant/30 asset-table-container bg-surface-container-lowest">
      <ScrollArea className={category === "all" ? "h-[72vh]" : "h-[80vh]"}>
        <Table className="w-full text-left border-collapse select-none">
          <TableHeader className="sticky top-0 bg-surface-container-lowest z-10 border-b border-outline-variant/40">
            <TableRow className="text-label-xs font-label-xs uppercase tracking-wider border-b border-outline-variant/40 hover:bg-transparent">
              <TableHead className="px-4 py-3.5 font-bold text-on-surface-variant">Coin</TableHead>
              <TableHead className="px-4 py-3.5 font-bold text-right text-on-surface-variant">Price</TableHead>
              <TableHead className="px-4 py-3.5 font-bold text-right text-on-surface-variant">24h Change</TableHead>
              <TableHead className="px-4 py-3.5 font-bold text-right text-on-surface-variant hidden sm:table-cell">Market Cap</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-outline-variant/20 bg-surface-container-lowest">
            {displayCoins && displayCoins.length > 0 ? (
              displayCoins.map((item) => {
                const isPositive = item.market_cap_change_percentage_24h >= 0;
                
                // Fallback color schemes for crypto coin characters if avatar image fails
                const badgeColors = [
                  "bg-orange-500/10 text-orange-400 border-orange-500/20",
                  "bg-blue-500/10 text-blue-400 border-blue-500/20",
                  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                  "bg-purple-500/10 text-purple-400 border-purple-500/20",
                  "bg-rose-500/10 text-rose-400 border-rose-500/20"
                ];
                const bgIndex = Math.abs(item.symbol.charCodeAt(0) % badgeColors.length);
                const selectedBadgeColor = badgeColors[bgIndex];

                const isSelected = selectedCoinId === item.id;

                return (
                  <TableRow
                    className={`hover:bg-surface-bright/20 hover:scale-[1.002] transition-all duration-200 cursor-pointer group border-b border-outline-variant/15 ${
                      isSelected ? "bg-surface-bright/40 border-primary/30 shadow-sm" : ""
                    }`}
                    onClick={() => onSelectCoin?.(item.id)}
                    onDoubleClick={() => navigate(`/market/${item.id}`)}
                    key={item.id}
                  >
                    {/* Coin Identity: Avatar, Name and Symbol subtitle */}
                    <TableCell className="px-4 py-3 font-medium text-primary">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.symbol} 
                            className="w-8 h-8 rounded-full border border-outline-variant/30 object-cover" 
                            onError={(e) => { 
                              e.target.onerror = null; 
                              e.target.style.display = "none"; 
                            }} 
                          />
                        ) : (
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-black text-[10px] font-data-mono ${selectedBadgeColor}`}>
                            {item.symbol.substring(0, 3).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-primary group-hover:text-white transition-colors block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-on-surface-variant uppercase font-data-mono block mt-0.5">
                            {item.symbol}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Price right-aligned */}
                    <TableCell className="px-4 py-3 text-right font-data-mono font-bold text-primary">
                      {item.current_price ? `$${item.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}` : "N/A"}
                    </TableCell>

                    {/* 24h Change right-aligned */}
                    <TableCell
                      className={`px-4 py-3 text-right font-data-mono font-bold animate-pulse-slow ${
                        isPositive ? "price-up text-[#00e290]" : "price-down text-[#ffb4ab]"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {item.market_cap_change_percentage_24h ? item.market_cap_change_percentage_24h.toFixed(3) : "0.00"}%
                    </TableCell>

                    {/* Market Cap right-aligned (hidden on mobile) */}
                    <TableCell className="px-4 py-3 text-right font-data-mono text-on-surface-variant hidden sm:table-cell">
                      {formatMarketCap(item.market_cap)}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="px-4 py-8 text-center text-xs font-semibold text-on-surface-variant font-data-mono">
                  No coins found matching category criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
