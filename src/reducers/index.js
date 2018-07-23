import { combineReducers } from "redux";
import { REQUEST_QUEUES, REQUEST_QUEUE } from "../actions";

const initialState = {
    queues: new Map(),
    isFetching: true
};

const appStore = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_QUEUES:
            const queues = new Map();
            action.queues.forEach(element => {
                queues.set(element.name, element);
            });

            return Object.assign({}, state, { queues, isFetching: !action.isFetching });
        case REQUEST_QUEUE:
            const queue = action.queue;

            const prevValue = state.queues.get(queue.name);
            const nextValue = Object.assign({}, prevValue, queue);

            const updatedQueues = new Map(state.queues);
            updatedQueues.set(queue.name, nextValue);

            return Object.assign({}, state, { queues: updatedQueues, isFetching: !action.isFetching });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    appStore
});

export default rootReducer;
