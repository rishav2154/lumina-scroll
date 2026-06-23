import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function Blob() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.2;
    const { x, y } = state.pointer;
    ref.current.position.x = x * 0.4;
    ref.current.position.y = y * 0.25;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.55, 64]} />
        <MeshDistortMaterial
          color="#FF5C39"
          distort={0.45}
          speed={1.4}
          roughness={0.15}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

export function HeroSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, -4]} intensity={0.6} color="#7dd3fc" />
      <Suspense fallback={null}>
        <Blob />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}