import {Schedule} from './ScheduleActions';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            schedule: Schedule
        }),
        applyMiddleware(thunk, logger)
    );
    return store
};