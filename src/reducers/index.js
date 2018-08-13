import { removeFromArray } from "../utils/removeFromArray";
import { combineReducers } from "redux";
import {
    SHOW_MODAL,
    HIDE_MODAL,
    FETCH_QUEUES_REQUEST,
    FETCH_QUEUES_SUCCESS,
    FETCH_QUEUES_FAILURE,
    FETCH_QUEUE_REQUEST,
    FETCH_QUEUE_SUCCESS,
    FETCH_QUEUE_FAILURE,
    ADD_QUEUE_SUCCESS,
    ADD_QUEUE_FAILURE,
    DELETE_QUEUE_REQUEST,
    DELETE_QUEUE_SUCCESS,
    DELETE_QUEUE_FAILURE,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_FAILURE,
    DELETE_MESSAGE_SUCCESS,
    UPDATE_SUBSCRIBER_MODAL_PROPS,
    CREATE_QUEUE_CONFIG,
    UPDATE_QUEUE_CONFIG

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

            return Object.assign({}, state, { queues, isFetching: action.isFetching, toHome: action.toHome });
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
        case ADD_QUEUE_SUCCESS:
            queue = action.queue;
            updatedQueues = new Map(state.queues);
            updatedQueues.set(queue.name, queue);

            return Object.assign({}, state, { queues: updatedQueues, isFetching: action.isFetching });
        case ADD_QUEUE_FAILURE:
            return Object.assign({}, state, { isFetching: action.isFetching });
        case DELETE_QUEUE_REQUEST:
            return Object.assign({}, state, { deleted: action.deleted, toHome: action.toHome });
        case DELETE_QUEUE_SUCCESS:
            const queueName = action.queueName;
            updatedQueues = new Map(state.queues);
            updatedQueues.delete(queueName);

            return Object.assign({}, state, { queues: updatedQueues, deleted: action.deleted, toHome: action.toHome });
        case DELETE_QUEUE_FAILURE:
            return Object.assign({}, state, { deleted: action.deleted, toHome: action.toHome });
        case FETCH_MESSAGES_REQUEST:
            return Object.assign({}, state, { isFetching: action.isFetching });
        case FETCH_MESSAGES_SUCCESS:
            const messages = action.messages.map(m => {
                return { ...m, queueName: action.queueName }
            });
            return Object.assign({}, state, { messages: messages, isFetching: action.isFetching });
        case FETCH_MESSAGES_FAILURE:
            return Object.assign({}, state, { isFetching: action.isFetching });
        case DELETE_MESSAGE_SUCCESS:
            const updatedMessages = removeFromArray(state.messages, action.messageId);
            return Object.assign({}, state, { messages: updatedMessages });
        case SHOW_MODAL:
            switch (action.modalType) {
                case 'UPDATE_SUBSCRIBER':
                    const { subscriber } = action.modalProps;
                    const headers = [];
                    Object.keys(subscriber.headers).forEach((key) => {
                        headers.push({ key, value: subscriber.headers[key] })
                    });
                    const updatedProps = { ...action.modalProps, subscriber: { ...subscriber, headers: headers } };
                    return Object.assign({}, state, { modalIsOpen: true, modalType: action.modalType, modalProps: updatedProps });
                default:
                    return Object.assign({}, state, { modalIsOpen: true, modalType: action.modalType, modalProps: action.modalProps });
            }
        case HIDE_MODAL: {
            return Object.assign({}, state, { modalIsOpen: false, modalType: null, modalProps: {} });
        }
        case UPDATE_SUBSCRIBER_MODAL_PROPS:
            return Object.assign({}, state, { modalProps: { ...state.modalProps, subscriber: action.subscriber } });
        case CREATE_QUEUE_CONFIG:
            return Object.assign({}, state, { queueCreationProps: action.queueCreationProps });
        case UPDATE_QUEUE_CONFIG:
            return Object.assign({}, state, { queueCreationProps: { ...action.queueCreationProps } });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    appStore
});

export default rootReducer;
