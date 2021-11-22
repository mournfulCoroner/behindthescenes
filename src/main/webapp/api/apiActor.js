import * as axios from 'axios';

export const apiActor = {
    getActors() {
        return axios.get('/api/actors').then(responce => responce.data)
    },
    searchActor(name) {
        return axios.get(`/api/actors/${name}`).then(responce => responce.data)
    },
    createActor(authorization, name) {
        return axios.post('/api/actors', JSON.stringify({ name }), {
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": authorization
            }
        }).then(responce => responce.data)
    },
    deleteActor(authorization, id) {
        return axios.delete(`/api/actors/${id}`, {
            headers:
                { "Authorization": authorization }
        }).then(responce => responce.data)
    },
    updateActor(authorization, id, name) {
        return axios.put(`/api/actors/${id}`, name , {
            headers:
            {
                "Content-Type": "text/plain",
                "Authorization": authorization
            }
        }).then(responce => responce.data)
    },
    getActorRoles(id) {
        return axios.get(`/api/actors/${id}/roles`).then(responce => responce.data);
    },
    getActor(id) {
        return axios.get(`/api/actors/${id}`).then(responce => responce.data);
    },
    addRole(authorization, actorId, roleId) {
        return axios.post("/api/actors/roles", JSON.stringify({ actorIdActor: actorId, roleIdRole: roleId }), {
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": authorization
            }
        }).then(responce => responce.data)
    },
    removeRole(authorization, actorId, roleId) {
        return axios.delete(`/api/actors/${actorId}/roles/${roleId}`, {
            headers:
                { "Authorization": authorization }
        })
    }
}