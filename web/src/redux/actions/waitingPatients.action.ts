import {
    SET_ALL_WAITING_PATIENTS,
    ADD_ONE_WAITING_PATIENT,
    UPDATE_ONE_WAITING_PATIENT,
    DELETE_ONE_WAITING_PATIENT,
    SET_ALL_LIST_IDS,
} from '../types/waitingPatients.types';
import WaitingPatient from '../../Interfaces/waitingPatient.interface';

export const setAllWaitingPatients = (data: WaitingPatient[]) => {
    return {
        type: SET_ALL_WAITING_PATIENTS,
        payload: data,
    }
}

export const addOneWaitingPatient = (patient: WaitingPatient) => {
    return {
        type: ADD_ONE_WAITING_PATIENT,
        payload: patient,
    }
}

export const updateOneWaitingPatient = (patient: WaitingPatient) => {
    return {
        type: UPDATE_ONE_WAITING_PATIENT,
        payload: patient,
    }
}

export const deleteOneWaitingPatient = (id: string) => {
    return {
        type: DELETE_ONE_WAITING_PATIENT,
        payload: id,
    }
}

export const setAllListIDs = (IDs: string[]) => {
    return {
        type: SET_ALL_LIST_IDS,
        payload: IDs,
    }
}
