import * as ActionType from "./ActionTypes";
import {loginAdminUrl} from "../shared/BaseUrl";

export const adminLoginApprove = (admin_token) => {
    return {
        type: ActionType.AdminLoginApproved,
        payload: admin_token
    }
};

export const adminLoginFailure = (errorMessage) => {
    return {
        type: ActionType.AdminLoginFailed,
        payload: errorMessage
    }
};

export const adminLoginRequest = (admin) => {
    return {
        type: ActionType.AdminLoginRequest,
        payload: admin
    }
};

export const adminLogoutApproved = () => {
    return {
        type: ActionType.AdminLogoutApproved
    }
};

export function adminLogin(adminData){
    return dispatch => {
        dispatch(adminLoginRequest(adminData));
        fetch(loginAdminUrl, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(adminData)
        })
            .then(res => {
                if(res.ok)
                    return res.json();
                else {
                    throw new Error("Error " + res.status)
                }
            })
            .then(res => {
                localStorage.setItem('admin_token', JSON.stringify(res));
                localStorage.setItem('admin', JSON.stringify(adminData));
                console.log(res);
                dispatch(adminLoginApprove(res));
            })
            .catch(err => {
                dispatch(adminLoginFailure(err.message));
            });
    }
};

export const adminLogout = () => (dispatch) =>{
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin');
    dispatch(adminLogoutApproved());
};

