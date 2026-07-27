import { NavLink, Routes, Route } from "react-router-dom"
import DetallesPage from "./pages/DetallesPage"
import MascotasPage from "./pages/MascotasPage"

function App() {

  return (
    <>
      <header>
        <nav>
          <ul>
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
