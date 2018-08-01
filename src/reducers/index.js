import { combineReducers } from "redux";
import {
    DELETE_QUEUE,
    SHOW_MODAL,
    HIDE_MODAL,
    REQUEST_MESSAGES,
    FETCH_QUEUES_REQUEST,
    FETCH_QUEUES_SUCCESS,
    FETCH_QUEUES_FAILURE,
    FETCH_QUEUE_REQUEST,
    FETCH_QUEUE_SUCCESS,
    FETCH_QUEUE_FAILURE,
    ADD_QUEUE_REQUEST,
    ADD_QUEUE_SUCCESS,
    ADD_QUEUE_FAILURE
} from "../actions";

const initialState = {
    queues: new Map(),
    messages: [],
    isFetching: true
};

const appStore = (state = initialState, action) => {
    let queue, updatedQueues, queues;
    switch (action.type) {
        case FETCH_QUEUES_REQUEST:
            return Object.assign({}, state, { isFetching: action.isFetching });
        case FETCH_QUEUES_SUCCESS:
            queues = new Map();
            action.queues.forEach(element => {
                queues.set(element.name, element);
            });

            return Object.assign({}, state, { queues, isFetching: action.isFetching });
        case FETCH_QUEUES_FAILURE:
            return Object.assign({}, state, { isFetching: action.isFetching });
        case FETCH_QUEUE_REQUEST:
            return Object.assign({}, state, { isFetching: action.isFetching });
        case FETCH_QUEUE_SUCCESS:
            queue = action.queue;

            const prevValue = state.queues.get(queue.name);
            const nextValue = Object.assign({}, prevValue, queue);

            updatedQueues = new Map(state.queues);
            updatedQueues.set(queue.name, nextValue);

            return Object.assign({}, state, { queues: updatedQueues, isFetching: action.isFetching });
        case FETCH_QUEUE_FAILURE:
            return Object.assign({}, state, { isFetching: action.isFetching });
        case ADD_QUEUE_REQUEST:
            return Object.assign({}, state, { isFetching: action.isFetching });
        case ADD_QUEUE_SUCCESS:
            queue = action.queue;
            updatedQueues = new Map(state.queues);
            updatedQueues.set(queue.name, queue);

            return Object.assign({}, state, { queues: updatedQueues, isFetching: action.isFetching });
        case ADD_QUEUE_FAILURE:
            return Object.assign({}, state, { isFetching: action.isFetching });
        case DELETE_QUEUE:
            const queueName = action.queueName;
            updatedQueues = new Map(state.queues);
            updatedQueues.delete(queueName);

            return Object.assign({}, state, { queues: updatedQueues, deleted: true, toHome: true });
        case SHOW_MODAL:
            return Object.assign({}, state, { modalType: action.modalType, modalProps: action.modalProps });

        case HIDE_MODAL: {
            return Object.assign({}, state, { modalType: null, modalProps: {} });
        }
        case REQUEST_MESSAGES:
            return Object.assign(
                {},
                state,
                { messages: action.messages }
            );
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    appStore
});

export default rootReducer;
