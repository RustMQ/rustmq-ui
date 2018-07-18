import { combineReducers } from "redux";

const entities = (state = { queues: {} }, action) => {
    if (action.response && action.response.entities) {
        return Object.assign({}, state, action.response.entities);
    }

    return state;
}

const rootReducer = combineReducers({
    entities,
});

export default rootReducer;
