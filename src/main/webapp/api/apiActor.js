import * as axios from 'axios';

export const apiActor = {
    getActors() {
        return axios.get('/api/actors').then(responce => responce.data)
    },
    searchActor(name) {
        return axios.get(`/api/actors/${name}`).then(responce => responce.data)
    },
    createActor(authorization, name) {
        return axios.post('/api/actors', JSON.stringify(name), {
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": authorization
            }
        }).then(responce => responce.json())
    },
    deleteActor(authorization, id) {
        return axios.delete(`/api/actors/${id}`, {
            headers:
                { "Authorization": authorization }
        }.then(responce => responce.json()))
    },
    updateActor(authorization, name) {
        return axios.put(`/api/actors/${id}`, JSON.stringify(name), {
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": authorization
            }
        }).then(responce => responce.json())
    },
    getActorRoles(id) {
        return axios.get(`/api/actors/${id}/roles`).then(responce => responce.data);
    }
}