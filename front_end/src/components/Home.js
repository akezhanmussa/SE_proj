import React, {Component} from 'react';
import Map from './Map';
import RoutesTable from './RoutesTable';
import { Schedule } from '../shared/Schedule'


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

export default Home;
