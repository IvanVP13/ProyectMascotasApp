import { useState, useEffect } from "react";
import apiMascotas from "../api/apiMascotas";

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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ComentariosList;