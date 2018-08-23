import { FETCH_MESSAGES_SUCCESS, DELETE_MESSAGE_SUCCESS } from "../actions";
import { removeFromArray } from "../utils/removeFromArray";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_MESSAGES_SUCCESS:
            const messages = action.messages.map(m => {
                return { ...m, queueName: action.queueName }
            });

            return messages;

        case DELETE_MESSAGE_SUCCESS:
            const updatedMessages = removeFromArray(state, action.messageId);

            return updatedMessages

        default:
            return state
    }
}
