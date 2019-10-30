import * as ActionType from "./ActionTypes";

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

export function login(userData){
    return dispatch => {
        dispatch(loginRequest(userData));
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
                localStorage.setItem('token', JSON.stringify(res.token));
                localStorage.setItem('user', JSON.stringify(userData));
                dispatch(loginApprove(res.token))
            })
            .catch(err => {
                dispatch(loginFailure(err.message));
            })
    }
}
