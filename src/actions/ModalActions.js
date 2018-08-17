export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const UPDATE_SUBSCRIBER_MODAL_PROPS = 'UPDATE_MODAL_PROPS';
export const CREATE_QUEUE_CONFIG = 'CREATE_QUEUE_CONFIG';
export const UPDATE_QUEUE_CONFIG = 'UPDATE_QUEUE_CONFIG';

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

export const showNewSubscriberModal = (queueName) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: 'NEW_SUBSCRIBER',
        modalProps: {
            queueName,
            subscriber: {
                name: '',
                url: '',
                headers: []
            }
        }
    });
};

export const showUpdateSubscriberModal = (queueName, subscriber) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: 'UPDATE_SUBSCRIBER',
        modalProps: {
            queueName,
            subscriber
        }
    })
}

export const showDeleteQueueDialog = (queueName) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: 'DELETE_QUEUE',
        modalProps: {
            queueName
        }
    })
}

export const showDeleteMessageDialog = (message) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: 'DELETE_MESSAGE',
        modalProps: {
            message
        }
    })
}

export const showDeleteSubscriberDialog = (subscriber) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: 'DELETE_SUBSCRIBER',
        modalProps: {
            subscriber
        }
    })
}

export const updateSubscriberModalProps = (subscriber) => (dispatch) => {
    return dispatch({
        type: UPDATE_SUBSCRIBER_MODAL_PROPS,
        subscriber
    })
}

export const hideModal = () => (dispatch) => {
    return dispatch({
        type: HIDE_MODAL
    });
};

const createQueueConfig = () => ({
    type: CREATE_QUEUE_CONFIG,
    queueCreationProps: {
        step: 'SELECT_TYPE',
        queue: {
            name: '',
            type: 'pull'
        }
    }
});

const updateQueueConfig = (step, queue) => ({
    type: UPDATE_QUEUE_CONFIG,
    queueCreationProps: {
        step,
        queue
    }
});

export const newQueueConfig = () => (dispatch) => {
    dispatch(createQueueConfig());
};

export const setQueueConfig = (step, queue) => (dispatch) => {
    dispatch(updateQueueConfig(step, queue));
};