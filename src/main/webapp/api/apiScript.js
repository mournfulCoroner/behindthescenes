import * as axios from "axios";

export const apiScript = {
    getScripts() {
        return axios.get('/api/scripts').then(responce => responce.data)
    },
    getScriptReplics(scriptId){
        return axios.get(`/api/scripts/${scriptId}/replics`).then(responce => responce.data)
    },
    getScript(scriptId){
        return axios.get(`/api/scripts/${scriptId}`).then(responce => responce.data)
    }
}
