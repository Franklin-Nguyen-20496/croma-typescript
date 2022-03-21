
import {
    NOTIFY_INFO,
    NOTIFY_WARN,
    NOTIFY_ERROR,
    HIDE_NOTIFY
} from '../types/notify.types';

export const notifyInfo = (data: string) => {
    return {
        type: NOTIFY_INFO,
        payload: data,
    }
}

export const notifyWarn = (data: string) => {
    return {
        type: NOTIFY_WARN,
        payload: data,
    }
}

export const notifyError = (data: string) => {
    return {
        type: NOTIFY_ERROR,
        payload: data,
    }
}

export const hideNotify = () => {
    return {
        type: HIDE_NOTIFY,
    }
}