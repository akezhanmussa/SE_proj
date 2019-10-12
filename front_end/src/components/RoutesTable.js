import React, {Component} from 'react';
import Select from 'react-select';
import Map from "./Map";
import {locations} from "../shared/Locations"

class RoutesTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startStation: '',
            destinationStation: ''
        };
        this.divStyle = {
            color: 'blue',
            height:"auto"
        };
    }


    handleStartStChange = (startStation) => {
        this.setState({ startStation });
    }

    handleDestinationStChange = (destinationStation) => {
        this.setState({ destinationStation });
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
            </div>
        )
    }
}

export default RoutesTable;