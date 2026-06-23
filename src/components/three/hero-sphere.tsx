import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef, memo } from "react";
import type { Mesh } from "three";

const Blob = memo(function Blob() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.12;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 48]} />
      <MeshDistortMaterial
        color="#FF5C39"
        distort={0.35}
        speed={1.2}
        roughness={0.2}
        metalness={0.15}
      />
    </mesh>
  );
});

export function HeroSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      frameloop="demand"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 2.5, 4]} intensity={1} />
      <directionalLight position={[-2, -1.5, -3]} intensity={0.5} color="#7dd3fc" />
      <Suspense fallback={null}>
        <Blob />
      </Suspense>
    </Canvas>
  );
}
