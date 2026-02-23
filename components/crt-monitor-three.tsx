"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Module-level signal for scroll position
export const ScrollSignal = { current: 0 };

export interface CrtMonitorThreeProps {
    isPowered: boolean;
    onBootComplete?: () => void;
    children?: React.ReactNode;
    className?: string;
    isZoomingIn?: boolean;
}

function CurvedPlane({ width, height, radius, segments }: { width: number, height: number, radius: number, segments: number }) {
    const geom = useMemo(() => {
        const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
        const pos = geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = Math.sqrt(radius * radius - x * x - y * y) - radius;
            pos.setZ(i, z);
        }
        geometry.computeVertexNormals();
        return geometry;
    }, [width, height, radius, segments]);
    return <primitive object={geom} attach="geometry" />;
}

const ScreenMaterial = {
    uniforms: {
        time: { value: 0 },
        power: { value: 0 },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float time;
    uniform float power;
    varying vec2 vUv;
    
    void main() {
        float scanline = sin(vUv.y * 800.0) * 0.04;
        vec3 color = mix(vec3(0.0), vec3(0.0, 0.1, 0.05) - scanline, power);
        gl_FragColor = vec4(color, 1.0);
    }
  `
};

function MonitorModel({ isPowered, onBootComplete, children }: CrtMonitorThreeProps) {
    const groupRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [bootProgress, setBootProgress] = useState(0);

    useEffect(() => {
        if (!isPowered) {
            setBootProgress(0);
            return;
        }

        if (typeof window !== "undefined" && sessionStorage.getItem("aimuseum-booted")) {
            setBootProgress(1);
            onBootComplete?.();
            return;
        }

        const start = performance.now();
        const duration = 2500;
        let frameId: number;

        const animateBoot = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            setBootProgress(eased);

            if (progress < 1) {
                frameId = requestAnimationFrame(animateBoot);
            } else {
                onBootComplete?.();
            }
        };

        frameId = requestAnimationFrame(animateBoot);
        return () => cancelAnimationFrame(frameId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPowered]);

    useFrame((state) => {
        if (groupRef.current) {
            // rotation range +- 3 degrees = PI/60
            const targetY = (state.pointer.x * Math.PI) / 60;
            const targetX = -(state.pointer.y * Math.PI) / 60;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
        }

        if (materialRef.current) {
            materialRef.current.uniforms.time.value = state.clock.elapsedTime;
            materialRef.current.uniforms.power.value = THREE.MathUtils.lerp(materialRef.current.uniforms.power.value, bootProgress, 0.1);
        }
    });

    const screenW = 2.8;
    const screenH = 2.1;

    return (
        <group ref={groupRef} dispose={null}>
            {/* Outer Case gradient achieved by separating geometry slightly or using a single color for simplicity, user said: #1a1a2e to #0d0d1a. We will use #1a1a2e */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[3.4, 2.7, 2.2]} />
                <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.2} />
            </mesh>

            {/* Back Case Tapering */}
            <mesh position={[0, 0, -1.2]} castShadow>
                <boxGeometry args={[2.0, 1.8, 1.0]} />
                <meshStandardMaterial color="#0d0d1a" roughness={0.9} />
            </mesh>

            {/* Screen Frame Bezel */}
            <mesh position={[0, 0, 1.1]} castShadow receiveShadow>
                <boxGeometry args={[3.2, 2.5, 0.3]} />
                <meshStandardMaterial color="#111116" roughness={0.9} />
            </mesh>

            {/* Screen Black Background */}
            <mesh position={[0, 0, 1.15]}>
                <planeGeometry args={[screenW, screenH]} />
                <meshBasicMaterial color="#000" />
            </mesh>

            {/* Curved Screen Phosphor + Scanlines */}
            <mesh position={[0, 0, 1.16]}>
                <CurvedPlane width={screenW} height={screenH} radius={10} segments={16} />
                <shaderMaterial ref={materialRef} args={[ScreenMaterial]} transparent={true} />
            </mesh>

            {/* Curved Glass Reflection with Fresnel */}
            <mesh position={[0, 0, 1.17]}>
                <CurvedPlane width={screenW} height={screenH} radius={10} segments={16} />
                <meshPhysicalMaterial
                    color="#000"
                    transparent={true}
                    opacity={0.1}
                    roughness={0.05}
                    metalness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    envMapIntensity={0.05}
                    ior={1.5}
                />
            </mesh>

            {/* Phosphor glow cast forward from the screen */}
            <pointLight position={[0, 0, 1.5]} color="#00ff88" intensity={bootProgress * 3} distance={5} decay={2} />

            {/* Power Button Panel */}
            <mesh position={[1.2, -1.15, 1.25]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Power LED Indicator */}
            <mesh position={[1.2, -1.15, 1.28]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} />
                <meshBasicMaterial color={bootProgress > 0 ? "#00ff88" : "#440000"} />
                {bootProgress > 0 && <pointLight color="#00ff88" intensity={bootProgress * 1.5} distance={0.5} />}
            </mesh>

            {/* Monitor Stand Neck */}
            <mesh position={[0, -1.45, -0.2]} castShadow>
                <boxGeometry args={[0.8, 0.4, 0.6]} />
                <meshStandardMaterial color="#111" roughness={0.9} />
            </mesh>

            {/* Base of the stand */}
            <mesh position={[0, -1.65, -0.2]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.0, 1.2, 0.1, 4]} />
                <meshStandardMaterial color="#161622" roughness={0.9} />
            </mesh>

            {/* HTML Content Portal */}
            <Html
                transform
                position={[0, 0, 1.18]}
                scale={0.10} // Physical scaling to screen metrics
                zIndexRange={[100, 0]}
            >
                <div
                    className="w-[1024px] h-[768px] absolute pointer-events-auto bg-transparent overflow-hidden"
                    style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {children}
                </div>
            </Html>
        </group>
    );
}

function CameraRig({ isZoomingIn }: { isZoomingIn?: boolean }) {
    useFrame((state, delta) => {
        // Normal interactive scroll mode vs "Dive in" transition mode
        if (isZoomingIn) {
            // Dive into the screen (screen is at z=1.18)
            // Move camera past the screen to fill the viewport
            state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 0.5, 4, delta);
            state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 0, 4, delta);
            state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, 0, 4, delta);
        } else {
            const scroll = ScrollSignal.current;
            const targetZ = Math.max(1.6, 5.5 - scroll * 0.005);
            state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 4, delta);
        }

        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

export function CrtMonitorThree(props: CrtMonitorThreeProps) {
    return (
        <div className={cn("w-full h-full relative aspect-[4/3] max-w-4xl mx-auto", props.className)}>
            <Canvas shadows camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
                <Environment preset="city" />
                <ambientLight intensity={0.2} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />

                <CameraRig isZoomingIn={props.isZoomingIn} />
                <MonitorModel {...props} />

                <ContactShadows position={[0, -1.7, 0]} opacity={0.6} scale={12} blur={2.5} far={4} color="#000000" />
                <ContactShadows position={[0, -1.69, 0]} opacity={props.isPowered ? 0.2 : 0} scale={8} blur={3} far={4} color="#00ff88" />
            </Canvas>
        </div>
    );
}

export default CrtMonitorThree;
