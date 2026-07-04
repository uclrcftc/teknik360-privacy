import * as THREE from 'three';
import { simplexNoise3D } from '../shaders/noise';

export function createWaterMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color('#0c3a5c') },
      uColorShallow: { value: new THREE.Color('#3fa8e0') },
      uColorRim: { value: new THREE.Color('#d6f2ff') },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vPos;

      void main() {
        vPos = position;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      ${simplexNoise3D}
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vPos;
      uniform float uTime;
      uniform vec3 uColorDeep;
      uniform vec3 uColorShallow;
      uniform vec3 uColorRim;

      void main() {
        float flow = fbm(vPos * 2.6 + vec3(0.0, uTime * 0.5, uTime * 0.35));
        float mixAmt = smoothstep(-0.4, 0.6, flow);
        vec3 base = mix(uColorDeep, uColorShallow, mixAmt);

        float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 2.2);
        vec3 color = mix(base, uColorRim, fresnel);

        float alpha = 0.72 + fresnel * 0.28;
        gl_FragColor = vec4(color, alpha);
      }
    `,
  });
}
