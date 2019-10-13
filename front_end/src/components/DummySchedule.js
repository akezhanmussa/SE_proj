import React, {Component} from 'react';


const RenderItems = (props) => {
    return(
        props.schedule.map(path => {
            return (
                <div>
                <p>from {path.Origin} to {path.Destination} at {path.Date}</p>
                </div>
            );
        })
    );
}

class DummySchedule extends Component{

    render() {
        return (
            <div>
            <button onClick={() => this.props.fetchSchedule({"f":"AD"})}>GetSchedule</button>
            <RenderItems schedule={this.props.schedule.schedule}/>
            {console.log(this.props)}
            </div>
        );
    }
}

export default DummySchedule;