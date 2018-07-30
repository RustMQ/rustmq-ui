import { combineReducers } from "redux";
import { REQUEST_QUEUES, REQUEST_QUEUE, ADD_QUEUE, DELETE_QUEUE, SHOW_MODAL, HIDE_MODAL, REQUEST_MESSAGES } from "../actions";

const initialState = {
    queues: new Map(),
    messages: [],
    isFetching: true
};

const appStore = (state = initialState, action) => {
    let queue, updatedQueues;
    switch (action.type) {
        case REQUEST_QUEUES:
            const queues = new Map();
            action.queues.forEach(element => {
                queues.set(element.name, element);
            });

            return Object.assign({}, state, { queues, isFetching: !action.isFetching });
        case REQUEST_QUEUE:
            queue = action.queue;

            const prevValue = state.queues.get(queue.name);
            const nextValue = Object.assign({}, prevValue, queue);

            updatedQueues = new Map(state.queues);
            updatedQueues.set(queue.name, nextValue);

            return Object.assign({}, state, { queues: updatedQueues, isFetching: !action.isFetching });
        case ADD_QUEUE:
            queue = action.queue;
            updatedQueues = new Map(state.queues);
            updatedQueues.set(queue.name, queue);

            return Object.assign({}, state, { queues: updatedQueues, isFetching: !action.isFetching });
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
