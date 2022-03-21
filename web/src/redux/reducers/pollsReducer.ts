
import {
    SET_ALL_POLLS,
    ADD_POLL,
    DELETE_POLL,
    UPDATE_POLL,
} from '../types/polls.types';
import Action from '../../Interfaces/action.interface';
import Poll from '../../Interfaces/poll.interface';

export interface initialPolls {
    list: Poll[];
}

const initialState: initialPolls = {
    list: [],
}

const pollsReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_ALL_POLLS:
            return {
                ...state,
                list: action.payload
            }

        case ADD_POLL:
            const newList2 = [...state.list, action.payload];
            return {
                ...state,
                list: newList2,
            }

        case DELETE_POLL:
            const newList = state.list.filter(poll => poll.id !== action.payload);
            return {
                ...state,
                list: newList,
            }

        case UPDATE_POLL:
            const newList3 = state.list.map(poll => {
                if (poll.id === action.payload.id) {
                    return action.payload;
                }
                return poll;
            });
            return {
                ...state,
                list: newList3,
            }
        default:
            return state;
    }
}

export default pollsReducer;