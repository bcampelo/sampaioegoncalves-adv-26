import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uMouse;
  attribute float aScale;
  attribute float aPhase;
  varying float vDepth;

  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.22 + aPhase) * 0.35;
    p.x += cos(uTime * 0.16 + aPhase * 1.3) * 0.35;

    float depth = clamp((p.z + 7.0) / 14.0, 0.0, 1.0);
    p.x += uMouse.x * depth * 1.8;
    p.y += uMouse.y * depth * 1.8;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (300.0 / -mv.z);
    vDepth = depth;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uColorHi;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float alpha = smoothstep(0.5, 0.0, d);
    alpha *= alpha;
    vec3 col = mix(uColor, uColorHi, vDepth);
    gl_FragColor = vec4(col, alpha * (0.07 + vDepth * 0.16));
  }
`;

interface GoldFieldProps {
  count?: number;
}

export function GoldField({ count = 2600 }: GoldFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  const { positions, scales, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 1;
      scales[i] = Math.random() * 0.9 + 0.25;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, scales, phases };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 5.5 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#6b5527") },
      uColorHi: { value: new THREE.Color("#b8985a") },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    smoothMouse.current.x += (pointer.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (pointer.y - smoothMouse.current.y) * 0.05;
    uniforms.uMouse.value.copy(smoothMouse.current);
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
