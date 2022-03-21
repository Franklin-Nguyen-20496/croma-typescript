import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';
import Action from '../Interfaces/action.interface';

function logger({ getState }: { getState: () => any }) {
    return (next: any) => (action: Action) => {
        console.log(`will dispatch type ${action.type}`, action);

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action);

        console.log(`state after dispatch whith type ${action.type}`, getState());

        // a middleware further in chain changed it.
        return returnValue
    }
}

export default function configureStore() {
    const middleware = [thunk, logger];
    const store = createStore(
        rootReducer,
        compose(applyMiddleware(...middleware)),
    );

    return store;
}