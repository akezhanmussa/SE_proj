import * as ActionTypes from './ActionTypes';

export const Schedule = (state = {isLoading: false, errMess: null, schedule: []}, action) => {
    switch (action.type) {
        case ActionTypes.Schedule_Loading:
            return {...state, isLoading: true, errMess: null, schedule: []};
        case ActionTypes.Schedule_Failed:
            return {...state, isLoading: false, errMess: action.payload, schedule:[]};
        case ActionTypes.Schedule_Add:
            return {...state, isLoading: false, errMess: null, schedule: action.payload};
        default:
            return state;
    }
}