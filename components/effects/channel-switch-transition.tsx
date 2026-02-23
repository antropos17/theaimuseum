"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChannelSwitchTransitionProps {
  children: React.ReactNode;
}

export function ChannelSwitchTransition({ children }: ChannelSwitchTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<"static" | "blank" | "tune" | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    setIsHydrated(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isHydrated && pathname !== prevPathname.current) {
      triggerTransition();
      prevPathname.current = pathname;
    }
  }, [pathname, isHydrated]);

  const triggerTransition = async () => {
    setIsTransitioning(true);
    
    if (isMobile === true) {
      setPhase("blank");
      await new Promise((r) => setTimeout(r, 200));
    } else {
      // Phase 1: Static (120ms)
      setPhase("static");
      await new Promise((r) => setTimeout(r, 120));
      
      // Phase 2: Blank (80ms)
      setPhase("blank");
      await new Promise((r) => setTimeout(r, 80));
    }
    
    // Phase 3: Tune-in (100ms)
    setPhase("tune");
    await new Promise((r) => setTimeout(r, 100));
    
    setIsTransitioning(false);
    setPhase(null);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          >
            {/* Phase 1: Static Noise */}
            {phase === "static" && isMobile !== true && (
              <motion.div 
                className="absolute inset-0 bg-[#0a0a0f]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.7, 1, 0.5, 0.9, 0.6] }}
                transition={{ duration: 0.12, repeat: Infinity }}
              >
                {/* SVG Noise Filter */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <filter id="noise">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.65"
                      numOctaves="3"
                      stitchTiles="stitch"
                    />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
                
                {/* Scanline Overlay */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff88 2px, #00ff88 4px)',
                    backgroundSize: '100% 4px'
                  }}
                />

                {/* Random Horizontal Artifacts */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full bg-white/20 h-[1px] md:h-[2px]"
                    style={{ top: `${Math.random() * 100}%` }}
                    animate={{ 
                      top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ duration: 0.05, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            )}

            {/* Phase 2: Blank Screen with Centered Line */}
            {phase === "blank" && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <motion.div
                  className="h-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 0.08, ease: "easeInOut" }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Chromatic Aberration during Static Phase */}
      <motion.div
        animate={
          phase === "static" 
            ? { 
                filter: [
                  "drop-shadow(2px 0 0 #ff0000) drop-shadow(-2px 0 0 #0000ff)",
                  "drop-shadow(-1px 0 0 #f00) drop-shadow(1px 0 0 #00f)",
                  "drop-shadow(2px 0 0 #ff0000) drop-shadow(-2px 0 0 #0000ff)"
                ] 
              }
            : phase === "tune"
            ? { y: [-3, 0], opacity: [0.8, 1], filter: "none" }
            : { y: 0, opacity: 1, filter: "none" }
        }
        transition={
          phase === "static" 
            ? { duration: 0.1, repeat: Infinity } 
            : { duration: 0.1 }
        }
        className="relative min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
