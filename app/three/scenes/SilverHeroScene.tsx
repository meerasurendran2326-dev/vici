"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SilverRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.32;
      ringRef.current.rotation.y = t * 0.68;
      ringRef.current.position.y = Math.sin(t * 0.9) * 0.08;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.7} floatIntensity={0.9}>
      <mesh ref={ringRef} castShadow receiveShadow>
        <torusGeometry args={[1.35, 0.24, 64, 128]} />
        <meshPhysicalMaterial
          color="#dfe3e5"
          metalness={1}
          roughness={0.12}
          clearcoat={1}
          envMapIntensity={1.2}
          reflectivity={1}
        />
      </mesh>
      <mesh position={[0, 0, 0.18]} castShadow>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial
          color="#f2f2f2"
          metalness={1}
          roughness={0.08}
          clearcoat={1}
          envMapIntensity={1.35}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 5, 12]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 1]} intensity={1.5} color="#dfe3e5" />
      <spotLight
        position={[-2, 4, 4]}
        angle={0.35}
        penumbra={0.7}
        intensity={22}
        color="#dfe3e5"
      />
      <SilverRing />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.75, 0]}
        receiveShadow
      >
        <circleGeometry args={[3.5, 64]} />
        <MeshReflectorMaterial
          blur={[200, 40]}
          resolution={1024}
          mixBlur={1}
          roughness={0.8}
          depthScale={0.7}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
          color="#0a0a0a"
          metalness={0.8}
          mirror={0.45}
        />
      </mesh>
      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function SilverHeroScene() {
  return (
    <div className="silver-scene-wrap" aria-label="Silver hero product render">
      <Canvas camera={{ position: [0, 0.2, 4.6], fov: 38 }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
    </div>
  );
}
