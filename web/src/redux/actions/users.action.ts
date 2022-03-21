
import {
    SET_ALL_USERS,
    ADD_ONE_USER,
    UPDATE_ONE_USER,
    DELETE_ONE_USER,
    USERS_LOADING,
    USERS_LOADING_FALSE,
} from '../types/users.types';
import User from '../../Interfaces/user.interface';

export const setAllUsers = (users: User[]) => {
    return {
        type: SET_ALL_USERS,
        payload: users
    }
}

export const addOneUser = (user: User) => {
    return {
        type: ADD_ONE_USER,
        payload: user
    }
}

export const updateOneUser = (user: User) => {
    return {
        type: UPDATE_ONE_USER,
        payload: user
    }
}

export const deleteOneUser = (id: string) => {
    return {
        type: DELETE_ONE_USER,
        payload: id
    }
}

export const setUsersIsLoading = () => {
    return {
        type: USERS_LOADING,
    }
}

export const setUsersLoadingFalse = () => {
    return {
        type: USERS_LOADING_FALSE,
    }
}


