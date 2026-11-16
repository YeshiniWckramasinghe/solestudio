import { Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import ColorPanel from '../components/ColorPanel'
import { DEFAULT_COLORS, partOf } from '../data/parts'

const MODEL_PATH = '/models/test/scene.gltf'
const MODEL_SIZE = 3
const KEEP_TEXTURES = false // true nam original textures thiyenawa (colour dull wenna puluwan)

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
      if (o.userData.part && !KEEP_TEXTURES) {
        o.material.map = null // plain colour walata
        o.material.needsUpdate = true
      }
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

      <aside className="w-80 p-6 border-l border-neutral-200 overflow-y-auto">
        <ColorPanel
          colors={colors}
          onChange={setColor}
          onReset={() => setColors(DEFAULT_COLORS)}
        />
      </aside>
    </div>
  )
}