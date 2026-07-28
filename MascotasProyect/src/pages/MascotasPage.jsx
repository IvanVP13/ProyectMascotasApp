import { useEffect, useState } from "react";
import MascotasList from "../components/MascotasList";
import apiMascotas from "../api/apiMascotas";
import MascotasForm from "../components/MascotasForm";
import { notyf } from "../utils/notificaciones";
function MascotasPage(){

    const [mascotasList, setmascotaList] = useState([]);
    const [errorGlobal, setErrorGlobal] = useState(""); // Estado para errores de carga
    const [cargando, setCargando] = useState(true);


    //Traemos los datos con fecth
    const fetchMascotas = async ()  => {
        try{
            setErrorGlobal("");
            setCargando(true);
            //Peticion get
            const response = await apiMascotas.get("mascotas/");
            console.log(response);
            if (response.status === 200){
                //Guardar informacion en variable
                setmascotaList(response.data)
            }

        } catch (error) {
            console.log("Error al cargar mascotas:", error);
            
            const status = error.response?.status;
            if (status === 404) {
                setErrorGlobal("Error 404: No se encontró la ruta de las mascotas en el servidor.");
            } else {
                setErrorGlobal("Ocurrió un error inesperado al cargar la lista de mascotas.");
            }
        }finally {
            setCargando(false); //Lo apagamos siempre al terminar
        }
    }

    // Peticion DELETE
    const eliminarMascota = async (id) => {
        //Preguntamos al usuario para evitar borrados por accidente
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta mascota?");
        if (!confirmar) return;

        try {
            // Pasamos el ID en la URL
            const response = await apiMascotas.delete(`mascotas/${id}/`);
            
            if (response.status === 204) {
                notyf.success("Mascota eliminada correctamente.");
                fetchMascotas(); // Volvemos a pedir la lista para que desaparezca
            }
        } catch (error) {
            console.log("Error al eliminar:", error);
            const status = error.response?.status;
            
            if (status === 404) {
                // 3. Reemplazamos el alert() de error
                notyf.error("La mascota ya no existe o fue eliminada.");
                fetchMascotas();
            } else {
                notyf.error("Ocurrió un error de conexión al intentar eliminar.");
            }
        }
    };

    useEffect(() => {fetchMascotas(); }, []);

    return(
        <div className="dashboard-container">
            {/* Columna Izquierda: Barra lateral fija con el Formulario */}
            <aside className="dashboard-sidebar">
                <MascotasForm onAdd={fetchMascotas} />
            </aside>

            {/* Columna Derecha: Contenido principal con el listado */}
            <main className="dashboard-main">
                <h1>Directorio de Mascotas</h1>
                
                {errorGlobal && (
                <div className="error-404-contenedor" style={{ 
                    minHeight: "30vh", 
                    backgroundColor: "#fffaf0", 
                    border: "0.125rem dashed #fed7aa", 
                    borderRadius: "0.75rem",
                    marginTop: "2rem"
                }}>
                    <h2 style={{ fontSize: "1.8rem" }}>Ups, tuvimos un problema</h2>
                    <p>{errorGlobal}</p>
                    
                    <button 
                        className="btn-detalles" 
                        style={{ width: "auto", padding: "0.75rem 1.5rem", marginTop: "1rem" }} 
                        onClick={() => fetchMascotas()}
                    >
                        Intentar cargar de nuevo
                    </button>
                </div>
            )}
                
                {cargando ? (
                    <p>Cargando lista de mascotas...</p>
                ) : (
                    <MascotasList lista={mascotasList} onDelete={eliminarMascota} />
                )}
            </main>
        </div>
    )
}

export default MascotasPage