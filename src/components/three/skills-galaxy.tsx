import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef, memo } from "react";
import type { Group, Mesh } from "three";
import { skills } from "@/lib/data";

const SkillNode = memo(function SkillNode({ position, name, hue }: { position: [number, number, number]; name: string; hue: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t + position[0] * 2) * 0.08;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={`hsl(${hue} 75% 55%)`}
          emissive={`hsl(${hue} 80% 45%)`}
          emissiveIntensity={0.4}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
      <Text
        position={[0, 0.38, 0]}
        fontSize={0.13}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
        font="/fonts/space-grotesk-400.woff"
      >
        {name}
      </Text>
    </group>
  );
});

function GalaxyCore() {
  const groupRef = useRef<Group>(null);

  useFrame((state, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.08;
    }
  });

  const items = useMemo(() => {
    const n = skills.length;
    return skills.map((s, i) => {
      const phi = Math.acos(-1 + (2 * i) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      const r = 2.4;
      return {
        ...s,
        pos: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi),
        ] as [number, number, number],
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {items.map((it) => (
        <SkillNode key={it.name} position={it.pos} name={it.name} hue={it.hue} />
      ))}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.25} metalness={0.6} />
      </mesh>
    </group>
  );
}

export function SkillsGalaxy() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      frameloop="demand"
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 3, 5]} intensity={0.9} />
      <Suspense fallback={null}>
        <Stars radius={18} depth={25} count={600} factor={2.5} saturation={0} fade speed={0.4} />
        <GalaxyCore />
      </Suspense>
    </Canvas>
  );
}
