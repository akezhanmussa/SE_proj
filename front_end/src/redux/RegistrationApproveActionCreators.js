import {baseUrl} from '../shared/BaseUrl'
import * as ActionType from "./ActionTypes";

export const registrationApproveLoading = () => {
    return {
        type: ActionType.RegistrationApproveLoading
    }
}

export const registrationApproved = (approveMessage) => {
    return {
        type: ActionType.RegistrationApproved,
        payload: approveMessage
    }
}

export const registrationFailed = (errorMessage) => {
    return {
        type: ActionType.RegistrationFailed,
        payload: errorMessage
    }
}

export function submitRegistrationForm(userData){
    console.log(userData)
    console.log(userData.firstName + " I am here")
    return dispatch => {
        dispatch(registrationApproveLoading());
        fetch(baseUrl, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error){
                    throw(res.error);
                }
                dispatch(registrationApproved(res))
            })
            .catch(err => {
                dispatch(registrationFailed(err.message));
            })
    }
}




