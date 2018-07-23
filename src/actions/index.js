import { serialAsyncMap } from '../utils/serialAsyncMap';
import { API_ROOT } from '../middleware/api';
export const REQUEST_QUEUES = 'REQUEST_QUEUES';

// Fetches a queues from server.
const requestQueues = (data) => ({
    type: REQUEST_QUEUES,
    queues: data,
    isFetching: true
});

// Fetches a queues from server.
// Relies on Redux Thunk middleware.
export const loadQueues = () => async (dispatch) => {
    // fetch
    const fullUrl = API_ROOT + 'queues';
    try {
        const response = await fetch(fullUrl);
        const json = await response.json();
        const queues = await serialAsyncMap(json.queues, async (item) => {
            const request_queue_uri = fullUrl + `/${item.name}`;
            const response = await fetch(request_queue_uri);
            const json = await response.json();

            return json.queue
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
