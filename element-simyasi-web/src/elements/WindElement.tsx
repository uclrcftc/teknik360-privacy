import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import type { Mesh } from 'three';

interface Props {
  position: [number, number, number];
}

interface ParticleSpec {
  radius: number;
  tilt: number;
  speed: number;
  phase: number;
}

const PARTICLES: ParticleSpec[] = [
  { radius: 0.42, tilt: 0.15, speed: 1.1, phase: 0 },
  { radius: 0.62, tilt: -0.25, speed: 0.85, phase: 2.1 },
  { radius: 0.82, tilt: 0.35, speed: 0.65, phase: 4.2 },
];

function VortexParticle({ spec }: { spec: ParticleSpec }) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * spec.speed + spec.phase;
    const x = Math.cos(t) * spec.radius;
    const z = Math.sin(t) * spec.radius;
    ref.current.position.set(x, Math.sin(t) * spec.radius * spec.tilt, z);
  });

  return (
    <Trail width={2} length={3.5} color="#cdeef5" attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#eef9fb" toneMapped={false} />
      </mesh>
    </Trail>
  );
}

export default function WindElement({ position }: Props) {
  return (
    <group position={position}>
      {PARTICLES.map((spec, i) => (
        <VortexParticle key={i} spec={spec} />
      ))}
    </group>
  );
}
