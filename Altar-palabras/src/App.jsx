import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Historia from './pages/Historia'
import CrearCalaverita from './pages/CrearCalaverita'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/crear-calaverita" element={<CrearCalaverita />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App