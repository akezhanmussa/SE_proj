import React, {Component} from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import DummySchedule from './DummySchedule'
import {fetchSchedule} from '../redux/ScheduleActionCreators'


const mapDispatchToProps = (dispatch) => ({
    fetchSchedule: (path) => dispatch(fetchSchedule(path))
});

const mapStateToProps = (state) => ({
    schedule: state.schedule
});

class Main extends Component{
    render() {
        return(
        <div className='container'>
            <div className='row justify-content-center'>
                <Map/>
            </div>
            <div className='row justify-content-center'>
                <DummySchedule schedule={this.props.schedule} fetchSchedule={this.props.fetchSchedule}/>
            </div>
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);