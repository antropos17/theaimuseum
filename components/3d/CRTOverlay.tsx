"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useStore } from "@/lib/store";

export function CRTOverlay({ children }: { children: React.ReactNode }) {
    const { hasBooted } = useStore();
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isGlitching, setIsGlitching] = useState(false);

    // Expose glitch trigger (could also be managed globally or via custom events)
    useEffect(() => {
        const handleGlitchEvent = () => {
            setIsGlitching(true);
            if (overlayRef.current) {
                gsap.to(overlayRef.current, {
                    opacity: 0.8,
                    duration: 0.05,
                    yoyo: true,
                    repeat: 3,
                    onComplete: () => {
                        setIsGlitching(false);
                    },
                });
            }
        };

        window.addEventListener("trigger-crt-glitch", handleGlitchEvent);
        return () => window.removeEventListener("trigger-crt-glitch", handleGlitchEvent);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0f] text-[#00ff88] font-mono">
            {/* Content wrapper - gets framed once booted */}
            <div
                className={`w-full h-full transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${hasBooted
                    ? "p-4 sm:p-8" // The subtle CRT inner monitor frame wrapper
                    : "p-0"
                    }`}
            >
                <div id="scroll-container" className={`relative w-full h-full overflow-y-auto overflow-x-hidden ${hasBooted ? 'rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.1)_inset]' : ''}`}>
                    {children}
                </div>
            </div>

            {/* Global Scanlines Overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-50 w-full h-full opacity-15"
                style={{
                    background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                    backgroundSize: "100% 4px, 6px 100%",
                }}
            />

            {/* Vignette (Monitor glass curve lighting effect) */}
            <div
                className={`pointer-events-none fixed inset-0 z-40 w-full h-full transition-opacity duration-1000 ${hasBooted ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    background: "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
                }}
            />

            {/* Dynamic Glitch Overlay */}
            {isGlitching && (
                <div
                    ref={overlayRef}
                    className="pointer-events-none fixed inset-0 z-50 w-full h-full mix-blend-overlay opacity-0 bg-white"
                />
            )}
        </div>
    );
}
