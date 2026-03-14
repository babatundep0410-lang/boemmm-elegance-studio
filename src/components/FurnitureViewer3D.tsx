import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  Text,
  MeshReflectorMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

/* ─── Procedural furniture primitives ─── */

function DiningTable({ selected }: { selected: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !selected) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  const woodColor = '#8B6914';
  const darkWood = '#5C4033';

  return (
    <group ref={group}>
      {/* Tabletop */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.06, 1.1]} />
        <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Legs */}
      {[[-1.05, 0, -0.4], [1.05, 0, -0.4], [-1.05, 0, 0.4], [1.05, 0, 0.4]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.375, pos[2]]} castShadow>
          <boxGeometry args={[0.07, 0.75, 0.07]} />
          <meshStandardMaterial color={darkWood} roughness={0.4} />
        </mesh>
      ))}
      {/* Cross beam */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.8, 0.04, 0.04]} />
        <meshStandardMaterial color={darkWood} roughness={0.4} />
      </mesh>
    </group>
  );
}

function SideTable({ selected }: { selected: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !selected) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={group}>
      {/* Round top */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.04, 32]} />
        <meshStandardMaterial color="#C4A35A" roughness={0.25} metalness={0.3} />
      </mesh>
      {/* Central stem */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
        <meshStandardMaterial color="#2C2C2C" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.38, 0.06, 32]} />
        <meshStandardMaterial color="#2C2C2C" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

function CentreTable({ selected }: { selected: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !selected) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={group}>
      {/* Oval top */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.05, 32]} />
        <meshStandardMaterial color="#D4B896" roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Tapered legs */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI * 2) / 4 + Math.PI / 4;
        const x = Math.cos(angle) * 0.45;
        const z = Math.sin(angle) * 0.45;
        return (
          <mesh key={i} position={[x, 0.22, z]} rotation={[0, 0, (x > 0 ? -1 : 1) * 0.08]} castShadow>
            <boxGeometry args={[0.06, 0.44, 0.06]} />
            <meshStandardMaterial color="#5C4033" roughness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

function WallMirror({ selected }: { selected: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !selected) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={group} position={[0, 0.4, 0]}>
      {/* Frame */}
      <mesh castShadow>
        <torusGeometry args={[0.65, 0.06, 16, 64]} />
        <meshStandardMaterial color="#C4A35A" roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Mirror surface */}
      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[0.6, 64]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.05} metalness={0.95} />
      </mesh>
    </group>
  );
}

/* ─── Scene ─── */

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#e8dfd5"
        metalness={0.05}
        mirror={0.15}
      />
    </mesh>
  );
}

interface SceneProps {
  model: string;
  interacting: boolean;
  setInteracting: (v: boolean) => void;
}

function Scene({ model, interacting, setInteracting }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 3]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 4, -2]} intensity={0.4} color="#ffd7a8" />

      <Float speed={1.2} rotationIntensity={interacting ? 0 : 0.1} floatIntensity={interacting ? 0 : 0.3}>
        {model === 'dining' && <DiningTable selected={interacting} />}
        {model === 'side' && <SideTable selected={interacting} />}
        {model === 'centre' && <CentreTable selected={interacting} />}
        {model === 'mirror' && <WallMirror selected={interacting} />}
      </Float>

      <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={8} blur={2.5} far={4} />
      <Floor />
      <Environment preset="apartment" />

      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={1.5}
        maxDistance={5}
        onStart={() => setInteracting(true)}
        onEnd={() => setTimeout(() => setInteracting(false), 2000)}
      />
    </>
  );
}

/* ─── Viewer wrapper ─── */

const MODELS = [
  { key: 'dining', label: 'Dining Table' },
  { key: 'side', label: 'Side Table' },
  { key: 'centre', label: 'Centre Table' },
  { key: 'mirror', label: 'Wall Mirror' },
] as const;

export default function FurnitureViewer3D() {
  const [model, setModel] = useState<string>('dining');
  const [interacting, setInteracting] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [2.5, 2, 2.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        className="!bg-transparent"
      >
        <Suspense fallback={null}>
          <Scene model={model} interacting={interacting} setInteracting={setInteracting} />
        </Suspense>
      </Canvas>

      {/* Product selector pills */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {MODELS.map((m) => (
          <button
            key={m.key}
            onClick={() => setModel(m.key)}
            className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-all border ${
              model === m.key
                ? 'bg-foreground text-background border-foreground'
                : 'bg-background/80 text-foreground border-border backdrop-blur-sm hover:bg-foreground hover:text-background'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Interaction hint */}
      <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-background/70 backdrop-blur-sm px-3 py-1.5 border border-border">
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}
