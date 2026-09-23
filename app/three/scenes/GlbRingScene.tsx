"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function RingModel() {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF("/ring_with_big_black_stone_and_diamond.glb");

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    ref.current.rotation.x = -0.25;
    ref.current.position.y =
      Math.sin(state.clock.getElapsedTime() * 0.9) * 0.08;
  });

  return (
    <group ref={ref} scale={1.7} position={[0, -0.15, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function GlbRingScene() {
  return (
    <div className="glb-scene-wrap" aria-label="Jewellery hero model">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 30 }}
        dpr={[1, 1.8]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[3, 3, 3]}
          intensity={1.6}
          color="#fff8ef"
        />
        <spotLight
          position={[-2, 5, 4]}
          angle={0.45}
          penumbra={1}
          intensity={12}
          color="#dfe3d9"
        />
        <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.5}>
          <RingModel />
        </Float>
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.4}
          scale={8}
          blur={1.8}
          far={4}
        />
        <Environment preset="studio" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
