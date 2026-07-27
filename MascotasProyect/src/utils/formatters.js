export function formatLabel(value) {
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
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};