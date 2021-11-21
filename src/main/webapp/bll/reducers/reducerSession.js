import { apiSession } from "../../api/apiSession";

const SET_SESSIONS = "SET_SESSIONS";
const ADD_SESSION = "ADD_SESSION";
const REMOVE_SESSION = "REMOVE_SESSION";

let initialState = {
    sessions: [],
    session: null
};

const reducerSession = (state = initialState, action) => {
    switch(action.type) {
        case SET_SESSIONS:
            return {
                ...state,
                sessions: action.sessions
            }
        case ADD_SESSION:
            return {
                ...state,
                sessions: [...state.sessions, action.session]
            }
        case REMOVE_SESSION:
            return {
                ...state,
                sessions: state.sessions.filter((session) => session.idSession != action.id)
            }
        default:
            return state;
    }
}

export const sessionGetters = {
    getSessions(state){
        return state.reducerSession.sessions;
    }
}

const setSessions = (sessions) => ({type: SET_SESSIONS, sessions});
const addSession = (session) => ({type: ADD_SESSION, session});
const removeSession = (id) => ({type: REMOVE_SESSION, id})


export const getSessionsThisMonth = () => async (dispatch) => {
    dispatch(setSessions(await apiSession.findSessionsThisMonth(new Date())))
}
export const getSessionsThisDate = (date) => async (dispatch) => {
    dispatch(setSessions(await apiSession.findSessionsThisDate(date)))
}
export const createSession = (authorization, name) => async (dispatch) => {
    dispatch(addSession(await apiSession.createSession(authorization, name)));
} 
export const deleteSession = (authorization, id) => async (dispatch) => {
    await apiSession.deleteSession(authorization, id)
    dispatch(removeSession(id));
}

export default reducerSession;

