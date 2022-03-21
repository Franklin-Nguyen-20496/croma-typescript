
import {
    SET_ALL_PATIENTS,
    ADD_ONE_PATIENT,
    UPDATE_ONE_PATIENT,
    DELETE_ONE_PATIENT,
} from '../types/patients.types';
import Patient from '../../Interfaces/patient.interface';
import Action from '../../Interfaces/action.interface';

export interface initialPatients {
    list: Patient[];
}

const initialState: initialPatients = {
    list: [],
}

const patientsReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_ALL_PATIENTS:
            return {
                ...state,
                list: action.payload,
            }
        case ADD_ONE_PATIENT:
            return {
                ...state,
                list: [...state.list, action.payload],
            }
        case UPDATE_ONE_PATIENT:
            const patientsUpdate = [...state.list].map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return {
                ...state,
                list: patientsUpdate,
            }
        case DELETE_ONE_PATIENT:
            const patientsDelete = [...state.list].filter(item => item.id !== action.payload.id);
            return {
                ...state,
                list: patientsDelete,
            }
        default:
            return state;
    }
}

export default patientsReducer;
