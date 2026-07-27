import { useEffect, useState } from "react";
import MascotasList from "../components/MascotasList";
import apiMascotas from "../api/apiMascotas";
import MascotasForm from "../components/MascotasForm";

function MascotasPage(){

    const [mascotasList, setmascotaList] = useState([]);
    const [errorGlobal, setErrorGlobal] = useState(""); // Estado para errores de carga
    const [cargando, setCargando] = useState(true);

    // Estado para controlar si el formulario está visible o oculto
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
                alert("Mascota eliminada correctamente.");
                fetchMascotas(); // Volvemos a pedir la lista para que desaparezca
            }
        } catch (error) {
            console.log("Error al eliminar:", error);
            
            // Aplicamos rúbrica
            const status = error.response?.status;
            if (status === 404) {
                alert("Error 404: La mascota ya no existe o fue eliminada previamente.");
                fetchMascotas(); // Recargamos para que desaparezca visualmente
            } else {
                alert("Ocurrió un error de conexión al intentar eliminar la mascota.");
            }
        }
    };
    // Función que se ejecuta cuando la mascota se crea con exito
    const handleMascotaCreada = () => {
        fetchMascotas(); // Recargamos la lista
        setMostrarFormulario(false); // Cerramos el formulario automáticamente
    };
    useEffect(() => {fetchMascotas(); }, []);

    return(
        <div className="mascotas-container">
            <h1>Panel de Mascotas</h1>
            
            {errorGlobal && <p style={{color: 'red', fontWeight: 'bold'}}>{errorGlobal}</p>}
            
            {/* Botón principal para abrir/cerrar el formulario */}
            <div style={{ margin: "20px 0" }}>
                <button 
                    className="btn-detalles" 
                    onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    style={{ padding: "10px 20px", fontSize: "1rem" }}
                >
                    {mostrarFormulario ? "✕ Cerrar Formulario" : "+ Publicar Nueva Mascota"}
                </button>
            </div>

            {/* El formulario solo se renderiza si 'mostrarFormulario' es true */}
            {mostrarFormulario && (
                <div style={{ marginBottom: "30px", animation: "fadeIn 0.3s ease" }}>
                    <MascotasForm onAdd={handleMascotaCreada} />
                </div>
            )}

            {/* Listado de mascotas */}
            {cargando ? (
                <p>Cargando lista de mascotas...</p>
            ) : (
                <MascotasList lista={mascotasList} onDelete={eliminarMascota} />
            )}
        </div>
    )
}

export default MascotasPage