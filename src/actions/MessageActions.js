import { API_ROOT } from '../middleware/api';
import { showNotification } from './NotificationActions';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';
export const DELETE_MESSAGE_REQUEST = 'DELETE_MESSAGE_REQUEST';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_FAILURE = 'DELETE_MESSAGE_FAILURE';

export const sendMessageRequest = (queueName, message) => ({
    type: SEND_MESSAGE_REQUEST,
    queueName,
    message
});

export const sendMessageSuccess = () => ({
    type: SEND_MESSAGE_SUCCESS
});

export const sendMessageFailure = (error) => ({
    type: SEND_MESSAGE_FAILURE,
    error: error
});

export const postMessage = (queueName, message) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${queueName}/messages`;
    const body = {
        messages: [
            message
        ]
    };

    dispatch(sendMessageRequest(queueName, message));
    try {
        await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(body)
        });
        dispatch(showNotification('success', 'Message was successfully added'));
        return dispatch(sendMessageSuccess());
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(sendMessageFailure());
    }
}

export const fetchMessagesRequest = (queueName) => ({
    type: FETCH_MESSAGES_REQUEST,
    queueName,
    isFetching: true
});

export const fetchMessagesSuccess = (queueName, messages) => ({
    type: FETCH_MESSAGES_SUCCESS,
    queueName,
    messages,
    isFetching: false
});

export const fetchMessagesFailure = (error) => ({
    type: FETCH_MESSAGES_FAILURE,
    error: error,
    isFetching: false
});

export const loadMessages = (queueName) => async (dispatch) => {
    // fetch
    const fullUrl = API_ROOT + `queues/${queueName}/messages?n=100`;
    dispatch(fetchMessagesRequest(queueName));
    try {
        const response = await fetch(fullUrl);
        const json = await response.json();
        return dispatch(fetchMessagesSuccess(queueName, json.messages))
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(fetchMessagesFailure(err));
    }
}

export const deleteMessageRequest = (queueName, messageId) => ({
    type: DELETE_MESSAGE_REQUEST,
    queueName,
    messageId
});

export const deleteMessageSucess = (queueName, messageId) => ({
    type: DELETE_MESSAGE_SUCCESS,
    queueName,
    messageId
});

export const deleteMessageFailure = (error) => ({
    type: DELETE_MESSAGE_FAILURE,
    error: error
});

export const deleteMessage = (queueName, messageId) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${queueName}/messages/${messageId}`;
    dispatch(deleteMessageRequest(queueName, messageId));
    try {
        await fetch(fullUrl, { method: 'DELETE', body: JSON.stringify({}) });
        dispatch(showNotification('success', 'Message was successfully deleted'));
        return dispatch(deleteMessageSucess(queueName, messageId));
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(deleteMessageFailure(err));
    }
};