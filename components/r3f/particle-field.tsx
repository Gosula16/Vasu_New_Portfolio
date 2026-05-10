"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Field({ count = 720 }: { count?: number }) {
  const ref = React.useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    const points = ref.current;
    if (!points) return;
    points.rotation.y += dt * 0.028;
    points.rotation.x += dt * 0.012;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        transparent
        depthWrite={false}
        size={0.02}
        sizeAttenuation
        color="#60a5fa"
        opacity={0.45}
      />
    </points>
  );
}

export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-90 dark:opacity-100">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["transparent"]} />
        <Field />
      </Canvas>
    </div>
  );
}
