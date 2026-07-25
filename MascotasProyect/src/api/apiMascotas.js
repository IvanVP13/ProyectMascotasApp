import axios from "axios";

const apiMascotas = axios.create({
    baseURL: "https://mascotas.pythonanywhere.com/api/"
})

export default apiMascotas;