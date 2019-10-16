import React, {Component} from 'react';
import Select from 'react-select';
import {locations} from "../shared/Locations"
import Button from 'react-bootstrap/Button';
import Form, {FormRow} from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Map from './Map'

class RoutesTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            startStation: '',
            destinationStation: '',
            timeRange: [],
            timeRoute: new Date(),
            routes : []
        };
        this.divStyle = {
            color: 'blue'
        };
    }

    componentDidMount () {
        const script = document.createElement("script");

        script.src = "https://use.typekit.net/foobar.js";
        script.async = true;

        document.body.appendChild(script);
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

    handleTimeRoute = (timeRoute) => {
        this.setState({timeRoute})
    }

    render(){
        return(
            <div>
                <Form>
                <Form.Row>
                    <Form.Group as={Col} className = "w-25 mr-3">
                        <Form.Label>Start Station</Form.Label>
                        <Select
                            name = "form-field-name"
                            value = {this.state.startStation}
                            onChange = {this.handleStartStChange}
                            options = {[
                                {value: "astana", label: "Astana"},
                                {value:"pavlodar", label: "Pavlodar"}
                            ]}
                        />
                    </Form.Group>

                    <Form.Group as={Col} className = "w-25 ml-3">
                        <Form.Label>Destination Station</Form.Label>
                        <Select
                            name = "form-field-name"
                            value = {this.state.destinationStation}
                            onChange = {this.handleDestinationStChange}
                            options = {[
                                {value: "astana", label: "Astana"},
                                {value:"pavlodar", label: "Pavlodar"}
                            ]}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} className = "w-50">
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
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group>
                        <p>Route Day</p>
                        <DatePicker selected = {this.state.timeRoute} onChange={this.handleTimeRoute} />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group>
                        <Button onClick = {() => this.props.fetchSchedule({"Origin": this.state.startStation,
                            "Destination": this.state.destinationStation, "Date": this.state.timeRange})}>
                            Submit Route
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
            </div>
        )
    }
}

export default RoutesTable;