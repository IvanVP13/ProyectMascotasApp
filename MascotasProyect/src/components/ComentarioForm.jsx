import { useState } from "react";
import apiMascotas from "../api/apiMascotas";

// Recibe el ID de la mascota y una función para actualizar la lista
function ComentarioForm({ mascotaId, onComentarioAgregado }) {
    const [autor, setAutor] = useState("");
    const [contenido, setContenido] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos

        // Validaciones
        if (!autor.trim()) {
            setError("El nombre de autor es obligatorio.");
            return;
        }

        if (!contenido.trim()) {
            setError("El comentario no puede estar vacío.");
            return;
        }

        try {
            // Armamos el paquete de datos
            const nuevoComentario = {
                mascota: Number(mascotaId),
                autor: autor.trim(),
                contenido: contenido.trim()
            };

            // Hacemos el POST
            const response = await apiMascotas.post("comentarios/", nuevoComentario);

            if (response.status === 201) {
                //Limpiamos las cajas de texto
                setAutor("");
                setContenido("");
                
                //Le avisamos a la lista que vuelva a pedir los datos a la API
                onComentarioAgregado();
            }
        } catch (error) {
            console.log("Error al enviar el comentario:", error);
            setError("Hubo un error al guardar el comentario.");
        }
    };

    return (
        <div >
            <h4>Dejar un comentario</h4>
            
            <form onSubmit={handleSubmit} >
                
                <div>
                    <label >Autor:</label>
                    <input
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                    />
                </div>
                
                <div>
                    <label>Comentario:</label>
                    <br />
                    <textarea
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        placeholder="Escribe tu comentario aquí..."
                        rows="3"
                    />
                </div>

                <button type="submit">Publicar</button>
            </form>

            {/* Mostramos el error abajo si lo hay */}
            {error && <p>{error}</p>}
        </div>
    );
}

export default ComentarioForm;