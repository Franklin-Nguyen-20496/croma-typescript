import { patient } from './../../Interfaces/patient.interface';

import { combineReducers } from 'redux';

import usersReducer, { initialUsers } from './usersReducer';
import accountReducer, { initialAccount } from './accountReducer';
import waitingPatientsReducer, { initialWaitingPatients } from './waitingPatientsReducer';
import roomsReducer, { initialRooms } from './roomsReducer';
import pollsReducer, { initialPolls } from './pollsReducer';
import patientsReducer, { initialPatients } from './patientsReducer';
import medicinesReducer, { initialMedicines } from './medicinesReducer';
import recipesReducer, { initialRecipes } from './recipesReducer';

export interface StateRedux {
    account: initialAccount;
    users: initialUsers;
    waitingPatients: initialWaitingPatients;
    rooms: initialRooms;
    polls: initialPolls;
    patients: initialPatients;
    medicines: initialMedicines;
    recipes: initialRecipes;
}

const rootReducer = combineReducers({
    users: usersReducer,
    account: accountReducer,
    waitingPatients: waitingPatientsReducer,
    rooms: roomsReducer,
    polls: pollsReducer,
    patients: patientsReducer,
    medicines: medicinesReducer,
    recipes: recipesReducer,
})

export default rootReducer;