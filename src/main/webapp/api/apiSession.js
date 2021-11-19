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
    deleteSession(authorization, id) {
        return axios.delete(`/api/sessions/${id}`, {
            headers:
                { "Authorization": authorization }
        }).then(responce => responce.data)
    },
    findSessionsThisMonth(date) {
        return axios.get("/api/sessions/month", date
        ).then(responce => responce.data)
    },
    findSessionsThisDate(date) {
        return axios.get("/api/sessions/date", date
        ).then(responce => responce.data)
    }
}