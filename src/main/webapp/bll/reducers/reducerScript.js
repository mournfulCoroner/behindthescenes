import { apiScript } from "../../api/apiScript";

const SET_SCRIPTS = "SET_SCRIPTS";
const SET_REPLICS = "SET_REPLICS";
const SET_SCRIPT = "SET_SCRIPT";

let initialState = {
    scripts: [],
    replics: [],
    script: {
        "rolesByIdScript": []
    }
};

const reducerScript = (state = initialState, action) => {
    switch(action.type) {
        case SET_SCRIPTS:
            return {
                ...state,
                scripts: action.scripts
            }
        case SET_REPLICS:
            return {
                ...state,
                replics: action.replics
            }
        case SET_SCRIPT:
            return {
                ...state,
                script: action.script
            }
        default:
            return state;
    }
}

export const scriptGetters = {
    getScripts(state){
        return state.reducerScript.scripts;
    },
    getReplics(state){
        return state.reducerScript.replics;
    },
    getScript(state){
        return state.reducerScript.script;
    }
}

const setScripts = (scripts) => ({type: SET_SCRIPTS, scripts});
const setReplics = (replics) => ({type: SET_REPLICS, replics});
const setScript = (script) => ({type: SET_SCRIPT, script});


export const getScripts = () => async (dispatch) => {
    dispatch(setScripts(await apiScript.getScripts()))
}
export const getReplics = (id) => async (dispatch) => {
    let replics = await apiScript.getReplics(id);
    dispatch(setReplics(replics ? replics : []));
}
export const getScript = (id) => async (dispatch) => {
    dispatch(setScript(await apiScript.getScript(id)))
}


export default reducerScript;

