import * as ActionTypes from './ActionTypes';
import {Schedule} from '../shared/Schedule';
import {baseUrl} from '../shared/BaseUrl'

export const scheduleLoading = () => {
    return {
        type: ActionTypes.Schedule_Loading
    };
};

export const scheduleFailed = (err) => {
    return {
        type: ActionTypes.Schedule_Failed,
        payload: err
    };
};

export const scheduleAdd = (schedule) => {
    return {
        type: ActionTypes.Schedule_Add,
        payload: schedule
    };
};

export const fetchSchedule = (path) => (dispatch) => {
    dispatch(scheduleLoading());
    path.date = getParsedDate(path.date);
    path.daytime = path.daytime.map(el => el.value);
    path.daytime = path.daytime[0];
    console.log(path);

    return fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(path)
    })
        .then(response => {
            if(response.ok)
                return response;
            else{
                var error = new Error("Error " + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            dispatch(scheduleAdd(response))
        })
        .catch (error => dispatch(scheduleFailed(error.message)));
}


const getParsedDate = (date) =>{
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10)dd='0'+dd
    if(mm<10)mm='0'+mm
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
};
