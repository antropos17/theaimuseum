"use client";

import { useEffect, useState } from "react";

export function ChannelSwitch({ onComplete, durationMs = 400 }: { onComplete: () => void, durationMs?: number }) {
    const [phase, setPhase] = useState<"glitch" | "black" | "tune-in">("glitch");

    useEffect(() => {
        // Phase 1: Glitch (0 -> 100ms)
        const t1 = setTimeout(() => setPhase("black"), durationMs * 0.25);

        // Phase 2: Black (100ms -> 250ms)
        const t2 = setTimeout(() => setPhase("tune-in"), durationMs * 0.6);

        // Phase 3: Tune-in and complete (250ms -> 400ms)
        const t3 = setTimeout(() => onComplete(), durationMs);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [durationMs, onComplete]);

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
            {/* Glitch phase */}
            {phase === "glitch" && (
                <div
                    className="absolute inset-0 bg-white opacity-20"
                    style={{
                        mixBlendMode: "difference",
                        animation: "noise 0.2s step-end infinite",
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)"
                    }}
                />
            )}

            {/* Black phase */}
            {phase === "black" && (
                <div className="absolute inset-0 bg-[#020202]" />
            )}

            {/* Tune-in phase */}
            {phase === "tune-in" && (
                <div
                    className="absolute inset-0 bg-[#0a0a0f]"
                    style={{
                        animation: "tuneIn 0.15s ease-out forwards",
                    }}
                >
                    <div className="w-full h-full bg-white opacity-10" style={{ animation: "noise 0.1s step-end infinite" }} />
                </div>
            )}

            <style jsx>{`
        @keyframes tuneIn {
          0% { transform: scaleY(0.01) scaleX(0); opacity: 1; filter: brightness(2) contrast(2); }
          50% { transform: scaleY(0.01) scaleX(1); opacity: 1; filter: brightness(1.5) contrast(1.5); }
          100% { transform: scaleY(1) scaleX(1); opacity: 0; filter: brightness(1) contrast(1); }
        }
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
      `}</style>
        </div>
    );
}
