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
    deletePlay(authorization, id) {
        return axios.delete(`/api/plays/${id}`, {
            headers:
                { "Authorization": authorization }
        }).then(responce => responce.data)
    },
    findPlaysThisMonth(date) {
        return axios.get("/api/plays/month", date).then(responce => responce.data)
    },
    findPlaysBefortThisMonth(date) {
        return axios.get("/api/plays/before", date).then(responce => responce.data)
    },
    findPlaysAfterThisMonth(date) {
        return axios.get("/api/plays/after", date).then(responce => responce.data)
    }
}