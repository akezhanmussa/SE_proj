import React, {Component} from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import ScheduleTable from './ScheduleTable';
import RoutesTable from './RoutesTable';
import { Schedule } from '../shared/Schedule'
import {fetchSchedule} from '../redux/ScheduleActionCreators'


const mapDispatchToProps = (dispatch) => ({
    fetchSchedule: (path) => dispatch(fetchSchedule(path))
});

const mapStateToProps = (state) => ({
    schedule: state.schedule
});


class Home extends Component{

    constructor(props){
        super(props)
        this.schedule = Schedule;
    }


    render() {
        return(
        <div className='container'>
            <div className='row justify-content-center'>
                <Map/>
            </div>
            <div >
                <RoutesTable fetchSchedule={this.props.fetchSchedule}/>
            </div>
            <div className='row justify-content-center'>
                <ScheduleTable schedule={this.schedule}/>
            </div>
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
