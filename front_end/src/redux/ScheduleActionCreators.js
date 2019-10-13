import * as ActionTypes from './ActionTypes';
import {Schedule} from '../shared/Schedule';

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
    return dispatch(scheduleAdd(Schedule));
}
