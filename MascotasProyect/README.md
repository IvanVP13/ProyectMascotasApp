# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Gemini IA

## FormData explicacion
JSON (el objeto normal {}): Solo sirve para enviar texto plano. No soporta archivos físicos. Si intentas meter una imagen ahí, el envío falla.

FormData: Es un contenedor especial del navegador diseñado especificamente para enviar texto y archivos al mismo tiempo.

La ventaja: Al usar .append() para empaquetar la imagen, Axios le avisa automáticamente a tu backend en Python que el paquete contiene archivos (multipart/form-data). Gracias a esto, el servidor sabe cómo extraer la imagen y guardarla en su base de datos.

## Refactorización, Validaciones y Manejo de Errores
En esta fase del proyecto, se implementó una refactorización profunda con asistencia de IA enfocada en mejorar la experiencia del usuario (UX), proteger la integridad de los datos y asegurar la estabilidad de la aplicación frente a errores de red o servidor.

- Herramientas y Tecnologías Clave
React (Hooks): Uso intensivo de useState para el manejo de formularios y useEffect para ciclos de vida.

Axios: Cliente HTTP para gestionar las peticiones asíncronas (GET, POST, PATCH, DELETE) hacia la API de Django.

FormData API: Empaquetado nativo de datos para permitir la carga y actualización de archivos multimedia (imágenes) junto con texto.

- Sistema de Validaciones (Front-End)
Se aplicó el principio DRY (Don't Repeat Yourself) centralizando la lógica de validación para evitar código repetido en los formularios de creación y edición.

Archivo centralizado (utils/validations.js): Actúa como la primera "línea de defensa". Evalúa los datos antes de hacer peticiones al servidor para ahorrar recursos.

Reglas implementadas:

Límites de caracteres estrictos para evitar la caída del servidor (Ej. nombres máximos de 40 caracteres, comentarios de 500 caracteres).

Validaciones de rango numérico (edad permitida entre 0 y 30 años).

Validación condicional de imágenes (obligatoria al crear, opcional al editar).

Retorno dinámico: La función devuelve un objeto con errores específicos por campo, permitiendo a la interfaz renderizar mensajes de alerta individuales justo debajo de cada input.

- Formateo de Interfaz
Se extrajo la lógica visual a un archivo de utilidades independiente para mantener los componentes limpios.

Utilidad (utils/formatters.js): Implementación de funciones como formatLabel para normalizar y capitalizar los textos provenientes de la base de datos antes de ser renderizados en componentes de lectura como DetallesPage y MascotasList.

- Manejo de Errores Backend (Segunda línea de defensa)
Se diseñó un sistema de captura de errores robusto dentro de los bloques try...catch de Axios, evitando por completo mostrar "errores técnicos" (como objetos vacíos o trazas de código) al usuario final.

Error 400 (Bad Request): Interceptado en peticiones POST y PATCH. Se iteran los mensajes de error devueltos por Django (ej. "Asegúrese de que este campo no tenga más de 100 caracteres") y se inyectan dinámicamente en el estado de errores de React para mostrarlos en el formulario.

Error 404 (Not Found): Implementado en lecturas y borrados (GET, DELETE). Si un usuario intenta editar, ver o comentar una mascota que fue eliminada por otro administrador, la UI atrapa el 404 y renderiza un mensaje amigable o una pantalla de resguardo informando que el recurso ya no existe.

Errores Generales (500, problemas de red): Se estableció un catch general que provee mensajes genéricos de fallo de conexión en caso de que el servidor se caiga.

- Conceptos Técnicos Aplicados en la Refactorización
Durante la optimización del código, se aplicaron los siguientes estándares modernos de JavaScript y React:

Encadenamiento Opcional (?.): Se utilizó la sintaxis error.response?.status y error.response?.data para prevenir que la aplicación colapse (crash) si el servidor no devuelve un objeto de respuesta (por ejemplo, cuando no hay internet).

Diferenciación de Estados de Error: Separación estricta entre la variable nativa de captura de excepciones (catch (error)) y la variable de estado visual de React (const [errores, setErrores]).

Early Returns (Retornos tempranos): Uso de return; en las funciones handleSubmit para detener la ejecución del código inmediatamente si las validaciones del Front-End fallan.

Delegación de Responsabilidades: Se independizaron los formularios (MascotasForm, EditarMascotaForm) para que gestionen sus propias peticiones HTTP y errores, limpiando drásticamente el código de los componentes padres (MascotasPage).

## Diseño e Interfaz de Usuario (UI/UX)

Para garantizar una experiencia cálida, amigable y responsiva en "Red de Mascotas", el proyecto implementa un sistema de diseño propio apoyado por las siguientes herramientas:

### Dependencias Clave
*   **[Notyf](https://carlosjeurissen.com/notyf/):** Sistema de notificaciones *toast* no bloqueantes. Se utiliza para proveer *feedback* inmediato y elegante al usuario tras acciones exitosas (creación/edición de mascotas) o para capturar errores de la API.
*   **[SweetAlert2](https://sweetalert2.github.io/):** Reemplaza los cuadros de diálogo nativos del navegador por ventanas modales modernas y personalizables. Se emplea principalmente para confirmar acciones destructivas (como eliminar registros de mascotas o comentarios).
*   **[React Icons](https://react-icons.github.io/react-icons/):** Integración de iconografía vectorial (específicamente la colección *Feather Icons*). Permite mantener una interfaz limpia y libre de texto excesivo en los botones de acción (ej. `FiTrash2` para eliminación).

### Paleta de Colores
El proyecto empezo por colores corporativos tradicionales y evoliciono en favor de una paleta cálida que transmite empatía y cercanía:
*   **Primario (Naranja - `#dd6b20`):** Usado en títulos, botones principales, íconos de advertencia y notificaciones de éxito.
*   **Destructivo (Rojo Ladrillo - `#dc2626`):** Reservado estrictamente para la confirmación de eliminación y alertas de error crítico.
*   **Secundario (Ámbar - `#d97706`):** Utilizado para botones de cancelación e información.
*   **Fondos (Crema Suave - `#fffaf0`):** Aplicado en tarjetas de contenido, modales y mensajes de estado para dar aspecto de tarjeta física y reducir la fatiga visual.
*   **Texto Contraste (`#2d3748` / `#4a5568`):** Tonos oscuros para asegurar la máxima accesibilidad y legibilidad.

### Arquitectura de Estilos
*   **Centralización:** Las configuraciones visuales de las librerías externas están modularizadas en `src/utils/notificaciones.js` y `src/utils/alertas.js` para facilitar el mantenimiento y la escalabilidad del diseño.
*   **Flexbox:** Uso intensivo de Flexbox en `index.css` (ej. clase `.error-404-contenedor`) para garantizar el centrado perfecto y la adaptabilidad de componentes de estado (pantallas de error, listas vacías y *loaders*).