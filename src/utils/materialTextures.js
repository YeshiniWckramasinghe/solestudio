import * as THREE from 'three'
import { MATERIALS } from '../data/materials'

const SIZE = 256
const cache = {}

function makeCanvas() {
  const c = document.createElement('canvas')
  c.width = c.height = SIZE
  return c
}

function toTexture(canvas, isColor) {
  const t = new THREE.CanvasTexture(canvas)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  if (isColor) t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

function leatherTextures() {
  const map = makeCanvas()
  const mg = map.getContext('2d')
  mg.fillStyle = '#f4f4f4'
  mg.fillRect(0, 0, SIZE, SIZE)

  const bump = makeCanvas()
  const bg = bump.getContext('2d')
  bg.fillStyle = '#8a8a8a'
  bg.fillRect(0, 0, SIZE, SIZE)
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * SIZE
    const y = Math.random() * SIZE
    const r = 3 + Math.random() * 4
    const grad = bg.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, '#c8c8c8')
    grad.addColorStop(1, 'rgba(138,138,138,0)')
    bg.fillStyle = grad
    bg.beginPath()
    bg.arc(x, y, r, 0, Math.PI * 2)
    bg.fill()
  }
  return { map: toTexture(map, true), bump: toTexture(bump, false) }
}

function suedeTextures() {
  const noise = (min, range) => {
    const c = makeCanvas()
    const g = c.getContext('2d')
    const img = g.createImageData(SIZE, SIZE)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = min + Math.random() * range
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v
      img.data[i + 3] = 255
    }
    g.putImageData(img, 0, 0)
    return c
  }
  return {
    map: toTexture(noise(225, 30), true),
    bump: toTexture(noise(100, 155), false),
  }
}

function meshTextures() {
  const holes = (bgColor, holeColor) => {
    const c = makeCanvas()
    const g = c.getContext('2d')
    g.fillStyle = bgColor
    g.fillRect(0, 0, SIZE, SIZE)
    g.fillStyle = holeColor
    for (let row = 0; row < 16; row++) {
      for (let col = 0; col < 16; col++) {
        const x = col * 16 + (row % 2 ? 8 : 0) + 8
        const y = row * 16 + 8
        for (const dx of [0, -SIZE]) {
          g.beginPath()
          g.arc(x + dx, y, 4.5, 0, Math.PI * 2)
          g.fill()
        }
      }
    }
    return c
  }
  return {
    map: toTexture(holes('#ffffff', '#555555'), true),
    bump: toTexture(holes('#c8c8c8', '#000000'), false),
  }
}

const BUILDERS = { leather: leatherTextures, mesh: meshTextures, suede: suedeTextures }

function getTextures(key) {
  if (!cache[key]) cache[key] = BUILDERS[key]()
  return cache[key]
}

export function applyMaterial(mat, key) {
  const cfg = MATERIALS.find((m) => m.key === key)
  const tex = getTextures(key)
  tex.map.repeat.set(cfg.repeat, cfg.repeat)
  tex.bump.repeat.set(cfg.repeat, cfg.repeat)

  mat.roughness = cfg.roughness
  mat.metalness = 0
  mat.clearcoat = cfg.clearcoat
  mat.clearcoatRoughness = cfg.clearcoatRoughness
  mat.map = tex.map
  mat.bumpMap = tex.bump
  mat.bumpScale = cfg.bumpScale
  mat.needsUpdate = true
}