import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Collection from './pages/Collection'
import Studio from './pages/Studio'
import MyDesigns from './pages/MyDesigns'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/my-designs" element={<MyDesigns />} />
      </Routes>
    </>
  )
}