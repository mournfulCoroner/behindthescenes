import * as axios from 'axios';

export const apiActor = {
    getActors() {
        return axios.get('/actors').then(responce => responce.data)
    },
    searchActor(name) {
        return axios.get(`/api/actors/${name}`).then(responce => responce.data)
    },
    createActor(name, authorization) {
        return axios.post('/api/actors', JSON.stringify(name), {
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": authorization
            }
        }).then(responce => responce.json())
    },
    deleteActor(id, authorization) {
        return axios.delete(`/api/actors/${id}`, {
            headers:
                { "Authorization": authorization }
        }.then(responce => responce.json()))
    }
}