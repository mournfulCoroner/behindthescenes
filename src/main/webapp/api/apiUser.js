const apiUser = {
    async login(nickname, password) {
        const response = await fetch("/users/my_login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nickname, password})
        });

        if (!response.ok) {
            throw Error("Неправильный логин или пароль");
        }

        let result = await response.json();
        localStorage.setItem(nickname, result.authorization);
        return result;
    },

    async registration(nickname, password) {
        const response = await fetch("/users/registration", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nickname, password})
        });

        if (!response.ok) {
            throw Error("Пользователь с таким ником уже есть");
        }

        return await response.json();
    }
}

export default apiUser;
