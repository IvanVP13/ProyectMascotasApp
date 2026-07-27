import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiMascotas from "../api/apiMascotas";
import ComentariosList from "../components/ComentariosList";
import { formatLabel } from "../utils/formatters";
import EditarMascotaForm from "../components/EditarMascotaForm";

// Asumiendo que este componente recibe la 'mascota' actual
function DetallesPage({}) {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const [mascota, setMascota] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [editando, setEditando] = useState(false);

    // error 404 por si se busca algo que fue eliminado o no existe
    const [error404, setError404] = useState(false);

    const fetchDetalle = async () => {
        try {
            // Hacemos el GET usando el ID de la URL
            const response = await apiMascotas.get(`mascotas/${id}/`);
            if (response.status === 200) {
                setMascota(response.data);
            }
        } catch (error) {
            console.log("Error al cargar detalle:", error);
            
            // Aplicamos encadenamiento opcional
            const status = error.response?.status;
            
            if (status === 404) {
                setError404(true);
            }
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {fetchDetalle()}, [id]);

    if (cargando) return <p>Cargando detalles...</p>;
    if (error404) {
        return (
            <div>
                <h2>Error 404: Mascota no encontrada</h2>
                <p>Parece que el registro que buscas no existe o fue eliminado recientemente.</p>
                <button onClick={() => navigate("/")}>Volver al listado principal</button>
            </div>
        );
    }
    if (!mascota) return <p>Mascota no encontrada.</p>;

    return (
        <div className="detalle-contenedor">
            <article className="detalle-tarjeta-principal">
                
                {/* Barra superior con Volver y Editar separados */}
                <div className="detalle-barra-superior">
                    <button className="btn-regresar" onClick={() => navigate(-1)}>
                        ← Volver
                    </button>
                    
                    {!editando && (
                        <button className="btn-detalles btn-editar" onClick={() => setEditando(true)}>
                            ✏️ Editar Mascota
                        </button>
                    )}
                </div>
                
                {editando ? (
                    <EditarMascotaForm 
                        mascota={mascota} 
                        onCancel={() => setEditando(false)} 
                        onSuccess={() => {
                            setEditando(false);
                            fetchDetalle();
                        }} 
                    />
                ) : (
                    <div className="detalle-grid-contenido">
                        
                        {/* Columna Izquierda: Imagen con tamaño controlado */}
                        <div>
                            {mascota.imagen ? (
                                <div className="detalle-imagen-contenedor">
                                    <img src={mascota.imagen} alt={`Imagen de ${mascota.nombre}`} />
                                </div>
                            ) : (
                                <div className="detalle-imagen-contenedor" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "15rem", color: "#a0aec0" }}>
                                    Sin imagen disponible
                                </div>
                            )}
                        </div>

                        {/* Columna Derecha: Información detallada */}
                        <div className="detalle-info-cuerpo">
                            <div>
                                <h1 className="detalle-titulo">{formatLabel(mascota.nombre)}</h1>
                                
                                <ul className="detalle-grupo-datos">
                                    <li className="detalle-item"><strong>Tipo:</strong> {formatLabel(mascota.tipo_animal)}</li>
                                    <li className="detalle-item"><strong>Raza:</strong> {formatLabel(mascota.raza)}</li>
                                    <li className="detalle-item"><strong>Edad:</strong> {mascota.edad} (años aproximados)</li>
                                    <li className="detalle-item"><strong>Sexo:</strong> {formatLabel(mascota.sexo)}</li>
                                    <li className="detalle-item"><strong>Tamaño:</strong> {formatLabel(mascota.tamano)}</li>
                                    <li className="detalle-item"><strong>Estado:</strong> {formatLabel(mascota.estado)}</li>
                                </ul>

                                {mascota.descripcion && (
                                    <div className="detalle-descripcion" style={{ marginTop: "1rem" }}>
                                        <strong>Descripción completa:</strong>
                                        <p style={{ marginTop: "0.25rem" }}>{formatLabel(mascota.descripcion)}</p>
                                    </div>
                                )}
                            </div>

                            <div style={{ borderTop: "0.0625rem solid #edf2f7", paddingTop: "1rem", marginTop: "0.5rem" }}>
                                <p><small style={{ color: "#a0aec0" }}><strong>Fecha de registro:</strong> {mascota.fecha_creacion ? new Date(mascota.fecha_creacion).toLocaleString() : "N/A"}</small></p>
                                <p><small style={{ color: "#a0aec0" }}><strong>Última actualización:</strong> {mascota.fecha_actualizacion ? new Date(mascota.fecha_actualizacion).toLocaleString() : "N/A"}</small></p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sección de Comentarios */}
                {!editando && (
                    <div style={{ marginTop: "2.5rem", borderTop: "0.125rem solid #edf2f7", paddingTop: "1.5rem" }}>
                        <ComentariosList mascotaId={mascota.id} />
                    </div>
                )}
            </article>
        </div>
    );
}

export default DetallesPage;