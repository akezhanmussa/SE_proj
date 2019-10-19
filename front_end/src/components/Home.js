import React, {Component} from 'react';
import { connect } from 'react-redux';
import Map from './Map';
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
            <Map></Map>
            <RoutesTable fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
