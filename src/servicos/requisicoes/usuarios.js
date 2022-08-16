import api from "../api";
//Iniciar o Servidor: json-server --watch --host 192.168.0.2 db.json;

export async function buscaUsuario(nomeUsuario) {
    try {
        const resultado = await api.get(`users?login=${nomeUsuario}`);
        return resultado.data[0];
    } catch (error) {
        console.log(error);
        return {}
    }
}