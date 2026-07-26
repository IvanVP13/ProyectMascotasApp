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
            }
        } catch (error){
            console.log("Error al crear mascota", error.response);
        }
    };
    useEffect(() => {fetchMascotas(); }, []);

    return(
        <article>
            <h1>Pagina Mascotas</h1>
            <MascotasForm onAdd={crearMascotas}/>
            <MascotasList  lista={mascotasList}/>

        </article>
    )}

export default MascotasPage