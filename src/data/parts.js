export const PARTS = [
  { key: 'upper', label: 'Upper', match: ['body', 'toecap', 'tongue'] },
  { key: 'sole', label: 'Sole', match: ['sole', 'rubber', 'bottomstripe'] },
  { key: 'laces', label: 'Laces', match: ['laces', 'laceend'] },
  { key: 'heel', label: 'Heel', match: ['kickrubber', 'kickribber'] },
  { key: 'logo', label: 'Logo', match: ['label', 'stripe'] },
]

export const DEFAULT_COLORS = {
  upper: '#ffffff',
  sole: '#e5e5e5',
  laces: '#ffffff',
  heel: '#111111',
  logo: '#111111',
}

export const PALETTE = [
  { name: 'Pure White', hex: '#ffffff' },
  { name: 'Bone', hex: '#f2efe9' },
  { name: 'Sandstone', hex: '#c9b79c' },
  { name: 'Tan', hex: '#a67c52' },
  { name: 'Grey', hex: '#9ca3af' },
  { name: 'Charcoal', hex: '#3a3a3a' },
  { name: 'Midnight Black', hex: '#111111' },
  { name: 'Navy', hex: '#1b2a49' },
  { name: 'Ocean Blue', hex: '#1f4e79' },
  { name: 'Forest', hex: '#2f4f3e' },
  { name: 'Burgundy', hex: '#6d1f2c' },
  { name: 'Red', hex: '#c0392b' },
  { name: 'Gold', hex: '#c9a227' },
]

// "left_Body1" -> part key ("upper")
export function partOf(materialName) {
  const base = materialName
    .toLowerCase()
    .replace(/^(left|right)_/, '')
    .replace(/\d+$/, '')
  return PARTS.find((p) => p.match.includes(base))?.key
}