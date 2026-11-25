import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { RotateCcw } from 'lucide-react'
import PresetPanel from '../components/PresetPanel'
import MaterialPanel from '../components/MaterialPanel'
import ColorPanel from '../components/ColorPanel'
import { DEFAULT_COLORS, partOf } from '../data/parts'
import { DEFAULT_MATERIAL } from '../data/materials'
import { findActivePreset } from '../data/presets'
import { applyMaterial } from '../utils/materialTextures'

const MODEL_PATH = '/models/test/scene.gltf'
const MODEL_SIZE = 3

function Shoe({ colors, material }) {
  const { scene } = useGLTF(MODEL_PATH)

  const shoe = useMemo(() => {
    const copy = scene.clone(true)

    // right shoe eka ain karanna
    const toRemove = []
    copy.traverse((o) => {
      if (o.isMesh && o.name.toLowerCase().includes('right_')) toRemove.push(o)
    })
    toRemove.forEach((o) => o.parent.remove(o))

    // customizable parts walata aluth material ekak
    copy.traverse((o) => {
      if (!o.isMesh) return
      const part = partOf(o.material.name)
      o.userData.part = part
      if (!part) return
      const old = o.material
      o.material = new THREE.MeshPhysicalMaterial({
        normalMap: old.normalMap,
        side: old.side,
        roughness: 0.7,
        metalness: 0,
      })
    })

    // size eka normalize karala center karanna
    const box = new THREE.Box3().setFromObject(copy)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const scale = MODEL_SIZE / Math.max(size.x, size.y, size.z)
    copy.scale.setScalar(scale)
    copy.position.copy(center).multiplyScalar(-scale)

    return copy
  }, [scene])

  // colours
  useEffect(() => {
    shoe.traverse((o) => {
      if (o.isMesh && o.userData.part) {
        o.material.color.set(colors[o.userData.part])
      }
    })
  }, [shoe, colors])

  // material (upper withari)
  useEffect(() => {
    shoe.traverse((o) => {
      if (o.isMesh && o.userData.part === 'upper') {
        applyMaterial(o.material, material)
      }
    })
  }, [shoe, material])

  return <primitive object={shoe} />
}

export default function Studio() {
  const [colors, setColors] = useState(DEFAULT_COLORS)
  const [material, setMaterial] = useState(DEFAULT_MATERIAL)
  const controlsRef = useRef(null)

  const setColor = (key, value) => setColors((c) => ({ ...c, [key]: value }))

  const loadPreset = (preset) => {
    setColors(preset.colors)
    setMaterial(preset.material)
  }

  const resetColors = () => setColors(DEFAULT_COLORS)
  const resetCamera = () => controlsRef.current?.reset()
  const resetAll = () => {
    setColors(DEFAULT_COLORS)
    setMaterial(DEFAULT_MATERIAL)
    resetCamera()
  }

  const activePreset = useMemo(
    () => findActivePreset(colors, material),
    [colors, material]
  )

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="relative flex-1 bg-neutral-100">
        <Canvas camera={{ position: [0, 1.5, 6.5], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <Shoe colors={colors} material={material} />
          </Suspense>
          <OrbitControls
            ref={controlsRef}
            makeDefault
            target={[0, 0, 0]}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            zoomSpeed={0.8}
            rotateSpeed={0.8}
            minDistance={3.5}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={1.5}
          />
        </Canvas>

        <button
          onClick={resetCamera}
          className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 text-xs tracking-wider bg-white border border-neutral-300 hover:border-black transition"
        >
          <RotateCcw size={14} />
          RESET CAMERA
        </button>
      </div>

      <aside className="w-80 p-6 border-l border-neutral-200 overflow-y-auto">
        <PresetPanel active={activePreset} onSelect={loadPreset} />
        <MaterialPanel value={material} onChange={setMaterial} />
        <ColorPanel
          colors={colors}
          onChange={setColor}
          onReset={resetColors}
        />

        <div className="mt-8 pt-6 border-t border-neutral-200">
          <button
            onClick={resetAll}
            className="w-full flex items-center justify-center gap-2 px-3 py-3 text-sm border border-black hover:bg-black hover:text-white transition"
          >
            <RotateCcw size={14} />
            Reset everything
          </button>
        </div>
      </aside>
    </div>
  )
}