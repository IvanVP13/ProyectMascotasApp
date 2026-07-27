import { useState } from "react";
import apiMascotas from "../api/apiMascotas";

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
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        //validaciones
        if (!datos.nombre.trim()) {
            setError("El nombre no puede estar vacío o contener solo espacios.");
            return;
        }

        // Convertimos a texto por si acaso y validamos
        if (!String(datos.edad).trim() || Number(datos.edad) < 0 || Number(datos.edad) > 30 ) {
            setError("Por favor, ingresa una edad real (aproximada).");
            return;
        }

        if (!datos.raza.trim()) {
            setError("La raza no puede estar vacía.");
            return;
        }

        if (!datos.descripcion.trim()) {
            setError("La descripción no puede estar vacía.");
            return;
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
            setError("Ocurrió un error al actualizar los datos.");
        }
    };

    return (
        <div>
            <h3>Editar datos de {mascota.nombre}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre: </label>
                    <input 
                        type="text" 
                        value={datos.nombre}
                        onChange={(e) => setDatos({...datos, nombre: e.target.value})} 
                        
                    />
                </div>

                <div>
                    <label>Edad: </label>
                    <input 
                        type="number" 
                        value={datos.edad}
                        onChange={(e) => setDatos({...datos, edad: e.target.value})} 
                        
                    />
                </div>

                <div>
                    <label>Raza: </label>
                    <input 
                        type="text" 
                        value={datos.raza}
                        onChange={(e) => setDatos({...datos, raza: e.target.value})} 
                        
                    />
                </div>

                <div>
                    <label>Descripción: </label>
                    <textarea 
                        value={datos.descripcion}
                        onChange={(e) => setDatos({...datos, descripcion: e.target.value})} 
                        
                    />
                </div>

                <div>
                    <label>Estado: </label>
                    <select value={datos.estado} onChange={(e) => setDatos({...datos, estado: e.target.value})}>
                        <option value="encontrada">Encontrada</option>
                        <option value="perdida">Perdida</option>
                        <option value="adoptada">Adoptada</option>
                        <option value="en_adopcion">En adopción</option>
                    </select>
                </div>

                <div>
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

                <div>
                    <label>Sexo: </label>
                    <select value={datos.sexo} onChange={(e) => setDatos({...datos, sexo: e.target.value})}>
                        <option value="hembra">Hembra</option>
                        <option value="macho">Macho</option>
                        <option value="desconocido">Desconocido</option>
                    </select>
                </div>

                <div>
                    <label>Tamaño: </label>
                    <select value={datos.tamano} onChange={(e) => setDatos({...datos, tamano: e.target.value})}>
                        <option value="pequeno">Pequeño</option>
                        <option value="mediano">Mediano</option>
                        <option value="grande">Grande</option>
                        <option value="desconocido">Desconocido</option>
                    </select>
                </div>

                <div>
                    <label>Actualizar Imagen (Opcional): </label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImagen(e.target.files[0])} 
                    />
                </div>

                {error && <p>{error}</p>}

                <div>
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default EditarMascotaForm;