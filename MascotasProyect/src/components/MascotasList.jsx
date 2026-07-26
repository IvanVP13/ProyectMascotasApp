import { useNavigate } from "react-router-dom";

function MascotasList({lista, onDelete}){
    //inicializa un gancho
    const navigate = useNavigate();

    function formatLabel(value) {
        if (!value) return "";

        // Correcciones especificas primero
        const correcciones = {
            en_adopcion: "En Adopción",
            pequeno: "Pequeño"
        };

        //Si el valor coincide con alguna clave del objeto, devuelde version corregida
        if (correcciones[value]) {
            return correcciones[value];
        }

        //Para los demas casos primera letra a mayúscula
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

return (
        <>
            <h2>Listado de Mascotas</h2>

            <div>
                {lista.map((m) => (
                    
                    // El key obligatorio para React para no confundirse.
                    <div key={m.id}>
                        
                        <img 
                            src={m.imagen} 
                            alt={`Imagen de ${m.nombre}`} 
                            width="200" 
                        />
                        
                        <div>
                            <h2>{formatLabel(m.nombre)} (#{m.id})
                                
                                <button
                                onClick={() => onDelete(m.id)} 
                                >Eliminar
                                </button>
                            </h2>
                            
                            <div>
                                <span>Estado: {formatLabel(m.estado)}</span> | 
                                <span> Tipo: {formatLabel(m.tipo_animal)}</span>
                            </div>
                            
                            <p>Descripción: {formatLabel(m.descripcion)}</p>
                            
                            <ul>
                                <li><strong>Edad:</strong> {m.edad} años (aprox)</li>
                                <li><strong>Raza:</strong> {formatLabel(m.raza)}</li>
                                <li><strong>Sexo:</strong> {formatLabel(m.sexo)}</li>
                                <li><strong>Tamaño:</strong> {formatLabel(m.tamano)}</li>
                            </ul>
                            <div>
                                <p>Registro: {m.fecha_creacion}</p>
                                <p>Última act: {m.fecha_actualizacion}</p>
                                <button onClick={() => navigate(`/mascota/${m.id}`)}>
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
export default MascotasList