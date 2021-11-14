import * as axios from 'axios';

export const apiActor = {
    getActors() {
        return axios.get('/actors').then(responce => responce.data)
    },
    searchActor(name) {
        return axios.get(`/actors/${name}`).then(responce => responce.data)
    },
    createActor(name, authorization) {
        return axios.post('/actors', JSON.stringify(name), {
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": authorization
            }
        }).then(responce => responce.json())
    },
    deleteActor(id, authorization) {
        return axios.delete(`/actors/${id}`, {
            headers:
                { "Authorization": authorization }
        }.then(responce => responce.json()))
    },
    getActorRoles(id) {
        return axios.get(`/actors/${id}/roles`).then(responce => responce.data);
    }
}