import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const GatewayView = () => {
  const portalRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: portalRef,
    offset: ["start start", "end start"],
  });

  const textFloat = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section 
      ref={portalRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#022c22]"
    >
      {/* Dynamic Aura Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#022c22]/10 via-[#022c22]/60 to-[#022c22] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop" 
          alt="Nexus Gateway" 
          className="w-full h-full object-cover grayscale opacity-20"
        />
      </div>

      {/* Primary Message */}
      <motion.div 
        className="relative z-10 text-center px-8"
        style={{ y: textFloat, opacity: fadeOut }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-10 overflow-hidden">
          <motion.span 
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="inline-block px-6 py-2 rounded-full border border-[#fbbf24]/20 bg-[#fbbf24]/5 text-[10px] font-black uppercase tracking-[0.3em] text-[#fbbf24]"
          >
            Access Authorized
          </motion.span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-[-0.05em] leading-[0.9]">
          SCHOLAR<br/>
          <span className="text-[#fbbf24]">NEXUS.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#6ee7b7]/50 max-w-2xl mx-auto font-medium">
          The central authority for academic record management and registry integrity.
        </p>
      </motion.div>

      {/* Activity Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#fbbf24] to-transparent" />
      </motion.div>
    </section>
  );
};
