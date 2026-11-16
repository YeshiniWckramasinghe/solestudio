import { useEffect, useState } from 'react'
import { PARTS, PALETTE } from '../data/parts'

const HEX = /^#[0-9a-f]{6}$/i

export default function ColorPanel({ colors, onChange, onReset }) {
  const [active, setActive] = useState('upper')
  const [draft, setDraft] = useState(colors[active])

  // part eka wenas wenakota / colour eka wenas wenakota hex box eka sync karanna
  useEffect(() => {
    setDraft(colors[active])
  }, [active, colors])

  const handleHex = (value) => {
    setDraft(value)
    if (HEX.test(value)) onChange(active, value.toLowerCase())
  }

  return (
    <div>
      <h2 className="text-lg font-light mb-5">Customize</h2>

      {/* Part selector */}
      <div className="grid grid-cols-1 gap-1 mb-6">
        {PARTS.map((p) => (
          <button
            key={p.key}
            onClick={() => setActive(p.key)}
            className={`flex items-center justify-between px-3 py-2 text-sm border transition ${
              active === p.key
                ? 'border-black bg-black text-white'
                : 'border-neutral-200 hover:border-neutral-400'
            }`}
          >
            <span>{p.label}</span>
            <span
              className="w-4 h-4 rounded-full border border-neutral-300"
              style={{ backgroundColor: colors[p.key] }}
            />
          </button>
        ))}
      </div>

      {/* Palette */}
      <p className="text-xs tracking-widest text-neutral-500 mb-3">PALETTE</p>
      <div className="grid grid-cols-6 gap-2 mb-6">
        {PALETTE.map((c) => (
          <button
            key={c.hex}
            title={c.name}
            onClick={() => onChange(active, c.hex)}
            className={`w-8 h-8 rounded-full border ${
              colors[active].toLowerCase() === c.hex
                ? 'ring-2 ring-offset-2 ring-black border-transparent'
                : 'border-neutral-300'
            }`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>

      {/* Custom colour */}
      <p className="text-xs tracking-widest text-neutral-500 mb-3">CUSTOM</p>
      <div className="flex items-center gap-3 mb-6">
        <input
          type="color"
          value={colors[active]}
          onChange={(e) => onChange(active, e.target.value)}
          className="w-10 h-10 p-0 border border-neutral-300 cursor-pointer"
        />
        <input
          type="text"
          value={draft}
          onChange={(e) => handleHex(e.target.value)}
          maxLength={7}
          spellCheck={false}
          className="w-28 px-2 py-2 text-sm border border-neutral-300 font-mono uppercase"
        />
      </div>

      <button onClick={onReset} className="text-sm underline">
        Reset colours
      </button>
    </div>
  )
}