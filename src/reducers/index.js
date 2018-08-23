import { combineReducers } from "redux";
import queueReducer from './queueReducer';
import { reducer as notificationsReducer } from 'reapop';
import messageReducer from "./messageReducer";
import isFetchingReducer from "./isFetchingReducer";
import modalReducer from "./modalReducer";
import queueConfigReducer from "./queueConfigReducer";
import toHomeReducer from "./toHomeReducer";

const rootReducer = combineReducers({
    appStore: combineReducers({
        queues: queueReducer,
        messages: messageReducer,
        isFetching: isFetchingReducer,
        modal: modalReducer,
        queueCreationProps: queueConfigReducer,
        toHome: toHomeReducer
    }),
    notifications: notificationsReducer()
});

export default rootReducer;
