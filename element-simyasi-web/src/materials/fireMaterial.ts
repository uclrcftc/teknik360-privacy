import * as THREE from 'three';
import { simplexNoise3D } from '../shaders/noise';

export function createFireMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorCore: { value: new THREE.Color('#3a0a02') },
      uColorMid: { value: new THREE.Color('#ff7b1a') },
      uColorTip: { value: new THREE.Color('#ffe9a8') },
    },
    vertexShader: /* glsl */ `
      ${simplexNoise3D}
      varying float vNoise;
      uniform float uTime;

      void main() {
        vec3 p = position;
        float n = fbm(p * 1.9 + vec3(0.0, uTime * 1.3, 0.0));
        vec3 displaced = p + normal * n * 0.18;
        vNoise = n;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vNoise;
      uniform vec3 uColorCore;
      uniform vec3 uColorMid;
      uniform vec3 uColorTip;

      void main() {
        float t = smoothstep(-0.5, 0.9, vNoise);
        vec3 color = mix(uColorCore, uColorMid, smoothstep(0.0, 0.55, t));
        color = mix(color, uColorTip, smoothstep(0.6, 1.0, t));
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });
}
