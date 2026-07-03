import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';
import WaterElement from './elements/WaterElement';
import FireElement from './elements/FireElement';
import WindElement from './elements/WindElement';
import EarthElement from './elements/EarthElement';

const ORBIT_RADIUS = 2.5;
// 45° offset keeps every element off the camera's central axis, so nothing
// ever lines up directly behind the core or straight in front of the lens.
const ANGLE_OFFSET = Math.PI / 4;

function orbitPosition(index: number, total: number, radius: number, y: number): [number, number, number] {
  const angle = (index / total) * Math.PI * 2 + ANGLE_OFFSET;
  return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
}

function OrbitGroup() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={groupRef}>
      <WaterElement position={orbitPosition(0, 4, ORBIT_RADIUS, 0.25)} />
      <FireElement position={orbitPosition(1, 4, ORBIT_RADIUS, -0.35)} />
      <WindElement position={orbitPosition(2, 4, ORBIT_RADIUS, 0.5)} />
      <EarthElement position={orbitPosition(3, 4, ORBIT_RADIUS, -0.2)} />
    </group>
  );
}

function CentralCore() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.55, 2]} />
      <meshPhysicalMaterial
        color="#f3e6c8"
        emissive="#8a6d2f"
        emissiveIntensity={0.35}
        roughness={0.1}
        metalness={0.4}
        transmission={0.4}
        thickness={0.6}
      />
    </mesh>
  );
}

export default function Scene() {
  const dpr = useMemo<[number, number]>(() => [1, 1.8], []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 2.9, 7.4], fov: 40 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[new THREE.Color('#0a0c11')]} />
      <fog attach="fog" args={['#0a0c11', 8, 16]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#4a7bd4" />
      <Sparkles count={80} scale={[9, 5, 9]} size={2} speed={0.25} opacity={0.5} color="#e7d9b8" />
      <CentralCore />
      <OrbitGroup />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
}
