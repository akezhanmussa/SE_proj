import React, {Component} from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import ScheduleTable from '../HomePage/ScheduleTable';
import "react-datepicker/dist/react-datepicker.css";
import {locations} from '../../shared/Locations'
import {baseUrl} from "../../shared/BaseUrl";

const getParsedDate = (date) =>{
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10)dd='0'+dd
    if(mm<10)mm='0'+mm
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
};

class SearchTicketForAgent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startStation: '',
            destinationStation: '',
            timeRange: [],
            timeRoute: new Date(),
            routes: [],
            schedule: {
                isLoading: false,
                req: 0,
                errMess: null,
                schedule: []
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState(prevState => ({
            schedule: {
                ...prevState.schedule,
                isLoading: true
            }
        }));
        let path = {"origin": this.state.startStation.value,
            "destination": this.state.destinationStation.value, "date": this.state.timeRoute, "daytime": this.state.timeRange};
        path.date = getParsedDate(path.date);
        path.daytime = path.daytime.map(el => el.value);
        path.daytime = path.daytime[0];
        return fetch(baseUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(path)
        })
            .then(response => {
                if (response.ok)
                    return response;
                else {
                    let error = new Error("Error " + response.status + ': ' + response.statusText);
                    throw error;
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response + " The response from the server, in case delete me in ScheduleActionCreator.js");
                this.setState(prevState => ({
                    schedule: {
                        ...prevState.schedule,
                        isLoading: false,
                        schedule: response,
                        req: 1
                    }
                }));
              })
            .catch(error => this.setState(prevState => ({
                schedule: {
                    ...prevState.schedule,
                    errMess: error
                }
            })));
    }

    handleStartStChange = (startStation) => {
        this.setState({startStation});
    };

    handleDestinationStChange = (destinationStation) => {
        this.setState({ destinationStation });
    };

    handleTimeRange = (timeRange) => {
        this.setState({timeRange})
    };

    handleSubmitResponse = (routes) => {
        this.setState({routes})
    };

    handleTimeRoute = (timeRoute) => {
        this.setState({timeRoute})
    };

    render(){
        const opts = [];
        for(let i = 0; i < locations.length; i++){
            opts.push({value: locations[i].id, label: locations[i].name});
        }
        return(
            <div>
                <div className='row justify-content-around'>
                    <div className='search-box' style={{width: "100%"}}>
                        <Form>
                            <Form.Row>
                                <Form.Group className = "col-6">
                                    <Form.Label>Start Station</Form.Label>
                                    <Select
                                        name = "form-field-name"
                                        defaultValue = {this.state.startStation}
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
                                    <Button className='btn-secondary' onClick = {this.handleSubmit}>
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
                    <ScheduleTable schedule={this.state.schedule} isAdmin={true} collectData={this.props.collectData}/>
                </div>
            </div>
        )
    }
}

export default SearchTicketForAgent;