import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Mesh, ShaderMaterial } from 'three';
import { createWaterMaterial } from '../materials/waterMaterial';

interface Props {
  position: [number, number, number];
  radius?: number;
}

export default function WaterElement({ position, radius = 0.66 }: Props) {
  const meshRef = useRef<Mesh>(null);
  const material = useMemo(() => createWaterMaterial(), []);

  useFrame(({ clock }, delta) => {
    (material as ShaderMaterial).uniforms.uTime.value = clock.elapsedTime;
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group position={position}>
      <Float speed={2.2} rotationIntensity={0.15} floatIntensity={1.1}>
        <mesh ref={meshRef} material={material}>
          <sphereGeometry args={[radius, 64, 64]} />
        </mesh>
      </Float>
    </group>
  );
}
