import { logout } from "@/Redux/Auth/Action";
import { SheetClose } from "@/components/ui/sheet";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const menu = [
  { name: "Terminal", path: "/", icon: "grid_view" },
  { name: "Markets", path: "/search", icon: "bar_chart" },
  { name: "Trade", path: "/market/bitcoin", icon: "swap_horiz" },
  { name: "Portfolio", path: "/portfolio", icon: "account_balance" },
  { name: "History", path: "/activity", icon: "history" },
  { name: "Watchlist", path: "/watchlist", icon: "bookmark" },
  { name: "Profile", path: "/profile", icon: "person" },
  { name: "Logout", path: "/", icon: "logout" },
];

const SidebarWrapper = ({ isSheet, children }) => {
  if (isSheet) {
    return <SheetClose className="w-full">{children}</SheetClose>;
  }
  return <div className="w-full">{children}</div>;
};

const SideBar = ({ isSheet, isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuClick = (item) => {
    if (item.name === "Logout") {
      handleLogout();
      navigate(item.path);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden bg-surface-container-low border-r border-outline-variant transition-all duration-300 ${
      isCollapsed ? "p-2 gap-4" : "p-4 gap-2"
    }`}>
      {/* Live Connection Header Section */}
      <div className={`px-4 py-4 mb-4 flex items-center shrink-0 ${isCollapsed ? "justify-center" : "gap-3"}`}>
        {!isCollapsed ? (
          <div className="text-left">
            <h2 className="text-sm font-bold text-primary font-title-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-white text-lg">bolt</span>
              Terminal v1.0
            </h2>
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5 font-label-xs mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Connection
            </p>
          </div>
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Live Connection"></div>
        )}
      </div>

      {/* Navigation Menu — scrollable when viewport is small or zoomed */}
      <nav className={`flex-1 min-h-0 flex flex-col overflow-y-auto custom-scrollbar ${isCollapsed ? "gap-3" : "gap-1.5"}`}>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div key={item.name} className="w-full shrink-0">
              <SidebarWrapper isSheet={isSheet}>
                <button
                  onClick={() => handleMenuClick(item)}
                  title={isCollapsed ? item.name : undefined}
                  className={`w-full flex items-center transition-all duration-200 group relative ${
                    isCollapsed ? "justify-center px-0 py-3" : "gap-4 px-4 py-3"
                  } rounded-xl border ${
                    isActive
                      ? "text-white font-bold bg-white/10 shadow-sm border-white/15"
                      : "text-on-surface-variant hover:text-white hover:bg-white/5 border-transparent"
                  }`}
                >
                  {/* Left Active border bar */}
                  {isActive && (
                    <span className="absolute left-0 top-[20%] bottom-[20%] w-[3.5px] bg-white rounded-r-md" />
                  )}
                  <span className={`material-symbols-outlined text-xl transition-colors duration-200 ${
                    isActive ? "text-white" : "text-on-surface-variant group-hover:text-white"
                  }`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="text-sm font-medium font-body-md">{item.name}</span>}
                </button>
              </SidebarWrapper>
            </div>
          );
        })}
      </nav>

      {/* Deposit Funds Action Footer — always visible, never scrolled away */}
      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-outline-variant shrink-0">
        <SidebarWrapper isSheet={isSheet}>
          <button
            onClick={() => navigate("/wallet")}
            title={isCollapsed ? "Deposit Funds" : undefined}
            className={`bg-white hover:bg-gray-200 text-black font-bold transition-all font-body-md hover:scale-[1.02] shadow-md flex items-center justify-center border-0 cursor-pointer ${
              isCollapsed ? "w-12 h-12 rounded-xl p-0" : "w-full py-3 rounded-xl gap-2"
            }`}
          >
            <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
            {!isCollapsed && "Deposit Funds"}
          </button>
        </SidebarWrapper>
        
        <SidebarWrapper isSheet={isSheet}>
          <button
            onClick={() => navigate("/support")}
            title={isCollapsed ? "Support" : undefined}
            className={`flex items-center text-on-surface-variant hover:text-white hover:bg-white/5 rounded-xl transition-all border-0 cursor-pointer ${
              isCollapsed ? "w-12 h-12 justify-center p-0" : "w-full gap-3 px-4 py-2.5"
            }`}
          >
            <span className="material-symbols-outlined text-lg">help</span>
            {!isCollapsed && <span className="text-sm font-medium font-body-md">Support</span>}
          </button>
        </SidebarWrapper>

        {/* Toggle Collapse Button (Desktop Only) */}
        {!isSheet && (
          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? "Expand Menu" : "Minimize Menu"}
            className={`flex items-center text-on-surface-variant hover:text-white hover:bg-white/5 rounded-xl transition-all border-0 cursor-pointer ${
              isCollapsed ? "w-12 h-12 justify-center p-0" : "w-full gap-3 px-4 py-2.5"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {isCollapsed ? "keyboard_double_arrow_right" : "keyboard_double_arrow_left"}
            </span>
            {!isCollapsed && <span className="text-sm font-medium font-body-md">Minimize Menu</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default SideBar;
