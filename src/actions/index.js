import { CALL_API, Schemas } from '../middleware/api';

export const QUEUES_REQUEST = 'QUEUES_REQUEST';
export const QUEUES_SUCCESS = 'QUEUES_SUCCESS';
export const QUEUES_FAILURE = 'QUEUES_FAILURE';

// Fetches a queues from server.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchQueues = () => ({
    [CALL_API]: {
        types: [ QUEUES_REQUEST, QUEUES_SUCCESS, QUEUES_FAILURE ],
        endpoint: `queues`,
        schema: Schemas.QUEUE_ARRAY
    }
});

// Fetches a queues from server.
// Relies on Redux Thunk middleware.
export const loadQueues = () => (dispatch) => {
    return dispatch(fetchQueues());
};
