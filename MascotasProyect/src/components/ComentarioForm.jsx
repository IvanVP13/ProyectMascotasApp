import { useState } from "react";
import apiMascotas from "../api/apiMascotas";
import { validarDatosComentario } from "../utils/validations";

// Recibe el ID de la mascota y una función para actualizar la lista
function ComentarioForm({ mascotaId, onComentarioAgregado }) {
    const [autor, setAutor] = useState("");
    const [contenido, setContenido] = useState("");
    const [errores, setErrores] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrores({}); // Limpiar errores previos

        const nuevosErrores = validarDatosComentario(datos);
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return; // Detenemos el envío si el comentario está vacío o muy largo
        }

        try {
            // Preparamos los datos sumando el ID de la mascota al objeto
            const datosAEnviar = {
                ...datos,
                mascota: mascotaId
            };

            // Hacemos el POST
            const response = await apiMascotas.post("comentarios/", nuevoComentario);

            if (response.status === 201) {
                //Limpiamos las cajas de texto
                setAutor("");
                setContenido("");
                setErrores({});
                
                //Le avisamos a la lista que vuelva a pedir los datos a la API
                onComentarioAgregado();
            }
        } catch (error) {
            console.log("Error al cargar datos:", error);
            
            const status = error.response?.status;

            if (status === 404) {
                setError("La información solicitada ya no existe (Error 404).");
            } 
            else {
                setError("No pudimos conectarnos al servidor. Revisa tu conexión a internet.");
            }
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
                {errores.autor && <p>{errores.autor}</p>}
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
                {errores.contenido && <p>{errores.contenido}</p>}
                </div>
                {errores.general && <p>{errores.general}</p>}
                <button type="submit">Publicar</button>
            </form>
        </div>
    );
}

export default ComentarioForm;