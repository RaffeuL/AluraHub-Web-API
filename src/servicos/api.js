import axios from "axios";
//Iniciar o Servidor: json-server --watch --host 192.168.0.2 db.json

const api = axios.create({
    baseURL: 'https://api.github.com'
});

export default api;