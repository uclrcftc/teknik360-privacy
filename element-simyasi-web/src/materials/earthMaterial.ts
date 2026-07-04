import * as THREE from 'three';
import { simplexNoise3D } from '../shaders/noise';

export function createEarthMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColorLow: { value: new THREE.Color('#3c2f1e') },
      uColorMid: { value: new THREE.Color('#5c7a3a') },
      uColorHigh: { value: new THREE.Color('#a9b096') },
    },
    vertexShader: /* glsl */ `
      ${simplexNoise3D}
      varying vec3 vNormal;
      varying float vHeight;

      void main() {
        float n = fbm(position * 2.4 + 4.0);
        vec3 displaced = position + normal * n * 0.16;
        vHeight = n;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vNormal;
      varying float vHeight;
      uniform vec3 uColorLow;
      uniform vec3 uColorMid;
      uniform vec3 uColorHigh;

      void main() {
        float h = smoothstep(-0.45, 0.65, vHeight);
        vec3 color = mix(uColorLow, uColorMid, smoothstep(0.0, 0.55, h));
        color = mix(color, uColorHigh, smoothstep(0.6, 1.0, h));
        float light = max(dot(normalize(vNormal), normalize(vec3(0.4, 0.85, 0.5))), 0.18);
        gl_FragColor = vec4(color * light, 1.0);
      }
    `,
  });
}
