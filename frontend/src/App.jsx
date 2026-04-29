import { useEffect } from "react";
import Lenis from "lenis";
import { CustomCursor } from "./components/CustomCursor";
import { SiteHeader } from "./components/SiteHeader";
import { GatewayView } from "./components/GatewayView";
import { ScholarRegistry } from "./components/ScholarRegistry";
import { SiteFooter } from "./components/SiteFooter";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
      mouseMultiplier: 0.8,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#022c22] min-h-screen text-[#ecfdf5] selection:bg-[#fbbf24]/30 selection:text-white">
      <CustomCursor />
      <SiteHeader />
      
      <main>
        <GatewayView />
        <ScholarRegistry />
      </main>
      
      <SiteFooter />
    </div>
  );
}

export default App;
