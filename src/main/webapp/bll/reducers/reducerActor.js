import { apiActor } from "../../api/apiActor";

const SET_ACTORS = "SET_ACTORS";
const ADD_ACTOR = "ADD_ACTOR";
const UPDATE_ACTOR = "UPDATE_ACTOR";
const SET_ACTOR_ROLES = "SET_ACTOR_ROLES";
const REMOVE_ACTOR = "REMOVE_ACTOR";
const CLEAN_ROLES = "CLEAN_ROLES";
const SET_ACTOR = "SET_ACTOR";
const ADD_ROLE = "ADD_ROLE";
const REMOVE_ROLE = "REMOVE_ROLE"

let initialState = {
    actors: [],
    actorRoles: [],
    actor: null
};

const reducerActor = (state = initialState, action) => {
    switch(action.type) {
        case SET_ACTORS:
            return {
                ...state,
                actors: action.actors
            }
        case ADD_ACTOR:
            return {
                ...state,
                actors: [...state.actors, action.actor]
            }
        case UPDATE_ACTOR:
            return {
                ...state,
                actors: state.actors.map((actor) => {
                    if(actor.idActor == action.id){
                        actor.name = action.name;
                    }
                    return actor;
                }),
                actor: {...state.actor, name: action.name}
            }
        case SET_ACTOR_ROLES:
            return {
                ...state,
                actorRoles: action.actorRoles
            }
        case REMOVE_ACTOR:
            return {
                ...state,
                actors: state.actors.filter((actor) => actor.idActor != action.id)
            }
        case CLEAN_ROLES:
            return {
                ...state,
                actorRoles: []
            }
        case SET_ACTOR:
            return {
                ...state,
                actor: action.actor
            }
        case ADD_ROLE:
            return {
                ...state,
                actorRoles: [...state.actorRoles, action.role]
            }
        case REMOVE_ROLE:
            return {
                ...state,
                actorRoles: state.actorRoles.filter((role) => role.idRole != action.roleId)
            }
        default:
            return state;
    }
}

export const actorGetters = {
    getActors(state){
        return state.reducerActor.actors;
    },
    getRoles(state){
        return state.reducerActor.actorRoles;
    },
    getActor(state){
        return state.reducerActor.actor;
    }
}

const setActors = (actors) => ({type: SET_ACTORS, actors});
const addActor = (actor) => ({type: ADD_ACTOR, actor});
const updateActor = (id, name) => ({type: UPDATE_ACTOR, id, name});
const setRoles = (actorRoles) => ({type: SET_ACTOR_ROLES, actorRoles});
const removeActor = (id) => ({type: REMOVE_ACTOR, id})
const cleanRoles = () => ({type: CLEAN_ROLES })
const setActor = (actor) => ({type: SET_ACTOR, actor}) 
const addRole = (role) => ({type: ADD_ROLE, role})
const removeRole = (roleId) => ({type: REMOVE_ROLE, roleId})


export const getActors = () => async (dispatch) => {
    dispatch(setActors(await apiActor.getActors()))
}
export const createActor = (authorization, name) => async (dispatch) => {
    dispatch(addActor(await apiActor.createActor(authorization, name)));
} 
export const changeActor = (authorization, id, name) => async (dispatch) => {
    await apiActor.updateActor(authorization, id, name)
    dispatch(updateActor(id, name))
}
export const getRoles = (id) => async (dispatch) => {
    let roles = await apiActor.getActorRoles(id)
    dispatch(setRoles(roles ? roles : []));
}
export const deleteActor = (authorization, id) => async (dispatch) => {
    await apiActor.deleteActor(authorization, id)
    dispatch(removeActor(id));
}
export const removeRoles = () => (dispatch) => {
    dispatch(cleanRoles());
}
export const getActor = (actorId) => async (dispatch) => {
    dispatch(setActor(await apiActor.getActor(actorId)))
}
export const createRole = (authorization, actorId, roleId) => async (dispatch) => {
    let role = await apiActor.addRole(authorization, actorId, roleId);
    dispatch(addRole(role))
}
export const deleteRole = (authorization, actorId, roleId) => async (dispatch) => {
    await apiActor.removeRole(authorization, actorId, roleId);
    dispatch(removeRole(roleId));
}


export default reducerActor;

