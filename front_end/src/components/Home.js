import React, {Component} from 'react';
import RoutesTable from './RoutesTable';
import { Schedule } from '../shared/Schedule';
import MapComponent from './MapComponent';
class Home extends Component{

    constructor(props){
        super(props);
        this.schedule = Schedule;
        this.state = {
            currentState:"Home"
        };
    }

    render() {
        return(
            <div>
                <div className='container'>
                    <div className='row justify-content-around'>
                        <MapComponent schedule = {this.props.schedule}></MapComponent>
                    </div>
                    <RoutesTable fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>
                </div>
            </div>
        );
    }
}

export default Home;
