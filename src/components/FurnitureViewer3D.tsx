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
import { useProducts, toProductView, type ProductView } from '@/hooks/useProducts';
import { formatPrice } from '@/lib/formatPrice';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

/* ─── Procedural furniture primitives ─── */

function DiningTable({ selected }: { selected: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !selected) group.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.06, 1.1]} />
        <meshStandardMaterial color="#8B6914" roughness={0.3} metalness={0.05} />
      </mesh>
      {[[-1.05, 0, -0.4], [1.05, 0, -0.4], [-1.05, 0, 0.4], [1.05, 0, 0.4]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.375, pos[2]]} castShadow>
          <boxGeometry args={[0.07, 0.75, 0.07]} />
          <meshStandardMaterial color="#5C4033" roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.8, 0.04, 0.04]} />
        <meshStandardMaterial color="#5C4033" roughness={0.4} />
      </mesh>
    </group>
  );
}

function SideTable({ selected }: { selected: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current && !selected) group.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group}>
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.04, 32]} />
        <meshStandardMaterial color="#C4A35A" roughness={0.25} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
        <meshStandardMaterial color="#2C2C2C" roughness={0.2} metalness={0.8} />
      </mesh>
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
    if (group.current && !selected) group.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.05, 32]} />
        <meshStandardMaterial color="#D4B896" roughness={0.3} metalness={0.05} />
      </mesh>
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
    if (group.current && !selected) group.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group} position={[0, 0.4, 0]}>
      <mesh castShadow>
        <torusGeometry args={[0.65, 0.06, 16, 64]} />
        <meshStandardMaterial color="#C4A35A" roughness={0.2} metalness={0.6} />
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
  // Fallback based on common patterns
  if (slug.includes('table')) return 'dining';
  return 'dining';
}

function FurnitureModel({ type, selected }: { type: string; selected: boolean }) {
  switch (type) {
    case 'side': return <SideTable selected={selected} />;
    case 'centre': return <CentreTable selected={selected} />;
    case 'mirror': return <WallMirror selected={selected} />;
    default: return <DiningTable selected={selected} />;
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
}

function Scene({ modelType, interacting, setInteracting }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 3]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 4, -2]} intensity={0.4} color="#ffd7a8" />

      <Float speed={1.2} rotationIntensity={interacting ? 0 : 0.1} floatIntensity={interacting ? 0 : 0.3}>
        <FurnitureModel type={modelType} selected={interacting} />
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
  const { addItem } = useCart();

  const selected = products[selectedIdx] || null;
  const modelType = selected ? getModelType(selected.categorySlug) : 'dining';

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
          <Scene modelType={modelType} interacting={interacting} setInteracting={setInteracting} />
        </Suspense>
      </Canvas>

      {/* Product info overlay */}
      {selected && (
        <div className="absolute top-4 left-4 bg-background/85 backdrop-blur-md border border-border p-4 max-w-[220px] z-10">
          {/* Product thumbnail */}
          {selected.images[0] && (
            <div className="w-full aspect-square mb-3 overflow-hidden bg-muted">
              <img
                src={selected.images[0]}
                alt={selected.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
            {selected.collection}
          </p>
          <h3 className="font-serif text-sm text-foreground leading-snug mb-1">
            {selected.name}
          </h3>
          <p className="text-sm font-medium text-foreground mb-2">
            {formatPrice(selected.price)}
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

      {/* Product selector pills */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 max-w-full overflow-x-auto px-4 scrollbar-none">
        {products.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setSelectedIdx(idx)}
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
