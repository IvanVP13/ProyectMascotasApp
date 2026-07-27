import { useNavigate } from "react-router-dom";
import { formatLabel } from "../utils/formatters";

function MascotasList({lista, onDelete}){
    //inicializa un gancho
    const navigate = useNavigate();

return (
        <div className="mascotas-container">            
            {lista.length === 0 ? (
                <p>No hay mascotas registradas actualmente.</p>
            ) : (
                <ul className="mascotas-grid">
                    {lista.map((mascota) => (
                        <li key={mascota.id} className="mascota-card">
                            
                            {/* Imagen de la mascota */}
                            <div>
                                {mascota.imagen ? (
                                    <img src={mascota.imagen} alt={`Imagen de ${mascota.nombre}`} />
                                ) : (
                                    <div style={{ height: "200px", backgroundColor: "#edf2f7", display: "flex", alignItems: "center", justifyContent: "center", color: "#a0aec0" }}>
                                        Sin imagen
                                    </div>
                                )}
                                
                                <div className="mascota-info">
                                    <h3>{formatLabel(mascota.nombre)}</h3>
                                    <span><strong>Estado:</strong> {formatLabel(mascota.estado)}</span>
                                    <span><strong>Tipo:</strong> {formatLabel(mascota.tipo_animal)}</span>
                                    
                                    <p className="mascota-fecha">
                                        Registrado el: {mascota.fecha_creacion ? new Date(mascota.fecha_creacion).toLocaleDateString() : "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="mascota-acciones">
                                <button 
                                    className="btn-detalles" 
                                    onClick={() => navigate(`/mascota/${mascota.id}`)}
                                >
                                    Ver Detalles
                                </button>
                                <button 
                                    className="btn-eliminar" 
                                    onClick={() => onDelete(mascota.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default MascotasList