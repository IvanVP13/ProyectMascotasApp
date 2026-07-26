import { useState } from "react";

//Recibe onAdd como prop
function MascotasForm ({onAdd}){

    const [datos, setDatos] = useState({
        nombre: "", descripcion: "", estado: "en adopcion", tipo_animal: "perro",
        edad: "", raza: "", sexo: "desconocida", tamano: "desconocida"
    })

    //Empaquetamos en FormData por la imagen
    const [imagen, setImagen] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formularioData = new FormData();
        //Guarda las claves y valores del objeto datos
        for (const  clave in datos){
            formularioData.append(clave,datos[clave]);    
        }
        if (imagen){
            formularioData.append("imagen", imagen);
        }
        //Ejecutamos la funcion del padre y pasamos datos
        onAdd(formularioData);
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
                </div>
                
                <div>
                    <label>Edad: </label>
                    <input 
                        type="number" 
                        value={datos.edad}
                        onChange={(e) => setDatos({...datos,edad: e.target.value })} 
                    />
                </div>

                <div>
                    <label>Raza: </label>
                    <input 
                        type="text" 
                        value={datos.raza}
                        onChange={(e) => setDatos({...datos,raza: e.target.value })} 
                    />
                </div>

                <div>
                    <label>Descripción: </label>
                    <textarea 
                        value={datos.descripcion}
                        onChange={(e) => setDatos({...datos,descripcion: e.target.value })}  
                    ></textarea>
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
                        <option value="en adopcion">En adopción</option>
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
                        <option value="pequeño">Pequeño</option>
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
                </div>
                
                <button type="submit">Publicar Mascota</button>
            </form>
        </>
    )
}
export default MascotasForm;