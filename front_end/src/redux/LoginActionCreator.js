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
        fetch(loginUrl, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.token === ''){
                    dispatch(loginFailure("Not such user exist"));
                }else{
                    localStorage.setItem('token', JSON.stringify(res.token));
                    localStorage.setItem('user', JSON.stringify(userData));
                    dispatch(loginApprove(res.token))
                }
            })
            .catch(err => {
                dispatch(loginFailure(err.message));
            })
    }
}

export const logout = () => (dispatch) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutApproved());
};

