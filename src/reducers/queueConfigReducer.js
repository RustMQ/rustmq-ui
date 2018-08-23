import { CREATE_QUEUE_CONFIG, UPDATE_QUEUE_CONFIG } from "../actions";

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {

        case CREATE_QUEUE_CONFIG:

            return action.queueCreationProps;

        case UPDATE_QUEUE_CONFIG:
            return Object.assign({}, state, { ...action.queueCreationProps } );

        default:
            return state
    }
}
