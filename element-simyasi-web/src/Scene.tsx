import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, OrbitControls, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';

interface ElementSpec {
  id: string;
  label: string;
  color: string;
  emissive: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  spinSpeed: number;
  yOffset: number;
  geometry: 'sphere' | 'icosahedron' | 'torus' | 'rock';
}

const ELEMENTS: ElementSpec[] = [
  {
    id: 'water',
    label: 'Su',
    color: '#3fa8e0',
    emissive: '#0b3a55',
    radius: 0.62,
    orbitRadius: 2.5,
    orbitSpeed: 0.18,
    spinSpeed: 0.6,
    yOffset: 0.3,
    geometry: 'sphere',
  },
  {
    id: 'fire',
    label: 'Ateş',
    color: '#e85a2b',
    emissive: '#7a1c05',
    radius: 0.56,
    orbitRadius: 2.5,
    orbitSpeed: 0.18,
    spinSpeed: 1.1,
    yOffset: -0.4,
    geometry: 'icosahedron',
  },
  {
    id: 'wind',
    label: 'Rüzgar',
    color: '#bfe3e8',
    emissive: '#2d4a4d',
    radius: 0.5,
    orbitRadius: 2.5,
    orbitSpeed: 0.18,
    spinSpeed: 0.9,
    yOffset: 0.55,
    geometry: 'torus',
  },
  {
    id: 'earth',
    label: 'Toprak',
    color: '#6d8a4a',
    emissive: '#233016',
    radius: 0.66,
    orbitRadius: 2.5,
    orbitSpeed: 0.18,
    spinSpeed: 0.35,
    yOffset: -0.2,
    geometry: 'rock',
  },
];

function ElementBody({ spec, angle }: { spec: ElementSpec; angle: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * spec.spinSpeed * 0.4;
    meshRef.current.rotation.y += delta * spec.spinSpeed;
  });

  const x = Math.cos(angle) * spec.orbitRadius;
  const z = Math.sin(angle) * spec.orbitRadius;

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[x, spec.yOffset, z]} castShadow>
        {spec.geometry === 'sphere' && <sphereGeometry args={[spec.radius, 48, 48]} />}
        {spec.geometry === 'icosahedron' && <icosahedronGeometry args={[spec.radius, 1]} />}
        {spec.geometry === 'torus' && <torusGeometry args={[spec.radius, spec.radius * 0.36, 24, 64]} />}
        {spec.geometry === 'rock' && <dodecahedronGeometry args={[spec.radius, 0]} />}
        <MeshDistortMaterial
          color={spec.color}
          emissive={spec.emissive}
          roughness={0.25}
          metalness={0.15}
          distort={spec.geometry === 'sphere' ? 0.25 : 0.12}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

function OrbitGroup() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={groupRef}>
      {ELEMENTS.map((spec, i) => (
        <ElementBody
          key={spec.id}
          spec={spec}
          angle={(i / ELEMENTS.length) * Math.PI * 2 + Math.PI / 4}
        />
      ))}
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
