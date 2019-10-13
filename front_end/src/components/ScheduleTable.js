import React, {Component} from 'react';


const RenderItems = (props) => {
    return(
        props.schedule.map(path => {
            return (
                <div>
                <p>from {path.origin} to {path.destination} at {path.Date}</p>
                </div>
            );
        })
    );
}

class ScheduleTable extends Component{

    render() {
        return (
            <div>
            <RenderItems schedule={this.props.schedule.schedule}/>
            </div>
        );
    }
}

export default ScheduleTable;