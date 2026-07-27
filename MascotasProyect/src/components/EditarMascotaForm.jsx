import { useState } from "react";
import apiMascotas from "../api/apiMascotas";
import { validarDatosMascota } from "../utils/validations";

function EditarMascotaForm({ mascota, onCancel, onSuccess }) {
    // Inicializamos el estado con los datos actuales de la mascota
    const [datos, setDatos] = useState({
        nombre: mascota.nombre || "",
        descripcion: mascota.descripcion || "",
        estado: mascota.estado || "en_adopcion",
        tipo_animal: mascota.tipo_animal || "perro",
        edad: mascota.edad || "",
        raza: mascota.raza || "",
        sexo: mascota.sexo || "desconocido",
        tamano: mascota.tamano || "desconocido"
    });
    
    const [imagen, setImagen] = useState(null);
    const [errores, setErrores] = useState({}); //objetovacio

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrores({}); //Limpia erroes

        //validamos
        // Le pasamos false porque editar la imagen es opcional
        const nuevosErrores = validarDatosMascota(datos, false, imagen);
        // Si el objeto de errores tiene claves , hay errores
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return; // Detenemos el envío
        }
        // Usamos FormData porque podríamos estar enviando un archivo de imagen
        const formData = new FormData();
        for (const clave in datos) {
            formData.append(clave, datos[clave]);
        }
        
        // Solo agregamos la imagen si el usuario seleccionó una nueva
        if (imagen) {
            formData.append("imagen", imagen);
        }

        try {
            // Hacemos un PATCH a la URL de la mascota específica
            const response = await apiMascotas.patch(`mascotas/${mascota.id}/`, formData);
            
            if (response.status === 200) {
                onSuccess(); // Si es un exito recarga la pagina
            }
        } catch (error) {
            console.log("Error al editar:", error);
            
            const status = error.response?.status;
            const data = error.response?.data;

            //Diferenciamos los tipos de errores
            if (status === 400) {
                // Ejemplo: { nombre: ["Asegúrese de que este campo no tenga más de 100 caracteres."] }
                const erroresDelServidor = {};
                
                for (const campo in data) {
                    // Tomamos el primer mensaje de error de cada campo y lo traducimos a nuestra interfaz
                    erroresDelServidor[campo] = data[campo][0];
                }
                
                // Esto hará que el texto rojo del Back-End aparezca justo debajo del input correspondiente
                setErrores(erroresDelServidor);
            } 
            else if (status === 404) {
                // Error 404 (No Encontrado)
                setErrores({ general: "Error 404: No se pudo actualizar. La mascota ya no existe en el sistema." });
            } 
            else {
                // 3. Evitamos mostrar mensajes técnicos
                setErrores({ general: "Ocurrió un error inesperado de conexión. Por favor, intenta más tarde." });
            }
        }
    };

    return (
        <div className="editar-formulario-contenedor">
            <h3 className="editar-formulario-titulo">Actualizar información de: {mascota.nombre}</h3>
            
            <form onSubmit={handleSubmit}>
                <div className="editar-formulario-grid">
                    
                    {/* Nombre */}
                    <div className="editar-grupo-campo">
                        <label>Nombre: </label>
                        <input 
                            type="text" 
                            value={datos.nombre}
                            onChange={(e) => setDatos({...datos, nombre: e.target.value})} 
                        />
                        {errores.nombre && <span className="editar-error-texto">{errores.nombre}</span>}
                    </div>

                    {/* Edad */}
                    <div className="editar-grupo-campo">
                        <label>Edad: </label>
                        <input 
                            type="number" 
                            value={datos.edad}
                            onChange={(e) => setDatos({...datos, edad: e.target.value})} 
                        />
                        <span className="editar-ayuda-texto">Edad aproximada en años, si se conoce</span>
                        {errores.edad && <span className="editar-error-texto">{errores.edad}</span>}
                    </div>

                    {/* Raza */}
                    <div className="editar-grupo-campo">
                        <label>Raza: </label>
                        <input 
                            type="text" 
                            value={datos.raza}
                            onChange={(e) => setDatos({...datos, raza: e.target.value})} 
                        />
                        {errores.raza && <span className="editar-error-texto">{errores.raza}</span>}
                    </div>

                    {/* Estado */}
                    <div className="editar-grupo-campo">
                        <label>Estado: </label>
                        <select value={datos.estado} onChange={(e) => setDatos({...datos, estado: e.target.value})}>
                            <option value="encontrada">Encontrada</option>
                            <option value="perdida">Perdida</option>
                            <option value="adoptada">Adoptada</option>
                            <option value="en_adopcion">En adopción</option>
                        </select>
                    </div>

                    {/* Tipo de Animal */}
                    <div className="editar-grupo-campo">
                        <label>Tipo de Animal: </label>
                        <select value={datos.tipo_animal} onChange={(e) => setDatos({...datos, tipo_animal: e.target.value})}>
                            <option value="perro">Perro</option>
                            <option value="gato">Gato</option>
                            <option value="roedor">Roedor</option>
                            <option value="reptil">Reptil</option>
                            <option value="ave">Ave</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    {/* Sexo */}
                    <div className="editar-grupo-campo">
                        <label>Sexo: </label>
                        <select value={datos.sexo} onChange={(e) => setDatos({...datos, sexo: e.target.value})}>
                            <option value="hembra">Hembra</option>
                            <option value="macho">Macho</option>
                            <option value="desconocido">Desconocido</option>
                        </select>
                    </div>

                    {/* Tamaño */}
                    <div className="editar-grupo-campo">
                        <label>Tamaño: </label>
                        <select value={datos.tamano} onChange={(e) => setDatos({...datos, tamano: e.target.value})}>
                            <option value="pequeno">Pequeño</option>
                            <option value="mediano">Mediano</option>
                            <option value="grande">Grande</option>
                            <option value="desconocido">Desconocido</option>
                        </select>
                    </div>

                    {/* Actualizar Imagen (Opcional) - Ancho completo */}
                    <div className="editar-grupo-campo editar-campo-completo">
                        <label>Actualizar Imagen (Opcional): </label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setImagen(e.target.files[0])} 
                        />
                        {errores.imagen && <span className="editar-error-texto">{errores.imagen}</span>}
                    </div>

                    {/* Descripción - Ancho completo */}
                    <div className="editar-grupo-campo editar-campo-completo">
                        <label>Descripción: </label>
                        <textarea 
                            value={datos.descripcion}
                            onChange={(e) => setDatos({...datos, descripcion: e.target.value})} 
                            rows="3"
                        />
                        {errores.descripcion && <span className="editar-error-texto">{errores.descripcion}</span>}
                    </div>

                </div>

                {errores.general && <p className="editar-error-texto" style={{ marginTop: "1rem" }}><strong>{errores.general}</strong></p>}

                {/* Botonera de acciones */}
                <div className="editar-acciones">
                    <button type="button" className="btn-cancelar" onClick={onCancel}>Cancelar</button>
                    <button type="submit" className="btn-guardar">Guardar Cambios</button>
                </div>
            </form>
        </div>
    );
}
export default EditarMascotaForm;