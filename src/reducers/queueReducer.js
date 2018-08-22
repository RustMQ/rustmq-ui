import { 
    FETCH_QUEUES_SUCCESS,
    FETCH_QUEUE_SUCCESS,
    DELETE_QUEUE_SUCCESS,
    ADD_QUEUE_SUCCESS
} from "../actions";

const initialState = new Map();

export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_QUEUES_SUCCESS:
            const queues = new Map();
            action.queues.forEach(element => {
                queues.set(element.name, element);
            });
            return queues

        case FETCH_QUEUE_SUCCESS:
            state.set(action.queue.name, action.queue);

            return state

        case DELETE_QUEUE_SUCCESS:
            const { queueName } = action;
            state.delete(queueName);

            return state

        case ADD_QUEUE_SUCCESS:
            state.set(action.queue.name, action.queue);

            return state

        default:
            return state
    }
}
