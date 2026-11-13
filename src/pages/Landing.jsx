import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <main className="h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-light tracking-tight">Design your own sneaker.</h1>
      <p className="mt-4 text-neutral-500">See every detail. Make it yours.</p>
      <Link to="/collection" className="mt-8 px-8 py-3 bg-black text-white text-sm tracking-widest">
        EXPLORE COLLECTION
      </Link>
    </main>
  )
}