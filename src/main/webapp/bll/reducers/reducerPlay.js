import { apiPlay } from "../../api/apiPlay";

const SET_PLAYS = "SET_PLAYS";
const ADD_PLAY = "ADD_PLAY";
const REMOVE_PLAY = "REMOVE_PLAY";

let initialState = {
    plays: [],
    play: null
};

const reducerPlay = (state = initialState, action) => {
    switch(action.type) {
        case SET_PLAYS:
            return {
                ...state,
                plays: action.plays
            }
        case ADD_PLAY:
            return {
                ...state,
                plays: [...state.plays, action.play]
            }
        case REMOVE_PLAY:
            return {
                ...state,
                plays: state.plays.filter((play) => play.idPlay != action.id)
            }
        default:
            return state;
    }
}

export const playGetters = {
    getPlays(state){
        return state.reducerPlay.plays;
    }
}

const setPlays = (plays) => ({type: SET_PLAYS, plays});
const addPlay = (play) => ({type: ADD_PLAY, play});
const removePlay = (id) => ({type: REMOVE_PLAY, id})


export const getPlaysThisMonth = () => async (dispatch) => {
    dispatch(setPlays(await apiPlay.getPlaysThisMonth(new Date())))
}
export const getPlaysBeforeThisMonth = () => async (dispatch) => {
    dispatch(setPlays(await apiPlay.getPlaysBeforeThisMonth(new Date())))
}
export const getAfterThisMonth = () => async (dispatch) => {
    dispatch(setPlays(await apiPlay.getPlaysAfterThisMonth(new Date())))
}
export const createPlay = (authorization, name) => async (dispatch) => {
    dispatch(addPlay(await apiPlay.createPlay(authorization, name)));
} 
export const deletePlay = (authorization, id) => async (dispatch) => {
    await apiPlay.deletePlay(authorization, id)
    dispatch(removePlay(id));
}

export default reducerPlay;

