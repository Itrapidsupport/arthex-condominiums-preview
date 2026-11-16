import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import type { HeroInput } from './Hero3D'

type Props = {
  active: boolean
  progress: MutableRefObject<number>
  input: MutableRefObject<HeroInput>
  lite?: boolean
  still?: boolean
  onReady: () => void
  onPerfFail: () => void
}

const FLOOR = 0.34
const INTRO = 2.2 // seconds for the floors to rise
const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3)

// Studio "clay" materials: white model board, smoked glass, warm brick (their townhome photos), charcoal roofs, one Arthex-red accent.
function useMats(lite?: boolean) {
  return useMemo(() => ({
    white: new THREE.MeshStandardMaterial({ color: '#f3f0ea', roughness: 0.62 }),
    stone: new THREE.MeshStandardMaterial({ color: '#d9d0c3', roughness: 0.7 }),
    glass: lite ? new THREE.MeshStandardMaterial({ color: '#6f8496', roughness: 0.08, metalness: 0.75, envMapIntensity: 2.2 }) : new THREE.MeshPhysicalMaterial({ color: '#6f8496', roughness: 0.06, metalness: 0.75, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 2.2 }),
    glassWarm: lite ? new THREE.MeshStandardMaterial({ color: '#7d8a94', roughness: 0.1, metalness: 0.7, envMapIntensity: 2 }) : new THREE.MeshPhysicalMaterial({ color: '#7d8a94', roughness: 0.08, metalness: 0.7, clearcoat: 1, envMapIntensity: 2 }),
    brick: new THREE.MeshStandardMaterial({ color: '#a4553f', roughness: 0.82 }),
    brick2: new THREE.MeshStandardMaterial({ color: '#b46a4f', roughness: 0.82 }),
    roof: new THREE.MeshStandardMaterial({ color: '#3b3e44', roughness: 0.55 }),
    red: new THREE.MeshStandardMaterial({ color: '#c8131e', roughness: 0.4, emissive: '#3a0003' }),
    plinth: new THREE.MeshStandardMaterial({ color: '#ebe6de', roughness: 0.9 }),
    lawn: new THREE.MeshStandardMaterial({ color: '#b8c6a1', roughness: 1 }),
    leaf: new THREE.MeshStandardMaterial({ color: '#6d8c58', roughness: 0.85 }),
    trunk: new THREE.MeshStandardMaterial({ color: '#7a6a5a', roughness: 0.9 }),
  }), [lite])
}

type M = ReturnType<typeof useMats>

/** One storey: overhanging slab + recessed glazing. Pivot at its base so it can grow up during the intro. */
function Storey({ w, d, y, m, glass, delay, start, still }: { w: number; d: number; y: number; m: M; glass: THREE.Material; delay: number; start: MutableRefObject<number>; still?: boolean }) {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!g.current) return
    const k = still ? 1 : ease((clock.elapsedTime - start.current - delay) / 0.45)
    g.current.scale.y = Math.max(0.0001, k)
    g.current.visible = k > 0.001
  })
  return (
    <group ref={g} position={[0, y, 0]}>
      <mesh material={m.white} position={[0, 0.035, 0]} castShadow receiveShadow><boxGeometry args={[w + 0.18, 0.07, d + 0.18]} /></mesh>
      <mesh material={glass} position={[0, 0.07 + (FLOOR - 0.07) / 2, 0]} castShadow receiveShadow><boxGeometry args={[w - 0.14, FLOOR - 0.07, d - 0.14]} /></mesh>
    </group>
  )
}

function Tower({ m, start, still }: { m: M; start: MutableRefObject<number>; still?: boolean }) {
  const n = 22, w = 2.3, d = 2.3, h = n * FLOOR
  return (
    <group position={[-1.3, 0, -0.9]}>
      <mesh material={m.stone} position={[0, 0.35, 0]} castShadow receiveShadow><boxGeometry args={[w + 0.5, 0.7, d + 0.5]} /></mesh>
      {Array.from({ length: n }, (_, i) => <Storey key={i} w={w} d={d} y={0.7 + i * FLOOR} m={m} glass={m.glass} delay={i * 0.06} start={start} still={still} />)}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz], i) => (
        <mesh key={i} material={m.white} position={[sx * (w / 2 + 0.05), 0.7 + h / 2, sz * (d / 2 + 0.05)]} castShadow><boxGeometry args={[0.12, h, 0.12]} /></mesh>
      ))}
      <group position={[0, 0.7 + h, 0]}>
        <mesh material={m.white} position={[0, 0.06, 0]} castShadow><boxGeometry args={[w + 0.3, 0.12, d + 0.3]} /></mesh>
        <mesh material={m.red} position={[0, 0.135, 0]}><boxGeometry args={[w + 0.3, 0.03, d + 0.3]} /></mesh>
        <mesh material={m.white} position={[0, 0.42, 0]} castShadow><boxGeometry args={[1.2, 0.56, 1.2]} /></mesh>
      </group>
    </group>
  )
}

