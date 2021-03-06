import { apiPlay } from "../../api/apiPlay";

const SET_PLAYS = "SET_PLAYS";
const ADD_PLAY = "ADD_PLAY";
const REMOVE_PLAY = "REMOVE_PLAY";
const CLEAN_PLAYS = "CLEAN_PLAYS";
const SET_PLAY = "SET_PLAY";

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
                plays: state.plays.filter((play) => !action.ids.find((id) => id == play.idPlay))
            }
        case CLEAN_PLAYS:{
            return {
                ...state,
                plays: []
            }
        }
        case SET_PLAY:
            return {
                ...state,
                play: action.play
            }
        default:
            return state;
    }
}

export const playGetters = {
    getPlays(state){
        return state.reducerPlay.plays;
    },
    getPlay(state){
        return state.reducerPlay.play;
    }
}

const setPlays = (plays) => ({type: SET_PLAYS, plays});
const addPlay = (play) => ({type: ADD_PLAY, play});
const removePlay = (ids) => ({type: REMOVE_PLAY, ids});
const cleanPlays = () => ({type: CLEAN_PLAYS});
const setPlay = (play) => ({type: SET_PLAY, play});


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
export const createPlay = (authorization, premierDate, endDate, idScript) => async (dispatch) => {
    dispatch(addPlay(await apiPlay.createPlay(authorization, {premierDate, endDate, idScript})));
} 
export const deletePlay = (authorization, ids) => async (dispatch) => {
    await apiPlay.deletePlay(authorization, ids)
    dispatch(removePlay(ids));
}
export const getPlay = (ids) => async (dispatch) => {
    dispatch(setPlay(await apiPlay.findPlay(ids)));
}

export default reducerPlay;

