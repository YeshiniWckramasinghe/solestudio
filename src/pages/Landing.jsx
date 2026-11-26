import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import HeroShoe from '../components/HeroShoe'
import { sneakers } from '../data/sneakers'

gsap.registerPlugin(ScrollTrigger)

// Featured cards walata visual style (colour tones)
const LOOKS = {
  classic: { bg: '#f2efe9', swatches: ['#ffffff', '#e5e5e5', '#111111'] },
  runner: { bg: '#e6edf3', swatches: ['#1f4e79', '#ffffff', '#9ca3af'] },
  urban: { bg: '#e9e9e9', swatches: ['#111111', '#3a3a3a', '#c9a227'] },
}

const PILLARS = [
  { no: '01', title: 'See every detail', text: 'Rotate, zoom and inspect your sneaker in real-time 3D.' },
  { no: '02', title: 'Choose your materials', text: 'Leather, mesh or suede, picked part by part.' },
  { no: '03', title: 'Make it yours', text: 'Mix colours, start from a preset and build a pair that is only yours.' },
]

export default function Landing() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero="eyebrow"]', { y: 20, opacity: 0, duration: 0.8 })
        .from('[data-hero="line"]', { yPercent: 110, duration: 1, stagger: 0.12 }, '-=0.4')
        .from('[data-hero="sub"]', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('[data-hero="cta"]', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('[data-hero="visual"]', { opacity: 0, scale: 0.96, duration: 1.4 }, 0.2)

      // Hero visual parallax
      gsap.to('[data-hero="visual"]', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-section="hero"]',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Generic scroll reveal
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      // Featured cards stagger
      gsap.from('[data-card]', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-cards]', start: 'top 80%' },
      })

      // Story line grow
      gsap.from('[data-line]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '[data-line]', start: 'top 90%' },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      {/* HERO */}
      <section
        data-section="hero"
        className="relative grid md:grid-cols-2 items-center min-h-[calc(100vh-64px)] overflow-hidden bg-[#f5f5f3]"
      >
        <div className="px-8 md:px-16 py-16 z-10">
          <p data-hero="eyebrow" className="text-xs tracking-[0.4em] text-neutral-500 mb-6">
            INTERACTIVE 3D SNEAKER STUDIO
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05]">
            <span className="block overflow-hidden pb-2">
              <span data-hero="line" className="block">Design your</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-hero="line" className="block">own sneaker.</span>
            </span>
          </h1>
          <p data-hero="sub" className="mt-6 text-neutral-500 max-w-md">
            See every detail. Make it yours.
          </p>
          <div data-hero="cta" className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/collection"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-xs tracking-[0.25em] hover:bg-neutral-800 transition"
            >
              EXPLORE COLLECTION <ArrowRight size={16} />
            </Link>
            <Link
              to="/studio"
              className="px-8 py-4 border border-black text-xs tracking-[0.25em] hover:bg-black hover:text-white transition"
            >
              OPEN STUDIO
            </Link>
          </div>
        </div>

        <div data-hero="visual" className="h-[50vh] md:h-[calc(100vh-64px)]">
          <HeroShoe />
        </div>
      </section>

      {/* FEATURED */}
      <section id="featured" className="max-w-6xl mx-auto px-8 py-24">
        <div data-reveal className="mb-12">
          <p className="text-xs tracking-[0.4em] text-neutral-500 mb-3">THE COLLECTION</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">Three silhouettes. Endless ways.</h2>
        </div>

        <div data-cards className="grid md:grid-cols-3 gap-8">
          {sneakers.map((s, i) => {
            const look = LOOKS[s.id]
            return (
              <Link key={s.id} to="/studio" data-card className="group block">
                <div className="relative h-80 overflow-hidden" style={{ background: look.bg }}>
                  <span className="absolute top-5 left-5 text-xs tracking-[0.3em] text-neutral-500">
                    0{i + 1}
                  </span>
                  <div className="absolute bottom-5 left-5 flex">
                    {look.swatches.map((c) => (
                      <span
                        key={c}
                        className="w-6 h-6 rounded-full border border-white -ml-2 first:ml-0 transition-transform duration-500 group-hover:translate-x-1"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <ArrowRight
                    size={20}
                    className="absolute bottom-5 right-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300"
                  />
                </div>
                <h3 className="mt-5 text-lg font-light">{s.name}</h3>
                <p className="text-sm text-neutral-500">{s.desc}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-8 py-24">
          <div data-line className="h-px bg-white/30 mb-12" />
          <div className="grid md:grid-cols-2 gap-12">
            <div data-reveal>
              <p className="text-xs tracking-[0.4em] text-neutral-400 mb-4">OUR STORY</p>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight">
                A sneaker is personal. So is the way it is made.
              </h2>
            </div>
            <p data-reveal className="text-neutral-400 leading-relaxed">
              SoleStudio is built around one idea: you should not choose a sneaker from a photo.
              Pick a silhouette, turn it in your hands, change the materials and colours part by part,
              and only then call it yours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-20">
            {PILLARS.map((p) => (
              <div key={p.no} data-reveal>
                <p className="text-xs tracking-[0.3em] text-neutral-500 mb-3">{p.no}</p>
                <h3 className="text-lg font-light mb-2">{p.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="max-w-6xl mx-auto px-8 py-24 text-center">
        <h2 data-reveal className="text-3xl md:text-5xl font-light tracking-tight">
          Ready to design yours?
        </h2>
        <div data-reveal className="mt-10">
          <Link
            to="/studio"
            className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white text-xs tracking-[0.25em] hover:bg-neutral-800 transition"
          >
            OPEN THE STUDIO <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 px-8 py-8 text-xs text-neutral-500 flex justify-between">
        <span>© 2026 SoleStudio</span>
        {/* TODO: sneaker model credit (creator + license) methanata danna */}
        <span>Design your own sneaker.</span>
      </footer>
    </div>
  )
}