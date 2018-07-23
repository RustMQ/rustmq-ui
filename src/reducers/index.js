import { combineReducers } from "redux";
import { REQUEST_QUEUES } from "../actions";

const initialState = {
    queues: [],
    isFetching: true
};

const queues = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_QUEUES:
            const queues = action.queues;

            return {
                queues,
                isFetching: !action.isFetching
            };
        default:
            return state
    }
}

const rootReducer = combineReducers({
    queuesApp: queues
});

export default rootReducer;
