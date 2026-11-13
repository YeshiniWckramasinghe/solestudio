import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function PlaceholderShoe({ color }) {
  return (
    <mesh>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function Studio() {
  const [color, setColor] = useState('#ffffff')

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="flex-1 bg-neutral-100">
        <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <PlaceholderShoe color={color} />
          <OrbitControls autoRotate />
        </Canvas>
      </div>
      <aside className="w-72 p-6 border-l border-neutral-200">
        <h2 className="text-lg font-light mb-4">Customize</h2>
        <label className="text-sm block mb-2">Upper color</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </aside>
    </div>
  )
}