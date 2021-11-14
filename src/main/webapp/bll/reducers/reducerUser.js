import apiUser from "../../api/apiUser";
import {loginActionCreators} from "./reducerLogin";

const initialState = {
    authorization: "",
    nickname: "",
    loginError: "",
    registrationError: ""
};

const LOGIN = "LOGIN";
const LOGIN_ERROR = "LOGIN_ERROR";
const REGISTRATION_ERROR = "REGISTRATION_ERROR";

const reducerUser = (state=initialState, action) => {
    switch (action.type) {
        case REGISTRATION_ERROR:
            return {
                ...state,
                registrationError: action.registrationError
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.loginError
            }
        case LOGIN:
            return {
                ...state,
                authorization: action.authorization,
                nickname: action.nickname,
                avatar: action.avatar
            }
        default: {
            return state;
        }
    }
}

export default reducerUser;

export const userActionCreator = {
    changeLoginError (loginError) {
        return {
            type: LOGIN_ERROR,
            loginError
        }
    },
    changeRegistrationError (registrationError) {
        return {
            type: REGISTRATION_ERROR,
            registrationError
        }
    },
    login(authorization, nickname, avatar) {
        return {
            type: LOGIN,
            authorization,
            nickname,
            avatar
        }
    }
}

export const userGetters = {
    getLoginError(state) {
        return state.reducerUser.loginError;
    },
    getRegistrationError(state) {
        return state.reducerUser.registrationError;
    },
    getNickname(state) {
        return state.reducerUser.nickname;
    },

    getAuthorization(state) {
        return state.reducerUser.authorization;
    },

    getAvatar(state) {
        return state.reducerUser.avatar;
    }
}

export const userThunkCreators = {
    login(nickname, password) {
        return async (dispatch) => {
            try {
                const {authorization} = await apiUser.login(nickname, password);
                dispatch(userActionCreator.login(authorization, nickname));
                dispatch(loginActionCreators.close());
            } catch (e) {
                dispatch(userActionCreator.changeLoginError(e.message));
            }
        }
    },

    registration(nickname, password) {
        return async (dispatch) => {
            try {
                const {authorization} = await apiUser
                    .registration(nickname, password);
                dispatch(userActionCreator.login(authorization, nickname));
                dispatch(loginActionCreators.close());
            } catch (e) {
                dispatch(userActionCreator.changeRegistrationError(e.message));
            }
        }
    }
}
