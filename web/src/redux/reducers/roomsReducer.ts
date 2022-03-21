
import {
    SET_ALL_ROOMS,
    ADD_NEW_ROOM,
    UPDATE_ONE_ROOM,
    GET_ALL_ROOMS,
    LOADING_ROOMS,
    LOADING_FAILED_ROOMS,
    LOADING_SUCCESS_ROOMS,
} from '../types/rooms.types';
import Room from '../../Interfaces/room.interface';
import Action from '../../Interfaces/action.interface';

export interface initialRooms {
    list: Room[];
    isLoading: boolean;
    error: string;
}

const initialState: initialRooms = {
    list: [],
    isLoading: false,
    error: '',
}

const roomsReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_ALL_ROOMS:
            return {
                ...state,
                list: action.payload
            }

        case ADD_NEW_ROOM:
            const newList2 = [...state.list];
            newList2.push(action.payload);
            return {
                ...state,
                list: newList2
            }

        case UPDATE_ONE_ROOM:
            const newList = state.list.map(room => {
                if (room.id === action.payload.id) {
                    return action.payload;
                }
                else {
                    return room;
                }
            })
            return {
                ...state,
                list: newList,
            }

        case LOADING_ROOMS:
            return {
                ...state,
                isLoading: true,
            }

        case LOADING_FAILED_ROOMS:
            return {
                ...state,
                error: action.payload,
            }

        case LOADING_SUCCESS_ROOMS:
            return {
                ...state,
                list: action.payload,
            }

        default: return state;
    }
}

export default roomsReducer;