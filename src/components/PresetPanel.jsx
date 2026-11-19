import { PRESETS } from '../data/presets'

export default function PresetPanel({ active, onSelect }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-light mb-1">Presets</h2>
      <p className="text-xs text-neutral-500 mb-4">One-click starting points</p>
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            onClick={() => onSelect(p)}
            className={`text-left px-3 py-3 border transition ${
              active === p.key
                ? 'border-black bg-black text-white'
                : 'border-neutral-200 hover:border-neutral-400'
            }`}
          >
            <div className="flex mb-2">
              {['upper', 'sole', 'laces', 'heel', 'logo'].map((part) => (
                <span
                  key={part}
                  className="w-4 h-4 rounded-full border border-neutral-300 -ml-1 first:ml-0"
                  style={{ backgroundColor: p.colors[part] }}
                />
              ))}
            </div>
            <span className="block text-sm">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}