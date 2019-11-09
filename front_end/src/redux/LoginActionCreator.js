import * as ActionType from "./ActionTypes";
import {loginUrl} from "../shared/BaseUrl";
import {adminLogoutApproved} from "./AdminLoginActionCreator";

export const loginApprove = (res) => {
    return {
        type: ActionType.LoginApproved,
        payload: res
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
                localStorage.setItem('token', JSON.stringify(res.token));
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('user_id', JSON.stringify(res.userId));
                dispatch(loginApprove(res))
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

