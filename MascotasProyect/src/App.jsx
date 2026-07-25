import { NavLink, Routes, Route } from "react-router-dom"
import MascotasPage from "./pages/MascotasPage"
import ComentariosPage from "./pages/ComentariosPage"

function App() {

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Mascotas</NavLink>
            </li>
            <li>
              <NavLink to="/comentarios">Comentarios</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<MascotasPage />} />
          <Route path="/comentarios" element={<ComentariosPage />}/>
        </Routes>
      </main>

    </>
  )
}

export default App
