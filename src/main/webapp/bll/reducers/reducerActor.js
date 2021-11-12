import { apiActor } from "../../api/apiActor";

const SET_ACTORS = "SET_ACTORS";

let initialState = {
    actors: []
};

const reducerActor = (state = initialState, action) => {
    switch(action.type) {
        case SET_ACTORS:
            return {
                ...state,
                actors: action.actors
            }
        default:
            return state;
    }
}

export const actorGetters = {
    getActors(state){
        return state.reducerActor.actors;
    }
}

export const setActors = (actors) => ({type: SET_ACTORS, actors});

export const getActors = () => async (dispatch) => {
    dispatch(setActors(await apiActor.getActors()))
}

export default reducerActor;

