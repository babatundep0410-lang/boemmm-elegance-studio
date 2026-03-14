import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  MeshReflectorMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { useProducts, toProductView } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/formatPrice';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Palette } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

/* ─── Material / Finish definitions ─── */

interface MaterialFinish {
  key: string;
  label: string;
  primary: string;    // main surface color
  secondary: string;  // legs / frame color
  roughness: number;
  metalness: number;
  swatch: string;     // CSS color for the swatch button
}

const FINISHES: MaterialFinish[] = [
  { key: 'natural-oak',   label: 'Natural Oak',   primary: '#8B6914', secondary: '#5C4033', roughness: 0.35, metalness: 0.05, swatch: '#8B6914' },
  { key: 'walnut',        label: 'Walnut',        primary: '#4A3222', secondary: '#2E1F14', roughness: 0.3,  metalness: 0.05, swatch: '#4A3222' },
  { key: 'ebony',         label: 'Ebony',         primary: '#1C1410', secondary: '#0E0A07', roughness: 0.25, metalness: 0.08, swatch: '#1C1410' },
  { key: 'ash-white',     label: 'Ash White',     primary: '#D8CFC0', secondary: '#B0A494', roughness: 0.4,  metalness: 0.02, swatch: '#D8CFC0' },
  { key: 'brushed-brass', label: 'Brushed Brass', primary: '#C4A35A', secondary: '#8B7332', roughness: 0.2,  metalness: 0.7,  swatch: '#C4A35A' },
  { key: 'matte-black',   label: 'Matte Black',   primary: '#2C2C2C', secondary: '#1A1A1A', roughness: 0.6,  metalness: 0.15, swatch: '#2C2C2C' },
];

/* ─── Procedural furniture primitives (now accept finish) ─── */

interface ModelProps {
  selected: boolean;
  finish: MaterialFinish;
}

function DiningTable({ selected, finish }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !selected) group.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.06, 1.1]} />
        <meshStandardMaterial color={finish.primary} roughness={finish.roughness} metalness={finish.metalness} />
      </mesh>
      {[[-1.05, 0, -0.4], [1.05, 0, -0.4], [-1.05, 0, 0.4], [1.05, 0, 0.4]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.375, pos[2]]} castShadow>
          <boxGeometry args={[0.07, 0.75, 0.07]} />
          <meshStandardMaterial color={finish.secondary} roughness={finish.roughness + 0.05} metalness={finish.metalness} />
        </mesh>
      ))}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.8, 0.04, 0.04]} />
        <meshStandardMaterial color={finish.secondary} roughness={finish.roughness + 0.05} metalness={finish.metalness} />
      </mesh>
    </group>
  );
}

function SideTable({ selected, finish }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !selected) group.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group}>
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.04, 32]} />
        <meshStandardMaterial color={finish.primary} roughness={finish.roughness} metalness={finish.metalness} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
        <meshStandardMaterial color={finish.secondary} roughness={finish.roughness} metalness={Math.max(finish.metalness, 0.4)} />
      </mesh>
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.38, 0.06, 32]} />
        <meshStandardMaterial color={finish.secondary} roughness={finish.roughness} metalness={Math.max(finish.metalness, 0.4)} />
      </mesh>
    </group>
  );
}

function CentreTable({ selected, finish }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !selected) group.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.05, 32]} />
        <meshStandardMaterial color={finish.primary} roughness={finish.roughness} metalness={finish.metalness} />
      </mesh>
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI * 2) / 4 + Math.PI / 4;
        const x = Math.cos(angle) * 0.45;
        const z = Math.sin(angle) * 0.45;
        return (
          <mesh key={i} position={[x, 0.22, z]} rotation={[0, 0, (x > 0 ? -1 : 1) * 0.08]} castShadow>
            <boxGeometry args={[0.06, 0.44, 0.06]} />
            <meshStandardMaterial color={finish.secondary} roughness={finish.roughness + 0.05} metalness={finish.metalness} />
          </mesh>
        );
      })}
    </group>
  );
}

function WallMirror({ selected, finish }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !selected) group.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group} position={[0, 0.4, 0]}>
      <mesh castShadow>
        <torusGeometry args={[0.65, 0.06, 16, 64]} />
        <meshStandardMaterial color={finish.primary} roughness={finish.roughness} metalness={Math.max(finish.metalness, 0.3)} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[0.6, 64]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.05} metalness={0.95} />
      </mesh>
    </group>
  );
}

/* ─── Map category slug to 3D model ─── */

function getModelType(categorySlug: string): string {
  const slug = categorySlug.toLowerCase();
  if (slug.includes('dining')) return 'dining';
  if (slug.includes('side')) return 'side';
  if (slug.includes('centre') || slug.includes('center')) return 'centre';
  if (slug.includes('mirror')) return 'mirror';
  if (slug.includes('table')) return 'dining';
  return 'dining';
}

