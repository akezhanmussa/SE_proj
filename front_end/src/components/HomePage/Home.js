import React, {Component} from 'react';
import SearchRoutes from './SearchRoutes';
import { Schedule } from '../../shared/Schedule';
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
            <div id=''>
                <div className='container'>
                    <SearchRoutes fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>
                </div>
            </div>
        );
    }
}

export default Home;
