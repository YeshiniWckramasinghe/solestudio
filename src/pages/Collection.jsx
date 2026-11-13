import { Link } from 'react-router-dom'
import { sneakers } from '../data/sneakers'

export default function Collection() {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-light mb-8">Collection</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {sneakers.map((s) => (
          <Link key={s.id} to="/studio" className="border border-neutral-200 p-6 hover:shadow-lg transition">
            <div className="h-40 bg-neutral-100 mb-4" />
            <h3 className="font-medium">{s.name}</h3>
            <p className="text-sm text-neutral-500">{s.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}