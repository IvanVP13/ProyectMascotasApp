import { useState } from "react";

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
        const nuevosErrores = {};
        
        //validar edad
        if (!datos.edad.toString().trim()) {
            nuevosErrores.edad = "La edad es obligatoria.";
        } else if (Number(datos.edad) < 0 || Number(datos.edad) > 30) {
            nuevosErrores.edad = "Por favor ingresa una edad real (entre 0 y 30).";
        }

        // .trim() elimina espacios. Si queda vacio lanza error.
        if (!datos.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!datos.raza.trim()) nuevosErrores.raza = "La raza es obligatoria.";
        if (!datos.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
        if (!imagen) nuevosErrores.imagen = "Debe adjuntar una imagen.";

        setErrores(nuevosErrores);

        //Si el objeto nuevosErrores no tiene claves, significa que no hay errores (retorna true)
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

        //Ejecutamos la funcion del padre y pasamos datos
        const respuesta = await onAdd(formularioData);

        if (respuesta && !respuesta.exito && respuesta.erroresBackend) {
            const errAPI = respuesta.erroresBackend;
            // Usamos operador ternario para evitar que se caiga
            // Si el api no manda error de 'nombre', simplemente queda en blanco ("")
            setErrores({
                nombre: errAPI?.nombre?.[0] || "",
                edad: errAPI?.edad?.[0] || "",
                raza: errAPI?.raza?.[0] || "",
                descripcion: errAPI?.descripcion?.[0] || "",
                imagen: errAPI?.imagen?.[0] || ""
            });
            
            return; // Detenemos la ejecucion
        }

        //Limpiamos si fue exito el formulario para la siguiente mascota
        if (respuesta && respuesta.exito) {
            setDatos({
                nombre: "", descripcion: "", estado: "en_adopcion", tipo_animal: "perro",
                edad: "", raza: "", sexo: "desconocido", tamano: "desconocido"
            });
            setImagen(null);
            setErrores({});
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
                
                <button type="submit">Publicar Mascota</button>
            </form>
        </>
    )
}
export default MascotasForm;