"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";

interface VirusScanLoaderProps {
  onComplete?: () => void;
  speed?: number;
}

export function VirusScanLoader({ onComplete, speed = 1 }: VirusScanLoaderProps) {
  const pathname = usePathname() || "/";
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const scanLines = useMemo(() => {
    const target = pathname === "/" ? "ROOT_SYSTEM" : pathname.toUpperCase();
    return [
      { type: "text", text: `[ESTABLISHING CONNECTION TO ${target}...]`, color: "text-[#00ff88]" },
      { type: "text", text: `> Scanning route dependencies for ${pathname}...`, color: "text-[#00ff88]" },
      { type: "progress" },
      { type: "text", text: `> /models/gpt-5/weights.bin          OK`, color: "text-[#00ff88]" },
      { type: "text", text: `> /routes${pathname === "/" ? "/index" : pathname}/page.tsx       VERIFIED`, color: "text-[#00ff88]" },
      { type: "text", text: `> /models/deepseek/cost.cfg          ANOMALY: $5.5M`, color: "text-yellow-400" },
      { type: "text", text: `[ROUTING COMPLETE: Access granted to ${target}]`, color: "text-[#00ff88]" },
    ];
  }, [pathname]);

  useEffect(() => {
    if (currentStep >= scanLines.length) {
      if (onComplete) {
        const timer = setTimeout(onComplete, 500 / speed);
        return () => clearTimeout(timer);
      }
      return;
    }

    const step = scanLines[currentStep];

    if (step.type === "progress") {
      if (progress < 100) {
        const timer = setTimeout(() => {
          setProgress((p) => Math.min(p + Math.floor(Math.random() * 15) + 5, 100));
        }, 50 / speed);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setCurrentStep((s) => s + 1), 400 / speed);
        return () => clearTimeout(timer);
      }
    } else {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 400 / speed);
      return () => clearTimeout(timer);
    }
  }, [currentStep, progress, onComplete, speed, scanLines.length]);

  const renderProgressBar = (value: number) => {
    const totalBlocks = 12; // ████████░░░░
    const filledBlocks = Math.floor((value / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return `${"█".repeat(filledBlocks)}${"░".repeat(emptyBlocks)} ${value}%`;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black font-mono text-sm sm:text-base p-4">
      <div className="w-full max-w-2xl flex flex-col items-start gap-1">
        {scanLines.slice(0, currentStep + 1).map((line, index) => {
          const isCurrent = index === currentStep;

          if (line.type === "progress") {
            const currentProgress = isCurrent ? progress : 100;
            return (
              <div key={index} className="text-[#00ff88] whitespace-pre-wrap">
                {renderProgressBar(currentProgress)}
              </div>
            );
          }

          return (
            <TypewriterText
              key={index}
              text={line.text!}
              className={line.color}
              animate={isCurrent}
              duration={400 / speed}
            />
          );
        })}
        {currentStep < scanLines.length && (
          <div className="animate-pulse text-[#00ff88] mt-2">_</div>
        )}
      </div>
    </div>
  );
}

function TypewriterText({
  text,
  className,
  animate,
  duration,
}: {
  text: string;
  className?: string;
  animate: boolean;
  duration: number;
}) {
  const [displayed, setDisplayed] = useState(animate ? "" : text);

  useEffect(() => {
    if (!animate) {
      setDisplayed(text);
      return;
    }

    let startTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const charsToShow = Math.floor(progress * text.length);
      setDisplayed(text.slice(0, charsToShow));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayed(text);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [text, animate, duration]);

  return <div className={`whitespace-pre-wrap ${className || ""}`}>{displayed}</div>;
}