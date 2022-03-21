
import axios from 'axios';
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

export const setAllRooms = (rooms: Room[]) => {
    return {
        type: SET_ALL_ROOMS,
        payload: rooms,
    }
}

export const addNewRoom = (room: Room) => {
    return {
        type: ADD_NEW_ROOM,
        payload: room,
    }
}

export const updateOneRoom = (room: Room[]) => {
    return {
        type: UPDATE_ONE_ROOM,
        payload: room,
    }
}

export const loadingRooms = () => {
    return {
        type: LOADING_ROOMS,
    }
}

export const loadingFailedRooms = (error: string) => {
    return {
        type: LOADING_FAILED_ROOMS,
        payload: error,
    }
}

export const loadingSuccessRooms = (rooms: Room[]) => {
    return {
        type: LOADING_SUCCESS_ROOMS,
        payload: rooms,
    }
}

export const getAllRooms = () => {
    return async (dispatch: any) => {
        dispatch(loadingRooms());
        return axios({
            method: 'get',
            url: '/rooms',
        })
            .then(res => {
                const { message, data } = res.data;
                if (message === 'success') {
                    dispatch(loadingSuccessRooms(data));
                }
                else {
                    dispatch(loadingFailedRooms(message));
                }
            })
            .catch(err => console.log(err))
    }
}
