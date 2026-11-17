import { MATERIALS } from '../data/materials'

export default function MaterialPanel({ value, onChange }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-light mb-1">Material</h2>
      <p className="text-xs text-neutral-500 mb-4">Applies to the upper</p>
      <div className="grid gap-2">
        {MATERIALS.map((m) => (
          <button
            key={m.key}
            onClick={() => onChange(m.key)}
            className={`text-left px-3 py-2 border transition ${
              value === m.key
                ? 'border-black bg-black text-white'
                : 'border-neutral-200 hover:border-neutral-400'
            }`}
          >
            <span className="block text-sm">{m.label}</span>
            <span
              className={`block text-xs ${
                value === m.key ? 'text-neutral-300' : 'text-neutral-500'
              }`}
            >
              {m.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}