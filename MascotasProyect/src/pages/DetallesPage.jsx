import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiMascotas from "../api/apiMascotas";
import ComentariosList from "../components/ComentariosList";

// Asumiendo que este componente recibe la 'mascota' actual
function DetallesPage({}) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [mascota, setMascota] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchDetalle = async () => {
            try {
                // Hacemos el GET usando el ID de la URL
                const response = await apiMascotas.get(`mascotas/${id}/`);
                if (response.status === 200) {
                    setMascota(response.data);
                }
            } catch (error) {
                console.log("Error al cargar detalle:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchDetalle();
    }, [id]);

    if (cargando) return <p>Cargando detalles...</p>;
    if (!mascota) return <p>Mascota no encontrada.</p>;

    return (
        <article>
            <div>
                <h2>{mascota.nombre}</h2>
                <p>Edad: {mascota.edad}</p>
                <p>Raza: {mascota.raza}</p>
                <p>Descripción: {mascota.descripcion}</p>
                <p>Estado: {mascota.estado}</p>
                <p>Tipo: {mascota.tipo_animal}</p>
                <p>Sexo: {mascota.sexo}</p>
                <p>Tamaño: {mascota.tamano}</p>
                
                {/* Mostramos la imagen solo si existe */}
                {mascota.imagen && (
                    <div>
                        <img src={mascota.imagen} alt={`Imagen de ${mascota.nombre}`} width="200"/>
                    </div>
                )}
                <hr />

                <div>
                    {/* Le pasamos el ID de la mascota al componente para que busque sus comentarios */}
                    <ComentariosList mascotaId={mascota.id} />
                </div>
            
            </div>
        </article>
    );
}

export default DetallesPage;