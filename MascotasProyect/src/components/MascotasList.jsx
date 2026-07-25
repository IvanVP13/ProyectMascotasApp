function MascotasList({lista}){

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
                            <h2>{m.nombre} (#{m.id})</h2>
                            
                            <div>
                                <span>Estado: {m.estado}</span> | 
                                <span> Tipo: {m.tipo_animal}</span>
                            </div>
                            
                            <p>Descripción: {m.descripcion}</p>
                            
                            <ul>
                                <li><strong>Edad:</strong> {m.edad}</li>
                                <li><strong>Raza:</strong> {m.raza}</li>
                                <li><strong>Sexo:</strong> {m.sexo}</li>
                                <li><strong>Tamaño:</strong> {m.tamano}</li>
                            </ul>
                            
                            <div>
                                <p>Registro: {m.fecha_creacion}</p>
                                <p>Última act: {m.fecha_actualizacion}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
export default MascotasList