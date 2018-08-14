import { API_ROOT } from '../middleware/api';
import { showNotification } from './NotificationActions';

export const UPDATE_SUBSCRIBERS_REQUEST = 'UPDATE_SUBSCRIBERS_REQUEST';
export const UPDATE_SUBSCRIBERS_SUCCESS = 'UPDATE_SUBSCRIBERS_SUCCESS';
export const UPDATE_SUBSCRIBERS_FAILURE = 'UPDATE_SUBSCRIBERS_FAILURE';
export const REMOVE_SUBSCRIBERS_REQUEST = 'REMOVE_SUBSCRIBERS_REQUEST';
export const REMOVE_SUBSCRIBERS_SUCCESS = 'REMOVE_SUBSCRIBERS_SUCCESS';
export const REMOVE_SUBSCRIBERS_FAILURE = 'REMOVE_SUBSCRIBERS_FAILURE';

export const removeSubscribersRequest = (queueName, subscribers) => ({
    type: REMOVE_SUBSCRIBERS_REQUEST,
    queueName,
    subscribers
});

export const removeSubscribersSuccess = (queueName, subscribers) => ({
    type: REMOVE_SUBSCRIBERS_SUCCESS,
    queueName,
    subscribers
});

export const removeSubscribersFailure = (error) => ({
    type: REMOVE_SUBSCRIBERS_FAILURE,
    error
});

export const removeSubscribers = (queueName, subscribers) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${queueName}/subscribers`;
    const body = { subscribers };
    dispatch(removeSubscribersRequest(queueName, subscribers));
    try {
        const response = await fetch(fullUrl, {
            method: "DELETE",
            body: JSON.stringify(body)
        });

        if (response.status === 200) {
            dispatch(showNotification('success', 'Subscriber was successfully removed'));
        } else {
            const json = await response.json();
            dispatch(showNotification('error', json.msg));
        }

        return dispatch(removeSubscribersSuccess(queueName, subscribers));
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(removeSubscribersFailure(err));
    }
}

export const updateSubscribersRequest = (queueName, subscribers) => ({
    type: UPDATE_SUBSCRIBERS_REQUEST,
    queueName,
    subscribers
});

export const updateSubscribersSuccess = (queueName) => ({
    type: UPDATE_SUBSCRIBERS_SUCCESS,
    queueName
});

export const updateSubscribersFailure = (error) => ({
    type: UPDATE_SUBSCRIBERS_FAILURE,
    error
});

export const updateSubscribers = (queueName, subscribers) => async (dispatch) => {
    const fullUrl = API_ROOT + `queues/${queueName}/subscribers`;
    const body = { subscribers };
    dispatch(updateSubscribersRequest(queueName, subscribers));
    try {
        await fetch(fullUrl, {
            method: "POST",
            body: JSON.stringify(body)
        });

        dispatch(showNotification('success', 'Subscribers were successfully updated'));

        return dispatch(updateSubscribersSuccess(queueName, subscribers));
    } catch (err) {
        console.log('Error: ', err);
        return dispatch(updateSubscribersFailure(err));
    }
};