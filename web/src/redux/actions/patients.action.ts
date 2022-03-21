import {
    SET_ALL_PATIENTS,
    ADD_ONE_PATIENT,
    UPDATE_ONE_PATIENT,
    DELETE_ONE_PATIENT,
} from '../types/patients.types';
import Patient from '../../Interfaces/patient.interface';

const setAllPatients = (list: Patient[]) => {
    return {
        type: SET_ALL_PATIENTS,
        payload: list,
    }
}

const addOnePatient = (patient: Patient) => {
    return {
        type: ADD_ONE_PATIENT,
        payload: patient,
    }
}

const updateOnePatient = (patient: Patient) => {
    return {
        type: UPDATE_ONE_PATIENT,
        payload: patient,
    }
}

const delete_one_patient = (id: string) => {
    return {
        type: DELETE_ONE_PATIENT,
        payload: id,
    }
}



export {
    setAllPatients,
    addOnePatient,
    updateOnePatient,
    delete_one_patient,
}
