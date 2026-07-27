import { NavLink, Routes, Route } from "react-router-dom"
import DetallesPage from "./pages/DetallesPage"
import MascotasPage from "./pages/MascotasPage"

function App() {

  return (
    <>
      <header>
        <nav>
          {/* Lado izquierdo: Título de la comunidad o refugio */}
          <NavLink to="/" className="nav-brand">
              <span>|</span>
              <h1>Red de Mascotas</h1>
          </NavLink>

          {/* Lado derecho: Enlaces de navegación originales */}
          <ul className="nav-menu">
            <li>
              <NavLink to="/">Mascotas</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<MascotasPage />} />
          <Route path="/mascota/:id" element={<DetallesPage />}/>
        </Routes>
      </main>

    </>
  )
}

export default App
