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

export const Login = (state = {isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: localStorage.getItem('user'),
    token : localStorage.getItem('token'),
    id: '',
    errorMessage: null}, action) => {
    switch (action.type){
        case ActionTypes.LoginRequest:
            return ({...state, isLoading: true, isAuthenticated: false, user: action.payload});
        case ActionTypes.LoginFailed:
            return ({...state, isLoading: false, isAuthenticated: false, errorMessage: action.payload});
        case ActionTypes.LoginApproved:
            return ({...state, isLoading: false, isAuthenticated: true, token: action.payload.token, id: action.payload.userId})
        case ActionTypes.LogoutApproved:
            return ({...state, isLoading: false, isAuthenticated: false, token: '', user: null});
        default:
            return state;
    }
};

export const AdminLogin = (state = {isLoading: false,
    isAuthenticated: localStorage.getItem('admin_token') ? true : false,
    user: localStorage.getItem('admin'),
    token : localStorage.getItem('admin_token'),
    errorMessage: null}, action) => {
    switch (action.type){
        case ActionTypes.AdminLoginRequest:
            return ({...state, isLoading: true, isAuthenticated: false, admin: action.payload});
        case ActionTypes.AdminLoginFailed:
            return ({...state, isLoading: false, isAuthenticated: false, errorMessage: action.payload});
        case ActionTypes.AdminLoginApproved:
            return ({...state, isLoading: false, isAuthenticated: true, admin_token: action.payload});
        case ActionTypes.AdminLogoutApproved:
            return ({...state, isLoading: false, isAuthenticated: false, admin_token: '', admin: null});
        default:
            return state;
    }
};