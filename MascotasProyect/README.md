# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Gemini IA FromData

JSON (el objeto normal {}): Solo sirve para enviar texto plano. No soporta archivos físicos. Si intentas meter una imagen ahí, el envío falla.

FormData: Es un contenedor especial del navegador diseñado especificamente para enviar texto y archivos al mismo tiempo.

La ventaja: Al usar .append() para empaquetar la imagen, Axios le avisa automáticamente a tu backend en Python que el paquete contiene archivos (multipart/form-data). Gracias a esto, el servidor sabe cómo extraer la imagen y guardarla en su base de datos.