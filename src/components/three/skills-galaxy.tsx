import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Group } from "three";
import { skills } from "@/lib/data";

function Orbit() {
  const group = useRef<Group>(null);
  useFrame((state, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.12;
  });

  const items = useMemo(() => {
    const n = skills.length;
    return skills.map((s, i) => {
      const phi = Math.acos(-1 + (2 * i) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      const r = 2.6;
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
    <group ref={group}>
      {items.map((it, i) => (
        <Float key={i} speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
          <group position={it.pos}>
            <mesh>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial
                color={`hsl(${it.hue} 80% 60%)`}
                emissive={`hsl(${it.hue} 80% 50%)`}
                emissiveIntensity={0.35}
                roughness={0.3}
              />
            </mesh>
            <Text
              position={[0, 0.45, 0]}
              fontSize={0.16}
              color="#1a1a1a"
              anchorX="center"
              anchorY="middle"
            >
              {it.name}
            </Text>
          </group>
        </Float>
      ))}
      <mesh>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.7} />
      </mesh>
    </group>
  );
}

export function SkillsGalaxy() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 6]} intensity={1.1} />
      <Suspense fallback={null}>
        <Stars radius={20} depth={30} count={1200} factor={3} saturation={0} fade speed={0.6} />
        <Orbit />
      </Suspense>
    </Canvas>
  );
}