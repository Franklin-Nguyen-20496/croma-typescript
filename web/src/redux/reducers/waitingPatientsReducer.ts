
import {
    SET_ALL_WAITING_PATIENTS,
    ADD_ONE_WAITING_PATIENT,
    UPDATE_ONE_WAITING_PATIENT,
    DELETE_ONE_WAITING_PATIENT,
    SET_ALL_LIST_IDS,
} from '../types/waitingPatients.types';
import WaitingPatient from '../../Interfaces/waitingPatient.interface';
import Action from '../../Interfaces/action.interface';

export interface initialWaitingPatients {
    list: WaitingPatient[];
    finishedID: string;
    IDs: string[];
}

const initialState: initialWaitingPatients = {
    list: [],
    finishedID: '',
    IDs: [],
}

const waitingPatientsReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_ALL_WAITING_PATIENTS:
            return {
                ...state,
                list: action.payload,
            }
        case ADD_ONE_WAITING_PATIENT:
            return {
                ...state,
                list: [...state.list, action.payload],
            }
        case UPDATE_ONE_WAITING_PATIENT:
            const listUpdated = state.list.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            })
            return {
                ...state,
                list: listUpdated,
            }
        case DELETE_ONE_WAITING_PATIENT:
            const listDeleted = state.list.filter(item => item.id !== action.payload);
            return {
                ...state,
                list: listDeleted,
            }
        case SET_ALL_LIST_IDS:
            return {
                ...state,
                IDs: action.payload,
            }

        default: return state;
    }
}

export default waitingPatientsReducer;