import { Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

const MODEL_PATH = '/models/test/scene.gltf'
const MODEL_SIZE = 3 // shoe eka me size ekakata scale wenawa (units)

const PARTS = [
  { key: 'upper', label: 'Upper', match: ['body', 'toecap', 'tongue'] },
  { key: 'sole', label: 'Sole', match: ['sole', 'rubber', 'bottomstripe'] },
  { key: 'laces', label: 'Laces', match: ['laces', 'laceend'] },
  { key: 'heel', label: 'Heel', match: ['kickrubber', 'kickribber'] },
  { key: 'logo', label: 'Logo', match: ['label', 'stripe'] },
]

const DEFAULT_COLORS = {
  upper: '#ffffff',
  sole: '#e5e5e5',
  laces: '#ffffff',
  heel: '#111111',
  logo: '#111111',
}

// "left_Body1" -> "body"
function partOf(materialName) {
  const base = materialName
    .toLowerCase()
    .replace(/^(left|right)_/, '')
    .replace(/\d+$/, '')
  return PARTS.find((p) => p.match.includes(base))?.key
}

function Shoe({ colors }) {
  const { scene } = useGLTF(MODEL_PATH)

  const shoe = useMemo(() => {
    const copy = scene.clone(true)

    // right shoe eka ain karanna
    const toRemove = []
    copy.traverse((o) => {
      if (o.isMesh && o.name.toLowerCase().includes('right_')) toRemove.push(o)
    })
    toRemove.forEach((o) => o.parent.remove(o))

    // material clone karala part eka mark karanna
    copy.traverse((o) => {
      if (!o.isMesh) return
      o.material = o.material.clone()
      o.userData.part = partOf(o.material.name)
    })

    // size eka normalize karala (0,0,0) ekata center karanna
    const box = new THREE.Box3().setFromObject(copy)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const scale = MODEL_SIZE / Math.max(size.x, size.y, size.z)
    copy.scale.setScalar(scale)
    copy.position.copy(center).multiplyScalar(-scale)

    return copy
  }, [scene])

  useEffect(() => {
    shoe.traverse((o) => {
      if (o.isMesh && o.userData.part) {
        o.material.color.set(colors[o.userData.part])
      }
    })
  }, [shoe, colors])

  return <primitive object={shoe} />
}

export default function Studio() {
  const [colors, setColors] = useState(DEFAULT_COLORS)

  const setColor = (key, value) => setColors((c) => ({ ...c, [key]: value }))

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="flex-1 bg-neutral-100">
        <Canvas camera={{ position: [0, 1.5, 6.5], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <Shoe colors={colors} />
          </Suspense>
          <OrbitControls
            makeDefault
            target={[0, 0, 0]}
            enablePan={false}
            enableZoom
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
      </div>

      <aside className="w-72 p-6 border-l border-neutral-200">
        <h2 className="text-lg font-light mb-6">Customize</h2>
        {PARTS.map((p) => (
          <div key={p.key} className="flex items-center justify-between mb-4">
            <label className="text-sm">{p.label}</label>
            <input
              type="color"
              value={colors[p.key]}
              onChange={(e) => setColor(p.key, e.target.value)}
            />
          </div>
        ))}
        <button
          onClick={() => setColors(DEFAULT_COLORS)}
          className="mt-4 text-sm underline"
        >
          Reset colours
        </button>
      </aside>
    </div>
  )
}