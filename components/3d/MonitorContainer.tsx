"use client";

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, PerspectiveCamera, Stars, RoundedBox, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/lib/store';
import gsap from 'gsap';

// The CRT Monitor Mesh and Boot Screen integration
function CrtMonitorModel({ children }: { children: React.ReactNode }) {
    const { hasBooted } = useStore();
    const monitorGroup = useRef<THREE.Group>(null);
    const casingMesh = useRef<THREE.Mesh>(null);
    const { camera } = useThree();

    // Handle the zoom-in animation when `hasBooted` becomes true
    useMemo(() => {
        if (hasBooted && monitorGroup.current && casingMesh.current) {
            // Zoom camera inside the monitor screen 
            gsap.to(camera.position, {
                z: 20, // Pull back to see the full neural network
                y: 0,
                x: 0,
                duration: 2,
                ease: "power3.inOut",
            });
            // Fade out the monitor housing to seamlessly enter "inside CRT" mode
            gsap.to((casingMesh.current.material as THREE.Material), {
                opacity: 0,
                transparent: true,
                duration: 1.5,
                delay: 0.5,
            });
            // Optional: hide monitor group after zoom to prevent blocking
            setTimeout(() => {
                if (monitorGroup.current) monitorGroup.current.visible = false;
            }, 2500);
        }
    }, [hasBooted, camera]);


    // Floating animation when NOT booted (viewing monitor from outside)
    useFrame((state) => {
        if (!hasBooted && monitorGroup.current) {
            monitorGroup.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.1;
            monitorGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            camera.lookAt(0, 0, 0);
        }
    });

    return (
        <group ref={monitorGroup} position={[0, 0, 0]}>

            {/* Physical Monitor Outer Casing */}
            <RoundedBox ref={casingMesh as any} args={[5.2, 4.2, 3.5]} radius={0.2} smoothness={4} position={[0, 0, -0.5]} castShadow receiveShadow>
                <meshStandardMaterial color="#0a0a0a" roughness={0.7} metalness={0.2} />
            </RoundedBox>

            {/* Screen Inner Bezel */}
            <mesh position={[0, 0, 1.2]}>
                <boxGeometry args={[4.6, 3.6, 0.4]} />
                <meshStandardMaterial color="#000000" roughness={0.9} />
            </mesh>

            {/* CRT Glass Reflection Layer */}
            <mesh position={[0, 0, 1.45]}>
                <planeGeometry args={[4.4, 3.4]} />
                <meshPhysicalMaterial
                    transmission={0.9}
                    opacity={1}
                    transparent
                    roughness={0.1}
                    color="#ffffff"
                    ior={1.5}
                    thickness={0.5}
                />
            </mesh>

            {/* Dynamic Screen Content inside the monitor frame */}
            <group position={[0, 0, 1.4]}>

                {/* HTML Overlay rendering ON the screen */}
                <Html
                    transform
                    position={[0, 0, 0]}
                    scale={0.0055} // Scale down 800x600 to fit 4.4 x 3.4 units exactly
                    style={{
                        pointerEvents: hasBooted ? 'none' : 'auto', // disable events post-boot
                        opacity: hasBooted ? 0 : 1, // Instantly hide or rely on experience wrapper crossfade
                        transition: 'opacity 0.2s 1.5s' // wait for camera zoom before hiding
                    }}
                >
                    <div className="relative border-[8px] border-black rounded-[32px] overflow-hidden bg-[#0a0a0f]"
                        style={{
                            width: '800px',
                            height: '618px',
                        }}>
                        {children}
                    </div>
                </Html>
            </group>
        </group>
    );
}

// Wrapper for the entire 3D Setup
export default function MonitorContainer({ bootSequenceEl, neuralNodeEl }: { bootSequenceEl: React.ReactNode, neuralNodeEl: React.ReactNode }) {
    const { hasBooted } = useStore();

    return (
        <div className={`absolute inset-0 w-full h-screen z-0 ${hasBooted ? 'pointer-events-none' : 'pointer-events-auto bg-[#0a0a0f]'}`}>
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                {/* Initial camera position sits well back to view the whole 5-unit TV */}
                <PerspectiveCamera makeDefault position={[0, 0, hasBooted ? 20 : 7]} fov={hasBooted ? 60 : 45} />

                <color attach="background" args={['#0a0a0f']} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00aaff" />

                {!hasBooted && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}

                <CrtMonitorModel>
                    {bootSequenceEl}
                </CrtMonitorModel>

                {/* Neural Network living inside */}
                {hasBooted && (
                    <group position={[0, 0, 0]}>
                        {neuralNodeEl}
                    </group>
                )}
            </Canvas>
        </div>
    );
}
