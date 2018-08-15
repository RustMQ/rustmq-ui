export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const UPDATE_SUBSCRIBER_MODAL_PROPS = 'UPDATE_MODAL_PROPS';
export const CREATE_QUEUE_CONFIG = 'CREATE_QUEUE_CONFIG';
export const UPDATE_QUEUE_CONFIG = 'UPDATE_QUEUE_CONFIG';
export const MODAL_TYPES = {
    POST_MESSAGE: 'POST_MESSAGE',
    NEW_QUEUE: 'NEW_QUEUE',
    NEW_SUBSCRIBER: 'NEW_SUBSCRIBER',
    DELETE_QUEUE: 'DELETE_QUEUE',
    DELETE_MESSAGE: 'DELETE_MESSAGE',
    DELETE_SUBSCRIBER: 'DELETE_SUBSCRIBER',
    CLEAR_QUEUE: 'CLEAR_QUEUE'
};
export const QUEUE_CREATION_STEPS = {
    SELECT_TYPE: 'SELECT_TYPE',
    SET_CONFIG: 'SET_CONFIG',
    SUCCESS_CREATE: 'SUCCESS_CREATE'
}

export const showPostMessageModal = (queueName) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: MODAL_TYPES.POST_MESSAGE,
        modalProps: {
            queueName
        }
    });
};

export const showNewQueueModal = () => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: MODAL_TYPES.NEW_QUEUE,
        modalProps: {}
    });
}

export const showNewSubscriberModal = (queueName) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: MODAL_TYPES.NEW_SUBSCRIBER,
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
        modalType: MODAL_TYPES.UPDATE_SUBSCRIBER,
        modalProps: {
            queueName,
            subscriber
        }
    })
}

export const showDeleteQueueDialog = (queueName) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: MODAL_TYPES.DELETE_QUEUE,
        modalProps: {
            queueName
        }
    })
}

export const showDeleteMessageDialog = (message) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: MODAL_TYPES.DELETE_MESSAGE,
        modalProps: {
            message
        }
    })
}

export const showDeleteSubscriberDialog = (subscriber) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: MODAL_TYPES.DELETE_SUBSCRIBER,
        modalProps: {
            subscriber
        }
    })
}

export const showClearQueueDialog = (queueName) => (dispatch) => {
    return dispatch({
        type: SHOW_MODAL,
        modalType: MODAL_TYPES.CLEAR_QUEUE,
        modalProps: {
            queueName
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

export const showSelectTypeModal = (queue) => (dispatch) => {
    dispatch(updateQueueConfig(QUEUE_CREATION_STEPS.SELECT_TYPE, queue));
};

export const showQueueConfigModal = (queue) => (dispatch) => {
    dispatch(updateQueueConfig(QUEUE_CREATION_STEPS.SET_CONFIG, queue));
};

export const showSuccessCreateModal = (queue) => (dispatch) => {
    dispatch(updateQueueConfig(QUEUE_CREATION_STEPS.SUCCESS_CREATE, queue));
};




