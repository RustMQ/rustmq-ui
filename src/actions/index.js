import { serialAsyncMap } from '../utils/serialAsyncMap';
import { API_ROOT } from '../middleware/api';

export const REQUEST_QUEUE = 'REQUEST_QUEUE';
export const ADD_QUEUE = 'ADD_QUEUE';
export const DELETE_QUEUE = 'DELETE_QUEUE';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';

export const FETCH_QUEUES_REQUEST = 'FETCH_QUEUES_REQUEST';
export const FETCH_QUEUES_SUCCESS = 'FETCH_QUEUES_SUCCESS';
export const FETCH_QUEUES_FAILURE = 'FETCH_QUEUES_FAILURE';

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

const requestQueue = (queue) => ({
    type: REQUEST_QUEUE,
    queue,
    isFetching: true
});

export const loadQueue = (queueName) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${queueName}`;
    try {
        const queue = await getQueue(fullUrl);

        return dispatch(requestQueue(queue));
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

async function getQueue(request_queue_uri) {
    const response = await fetch(request_queue_uri);
    const json = await response.json();
    return json.queue;
}

const addQueue = (queue) => ({
    type: ADD_QUEUE,
    queue,
    isFetching: true
});

export const addNewQueue = (newQueue) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${newQueue.name}`;
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

        return dispatch(addQueue(queue));
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

export const deleteQueue = (queueName) => ({
    type: DELETE_QUEUE,
    queueName,
    deleted: true,
    toHome: true
});

export const removeQueue = (queueName) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${queueName}`;
    try {
        await fetch(fullUrl, {
            method: "DELETE"
        });

        return dispatch(deleteQueue(queueName));
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
