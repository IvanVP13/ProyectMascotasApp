export function validarDatosMascota(datos, requiereImagen = false, imagen = null) {
    
    const errores = {};

    if (!datos.nombre.trim()) {
        errores.nombre= "El nombre no puede estar vacío o contener solo espacios.";
    } else if (datos.nombre.trim().length > 40) {
        errores.nombre = "El nombre no puede tener más de 40 caracteres.";
    }

    if (!String(datos.edad).trim()) {
        errores.edad = "La edad es obligatoria.";
    } else if (Number(datos.edad) < 0 || Number(datos.edad) > 30) {
        errores.edad = "Ingresa una edad válida (0 - 30).";
    }

    if (!datos.raza.trim()) {
        errores.raza= "La raza no puede estar vacía.";
    }else if (datos.raza.trim().length > 20) {
        errores.raza = "La Raza no puede tener más de 20 caracteres.";
    }

    if (!datos.descripcion.trim()) {
        errores.descripcion= "La descripción no puede estar vacía.";
    }

    if (requiereImagen && !imagen) {
        errores.imagen = "Debe adjuntar una imagen.";
    }

    // Devuelve el objeto con todos los problemas o vacio si esta bien
    return errores; 
}


export function validarDatosComentario(datos) {
    const errores = {};

    // Validamos el contenido del comentario
    if (!datos.contenido || !datos.contenido.trim()) {
        errores.contenido = "El comentario no puede estar vacío.";
    } else if (datos.contenido.trim().length > 500) {
        errores.contenido = "El comentario es muy largo (máximo 500 caracteres).";
    }

    // Validamos el autor
    if (!datos.autor.trim().length > 50) {
        errores.autor = "El nombre del autor no puede estar vacío o contener solo espacios.";
    } else if (datos.autor.trim().length > 40) {
        errores.autor = "El autor no puede tener más de 40 caracteres.";
    }

    return errores;
}
