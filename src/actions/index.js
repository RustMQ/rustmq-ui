import { serialAsyncMap } from '../utils/serialAsyncMap';
import { API_ROOT } from '../middleware/api';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';

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

const fetchQueueRequest = () => ({
    type: FETCH_QUEUE_REQUEST,
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

const sendMessage = (queueName, message) => ({
    type: SEND_MESSAGE,
    queueName,
    message
});

export const postMessage = (queueName, message) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${queueName}/messages`;
    const body = {
        messages: [
            message
        ]
    };
    
    try {
        await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(body)
        })

        return dispatch(sendMessage(queueName, message));
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(
            {
                type: 'FAILURE',
                error: {
                    data: err,
                    msg: 'Ooops!'
                }
            }
        )
    }
}

const requestMessages = (data) => ({
    type: REQUEST_MESSAGES,
    messages: data,
    isFetching: true
});

export const loadMessages = (queueName) => async (dispatch) => {
    // fetch
    const fullUrl = API_ROOT + `queues/${queueName}/messages?n=100`;
    try {
        const response = await fetch(fullUrl);
        const json = await response.json();
        
        return dispatch(
            requestMessages(json.messages)
        )
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(
            {
                type: 'FAILURE',
                error: {
                    data: err,
                    msg: 'Ooops!'
                }
            }
        )
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

export const hideModal = () => (dispatch) => {
    return dispatch({
        type: HIDE_MODAL
    });
};
