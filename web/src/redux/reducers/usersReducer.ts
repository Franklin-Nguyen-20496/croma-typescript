
import {
    SET_ALL_USERS,
    ADD_ONE_USER,
    UPDATE_ONE_USER,
    DELETE_ONE_USER
} from '../types/users.types';
import Action from '../../Interfaces/action.interface';
import User from '../../Interfaces/user.interface';

export interface initialUsers {
    list: User[];
}

const initialState: initialUsers = {
    list: [],
}

const usersReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_ALL_USERS:
            return {
                ...state,
                list: action.payload
            }
        case ADD_ONE_USER:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case UPDATE_ONE_USER:
            const usersUpdated = [...state.list].map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
            return {
                ...state,
                list: usersUpdated
            }
        case DELETE_ONE_USER:
            const usersDeleted = [...state.list].filter(item => item.id !== action.payload);
            return {
                ...state,
                list: usersDeleted
            }

        default:
            return state;
    }
};

export default usersReducer;