function MidRise({ m, start, still }: { m: M; start: MutableRefObject<number>; still?: boolean }) {
  const n = 9, w = 3.4, d = 1.9
  return (
    <group position={[2.35, 0, -1.2]}>
      <mesh material={m.stone} position={[0, 0.3, 0]} castShadow receiveShadow><boxGeometry args={[w + 0.3, 0.6, d + 0.3]} /></mesh>
      {Array.from({ length: n }, (_, i) => <Storey key={i} w={w} d={d} y={0.6 + i * FLOOR} m={m} glass={m.glassWarm} delay={0.25 + i * 0.07} start={start} still={still} />)}
      <mesh material={m.white} position={[0, 0.6 + n * FLOOR + 0.06, 0]} castShadow><boxGeometry args={[w + 0.24, 0.12, d + 0.24]} /></mesh>
    </group>
  )
}

/** Gabled roof as a triangular prism. */
function Roof({ w, d, h, m }: { w: number; d: number; h: number; m: M }) {
  const geo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-d / 2 - 0.06, 0); s.lineTo(0, h); s.lineTo(d / 2 + 0.06, 0); s.closePath()
    const g = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: false })
    g.translate(0, 0, -w / 2); g.rotateY(Math.PI / 2)
    return g
  }, [w, d, h])
  return <mesh geometry={geo} material={m.roof} castShadow receiveShadow />
}

function Townhomes({ m, start, still }: { m: M; start: MutableRefObject<number>; still?: boolean }) {
  const n = 6, w = 0.86, d = 1.25, h = 1.05
  return (
    <group position={[-2.05, 0, 2.05]}>
      {Array.from({ length: n }, (_, i) => <Town key={i} i={i} x={(i - (n - 1) / 2) * (w + 0.09)} w={w} d={d} h={h} m={m} start={start} still={still} />)}
    </group>
  )
}
function Town({ i, x, w, d, h, m, start, still }: { i: number; x: number; w: number; d: number; h: number; m: M; start: MutableRefObject<number>; still?: boolean }) {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!g.current) return
    const k = still ? 1 : ease((clock.elapsedTime - start.current - 0.9 - i * 0.08) / 0.5)
    g.current.scale.y = Math.max(0.0001, k); g.current.visible = k > 0.001
  })
  return (
    <group ref={g} position={[x, 0, 0]}>
      <mesh material={i % 2 ? m.brick2 : m.brick} position={[0, h / 2, 0]} castShadow receiveShadow><boxGeometry args={[w, h, d]} /></mesh>
      {[0.32, 0.72].map((y) => <mesh key={y} material={m.glassWarm} position={[0, y, d / 2 + 0.005]}><boxGeometry args={[w * 0.5, 0.2, 0.02]} /></mesh>)}
      <mesh material={m.white} position={[0, 0.03, d / 2 + 0.16]} receiveShadow><boxGeometry args={[w * 0.7, 0.06, 0.3]} /></mesh>
      <group position={[0, h, 0]}><Roof w={w + 0.02} d={d} h={0.42} m={m} /></group>
    </group>
  )
}

function Trees({ m }: { m: M }) {
  const pts: [number, number, number][] = [[-4.9, 0, 3.2], [-3.4, 0, 3.35], [-1.6, 0, 3.3], [0.2, 0, 3.25], [1.3, 0, 1.6], [4.6, 0, 0.9], [3.2, 0, 1.0], [5.0, 0, -2.4]]
  return (
    <>
      {pts.map((p, i) => (
        <group key={i} position={p} scale={0.8 + (i % 3) * 0.12}>
          <mesh material={m.trunk} position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.035, 0.05, 0.4, 8]} /></mesh>
          <mesh material={m.leaf} position={[0, 0.62, 0]} castShadow><icosahedronGeometry args={[0.32, 1]} /></mesh>
        </group>
      ))}
    </>
  )
}

