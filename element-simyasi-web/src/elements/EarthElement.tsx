import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { createEarthMaterial } from '../materials/earthMaterial';

interface Props {
  position: [number, number, number];
  radius?: number;
}

const DEBRIS = [
  { radius: 0.11, orbitRadius: 1.05, speed: 0.9, yOff: 0.18 },
  { radius: 0.08, orbitRadius: 0.9, speed: -1.3, yOff: -0.22 },
  { radius: 0.07, orbitRadius: 1.2, speed: 0.6, yOff: 0.05 },
];

export default function EarthElement({ position, radius = 0.62 }: Props) {
  const groupRef = useRef<Group>(null);
  const material = useMemo(() => createEarthMaterial(), []);
  const debrisMaterial = useMemo(() => createEarthMaterial(), []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group position={position} ref={groupRef}>
      <mesh material={material}>
        <icosahedronGeometry args={[radius, 4]} />
      </mesh>
      {DEBRIS.map((d, i) => (
        <DebrisRock key={i} spec={d} material={debrisMaterial} />
      ))}
    </group>
  );
}

function DebrisRock({
  spec,
  material,
}: {
  spec: (typeof DEBRIS)[number];
  material: ReturnType<typeof createEarthMaterial>;
}) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * spec.speed;
    ref.current.position.set(Math.cos(t) * spec.orbitRadius, spec.yOff, Math.sin(t) * spec.orbitRadius);
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.015;
  });

  return (
    <group ref={ref}>
      <mesh material={material}>
        <dodecahedronGeometry args={[spec.radius, 0]} />
      </mesh>
    </group>
  );
}
