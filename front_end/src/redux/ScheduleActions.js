import * as ActionTypes from './ActionTypes';

export const Schedule = (state = {isLoading: false, errMess: null, schedule: [], req: 0}, action) => {
    switch (action.type) {
        case ActionTypes.Schedule_Loading:
            return {...state, isLoading: true, errMess: null, schedule: [], req: 0};
        case ActionTypes.Schedule_Failed:
            return {...state, isLoading: false, errMess: action.payload, schedule:[], req: 0};
        case ActionTypes.Schedule_Add:
            return {...state, isLoading: false, errMess: null, schedule: action.payload, req: 1};
        default:
            return state;
    }
}