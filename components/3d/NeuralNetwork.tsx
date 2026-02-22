"use client";

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '@/lib/store';

// 3D Neural Network with Magnetic Mouse Effect
export function NeuralNetwork() {
    const { hasBooted } = useStore();
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const groupRef = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();

    const PARTICLE_COUNT = 150;
    const MAX_DISTANCE = 2.5;

    const SPREAD_X = 30; // range [-15, 15]
    const SPREAD_Y = 20; // range [-10, 10]
    const SPREAD_Z = 16; // range [-8, 8]

    // Generate nodes
    const { positions, velocities } = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        const vel = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3] = Math.random() * SPREAD_X - SPREAD_X / 2;
            pos[i * 3 + 1] = Math.random() * SPREAD_Y - SPREAD_Y / 2;
            pos[i * 3 + 2] = Math.random() * SPREAD_Z - SPREAD_Z / 2;
            vel.push({
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01,
            });
        }
        return { positions: pos, velocities: vel };
    }, []);

    // Connect close nodes with lines
    const { linePositions, colors } = useMemo(() => {
        // We update this in useFrame, just allocate max possible size
        const maxLines = PARTICLE_COUNT * PARTICLE_COUNT;
        return {
            linePositions: new Float32Array(maxLines * 6),
            colors: new Float32Array(maxLines * 6)
        };
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current || !pointsRef.current || !linesRef.current) return;

        // Very slow auto-rotation
        groupRef.current.rotation.y += delta * 0.03;

        const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Magnetic Mouse Effect (only after boot)
        const targetX = (mouse.x * viewport.width) / 2;
        const targetY = (mouse.y * viewport.height) / 2;

        let lineIndex = 0;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const idx = i * 3;

            // Update positions
            positionsArray[idx] += velocities[i].x;
            positionsArray[idx + 1] += velocities[i].y;
            positionsArray[idx + 2] += velocities[i].z;

            // Wrap around bounds
            if (Math.abs(positionsArray[idx]) > SPREAD_X / 2) velocities[i].x *= -1;
            if (Math.abs(positionsArray[idx + 1]) > SPREAD_Y / 2) velocities[i].y *= -1;
            if (Math.abs(positionsArray[idx + 2]) > SPREAD_Z / 2) velocities[i].z *= -1;

            // Mouse magnetism
            if (hasBooted) {
                // Find distance to mouse
                const dx = positionsArray[idx] - targetX;
                const dy = positionsArray[idx + 1] - targetY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 3) {
                    const force = (3 - dist) * 0.02;
                    positionsArray[idx] -= (dx / dist) * force;
                    positionsArray[idx + 1] -= (dy / dist) * force;
                }
            }

            // Calculate lines to nearby particles
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const jdx = j * 3;
                const dx = positionsArray[idx] - positionsArray[jdx];
                const dy = positionsArray[idx + 1] - positionsArray[jdx + 1];
                const dz = positionsArray[idx + 2] - positionsArray[jdx + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
                    // Draw line
                    const lidx = lineIndex * 6;
                    linePositions[lidx] = positionsArray[idx];
                    linePositions[lidx + 1] = positionsArray[idx + 1];
                    linePositions[lidx + 2] = positionsArray[idx + 2];
                    linePositions[lidx + 3] = positionsArray[jdx];
                    linePositions[lidx + 4] = positionsArray[jdx + 1];
                    linePositions[lidx + 5] = positionsArray[jdx + 2];

                    // Fade by distance
                    const alpha = 1.0 - Math.sqrt(distSq) / MAX_DISTANCE;

                    colors[lidx] = 0; colors[lidx + 1] = 1; colors[lidx + 2] = 0.53; // #00ff88
                    colors[lidx + 3] = 0; colors[lidx + 4] = 1; colors[lidx + 5] = 0.53;

                    lineIndex++;
                }
            }
        }

        // Mark needs update
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        const linesGeom = linesRef.current.geometry;
        linesGeom.attributes.position.needsUpdate = true;
        linesGeom.attributes.color.needsUpdate = true;
        linesGeom.setDrawRange(0, lineIndex * 2);
    });

    return (
        <group ref={groupRef}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.08} color="#00ff88" transparent opacity={0.8} sizeAttenuation />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.12} />
            </lineSegments>
        </group>
    );
}
