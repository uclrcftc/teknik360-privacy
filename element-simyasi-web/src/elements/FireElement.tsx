import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh, ShaderMaterial, PointLight } from 'three';
import { createFireMaterial } from '../materials/fireMaterial';

interface Props {
  position: [number, number, number];
  radius?: number;
}

export default function FireElement({ position, radius = 0.6 }: Props) {
  const meshRef = useRef<Mesh>(null);
  const lightRef = useRef<PointLight>(null);
  const material = useMemo(() => createFireMaterial(), []);

  useFrame(({ clock }) => {
    const mat = material as ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.006;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 1.4 + Math.sin(clock.elapsedTime * 6.2) * 0.35;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} material={material}>
        <icosahedronGeometry args={[radius, 3]} />
      </mesh>
      <pointLight ref={lightRef} color="#ff8a3d" intensity={1.4} distance={3.2} />
    </group>
  );
}
