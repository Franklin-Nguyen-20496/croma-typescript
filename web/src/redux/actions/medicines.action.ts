import {
    SET_ALL_MEDICINES,
    UPDATE_ONE_MEDICINE,
} from '../types/medicines.types';
import Medicine from '../../Interfaces/medicine.interface';

export const setAllMedicines = (values: Medicine[]) => {
    return {
        type: SET_ALL_MEDICINES,
        payload: values,
    }
}

export const updateOneMedicine = (value: Medicine) => {
    return {
        type: UPDATE_ONE_MEDICINE,
        payload: value,
    }
}