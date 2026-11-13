import useLocalStorage from '../hooks/useLocalStorage'

export default function MyDesigns() {
  const [designs] = useLocalStorage('solestudio-designs', [])

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-light mb-4">My Designs</h2>
      {designs.length === 0 && <p className="text-neutral-500">No saved designs yet.</p>}
    </main>
  )
}