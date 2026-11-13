import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="h-16 flex items-center justify-between px-8 border-b border-neutral-200 bg-white">
      <Link to="/" className="text-xl font-light tracking-[0.3em]">SOLESTUDIO</Link>
      <div className="flex gap-6 text-sm">
        <Link to="/collection">Collection</Link>
        <Link to="/studio">Studio</Link>
        <Link to="/my-designs">My Designs</Link>
      </div>
    </nav>
  )
}