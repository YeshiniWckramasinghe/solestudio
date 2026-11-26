import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { partOf } from '../data/parts'
import { PRESETS } from '../data/presets'
import { applyMaterial } from '../utils/materialTextures'

const MODEL_PATH = '/models/test/scene.gltf'
const MODEL_SIZE = 3
const HERO = PRESETS.find((p) => p.key === 'midnight-black')

function Shoe() {
  const { scene } = useGLTF(MODEL_PATH)

  const shoe = useMemo(() => {
    const copy = scene.clone(true)

    // right shoe eka ain karanna
    const toRemove = []
    copy.traverse((o) => {
      if (o.isMesh && o.name.toLowerCase().includes('right_')) toRemove.push(o)
    })
    toRemove.forEach((o) => o.parent.remove(o))

    // hero design eka apply karanna
    copy.traverse((o) => {
      if (!o.isMesh) return
      const part = partOf(o.material.name)
      if (!part) return
      const old = o.material
      const mat = new THREE.MeshPhysicalMaterial({
        normalMap: old.normalMap,
        side: old.side,
        roughness: 0.7,
        metalness: 0,
      })
      mat.color.set(HERO.colors[part])
      if (part === 'upper') applyMaterial(mat, HERO.material)
      o.material = mat
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

  return <primitive object={shoe} />
}

export default function HeroShoe() {
  return (
    <Canvas camera={{ position: [0, 1.2, 6], fov: 40 }}>
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Shoe />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        autoRotate
        autoRotateSpeed={1.2}
      />
    </Canvas>
  )
}