import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Importamos los estilos básicos

// Exportamos una única instancia configurada con nuestra paleta cálida
export const notyf = new Notyf({
    duration: 4000, // La notificación dura 4 segundos
    position: {
        x: 'right',
        y: 'top', // Aparecerán en la esquina superior derecha
    },
    types: [
        {
            type: 'success',
            background: '#dd6b20', // Nuestro naranja principal para éxitos
            dismissible: true
        },
        {
            type: 'error',
            background: '#dc2626', // Nuestro rojo ladrillo para errores
            dismissible: true
        },
        {
            type: 'info',
            background: '#d97706', // Nuestro ámbar para advertencias
            icon: false,
            dismissible: true
        }
    ]
});