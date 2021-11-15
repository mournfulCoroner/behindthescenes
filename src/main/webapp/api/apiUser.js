import * as axios from 'axios';

const apiUser = {
    async login(nickname, password) {
        const response = await fetch("/users/my_login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nickname, password })
        });

        if (!response.ok) {
            throw Error("Неправильный логин или пароль");
        }

        let result = await response.json();
        localStorage.setItem("token", result.authorization);
        return result;
    },

    async registration(nickname, password) {
        const response = await fetch("/users/registration", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nickname, password })
        });

        if (!response.ok) {
            throw Error("Пользователь с таким ником уже есть");
        }

        let result = await response.json();
        localStorage.setItem("token", result.authorization);
        return result;
    },

    getNickname(authorization) {
        return axios.get("/users/nickname", {
            headers:
            {
                "Authorization": authorization
            }
        }).then(responce => responce.data)
    },
}

export default apiUser;
