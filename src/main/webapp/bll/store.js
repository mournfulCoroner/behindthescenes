import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import reducerUser from "./reducers/reducerUser";
import reducerLogin from "./reducers/reducerLogin";
import reducerActor from "./reducers/reducerActor";
import reducerScript from "./reducers/reducerScript";

const reducer = combineReducers({
    reducerUser,
    reducerLogin,
    reducerActor,
    reducerScript
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;