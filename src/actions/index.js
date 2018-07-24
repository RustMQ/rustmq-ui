import { serialAsyncMap } from '../utils/serialAsyncMap';
import { API_ROOT } from '../middleware/api';

export const REQUEST_QUEUES = 'REQUEST_QUEUES';
export const REQUEST_QUEUE = 'REQUEST_QUEUE';
export const ADD_QUEUE = 'ADD_QUEUE';

const requestQueues = (data) => ({
    type: REQUEST_QUEUES,
    queues: data,
    isFetching: true
});

export const loadQueues = () => async (dispatch) => {
    // fetch
    const fullUrl = API_ROOT + 'queues';
    try {
        const response = await fetch(fullUrl);
        const json = await response.json();
        const queues = await serialAsyncMap(json.queues, async (item) => {
            const request_queue_uri = fullUrl + `/${item.name}`;
            return await getQueue(request_queue_uri);
        });

        return dispatch(
            requestQueues(queues)
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
};

const requestQueue = (queue) => ({
    type: REQUEST_QUEUE,
    queue: queue,
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
    queue: queue,
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
