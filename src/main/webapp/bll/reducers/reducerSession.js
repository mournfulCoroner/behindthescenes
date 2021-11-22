import { apiSession } from "../../api/apiSession";

const SET_SESSIONS = "SET_SESSIONS";
const REMOVE_SESSION = "REMOVE_SESSION";
const ADD_PLAY_SESSION = "ADD_PLAY_SESSION";
const REMOVE_PLAY_SESSION = "REMOVE_PLAY_SESSION";
const SET_PLAY_SESSIONS = "SET_PLAYSESSIONS";

let initialState = {
    sessions: [],
    session: null,
    playSessions: []
};

const reducerSession = (state = initialState, action) => {
    switch(action.type) {
        case SET_SESSIONS:
            return {
                ...state,
                sessions: action.sessions
            }
        case REMOVE_SESSION:
            return {
                ...state,
                sessions: state.sessions.filter((session) => session.idSession != action.id)
            }
        case SET_PLAY_SESSIONS:
            return {
                ...state,
                playSessions: action.sessions
            }
        case ADD_PLAY_SESSION:
            return {
                ...state,
                playSessions: [...state.playSessions, action.session]
            }
        case REMOVE_PLAY_SESSION:
            return {
                ...state,
                playSessions: state.playSessions.filter((session) => session.idSession != action.id)
            }
        default:
            return state;
    }
}

export const sessionGetters = {
    getSessions(state){
        return state.reducerSession.sessions;
    },
    getPlaySessions(state){
        return state.reducerSession.playSessions;
    }
}

const setSessions = (sessions) => ({type: SET_SESSIONS, sessions});
const addSession = (session) => ({type: ADD_PLAY_SESSION, session});
const removeSession = (id) => ({type: REMOVE_SESSION, id});
const removePlaySession = (id) => ({ type: REMOVE_PLAY_SESSION, id });
const setPlaySessions = (sessions) => ({type: SET_PLAY_SESSIONS, sessions})


export const getSessionsThisMonth = () => async (dispatch) => {
    dispatch(setSessions(await apiSession.findSessionsThisMonth(new Date())))
}
export const getSessionsThisDate = (date) => async (dispatch) => {
    dispatch(setSessions(await apiSession.findSessionsThisDate(date)))
}
export const createSession = (authorization, date, hallNumber, idPlay) => async (dispatch) => {
    dispatch(addSession(await apiSession.createSession(authorization, {date, hallNumber, idPlay})));
} 
export const deleteSession = (authorization, id) => async (dispatch) => {
    await apiSession.deleteSession(authorization, id)
    dispatch(removeSession(id));
}
export const deletePlaySession = (authorization, id) => async (dispatch) => {
    await apiSession.deleteSession(authorization, id)
    dispatch(removePlaySession(id));
}
export const getPlaySessions = (sessions) => (dispatch) => {
    dispatch(setPlaySessions(sessions));
}

export default reducerSession;

