import { apiPlay } from "../../api/apiPlay";

const SET_PLAYS = "SET_PLAYS";
const ADD_PLAY = "ADD_PLAY";
const REMOVE_PLAY = "REMOVE_PLAY";
const CLEAN_PLAYS = "CLEAN_PLAYS";

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
        case CLEAN_PLAYS:{
            return {
                ...state,
                plays: []
            }
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
const removePlay = (id) => ({type: REMOVE_PLAY, id});
const cleanPlays = () => ({type: CLEAN_PLAYS});


export const getPlaysThisMonth = () => async (dispatch) => {
    dispatch(cleanPlays());
    dispatch(setPlays(await apiPlay.findPlaysThisMonth()));
}
export const getPlaysBeforeThisMonth = () => async (dispatch) => {
    dispatch(cleanPlays());
    dispatch(setPlays(await apiPlay.findPlaysBeforeThisMonth()))
}
export const getPlaysAfterThisMonth = () => async (dispatch) => {
    dispatch(cleanPlays());
    dispatch(setPlays(await apiPlay.findPlaysAfterThisMonth()))
}
export const createPlay = (authorization, name) => async (dispatch) => {
    dispatch(addPlay(await apiPlay.createPlay(authorization, name)));
} 
export const deletePlay = (authorization, id) => async (dispatch) => {
    await apiPlay.deletePlay(authorization, id)
    dispatch(removePlay(id));
}

export default reducerPlay;
