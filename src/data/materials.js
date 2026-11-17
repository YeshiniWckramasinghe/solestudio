export const MATERIALS = [
  {
    key: 'leather',
    label: 'Leather',
    desc: 'Smooth, subtle sheen',
    roughness: 0.45,
    clearcoat: 0.35,
    clearcoatRoughness: 0.35,
    bumpScale: 1.2,
    repeat: 12,
  },
  {
    key: 'mesh',
    label: 'Mesh',
    desc: 'Breathable, perforated',
    roughness: 0.9,
    clearcoat: 0,
    clearcoatRoughness: 0.5,
    bumpScale: 2,
    repeat: 10,
  },
  {
    key: 'suede',
    label: 'Suede',
    desc: 'Soft, matte, velvety',
    roughness: 1,
    clearcoat: 0,
    clearcoatRoughness: 0.5,
    bumpScale: 1,
    repeat: 30,
  },
]

export const DEFAULT_MATERIAL = 'leather'