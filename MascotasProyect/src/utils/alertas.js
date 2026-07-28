import Swal from 'sweetalert2';

/**
 * Muestra una alerta de confirmación estilizada con la paleta cálida del proyecto.
 * @param {string} tipoElemento - Puede ser 'mascota' o 'comentario' para adaptar el texto.
 * @returns {Promise<boolean>} - Retorna true si el usuario confirma, false si cancela.
 */
export const confirmarEliminacion = async (tipoElemento) => {
    
    // Adaptamos el texto según lo que estemos borrando
    const textoElemento = tipoElemento === 'mascota' ? 'esta mascota' : 'este comentario';
    
    const resultado = await Swal.fire({
        title: '¿Estás seguro?',
        text: `Estás a punto de eliminar ${textoElemento}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        
        // --- APLICACIÓN DE LA PALETA CÁLIDA ---
        confirmButtonColor: '#dc2626', // Rojo ladrillo (Acción destructiva)
        cancelButtonColor: '#d97706',  // Ámbar cálido (Acción secundaria)
        background: '#fffaf0',         // Fondo crema suave (Como las tarjetas de comentarios)
        color: '#2d3748',              // Texto oscuro para buen contraste
        iconColor: '#dd6b20',          // El ícono de advertencia usa nuestro naranja principal
        
        // Ajustes de diseño
        customClass: {
            popup: 'swal2-border-radius' // Podemos inyectar clases personalizadas si es necesario
        }
    });

    return resultado.isConfirmed;
};