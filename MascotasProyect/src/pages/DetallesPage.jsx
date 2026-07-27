import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiMascotas from "../api/apiMascotas";
import ComentariosList from "../components/ComentariosList";
import { formatLabel } from "../utils/formatters";

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
            <button onClick={() => navigate(-1)}>Volver a Inicio</button>
            
            {/*Seccion de la mascota */}
            <div>
                <h2>Nombre: {formatLabel(mascota.nombre)}</h2>
                
                <ul>
                    <li><strong>Tipo:</strong> {formatLabel(mascota.tipo_animal)}</li>
                    <li><strong>Raza:</strong> {formatLabel(mascota.raza)}</li>
                    <li><strong>Edad:</strong> {mascota.edad} (años aproximados)</li>
                    <li><strong>Sexo:</strong> {formatLabel(mascota.sexo)}</li>
                    <li><strong>Tamaño:</strong> {formatLabel(mascota.tamano)}</li>
                    <li><strong>Estado:</strong> {formatLabel(mascota.estado)}</li>
                </ul>

                <p><strong>Descripción completa:</strong></p>
                <p>{formatLabel(mascota.descripcion)}</p>

                {/* Fechas */}

                
                {/* Mostramos la imagen solo si existe */}
                {mascota.imagen && (
                    <div>
                        <img src={mascota.imagen} 
                        alt={`Imagen de ${mascota.nombre}`} 
                        width={330} />
                    </div>
                )}

                <div>
                    <p><small><strong>Fecha de registro:</strong> {mascota.fecha_creacion ? new Date(mascota.fecha_creacion).toLocaleString() : "N/A"}</small></p>
                    <p><small><strong>Última actualización:</strong> {mascota.fecha_actualizacion ? new Date(mascota.fecha_actualizacion).toLocaleString() : "N/A"}</small></p>
                </div>
            </div>

            <hr />

            {/* Comentarios*/}
            <div>
                <ComentariosList mascotaId={mascota.id} />
            </div>

        </article>
    );
}

export default DetallesPage;