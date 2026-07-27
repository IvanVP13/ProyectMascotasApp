import { useNavigate } from "react-router-dom";
import { formatLabel } from "../utils/formatters";

function MascotasList({lista, onDelete}){
    //inicializa un gancho
    const navigate = useNavigate();

return (
        <div>
            <h2>Lista de Mascotas</h2>
            <ul>
                {lista.map((mascota) => (
                    // El key obligatorio para React para no confundirse.
                    <div key={mascota.id}>
                        
                        {/* Información principal resumida */}
                         
                        <img src={mascota.imagen} 
                            alt={`Imagen de ${mascota.nombre}`} 
                            width="200" 
                        />

                        <h3>Nombre: {formatLabel(mascota.nombre)}</h3>
                        <span><strong>Estado:</strong> {formatLabel(mascota.estado)}</span>
                        
                        <div>
                            <p><small>Registrado el: {mascota.fecha_creacion ? new Date(mascota.fecha_creacion).toLocaleDateString() : "N/A"}</small></p>
                        </div>

                        {/* Botones de accion */}
                        <div>
                            <button onClick={() => navigate(`/mascota/${mascota.id}`)}>
                                Ver Detalles
                            </button>
                            <button onClick={() => onDelete(mascota.id)}>
                                Eliminar
                            </button>
                        </div>
                        
                    </div>
                ))}
            </ul>
        </div>
    );
}
export default MascotasList