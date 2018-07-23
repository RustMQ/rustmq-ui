import { combineReducers } from "redux";
import { REQUEST_QUEUES, REQUEST_QUEUE } from "../actions";

const initialState = {
    queues: [],
    isFetching: true
};

const appStore = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_QUEUES:
            const queues = action.queues;
            return Object.assign({}, state, { queues, isFetching: !action.isFetching });
        case REQUEST_QUEUE:
            const queue = action.queue;
            const updatedQueues = state.queues.map( item => {
                if (item.name === queue.name) {
                    return {...item, ...queue};
                }

                return item;
            });
            return Object.assign({}, state, { queues: updatedQueues, isFetching: !action.isFetching });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    appStore
});

export default rootReducer;
