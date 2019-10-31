import * as ActionType from "./ActionTypes";
import {baseUrl} from "../shared/BaseUrl";

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
        // fetch(baseUrl, {
        //     method: 'POST',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify(adminData)
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         if (res.error){
        //             throw(res.error);
        //         }
        //         localStorage.setItem('admin_token', JSON.stringify(res.token));
        //         localStorage.setItem('admin', JSON.stringify(adminData));
        //         dispatch(adminLoginApprove(res.token));
        //     })
        //     .catch(err => {
        //         dispatch(adminLoginFailure(err.message));
        //     });
        const token = "fadf";
        localStorage.setItem('admin_token', JSON.stringify(token));
        localStorage.setItem('admin', JSON.stringify(adminData));
        dispatch(adminLoginApprove(token));
    }
};

export const adminLogout = () => (dispatch) =>{
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin');
    dispatch(adminLogoutApproved());
};

