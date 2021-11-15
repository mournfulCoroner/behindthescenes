import * as axios from "axios";

const apiScript = {
    getScripts() {
        return axios.get('/api/scripts').then(responce => responce.data)
    },

}