import * as axios from 'axios';

export const apiSession = {
    createSession(authorization, session) {
        return axios.post('/api/sessions', JSON.stringify(session), {
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": authorization
            }
        }).then(responce => responce.data)
    },
    deleteSession(authorization, ids) {
        return axios.post(`/api/sessions/delete`, JSON.stringify(ids), {
            headers:
                { "Authorization": authorization,
                "Content-Type": "application/json" }
        }).then(responce => responce.data)
    },
    findSessionsThisMonth() {
        return axios.post("/api/sessions/month", JSON.stringify({ "date": Date.now() }), {
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(responce => responce.data)
    },
    findSessionsThisDate(date) {
        return axios.post("/api/sessions/date", JSON.stringify({ "date": date.getTime() }), {
            headers:
            {
                "Content-Type": "application/json"
            }
        }
        ).then(responce => responce.data)
    }
}