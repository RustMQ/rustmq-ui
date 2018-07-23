import { combineReducers } from "redux";
import { REQUEST_QUEUES, REQUEST_QUEUE } from "../actions";

const queuesAppInitialState = {
    queues: [],
    isFetching: true
};

const queues = (state = queuesAppInitialState, action) => {
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

const queueInitialState = {
    queue: {},
    isFetching: true
}

const queue = (state = queueInitialState, action) => {
    switch(action.type) {
        case REQUEST_QUEUE:
            const queue = action.queue;
            return Object.assign({}, queue, {isFetching: !action.isFetching});
        default:
            return state
    }
}

const rootReducer = combineReducers({
    queuesApp: queues,
    queue
});

export default rootReducer;
