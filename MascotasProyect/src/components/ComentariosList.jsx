import { useState, useEffect } from "react";
import apiMascotas from "../api/apiMascotas";
import ComentarioForm from "./ComentarioForm";

function ComentariosList({ mascotaId }) {
    const [comentarios, setComentarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const fetchComentarios = async () => {
        try {
            // Hacemos la petición a la API filtrando por la mascota actual
            // Ajusta la URL si tu endpoint de Django es diferente
            const response = await apiMascotas.get("comentarios/");
            
            if (response.status === 200) {
                // Convertimos mascotaId a número por si acaso llega como texto desde la URL
                const idMascotaNum = Number(mascotaId);
                // Guardamos solo los que en su campo "mascota" tengan el mismo ID
                const comentariosFiltrados = response.data.filter(
                    (comentario) => comentario.mascota === idMascotaNum
                );
                setComentarios(comentariosFiltrados);
            }
        } catch (error) {
            console.log("Error al cargar los comentarios:", error);
        } finally {
            setCargando(false);
        }
    };
    
    const eliminarComentario = async (idComentario) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este comentario?");
        if (!confirmar) return;

        try {
            // Hacemos el DELETE a la API pasándole el ID del comentario
            const response = await apiMascotas.delete(`comentarios/${idComentario}/`);
            
            // 204 (Eliminado con éxito)
            if (response.status === 204) {
                // Volvemos a pedir los comentarios a la API para que desaparezca de la pantalla
                fetchComentarios();
            }
        } catch (error) {
            console.log("Error al eliminar el comentario:", error);
            alert("No se pudo eliminar el comentario.");
        }
    };


    // Ejecutamos la petición en cuanto el componente recibe el mascotaId
    useEffect(() => {
        if (mascotaId) {
            fetchComentarios();
        }}, 
    [mascotaId]);

    if (cargando) {
        return <p>Cargando comentarios...</p>;
    }

    return (
        <div>
            <h3>Comentarios ({comentarios.length})</h3>
            {/* Le pasamos el fetchComentarios para que se ejecute al terminar el POST */}
            <ComentarioForm mascotaId={mascotaId} onComentarioAgregado={fetchComentarios} />
            
            {comentarios.length === 0 ? (
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
            ) : (
                <ul>
                    {comentarios.map((comentario) => (
                        <li key={comentario.id}>
                            <p>
                                <strong>{comentario.autor || "Usuario anónimo"}</strong> 
                                <span>
                                    {comentario.fecha_creacion && ` - ${new Date(comentario.fecha_creacion).toLocaleDateString()}`}
                                </span>
                            </p>
                            <p>{comentario.contenido}</p>
                            {/* Usamos función flecha para pasar el ID */}
                            <button onClick={() => eliminarComentario(comentario.id)}>
                                Eliminar comentario
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ComentariosList;