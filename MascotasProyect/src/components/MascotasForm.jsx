import { useState } from "react";
import { validarDatosMascota } from "../utils/validations";
import apiMascotas from "../api/apiMascotas";
import { notyf } from "../utils/notificaciones";
//Recibe onAdd como prop
function MascotasForm ({onAdd}){

    const [datos, setDatos] = useState({
        nombre: "", descripcion: "", estado: "en_adopcion", tipo_animal: "perro",
        edad: "", raza: "", sexo: "desconocido", tamano: "desconocido"
    })

    const [errores, setErrores] = useState({});

    //Empaquetamos en FormData por la imagen
    const [imagen, setImagen] = useState(null);

    //Funcion para revisar que ningun campo este vacio
    const validarFormulario = () => {
        const nuevosErrores = validarDatosMascota(datos, true, imagen);
        
        setErrores(nuevosErrores);
        // Retorna true si el objeto está vacío (0 errores)
        return Object.keys(nuevosErrores).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) {
            return; 
        }

        const formularioData = new FormData();
        //Guarda las claves y valores del objeto datos
        for (const  clave in datos){
            formularioData.append(clave,datos[clave]);    
        }
        if (imagen){
            formularioData.append("imagen", imagen);
        }

        try {
            // Hacemos la petición POST directamente desde el formulario
            const response = await apiMascotas.post('mascotas/', formularioData);
            
            // Si la mascota se creo con exito
            if (response.status === 201) {
                notyf.success("¡Mascota publicada con éxito!");
                // Limpiamos el formulario
                setDatos({
                    nombre: "", descripcion: "", estado: "en_adopcion", tipo_animal: "perro",
                    edad: "", raza: "", sexo: "desconocido", tamano: "desconocido"
                });
                setImagen(null);
                setErrores({});
                
                // Le avisamos al componente padre que recargue la lista
                if (onAdd) onAdd(); 
            }
        } catch (error) {
            console.log("Error técnico recibido:", error);

            // Uso de encadenamiento opcional
            const status = error.response?.status;
            const data = error.response?.data;

            if (status === 400) {
                // Error 400 Validación del Back-End
                const erroresDelServidor = {};
                
                for (const campo in data) {
                    erroresDelServidor[campo] = data[campo][0];
                }
                
                setErrores(erroresDelServidor);
            } 
            else {
                // Error general (Servidor caido, sin internet, etc.)
                setErrores({ general: "Ocurrió un error inesperado al intentar publicar. Por favor, intenta de nuevo." });
            }
        }
    };
    return(
        <>
        <h2>Publicar nueva mascota</h2>
            <form onSubmit={ e => handleSubmit(e)}>
                
                {/* Agregamos ...datos para no borrar los demas campos */}
                <div>
                    <label>Nombre: </label>
                    <input 
                        type="text" 
                        value={datos.nombre}
                        onChange={(e) => setDatos({...datos,nombre: e.target.value })}  
                    />
                    {errores.nombre && <p>{errores.nombre}</p>}
                </div>
                
                <div>
                    <label>Edad: </label>
                    <input 
                        type="number" 
                        value={datos.edad}
                        onChange={(e) => setDatos({...datos,edad: e.target.value })} 
                    />
                    <label>Edad aproximada en años, si se conoce.</label>
                    {errores.edad && <p>{errores.edad}</p>}
                </div>

                <div>
                    <label>Raza: </label>
                    <input 
                        type="text" 
                        value={datos.raza}
                        onChange={(e) => setDatos({...datos,raza: e.target.value })} 
                    />
                    {errores.raza && <p>{errores.raza}</p>}
                </div>

                <div>
                    <label>Descripción: </label>
                    <textarea 
                        value={datos.descripcion}
                        onChange={(e) => setDatos({...datos,descripcion: e.target.value })}  
                    ></textarea>
                    {errores.descripcion && <p>{errores.descripcion}</p>}
                </div>

                <div>
                    <label>Estado: </label>
                    <select 
                        value={datos.estado}
                        onChange={(e) => setDatos({...datos,estado: e.target.value })}
                    >
                        <option value="encontrada">Encontrada</option>
                        <option value="perdida">Perdida</option>
                        <option value="adoptada">Adoptada</option>
                        <option value="en_adopcion">En adopción</option>
                    </select>
                </div>

                <div>
                    <label>Tipo de Animal: </label>
                    <select 
                        value={datos.tipo_animal}
                        onChange={(e) => setDatos({...datos,tipo_animal: e.target.value })}
                        required
                    >
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
                    <select 
                        value={datos.sexo}
                        onChange={(e) => setDatos({...datos,sexo: e.target.value })}
                        required
                    >
                        <option value="hembra">Hembra</option>
                        <option value="macho">Macho</option>
                        <option value="desconocido">Desconocido</option>
                    </select>
                </div>

                <div>
                    <label>Tamaño: </label>
                    <select 
                        value={datos.tamano}
                        onChange={(e) => setDatos({...datos,tamano: e.target.value })}
                        required
                    >
                        <option value="pequeno">Pequeño</option>
                        <option value="mediano">Mediano</option>
                        <option value="grande">Grande</option>
                        <option value="desconocido">Desconocido</option>
                    </select>
                </div>

                {/* Campo de imagen */}
                <div>
                    <label>Imagen: </label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImagen(e.target.files[0])} 
                    />
                    {errores.imagen && <p>{errores.imagen}</p>}
                </div>
                {errores.general && <p>{errores.general}</p>}
                <button type="submit">Publicar Mascota</button>
            </form>
        </>
    )
}
export default MascotasForm;