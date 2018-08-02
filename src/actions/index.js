import { serialAsyncMap } from '../utils/serialAsyncMap';
import { API_ROOT } from '../middleware/api';

export const FETCH_QUEUES_REQUEST = 'FETCH_QUEUES_REQUEST';
export const FETCH_QUEUES_SUCCESS = 'FETCH_QUEUES_SUCCESS';
export const FETCH_QUEUES_FAILURE = 'FETCH_QUEUES_FAILURE';
export const FETCH_QUEUE_REQUEST = 'FETCH_QUEUE_REQUEST';
export const FETCH_QUEUE_SUCCESS = 'FETCH_QUEUE_SUCCESS';
export const FETCH_QUEUE_FAILURE = 'FETCH_QUEUE_FAILURE';
export const ADD_QUEUE_REQUEST = 'ADD_QUEUE_REQUEST';
export const ADD_QUEUE_SUCCESS = 'ADD_QUEUE_SUCCESS';
export const ADD_QUEUE_FAILURE = 'ADD_QUEUE_FAILURE';
export const DELETE_QUEUE_REQUEST = 'DELETE_QUEUE_REQUEST';
export const DELETE_QUEUE_SUCCESS = 'DELETE_QUEUE_SUCCESS';
export const DELETE_QUEUE_FAILURE = 'DELETE_QUEUE_FAILURE';
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';
export const DELETE_MESSAGE_REQUEST = 'DELETE_MESSAGE_REQUEST';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_FAILURE = 'DELETE_MESSAGE_FAILURE';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

const fetchQueuesRequest = () => ({
    type: FETCH_QUEUES_REQUEST,
    isFetching: true
});

const fetchQueuesSuccess = (queues) => ({
    type: FETCH_QUEUES_SUCCESS,
    queues: queues,
    isFetching: false
});

const fetchQueuesFailure = (error) => ({
    type: FETCH_QUEUES_FAILURE,
    error: error,
    isFetching: false
});

export const loadQueues = () => async (dispatch) => {
    // fetch
    dispatch(fetchQueuesRequest());
    const fullUrl = API_ROOT + 'queues';
    try {
        const response = await fetch(fullUrl);
        const json = await response.json();
        const queues = await serialAsyncMap(json.queues, async (item) => {
            const request_queue_uri = fullUrl + `/${item.name}`;
            return await getQueue(request_queue_uri);
        });

        return dispatch(
            fetchQueuesSuccess(queues)
        )
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(fetchQueuesFailure(err))
    }
};

const fetchQueueRequest = (queueName) => ({
    type: FETCH_QUEUE_REQUEST,
    queueName,
    isFetching: true
});

const fetchQueueSuccess = (queue) => ({
    type: FETCH_QUEUE_SUCCESS,
    queue: queue,
    isFetching: false
});

const fetchQueueFailure = (error) => ({
    type: FETCH_QUEUE_FAILURE,
    error: error,
    isFetching: false
});

export const loadQueue = (queueName) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${queueName}`;
    dispatch(fetchQueueRequest());
    try {
        const queue = await getQueue(fullUrl);

        return dispatch(fetchQueueSuccess(queue));
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(fetchQueueFailure(err));
    }
}

async function getQueue(request_queue_uri) {
    const response = await fetch(request_queue_uri);
    const json = await response.json();
    return json.queue;
}

const addQueueRequest = () => ({
    type: ADD_QUEUE_REQUEST,
    isFetching: true
});

const addQueueSuccess = (queue) => ({
    type: ADD_QUEUE_SUCCESS,
    queue: queue,
    isFetching: false
});

const addQueueFailure = (error) => ({
    type: ADD_QUEUE_FAILURE,
    error: error,
    isFetching: false
});

export const addNewQueue = (newQueue) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${newQueue.name}`;
    dispatch(addQueueRequest());
    const body = {
        queue: newQueue
    };
    try {
        const response = await fetch(fullUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(body)
        });

        const json = await response.json();
        const queue = json.queue;

        return dispatch(addQueueSuccess(queue));
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(addQueueFailure(err));
    }
}

export const deleteQueueRequest = (queueName) => ({
    type: DELETE_QUEUE_REQUEST,
    queueName,
    deleted: false,
    toHome: false
});

export const deleteQueueSuccess = (queueName) => ({
    type: DELETE_QUEUE_SUCCESS,
    queueName,
    deleted: true,
    toHome: true
});

export const deleteQueueFailure = (error) => ({
    type: DELETE_QUEUE_FAILURE,
    error: error,
    deleted: false,
    toHome: true
});

export const removeQueue = (queueName) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${queueName}`;
    dispatch(deleteQueueRequest(queueName));
    try {
        await fetch(fullUrl, {
            method: "DELETE"
        });

        return dispatch(deleteQueueSuccess(queueName));
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(deleteQueueFailure(err));
    }
}

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
        })

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

export const showPostMessageModal = (queueName) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: 'POST_MESSAGE',
        modalProps: {
            queueName
        }
    });
};

export const showNewQueueModal = () => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: 'NEW_QUEUE',
        modalProps: {}
    });
}

export const hideModal = () => (dispatch) => {
    return dispatch({
        type: HIDE_MODAL
    });
};

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
        return dispatch(deleteMessageSucess(queueName, messageId));
    } catch(err) {
        console.log('Error: ', err);
        return dispatch(deleteMessageFailure(err));
    }
};
