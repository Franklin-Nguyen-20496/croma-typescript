
import { SET_ACCOUNT, CLEAR_ACCOUNT } from '../types/account.types';
import Account from '../../Interfaces/account.interface';

export const setAccount = (data: {
    account: Account,
    access_token: string,
    refresh_token: string,
}) => {
    return {
        type: SET_ACCOUNT,
        payload: data,
    }
}

export const clearAccount = () => {
    return {
        type: CLEAR_ACCOUNT,
        payload: {},
    }
}
