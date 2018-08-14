import { notify } from 'reapop';

export const showNotification = (type, message) => {
    return notify(
        {
            message: message,
            status: type,
            dismissible: true,
            dismissAfter: 3000
        }
    )
};