
import {
    SET_ALL_POLLS,
    ADD_POLL,
    DELETE_POLL,
    UPDATE_POLL,
} from '../types/polls.types';
import Poll from '../../Interfaces/poll.interface';

export const setAllPolls = (newPolls: Poll) => {
    return {
        type: SET_ALL_POLLS,
        payload: newPolls,
    }
}

export const addPoll = (poll: Poll) => {
    return {
        type: ADD_POLL,
        payload: poll,
    }
}

export const DeletePoll = (id: string) => {
    return {
        type: DELETE_POLL,
        payload: id,
    }
}

export const updatePoll = (poll: Poll) => {
    return {
        type: UPDATE_POLL,
        payload: poll,
    }
}
