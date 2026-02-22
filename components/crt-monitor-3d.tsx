"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment, ContactShadows, useDetectGPU } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// CSS-only Fallback for low-tier GPUs
function CRTMonitorFallback({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] p-8 bg-[#111] rounded-[2rem] shadow-2xl border-4 border-[#222]">
            <div className="w-full h-full relative overflow-hidden rounded-[1.5rem] border-2 border-[#333] bg-[#0a0a0f] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] crt-overlay">
                {/* Glow */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,255,136,0.15)] z-50"></div>
                <div className="w-full h-full pointer-events-auto overflow-y-auto">
                    {children}
                </div>
            </div>
            {/* Power LED */}
            <div className="absolute bottom-3 right-10 w-3 h-3 rounded-full bg-[#00ff88] shadow-[0_0_12px_#00ff88]"></div>
        </div>
    );
}

// Inner 3D component with rotation lerp and boot sequence
function MonitorModel({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);
    const screenRef = useRef<THREE.Mesh>(null);
    const [bootStatus, setBootStatus] = useState<"off" | "booting" | "on">("off");

    useEffect(() => {
        // 3 seconds boot sequence
        const t1 = setTimeout(() => setBootStatus("booting"), 300);
        const t2 = setTimeout(() => setBootStatus("on"), 3000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    useFrame((state) => {
        // Subtle rotation based on mouse movement (±3 degrees)
        if (groupRef.current) {
            const targetY = (state.pointer.x * Math.PI) / 60; // Max ~3 degrees
            const targetX = -(state.pointer.y * Math.PI) / 60;

            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);

            // Subtle float animation for the entire monitor
            groupRef.current.position.y = THREE.MathUtils.lerp(
                groupRef.current.position.y,
                Math.sin(state.clock.elapsedTime) * 0.05,
                0.05
            );
        }
    });

    const glowIntensity = bootStatus === "on" ? 1 : bootStatus === "booting" ? 0.3 : 0;

    return (
        <group ref={groupRef} dispose={null}>
            {/* Outer Case */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[3.2, 2.4, 2]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.1} />
            </mesh>

            {/* Screen Frame Bezel */}
            <mesh position={[0, 0, 1.05]} castShadow>
                <boxGeometry args={[2.9, 2.1, 0.2]} />
                <meshStandardMaterial color="#050505" roughness={0.8} />
            </mesh>

            {/* Screen Glass (Curved simulation) */}
            <mesh position={[0, 0, 1.15]}>
                <planeGeometry args={[2.7, 1.9, 32, 32]} />
                {/* We use a simple curve trick via vertex manipulation in a shader or just accept a flat glass plane for low-poly. 
            For now, using physical material to reflect environment */}
                <meshPhysicalMaterial
                    color="#000"
                    roughness={0.05}
                    metalness={0.9}
                    transparent={true}
                    opacity={0.2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    envMapIntensity={0.5}
                />
            </mesh>

            {/* Inner Screen Background */}
            <mesh position={[0, 0, 1.08]}>
                <planeGeometry args={[2.7, 1.9]} />
                <meshBasicMaterial color={bootStatus === "on" ? "#0a0a0f" : "#000"} />
            </mesh>

            {/* Phosphor glow cast forward from the screen */}
            <pointLight
                position={[0, 0, 1.5]}
                color="#00ff88"
                intensity={glowIntensity * 4}
                distance={6}
                decay={2}
            />

            {/* Power LED Indicator */}
            <mesh position={[1.3, -1.05, 1.16]}>
                <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
                <meshBasicMaterial color={bootStatus === "off" ? "#333" : "#00ff88"} />
                {bootStatus !== "off" && (
                    <pointLight color="#00ff88" intensity={bootStatus === "on" ? 1.5 : 0.5} distance={0.5} />
                )}
            </mesh>

            {/* Monitor Stand */}
            <mesh position={[0, -1.3, -0.2]} castShadow>
                <cylinderGeometry args={[0.3, 0.6, 0.6, 16]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
            </mesh>

            {/* Base of the stand */}
            <mesh position={[0, -1.55, -0.2]} castShadow>
                <boxGeometry args={[1.5, 0.1, 1.2]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
            </mesh>

            {/* HTML Content Portal inside screen */}
            {bootStatus === "on" && (
                <Html
                    transform
                    position={[0, 0, 1.09]}
                    scale={0.105} // Adjust to fit the 2.7x1.9 screen space
                    zIndexRange={[100, 0]}
                    occlude="blending"
                    className="w-[1024px] h-[720px] bg-transparent outline-none border-none crt-overlay"
                >
                    <div className="w-full h-full text-[#00ff88] font-mono overflow-y-auto">
                        {children}
                    </div>
                </Html>
            )}
        </group>
    );
}

interface CRTMonitor3DProps {
    children: React.ReactNode;
}

export function CRTMonitor3D({ children }: CRTMonitor3DProps) {
    // Use React Three Drei's GPU tier detection to conditionally render
    const gpuTier = useDetectGPU();

    // If tier is not ready or < 2, fallback to CSS.
    // Wait, if tier isn't calculated yet, we might briefly flash fallback.
    // We can just trust the boolean or tier value.
    if (gpuTier && gpuTier.tier < 2) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-[#050508] p-4">
                <CRTMonitorFallback>{children}</CRTMonitorFallback>
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-[#050508] relative overflow-hidden">
            <Suspense fallback={<CRTMonitorFallback>{null}</CRTMonitorFallback>}>
                <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />

                    <MonitorModel>{children}</MonitorModel>

                    <ContactShadows
                        position={[0, -1.6, 0]}
                        opacity={0.8}
                        scale={10}
                        blur={2.5}
                        far={4}
                        color="#000000" // Black shadow, we also add a slight green glow
                    />
                    {/* Subtle green ambient glow on the desk */}
                    <ContactShadows
                        position={[0, -1.59, 0]}
                        opacity={0.3}
                        scale={8}
                        blur={3}
                        far={4}
                        color="#00ff88"
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}

export default CRTMonitor3D;
