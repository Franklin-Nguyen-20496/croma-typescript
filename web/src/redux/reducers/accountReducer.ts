
import axios from 'axios';

import { SET_ACCOUNT, CLEAR_ACCOUNT } from '../types/account.types';
import Account from '../../Interfaces/account.interface';
import Action from '../../Interfaces/action.interface';

export interface initialAccount {
    account: Account;
    access_token: string;
    refresh_token: string;
}

// const access_token: string = localStorage.getItem('access_token') || '';
// const refresh_token: string = localStorage.getItem('refresh_token') || '';
// const account: Account = localStorage.getItem('account') ?
//     JSON.parse(localStorage.getItem('account') || '')
//     :
//     {
//         _id: '',
//         id: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         age: NaN,
//         address: '',
//         position: NaN,
//         role: NaN,
//         file: '',
//     };

const initialState: initialAccount = {
    access_token: '',
    refresh_token: '',
    account: {
        _id: '',
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: NaN,
        address: '',
        position: NaN,
        role: NaN,
        file: '',
    },
}

const accountReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_ACCOUNT:
            return {
                ...state,
                ...action.payload,
            };
        case CLEAR_ACCOUNT:
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = '';
            return initialState;

        default: return state
    }
}

export default accountReducer;