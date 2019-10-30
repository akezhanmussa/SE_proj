import React, {Component} from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import ScheduleTable from './ScheduleTable';
import "react-datepicker/dist/react-datepicker.css";
import {locations} from '../shared/Locations'

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


    handleStartStChange = (startStation) => {
        this.setState({startStation});
    }

    handleDestinationStChange = (destinationStation) => {
        this.setState({ destinationStation });
    }

    handleTimeRange = (timeRange) => {
        this.setState({timeRange})
    }

    handleSubmitResponse = (routes) => {
        this.setState({routes})
    }

    handleTimeRoute = (timeRoute) => {
        this.setState({timeRoute})
    }

    render(){
        const opts = [];
        for(let i = 0; i < locations.length; i++){
            opts.push({value: locations[i].id, label: locations[i].name});
        }
        console.log(opts);
        return(
            <div>
                <div className='row justify-content-around'>
                    <div className='search-box' style={{width: 500}}>
                        <Form>
                            <Form.Row>
                                <Form.Group className = "col-6">
                                    <Form.Label>Start Station</Form.Label>
                                    <Select
                                        name = "form-field-name"
                                        value = {this.state.startStation}
                                        onChange = {this.handleStartStChange}
                                        options = {opts}
                                    />
                                </Form.Group>
                                <Form.Group className = "col-6 ml-auto">
                                    <Form.Label>Destination Station</Form.Label>
                                    <Select
                                        name = "form-field-name"
                                        value = {this.state.destinationStation}
                                        onChange = {this.handleDestinationStChange}
                                        options = {opts}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group className = "col-12">
                                    <p>Time range</p>
                                    <Select
                                        name = "form-field-name"
                                        isMulti
                                        className="basic-multi-select"
                                        value = {this.state.timeRange}
                                        onChange = {this.handleTimeRange}
                                        options = {[
                                            {value: "afternoon", label: "Afternoon"},
                                            {value: "night", label: "Night"},
                                            {value: "morning", label: "Morning"},
                                            {value: "evening", label: "Evening"}
                                        ]}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group className="col-8 d-flex">
                                    <p>Route Day</p>
                                    <DatePicker className='ml-2' selected = {this.state.timeRoute} onChange={this.handleTimeRoute} />
                                </Form.Group>
                                <Form.Group className='ml-auto mr-2'>
                                    <Button className='btn-secondary' onClick = {() => this.props.fetchSchedule({"origin": this.state.startStation.value,
                                        "destination": this.state.destinationStation.value, "date": this.state.timeRoute, "daytime": this.state.timeRange})}>
                                        Submit Route
                                    </Button>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>

                            </Form.Row>
                        </Form>
                    </div>
                </div>
                <div className='row justify-content-around'>
                    <ScheduleTable schedule={this.props.schedule}/>
                </div>
            </div>
        )
    }
}

export default RoutesTable;