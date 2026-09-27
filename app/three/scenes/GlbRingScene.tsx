"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useRef, useMemo } from "react";
import type { Group } from "three";
import * as THREE from "three";

function RingModel() {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF("/ring_with_big_black_stone_and_diamond.glb");

  // Clone so we never mutate the cached GLTF scene
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mat = child.material;
      if (!mat) return;

      // Handle array materials
      const mats = Array.isArray(mat) ? mat : [mat];
      mats.forEach((m: THREE.MeshStandardMaterial) => {
        const isBlack =
          m.color &&
          m.color.r < 0.15 &&
          m.color.g < 0.15 &&
          m.color.b < 0.15;

        if (!isBlack) {
          m.metalness = 1;
          m.roughness = 0.05;
          m.envMapIntensity = 2.5;
        } else {
          m.roughness = 0.1;
          m.metalness = 0.4;
          m.envMapIntensity = 1.5;
        }
        m.needsUpdate = true;
      });
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    ref.current.rotation.x = -0.25;
    ref.current.position.y =
      Math.sin(state.clock.getElapsedTime() * 0.9) * 0.08;
  });

  return (
    <group ref={ref} scale={4.8} position={[0, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default function GlbRingScene() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", minHeight: "550px" }} aria-label="Jewellery hero model">
      <Canvas
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0, display: "block" }}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />

        {/* Key light */}
        <directionalLight position={[3, 4, 3]} intensity={2.8} color="#fff4d6" />

        {/* Fill light */}
        <directionalLight position={[-3, 2, -2]} intensity={1.5} color="#d6eeff" />

        {/* Sparkle point lights */}
        <pointLight position={[2, 3, 2]}  intensity={20} color="#fffbe8" distance={10} />
        <pointLight position={[-2, -1, 3]} intensity={12} color="#e8f4ff" distance={8} />

        {/* Rim light */}
        <spotLight
          position={[0, -4, -3]}
          angle={0.6}
          penumbra={1}
          intensity={25}
          color="#c8d8ff"
        />

        <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.5}>
          <RingModel />
        </Float>

        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={5}
        />

        <Environment preset="city" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
