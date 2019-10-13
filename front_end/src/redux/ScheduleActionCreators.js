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
    return fetch(baseUrl + '/?o=' +
        path.Origin + '&d=' + path.Destination)
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
        .then(response => dispatch(scheduleAdd(response)))
        .catch (error => dispatch(scheduleFailed(error.message)));
}
