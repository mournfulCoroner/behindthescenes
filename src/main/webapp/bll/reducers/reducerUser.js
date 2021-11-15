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
const LOGOUT = "LOGOUT";

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
                nickname: action.nickname
            }
        case LOGOUT:
            return {
                ...state,
                authorization: "",
                nickname: ""
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
    login(authorization, nickname) {
        return {
            type: LOGIN,
            authorization,
            nickname
        }
    },
    logout(){
        return {
            type: LOGOUT
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
    },

    getNickname(authorization) {
        return async (dispatch) => {
            dispatch(userActionCreator.login(authorization, await apiUser.getNickname(authorization)))
        }
    },

    logout() {
        return (dispatch) => {
            dispatch(userActionCreator.logout());
            localStorage.removeItem("token");
        }
    }
}
