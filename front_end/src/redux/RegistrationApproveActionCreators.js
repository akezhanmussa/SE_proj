import {registrationUrl} from '../shared/BaseUrl'
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
    console.log(JSON.stringify(userData))
    return dispatch => {
        dispatch(registrationApproveLoading());
        fetch(registrationUrl, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(res => {
                console.log("Response from the back " + res)
                if (res.error){
                    throw(res.error);
                }
                dispatch(registrationApproved(res))
            })
            .catch(err => {
                console.log(err.message + " explicitly")
                dispatch(registrationFailed(err.message));
            })
    }
}




