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

export const RegistrationApprove = (state = {isLoading: false, approveInfo: null, errorMessage: null}, action) => {
    switch (action.type){
        case ActionTypes.RegistrationApproveLoading:
            return {...state, isLoading: true, approveInfo: null, errorMessage: null};
        case ActionTypes.RegistrationApproved:
            return {...state, isLoading: false, approveInfo: action.payload, errorMessage: null};
        case ActionTypes.RegistrationFailed:
            return {...state, isLoading: false, approveInfo: null, errorMessage: action.payload};
        default:
            return state;
    }
}
