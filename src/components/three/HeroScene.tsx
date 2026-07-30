import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import * as THREE from "three";
import { GoldField } from "./GoldField";
import { useIsTouch } from "@/hooks/useMediaQuery";

/** Move a câmera com o mouse e um leve empurrão conforme o scroll do hero. */
function Rig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 8));

  useFrame((state) => {
    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    const vh = typeof window !== "undefined" ? window.innerHeight : 1;
    const p = Math.min(scroll / vh, 1);

    target.current.set(
      state.pointer.x * 0.9,
      state.pointer.y * 0.6,
      8 + p * 3.2
    );
    camera.position.lerp(target.current, 0.05);
    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z,
      state.pointer.x * -0.04,
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/** Estrutura abstrata central: icosaedro em wireframe dourado, giro lento. */
function AbstractCore() {
  const ref = useRef<THREE.LineSegments>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.05;
    ref.current.rotation.y += delta * 0.08;
  });
  return (
    <lineSegments ref={ref} scale={2.6}>
      <edgesGeometry args={[new THREE.IcosahedronGeometry(1, 1)]} />
      <lineBasicMaterial color="#c9a961" transparent opacity={0.09} />
    </lineSegments>
  );
}

export function HeroScene() {
  const isTouch = useIsTouch();
  const count = isTouch ? 650 : 1100;

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 42 }}
      dpr={[1, isTouch ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <GoldField count={count} />
        <AbstractCore />
        <Rig />
        {!isTouch && (
          <EffectComposer>
            <Bloom
              intensity={0.22}
              luminanceThreshold={0.62}
              luminanceSmoothing={0.25}
              kernelSize={KernelSize.SMALL}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
