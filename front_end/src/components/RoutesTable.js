import React, {Component} from 'react';
import Select from 'react-select';
import Map from "./Map";
import {locations} from "../shared/Locations"

class SubmitRoute extends React.Component{
    constructor(props){
        super(props)

        this.submitResponse = this.submitResponse.bind(this);
    }

    submitResponse(){

        let routes = []

        console.log(this.props)

        routes = [{from: "astana", to: "pavlodar", time: "9 P.M."}]

        this.props.handleSubmitResponse(routes)
    }

    render(){
        return (<button onClick = {this.submitResponse}>
                Submit Route
            </button>
        );
    }
}

class RoutesTable extends React.Component{
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
                <SubmitRoute
                    startStation = {this.state.startStation}
                    destinationStation = {this.state.destinationStation}
                    timeRange = {this.state.timeRange}
                    handleSubmitResponse = {this.handleSubmitResponse}
                />
            </div>
        )
    }
}

export default RoutesTable;