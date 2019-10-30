import {RegistrationApprove, Schedule} from './ActionToState';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            schedule: Schedule,
            registrationApproveState: RegistrationApprove
        }),
        applyMiddleware(thunk, logger)
    );
    return store
};