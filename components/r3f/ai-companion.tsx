"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

function seededPoint(seed: number) {
  const value = Math.sin(seed * 18.417) * 9137.731;
  return value - Math.floor(value);
}

function NeuralNodes() {
  const points = React.useMemo(() => {
    return Array.from({ length: 18 }, (_, index) => {
      const angle = (index / 18) * Math.PI * 2;
      const radius = 1.25 + seededPoint(index + 3) * 0.42;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        (seededPoint(index + 19) - 0.5) * 1.2,
        Math.sin(angle) * radius
      );
    });
  }, []);

  return (
    <group>
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color={index % 3 === 0 ? "#22d3ee" : "#60a5fa"} emissive="#0f172a" />
        </mesh>
      ))}
      {points.slice(0, 9).map((point, index) => {
        const next = points[(index * 2 + 5) % points.length];
        const midpoint = point.clone().add(next).multiplyScalar(0.5);
        const distance = point.distanceTo(next);
        const direction = next.clone().sub(point).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction
        );

        return (
          <mesh key={`line-${index}`} position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[0.006, 0.006, distance, 8]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.34} />
          </mesh>
        );
      })}
    </group>
  );
}

function AiCore() {
  const groupRef = React.useRef<THREE.Group>(null);
  const innerRef = React.useRef<THREE.Mesh>(null);
  const scrollRef = React.useRef(0);

  React.useEffect(() => {
    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollRef.current = window.scrollY / maxScroll;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const inner = innerRef.current;
    if (!group || !inner) return;

    group.rotation.y += delta * 0.34;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, state.pointer.y * 0.22, 0.08);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, -state.pointer.x * 0.18, 0.08);
    group.position.y = Math.sin(state.clock.elapsedTime * 1.7) * 0.08;
    group.position.x = state.pointer.x * 0.08;

    inner.rotation.y -= delta * (0.85 + scrollRef.current * 2.2);
    inner.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2.6) * 0.035);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.16} floatIntensity={0.28}>
      <group ref={groupRef}>
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.72, 2]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#164e63"
            emissiveIntensity={0.55}
            metalness={0.4}
            roughness={0.28}
            transparent
            opacity={0.82}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.98, 0.012, 16, 96]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.76} />
        </mesh>
        <mesh rotation={[0.35, Math.PI / 2, 0]}>
          <torusGeometry args={[1.08, 0.01, 16, 96]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.62} />
        </mesh>
        <mesh rotation={[0.15, 0.25, Math.PI / 2]}>
          <torusGeometry args={[1.2, 0.008, 16, 96]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.48} />
        </mesh>
        <NeuralNodes />
        <Text
          position={[0, -0.02, 0.78]}
          fontSize={0.18}
          letterSpacing={0.02}
          anchorX="center"
          anchorY="middle"
        >
          GV
          <meshBasicMaterial color="#f8fafc" />
        </Text>
      </group>
    </Float>
  );
}

export function AiCompanionScene() {
  return (
    <div className="relative h-48 overflow-hidden rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_48%,transparent)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--neon)_24%,transparent),transparent_56%)]" />
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 46 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        className="relative"
      >
        <ambientLight intensity={1.6} />
        <pointLight position={[2.5, 2.5, 3]} intensity={3.8} color="#38bdf8" />
        <pointLight position={[-2.8, -1.2, 2.2]} intensity={2.2} color="#a855f7" />
        <AiCore />
      </Canvas>
      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_62%,transparent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] backdrop-blur">
        GV AI
      </div>
    </div>
  );
}
