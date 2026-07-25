import { useEffect, useState } from "react";
import MascotasList from "../components/MascotasList";
import apiMascotas from "../api/apiMascotas";

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
    useEffect(() => { fetchMascotas() }, [])
    return(
        <article>
            <h1>Pagina Mascotas</h1>
            <MascotasList  lista={mascotasList}/>

        </article>
    )}

export default MascotasPage