function FurnitureModel({ type, selected, finish }: { type: string; selected: boolean; finish: MaterialFinish }) {
  switch (type) {
    case 'side': return <SideTable selected={selected} finish={finish} />;
    case 'centre': return <CentreTable selected={selected} finish={finish} />;
    case 'mirror': return <WallMirror selected={selected} finish={finish} />;
    default: return <DiningTable selected={selected} finish={finish} />;
  }
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
  modelType: string;
  interacting: boolean;
  setInteracting: (v: boolean) => void;
  finish: MaterialFinish;
}

function Scene({ modelType, interacting, setInteracting, finish }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 3]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 4, -2]} intensity={0.4} color="#ffd7a8" />

      <Float speed={1.2} rotationIntensity={interacting ? 0 : 0.1} floatIntensity={interacting ? 0 : 0.3}>
        <FurnitureModel type={modelType} selected={interacting} finish={finish} />
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

export default function FurnitureViewer3D() {
  const { data: dbProducts, isLoading } = useProducts();
  const products = (dbProducts || []).map(toProductView);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [finishIdx, setFinishIdx] = useState(0);
  const [showFinishes, setShowFinishes] = useState(false);
  const { addItem } = useCart();

  const selected = products[selectedIdx] || null;
  const modelType = selected ? getModelType(selected.categorySlug) : 'dining';
  const currentFinish = FINISHES[finishIdx];

  const handleAddToCart = () => {
    if (!selected) return;
    addItem({
      id: selected.id,
      name: selected.name,
      price: selected.price,
      image: selected.images[0] || '',
      collection: selected.collection,
    });
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-muted/20">
        <p className="text-muted-foreground text-sm animate-pulse">Loading products…</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-muted/20">
        <p className="text-muted-foreground text-sm">No products available</p>
      </div>
    );
  }

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
          <Scene modelType={modelType} interacting={interacting} setInteracting={setInteracting} finish={currentFinish} />
        </Suspense>
      </Canvas>

      {/* Product info overlay */}
      {selected && (
        <div className="absolute top-4 left-4 bg-background/85 backdrop-blur-md border border-border p-4 max-w-[220px] z-10">
          {selected.images[0] && (
            <div className="w-full aspect-square mb-3 overflow-hidden bg-muted">
              <img src={selected.images[0]} alt={selected.name} className="w-full h-full object-cover" />
            </div>
          )}
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
            {selected.collection}
          </p>
          <h3 className="font-serif text-sm text-foreground leading-snug mb-1">
            {selected.name}
          </h3>
          <p className="text-sm font-medium text-foreground mb-1">
            {formatPrice(selected.price)}
          </p>

          {/* Active finish label */}
          <p className="text-[10px] text-accent uppercase tracking-[0.1em] mb-2">
            Finish: {currentFinish.label}
          </p>

          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
            {selected.description}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              <ShoppingBag className="w-3 h-3" />
              Add to Cart
            </button>
            <Link
              to={`/collections/${selected.collectionSlug}/${selected.categorySlug}`}
              className="flex items-center justify-center px-2 py-1.5 border border-border text-foreground hover:bg-muted transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Finish / Material selector — right side */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-end gap-2">
        {/* Toggle button */}
        <button
          onClick={() => setShowFinishes(!showFinishes)}
          className={`flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-wider border transition-all backdrop-blur-sm ${
            showFinishes
              ? 'bg-foreground text-background border-foreground'
              : 'bg-background/80 text-foreground border-border hover:bg-foreground hover:text-background'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Finishes
        </button>

        {/* Finish swatches */}
        {showFinishes && (
          <div className="bg-background/90 backdrop-blur-md border border-border p-3 flex flex-col gap-2 min-w-[160px]">
            <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
              Select Finish
            </p>
            {FINISHES.map((f, idx) => (
              <button
                key={f.key}
                onClick={() => setFinishIdx(idx)}
                className={`flex items-center gap-2.5 px-2 py-1.5 text-left transition-all ${
                  finishIdx === idx
                    ? 'bg-muted'
                    : 'hover:bg-muted/50'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${
                    finishIdx === idx ? 'border-accent scale-110' : 'border-border'
                  }`}
                  style={{ backgroundColor: f.swatch }}
                />
                <span className={`text-[11px] tracking-wide ${
                  finishIdx === idx ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product selector pills */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 max-w-full overflow-x-auto px-4 scrollbar-none">
        {products.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => { setSelectedIdx(idx); setFinishIdx(0); }}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs tracking-wider uppercase transition-all border whitespace-nowrap ${
              selectedIdx === idx
                ? 'bg-foreground text-background border-foreground'
                : 'bg-background/80 text-foreground border-border backdrop-blur-sm hover:bg-foreground hover:text-background'
            }`}
          >
            {p.images[0] && (
              <img src={p.images[0]} alt="" className="w-5 h-5 object-cover rounded-sm" />
            )}
            {p.name}
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
