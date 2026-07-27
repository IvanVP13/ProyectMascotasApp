import { useEffect, useState } from "react";
import MascotasList from "../components/MascotasList";
import apiMascotas from "../api/apiMascotas";
import MascotasForm from "../components/MascotasForm";

function MascotasPage(){

    const [mascotasList, setmascotaList] = useState([]);
    const [errorGlobal, setErrorGlobal] = useState(""); // Estado para errores de carga
    
    //Traemos los datos con fecth
    const fetchMascotas = async ()  => {
        try{
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
    useEffect(() => {fetchMascotas(); }, []);

    return(
        <article>
            <h1>Pagina Mascotas</h1>
            {errorGlobal && <p>{errorGlobal}</p>}
            <MascotasForm onAdd={fetchMascotas}/>
            <MascotasList  lista={mascotasList} onDelete={eliminarMascota}/>

        </article>
    )}

export default MascotasPage