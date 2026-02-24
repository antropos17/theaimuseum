"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CrtMonitorCssProps {
    isPowered: boolean;
    onBootComplete?: () => void;
    children?: React.ReactNode;
    className?: string;
}

export function CrtMonitorCss({ isPowered, onBootComplete, children, className }: CrtMonitorCssProps) {
    const [bootState, setBootState] = useState<"off" | "powering" | "on">("off");

    useEffect(() => {
        if (!isPowered) {
            setBootState("off");
            return;
        }

        // Skip boot if already booted this session
        if (typeof window !== "undefined" && sessionStorage.getItem("aimuseum-booted")) {
            setBootState("on");
            onBootComplete?.();
            return;
        }

        // 2.5s boot sequence
        const t1 = setTimeout(() => setBootState("powering"), 100);
        const t2 = setTimeout(() => {
            setBootState("on");
            onBootComplete?.();
        }, 2600);

        return () => { clearTimeout(t1); clearTimeout(t2); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPowered]);

    return (
        <div className={cn(
            "relative w-full max-w-6xl mx-auto aspect-[4/3] p-[4%] bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a] rounded-2xl shadow-2xl border-[3px] border-[#333] transition-all",
            className
        )}>
            {/* Screen Frame Bezel */}
            <div className={cn(
                "w-full h-full relative overflow-hidden rounded-lg bg-[#0a0a0f] transition-all duration-1000",
                bootState === "on" ? "shadow-[inset_0_0_30px_rgba(0,255,136,0.15)]" : ""
            )}>
                {/* Scanlines */}
                <div
                    className={cn(
                        "absolute inset-0 pointer-events-none transition-opacity duration-1000 z-50",
                        bootState === "on" ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)"
                    }}
                />

                {/* Phosphor Glow Edge */}
                <div className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-1000 z-40 rounded-lg",
                    bootState === "on" ? "opacity-100" : "opacity-0"
                )} style={{ boxShadow: "inset 0 0 30px rgba(0,255,136,0.04)" }} />

                {/* Content */}
                <div
                    className={cn(
                        "w-full h-full pointer-events-auto overflow-y-auto transition-opacity duration-1000 relative z-10 text-[#00ff88]",
                        bootState === "on" ? "opacity-100" : "opacity-0"
                    )}
                    onScroll={(e) => {
                        const scrollTop = (e.target as HTMLDivElement).scrollTop;
                        window.dispatchEvent(new CustomEvent("museum-scroll", { detail: scrollTop }));
                    }}
                >
                    {children}
                </div>
            </div>

            {/* Power Button & LED */}
            <div className="absolute bottom-[1.5%] right-[5%] flex items-center gap-2">
                <div className="text-[10px] sm:text-xs font-mono text-gray-500 tracking-widest">POWER</div>
                <div className={cn(
                    "w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300",
                    bootState === "off" ? "bg-red-900" : "bg-[#00ff88] shadow-[0_0_12px_#00ff88]"
                )} />
            </div>

            {/* Stand base effect - visual matching */}
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[30%] h-[20px] bg-gradient-to-b from-[#111] to-[#0a0a0f] rounded-b-md shadow-xl" />
            <div className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-[50%] h-[10px] bg-gradient-to-b from-[#161622] to-[#0c0c10] rounded-b-lg shadow-xl" />
        </div>
    );
}

export default CrtMonitorCss;
