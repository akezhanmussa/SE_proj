import React, {Component} from 'react';
import Select from 'react-select';
import {locations} from "../shared/Locations"


class RoutesTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            startStation: '',
            destinationStation: '',
            timeRange: [],
            routes : []
        };
        this.divStyle = {
            color: 'blue'
        };
    }

    handleStartStChange = (startStation) => {
        this.setState({ startStation });
    }

    handleDestinationStChange = (destinationStation) => {
        this.setState({ destinationStation });
    }

    handleTimeRange = (timeRange) => {
        console.log(timeRange)
        this.setState({timeRange})
    }

        handleSubmitResponse = (routes) => {
        console.log(routes)
        this.setState({routes})
    }

    render(){
        return(
            <div style={this.divStyle}>
                <p>Start Station</p>
                <Select
                    name = "form-field-name"
                    value = {this.state.startStation}
                    onChange = {this.handleStartStChange}
                    options = {[
                        {value: "astana", label: "Astana"},
                        {value:"pavlodar", label: "Pavlodar"}
                        ]}
                />
                <p>Destionation Station</p>
                <Select
                    name = "form-field-name"
                    value = {this.state.destinationStation}
                    onChange = {this.handleDestinationStChange}
                    options = {[
                        {value: "astana", label: "Astana"},
                        {value:"pavlodar", label: "Pavlodar"}
                    ]}
                />
                <p>Time range</p>
                <Select
                    name = "form-field-name"
                    isMulti
                    className="basic-multi-select"
                    value = {this.state.timeRange}
                    onChange = {this.handleTimeRange}
                    options = {[
                        {value: "evening", label: "Evening"},
                        {value:"morning", label: "Morning"}
                    ]}
                />
                <button onClick = {() => this.props.fetchSchedule({"Origin": this.state.startStation,
                "Destination": this.state.destinationStation, "Date": this.state.timeRange})}>
                    Submit Route
                </button>
            </div>
        )
    }
}

export default RoutesTable;