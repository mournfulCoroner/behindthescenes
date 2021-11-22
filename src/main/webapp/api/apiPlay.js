import * as axios from 'axios';

export const apiPlay = {
    createPlay(authorization, play) {
        return axios.post('/api/plays', JSON.stringify(play), {
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": authorization
            }
        }).then(responce => responce.data)
    },
    deletePlay(authorization, ids) {
        return axios.post(`/api/plays/delete`, JSON.stringify(ids), {
            headers:
                { "Authorization": authorization,
                "Content-Type": "application/json" }
        }).then(responce => responce.data)
    },
    findPlaysThisMonth() {
        return axios.post("/api/plays/month", JSON.stringify({ "date": Date.now() }), {
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(responce => responce.data)
    },
    findPlaysBeforeThisMonth() {
        return axios.post("/api/plays/before", JSON.stringify({ "date": Date.now() }), {
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(responce => responce.data)
    },
    findPlaysAfterThisMonth() {
        return axios.post("/api/plays/after", JSON.stringify({ "date": Date.now() }), {
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(responce => responce.data)
    },
    findPlay(id) {
        return axios.get(`/api/plays/${id}`).then(responce => responce.data)
    }
}