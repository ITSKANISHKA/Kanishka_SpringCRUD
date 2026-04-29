import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export const SiteHeader = () => {
  const [activeScroll, setActiveScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setActiveScroll(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 w-full z-[1000] transition-all duration-700",
        activeScroll ? "bg-[#022c22]/90 backdrop-blur-xl border-b border-[#6ee7b7]/10 py-5" : "bg-transparent py-10"
      )}
    >
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#fbbf24] rounded-xl flex items-center justify-center font-black text-[#022c22]">N</div>
          <span className="text-2xl font-black text-white tracking-tighter uppercase">Nexus<span className="text-[#fbbf24]">.</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {["Directory", "Vault", "System", "Security"].map((nav) => (
            <a key={nav} href="#" className="text-xs font-black uppercase tracking-[0.2em] text-[#6ee7b7]/40 hover:text-[#fbbf24] transition-colors">{nav}</a>
          ))}
          <div className="w-[1px] h-4 bg-[#6ee7b7]/10 mx-2" />
          <button className="px-6 py-2 bg-[#fbbf24]/5 border border-[#fbbf24]/20 rounded-lg text-[#fbbf24] text-[10px] font-black uppercase tracking-widest hover:bg-[#fbbf24] hover:text-[#022c22] transition-all">Sign Out</button>
        </nav>
      </div>
    </motion.header>
  );
};
