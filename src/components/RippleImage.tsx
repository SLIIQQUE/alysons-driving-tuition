"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float dist = distance(uMouse, uv);
    float ripple = sin(dist * 40.0 - uTime * 3.0) * 0.03 * uHover;
    ripple *= smoothstep(0.5, 0.0, dist);
    
    pos.z += ripple;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    float distortion = sin(uv.y * 20.0 + uHover * 5.0) * 0.002 * uHover;
    uv.x += distortion;
    
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;

function RippleMesh({ src, onClick }: { src: string; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  const texture = useTexture(src);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        hovered ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerOver={(e) => {
        setHovered(true);
        if (meshRef.current) {
          const material = meshRef.current.material as THREE.ShaderMaterial;
          material.uniforms.uMouse.value.set(e.uv!.x, e.uv!.y);
        }
      }}
      onPointerOut={() => setHovered(false)}
      scale={[viewport.width / 3, viewport.width / 4, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function RippleImage({
  src,
  onClick,
}: {
  src: string;
  onClick: () => void;
}) {
  return (
    <div className="w-full h-full cursor-pointer">
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <RippleMesh src={src} onClick={onClick} />
      </Canvas>
    </div>
  );
}
