import * as ActionType from "./ActionTypes";
import {loginUrl} from "../shared/BaseUrl";
import {adminLogoutApproved} from "./AdminLoginActionCreator";

export const loginApprove = (token) => {
    return {
        type: ActionType.LoginApproved,
        payload: token
    }
}

export const loginFailure = (errorMessage) => {
    return {
        type: ActionType.LoginFailed,
        payload: errorMessage
    }
}

export const loginRequest = (user) => {
    return {
        type: ActionType.LoginRequest,
        payload: user
    }
}

export const logoutApproved = () => {
    return {
        type: ActionType.LogoutApproved
    }
};

export function login(userData){
    console.log(userData)
    return dispatch => {
        dispatch(loginRequest(userData));
        let token = 1;
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(loginApprove(token))
        // fetch(loginUrl, {
        //     method: 'POST',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify(userData)
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         if (res.error){
        //             throw(res.error);
        //         }
        //         localStorage.setItem('token', JSON.stringify(res.token));
        //         localStorage.setItem('user', JSON.stringify(userData));
        //         dispatch(loginApprove(res.token))
        //     })
        //     .catch(err => {
        //         dispatch(loginFailure(err.message));
        //     })
    }
}

export const logout = () => (dispatch) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutApproved());
};

