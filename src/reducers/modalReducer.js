import {
    HIDE_MODAL,
    SHOW_MODAL,
    UPDATE_SUBSCRIBER_MODAL_PROPS
} from "../actions";

const initialState = {
    isOpen: false,
    type: null,
    props: {}
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SHOW_MODAL:
            switch (action.modalType) {
                case 'UPDATE_SUBSCRIBER':
                    const { subscriber } = action.modalProps;
                    const headers = [];
                    if (subscriber.headers) {
                        Object.keys(subscriber.headers).forEach((key) => {
                            headers.push({ key, value: subscriber.headers[key] })
                        });
                    }
                    const updatedProps = { ...action.modalProps, subscriber: { ...subscriber, headers: headers } };
                    return Object.assign({}, state, { isOpen: true, type: action.modalType, props: updatedProps });
                default:
                    return Object.assign({}, state, { isOpen: true, type: action.modalType, props: action.modalProps });
            }

        case HIDE_MODAL:
            return initialState

        case UPDATE_SUBSCRIBER_MODAL_PROPS:
            return Object.assign({}, state, { props: { ...state.props, subscriber: action.subscriber } });

        default:
            return state
    }
}