function Rig({ active, progress, input, lite, still, onReady, onPerfFail, start }: Props & { start: MutableRefObject<number> }) {
  const model = useRef<THREE.Group>(null)
  const { camera, clock, invalidate, setDpr } = useThree()
  const strikes = useRef(0)
  const want = useMemo(() => new THREE.Vector3(), [])
  const frames = useRef<number[]>([])
  const readyOnce = useRef(false)
  useEffect(() => { start.current = clock.elapsedTime }, [clock, start])
  useEffect(() => { if (active) invalidate() }, [active, invalidate])
  useFrame((_, dt) => {
    if (!readyOnce.current) { readyOnce.current = true; requestAnimationFrame(() => requestAnimationFrame(onReady)) }
    if (!still) {
      const f = frames.current; f.push(dt); if (f.length > 90) f.shift()
      if (f.length === 90) {
        const avg = f.reduce((a, b) => a + b, 0) / 90
        // first strike: drop to DPR 1 and keep going; give up (poster) only if still very slow
        if (avg > 0.05 && strikes.current === 0) { strikes.current = 1; setDpr(1); f.length = 0 }
        else if (avg > 0.1 && strikes.current === 1) onPerfFail()
      }
    }
    if (!model.current) return
    const t = Math.max(0, clock.elapsedTime - start.current - INTRO)
    const inp = input.current
    const p = still ? 0 : progress.current - 0.5 // -0.5 .. 0.5 as the hero crosses the viewport
    const sway = still ? 0 : Math.sin(t * 0.22) * (lite ? 0.28 : 0.2)
    const target = sway + (still ? 0 : inp.x * 0.3 + inp.tilt * 0.4 + inp.drag + p * 1.6)
    model.current.rotation.y += (target - model.current.rotation.y) * 0.07
    // dolly in + rise as you scroll; mouse Y tilts the camera
    const k = still ? 1 : 1 - (p + 0.5) * 0.2
    want.set(0.6 + 15 * k, 3.15 + (6.65 - (still ? 0 : inp.y * 1.2 + p * 3)) * k, 0.4 + 20 * k)
    if (still) camera.position.copy(want); else camera.position.lerp(want, 0.08)
    camera.lookAt(0.6, 3.15 + (still ? 0 : -inp.y * 0.3 + p * 1.4), 0.4)
  })
  return <group ref={model}><Model start={start} still={still} lite={lite} /></group>
}

function Model({ start, still, lite }: { start: MutableRefObject<number>; still?: boolean; lite?: boolean }) {
  const m = useMats(lite)
  return (
    <group position={[0, 0, 0]}>
      <RoundedBox args={[12.4, 0.4, 7.8]} radius={0.14} smoothness={4} position={[0, -0.2, 0]} material={m.plinth} receiveShadow />
      <mesh material={m.lawn} position={[-2.05, 0.006, 3.15]} receiveShadow><boxGeometry args={[5.9, 0.012, 1.0]} /></mesh>
      <mesh material={m.lawn} position={[3.6, 0.006, 1.1]} receiveShadow><boxGeometry args={[3.6, 0.012, 2.2]} /></mesh>
      <mesh material={m.red} position={[0, -0.19, 3.91]}><boxGeometry args={[12.1, 0.035, 0.01]} /></mesh>
      <Tower m={m} start={start} still={still} />
      <MidRise m={m} start={start} still={still} />
      <Townhomes m={m} start={start} still={still} />
      <Trees m={m} />
    </group>
  )
}

export default function TowerScene(p: Props) {
  const start = useRef(0)
  return (
    <Canvas
      shadows={!p.lite}
      dpr={[1, p.still ? 2 : p.lite ? 1.5 : 1.75]}
      frameloop={p.active ? 'always' : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: !!p.still, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
      camera={{ position: [15.6, 9.8, 20.4], fov: 28.6, near: 0.5, far: 90 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[7, 12, 6]} intensity={2.5} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} shadow-normalBias={0.02}
        shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} />
      <Environment resolution={p.lite ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 9, 0]} rotation-x={Math.PI / 2} scale={[14, 10, 1]} />
        <Lightformer form="rect" intensity={2.4} position={[-9, 3, 4]} rotation-y={Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer form="rect" color="#dfe9f2" intensity={1.8} position={[0, 4, 12]} scale={[16, 4, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[9, 4, -2]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="ring" color="#ffe9c7" intensity={1.4} position={[4, 6, 10]} scale={3} />
      </Environment>
      <Rig {...p} start={start} />
      <ContactShadows position={[0, -0.41, 0]} scale={18} blur={2.6} opacity={0.4} far={3} resolution={p.lite ? 256 : 512} frames={p.still ? 40 : Infinity} />
    </Canvas>
  )
}
