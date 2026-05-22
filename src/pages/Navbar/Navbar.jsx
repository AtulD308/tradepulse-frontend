import { Button } from "@/components/ui/button";
import { DragHandleHorizontalIcon } from "@radix-ui/react-icons";
import SideBar from "../SideBar/SideBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((store) => store);

  const handleNavigate = () => {
    if (auth.user) {
      auth.user.role === "ROLE_ADMIN" ? navigate("/admin/withdrawal") : navigate("/profile");
    }
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-6 h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
      {/* Left side: Hamburger (Mobile) + Logo + Search */}
      <div className="flex items-center gap-4 lg:gap-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="rounded-full h-10 w-10 md:hidden flex items-center justify-center p-0 hover:bg-[#272a2e]"
              variant="ghost"
              size="icon"
            >
              <DragHandleHorizontalIcon className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-72 border-r-0 flex flex-col justify-between p-0 bg-surface-container-low"
            side="left"
          >
            <SheetHeader className="p-4 border-b border-outline-variant">
              <SheetTitle>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-xl font-extrabold tracking-wide text-primary">
                    <span>TRADE</span>
                    <span className="text-[#00e290]">-</span>
                    <span>PULSE</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <SideBar isSheet={true} />
            </div>
          </SheetContent>
        </Sheet>

        <span
          onClick={() => navigate("/")}
          className="text-lg lg:text-xl font-bold text-primary cursor-pointer font-title-sm hover:opacity-90 flex items-center gap-1.5"
        >
          Trade Pulse
        </span>

        {/* Search input - navigates to search route when clicked */}
        <div 
          onClick={() => navigate("/search")} 
          className="relative hidden lg:block cursor-pointer group"
        >
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] group-hover:text-primary transition-colors">
            search
          </span>
          <input
            readOnly
            className="bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-1.5 text-body-md focus:outline-none focus:ring-1 focus:ring-[#00e290] w-60 xl:w-64 cursor-pointer text-on-surface-variant group-hover:border-on-surface-variant transition-all font-body-md"
            placeholder="Search markets..."
            type="text"
          />
        </div>
      </div>

      {/* Middle side: Tab Navigation (Desktop) */}
      <nav className="hidden md:flex items-center gap-8">
        <button
          onClick={() => navigate("/")}
          className={`font-body-md text-sm font-medium transition-all duration-200 ${
            location.pathname === "/"
              ? "text-primary border-b-2 border-[#00e290] pb-1 font-bold"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          Terminal
        </button>
        <button
          onClick={() => navigate("/search")}
          className={`font-body-md text-sm font-medium transition-all duration-200 ${
            location.pathname === "/search"
              ? "text-primary border-b-2 border-[#00e290] pb-1 font-bold"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          Markets
        </button>
        <button
          onClick={() => navigate("/portfolio")}
          className={`font-body-md text-sm font-medium transition-all duration-200 ${
            location.pathname === "/portfolio"
              ? "text-primary border-b-2 border-[#00e290] pb-1 font-bold"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          Portfolio
        </button>
      </nav>

      {/* Right side: Actions / Utilities + Profile */}
      <div className="flex items-center gap-4 lg:gap-5">
        <button 
          onClick={() => navigate("/notifications")}
          className={`material-symbols-outlined transition-colors text-[22px] flex items-center justify-center p-1 rounded-lg ${
            location.pathname === "/notifications"
              ? "text-primary bg-surface-container-high/80 border border-outline-variant/35 shadow-sm"
              : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high/50"
          }`}
          title="Notifications"
        >
          notifications
        </button>
        <button 
          onClick={() => navigate("/wallet")}
          className={`material-symbols-outlined transition-colors text-[22px] flex items-center justify-center p-1 rounded-lg ${
            location.pathname === "/wallet"
              ? "text-primary bg-surface-container-high/80 border border-outline-variant/35 shadow-sm"
              : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high/50"
          }`}
          title="Wallet"
        >
          account_balance_wallet
        </button>
        <button 
          onClick={() => navigate("/settings")}
          className={`material-symbols-outlined transition-colors text-[22px] flex items-center justify-center p-1 rounded-lg ${
            location.pathname === "/settings"
              ? "text-primary bg-surface-container-high/80 border border-outline-variant/35 shadow-sm"
              : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high/50"
          }`}
          title="Settings"
        >
          settings
        </button>
        
        <Avatar 
          className="cursor-pointer border border-outline-variant w-8 h-8 hover:scale-105 transition-transform" 
          onClick={handleNavigate}
        >
          {!auth.user ? (
            <AvatarFallback className="bg-surface-container-high text-on-surface-variant font-bold text-xs">
              U
            </AvatarFallback>
          ) : (
            <AvatarFallback className="bg-surface-container-high text-primary font-bold text-xs">
              {auth.user?.fullName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
    </header>
  );
};

export default Navbar;

