export const PRESETS = [
  {
    key: 'pure-white',
    name: 'Pure White',
    material: 'leather',
    colors: {
      upper: '#ffffff',
      sole: '#e5e5e5',
      laces: '#ffffff',
      heel: '#111111',
      logo: '#111111',
    },
  },
  {
    key: 'midnight-black',
    name: 'Midnight Black',
    material: 'leather',
    colors: {
      upper: '#111111',
      sole: '#3a3a3a',
      laces: '#3a3a3a',
      heel: '#111111',
      logo: '#c9a227',
    },
  },
  {
    key: 'sandstone',
    name: 'Sandstone',
    material: 'suede',
    colors: {
      upper: '#c9b79c',
      sole: '#f2efe9',
      laces: '#f2efe9',
      heel: '#a67c52',
      logo: '#ffffff',
    },
  },
  {
    key: 'ocean-blue',
    name: 'Ocean Blue',
    material: 'mesh',
    colors: {
      upper: '#1f4e79',
      sole: '#ffffff',
      laces: '#ffffff',
      heel: '#1b2a49',
      logo: '#ffffff',
    },
  },
]

// current design eka kisima preset ekakata samanada balanna
export function findActivePreset(colors, material) {
  return (
    PRESETS.find(
      (p) =>
        p.material === material &&
        Object.keys(p.colors).every(
          (k) => p.colors[k].toLowerCase() === colors[k].toLowerCase()
        )
    )?.key ?? null
  )
}