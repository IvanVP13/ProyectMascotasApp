import { useEffect, useState } from "react";
import MascotasList from "../components/MascotasList";
import apiMascotas from "../api/apiMascotas";
import MascotasForm from "../components/MascotasForm";

function MascotasPage(){

    const [mascotasList, setmascotaList] = useState([]);
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

        }catch(error){
            console.log(error.response);
        };
    }


    //Peticion POST
    const crearMascotas = async(datosNuevaMascota) => {
        try{
            const response = await apiMascotas.post("mascotas/",datosNuevaMascota);
            if (response.status === 201){
                alert("Mascota creada con exito");
                //Pedimos la lista para que aparesca el nuevo registro
                fetchMascotas();
                //Le mandamos al formulario el exito
                return { exito: true };
            }
        } catch (error){
            // Si es un error 400 lo mandamos al formulario
            if (error.response && error.response.status === 400) {
                return { exito: false, erroresBackend: error.response.data };
            }
            
            // Si es otro error 500 usamos alerta global
            manejarErroresAPI(error, "crear la mascota");
            return { exito: false };
        }
    };

    // Peticion DELETE
    const eliminarMascota = async (id) => {
        //Preguntamos al usuario para evitar borrados por accidente
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta mascota?");
        if (!confirmar) return;

        try {
            // Pasamos el ID en la URL
            const response = await apiMascotas.delete(`mascotas/${id}/`);
            
            // 204 significa "No Content" (Eliminado con éxito)
            if (response.status === 204) {
                alert("Mascota eliminada correctamente.");
                fetchMascotas(); // Volvemos a pedir la lista para que desaparezca
            }
        } catch (error) {
            manejarErroresAPI(error, "eliminar la mascota");
        }
    };

    // Funcion auxiliar para manejar lo errores globales
    const manejarErroresAPI = (error, accion) => {
        if (error.response) {
            const status = error.response.status;
            const dataBackend = error.response.data;

            if (status === 404) {
                alert(`Error 404: No se encontró la información en el servidor al intentar ${accion}.`);
            } 
            else if (status === 500) {
                alert(`Error 500: Hubo un problema interno en el servidor intentar ${accion}.`);
            } 
            else {
                alert(`Error ${status} del servidor:\n${dataBackend?.detail || "Ha ocurrido un problema."}`);
            }
        } 
        else if (error.request) {
            alert(`Error de red: No se pudo conectar con el servidor para ${accion}. Verifica tu internet.`);
        } 
        else {
            console.log("Error de Axios:", error.message);
        }
    };

    useEffect(() => {fetchMascotas(); }, []);

    return(
        <article>
            <h1>Pagina Mascotas</h1>
            <MascotasForm onAdd={crearMascotas}/>
            <MascotasList  lista={mascotasList} onDelete={eliminarMascota}/>

        </article>
    )}

export default MascotasPage