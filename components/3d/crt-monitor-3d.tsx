"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDetectGPU } from "@react-three/drei";
import CrtMonitorCss from "./crt-monitor-css";

const CrtMonitorThree = dynamic(() => import("./crt-monitor-three").then(m => m.CrtMonitorThree), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full relative flex items-center justify-center p-[4%]">
            <div className="w-full h-full rounded-2xl border-[3px] border-[#333] bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a]" />
        </div>
    )
});

export interface CrtMonitor3DProps {
    isPowered: boolean;
    onBootComplete?: () => void;
    children?: React.ReactNode;
    className?: string; // Add optional className here
    isZoomingIn?: boolean;
}

export function CrtMonitor3D(props: CrtMonitor3DProps) {
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === "undefined") return true;
        return window.matchMedia("(pointer: coarse) or (max-width: 768px)").matches;
    });
    const gpuTier = useDetectGPU();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(pointer: coarse) or (max-width: 768px)");
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const shouldFallback = isMobile || (gpuTier && gpuTier.tier < 2);

    if (shouldFallback) {
        return <CrtMonitorCss {...props} />;
    }

    return <CrtMonitorThree {...props} />;
}

export default CrtMonitor3D;
