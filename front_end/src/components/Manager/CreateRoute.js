import React, {Component} from "react";
import {locations} from "../../shared/Locations";
import {Card, CardBody, CardTitle} from "reactstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import {createRouteUrl} from "../../shared/BaseUrl"

const getParsedDate = (date) =>{
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10)dd='0'+dd
    if(mm<10)mm='0'+mm
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
};

const updateOrGet = (url, body, method) =>{
    return fetch(url, {
        method: method,
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(body)
    }).then(response => {
        return response.json()
    }).then(response => {
        console.log(response)
        return response;
    }).catch (error => {
        throw error
    });
}


class CreateRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subRoutes : [],
            startStation: '',
            destinationStation: '',
            timeRoute: new Date(),
            timeRouteTwo: new Date(),
            _startStation: '',
            _destinationStation: '',
            _timeRoute: new Date(),
            _timeRouteTwo: new Date(),
            __startStation: '',
            __destinationStation: '',
            __timeRoute: new Date(),
            __timeRouteTwo: new Date(),
            routes : []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleStartStChange = this.handleStartStChange.bind(this)
        this.handleDestinationStChange = this.handleDestinationStChange.bind(this)
        this.handleTimeRoute = this.handleTimeRoute.bind(this)
        this.handleTimeRouteTwo = this.handleTimeRouteTwo.bind(this)

        this._handleStartStChange = this._handleStartStChange.bind(this)
        this._handleDestinationStChange = this._handleDestinationStChange.bind(this)
        this._handleTimeRoute = this._handleTimeRoute.bind(this)
        this._handleTimeRouteTwo = this._handleTimeRouteTwo.bind(this)

        this.__handleTimeRouteTwo = this.__handleTimeRouteTwo.bind(this)
        this.__handleDestinationStChange = this.__handleDestinationStChange.bind(this)
        this.__handleTimeRoute = this.__handleTimeRoute.bind(this)
        this.__handleTimeRouteTwo = this.__handleTimeRouteTwo.bind(this)
    }



    handleStartStChange = (startStation) => {
        this.setState({startStation});
    };

    handleDestinationStChange = (destinationStation) => {
        this.setState({ destinationStation });
    };

    handleTimeRoute = (timeRoute) => {
        this.setState({timeRoute})
    };

    handleTimeRouteTwo = (timeRouteTwo) => {
        this.setState({timeRouteTwo})
    };
    _handleStartStChange = (_startStation) => {
        this.setState({_startStation});
    };

    _handleDestinationStChange = (_destinationStation) => {
        this.setState({ _destinationStation });
    };

    _handleTimeRoute = (_timeRoute) => {
        this.setState({_timeRoute})
    };

    _handleTimeRouteTwo = (_timeRouteTwo) => {
        this.setState({_timeRouteTwo})
    };

    __handleStartStChange = (__startStation) => {
        this.setState({__startStation});
    };

    __handleDestinationStChange = (__destinationStation) => {
        this.setState({ __destinationStation });
    };

    __handleTimeRoute = (__timeRoute) => {
        this.setState({__timeRoute})
    };

    __handleTimeRouteTwo = (__timeRouteTwo) => {
        this.setState({__timeRouteTwo})
    };

    handleSubmit = () => {
        let body = {
            "token":localStorage.getItem("admin_token"),
            "trainId":9,
            "routes":[
                {
                    "startTime":getParsedDate(this.state.timeRoute) + " 00:00:00",
                    "endTime":getParsedDate(this.state.timeRouteTwo) + " 00:00:00",
                    "startStationId":this.state.startStation.value,
                    "endStationId":this.state.destinationStation.value,
                    "price":2000
                },
                {
                    "startTime":getParsedDate(this.state._timeRoute) + " 00:00:00",
                    "endTime":getParsedDate(this.state._timeRouteTwo) + " 00:00:00",
                    "startStationId":this.state._startStation.value,
                    "endStationId":this.state._destinationStation.value,
                    "price":2000
                },
                {
                    "startTime":getParsedDate(this.state.__timeRoute) + " 00:00:00",
                    "endTime":getParsedDate(this.state.__timeRouteTwo) + " 00:00:00",
                    "startStationId":this.state.__startStation.value,
                    "endStationId":this.state.__destinationStation.value,
                    "price":2000
                },
            ]
        }

        console.log(body)

        updateOrGet(createRouteUrl,body,"POST").then(r => {
            console.log(r)
        }).catch(e => {
            console.log(e)
        })
    }

    render(){

        const opts = [];
        for(let i = 0; i < locations.length; i++){
            opts.push({value: locations[i].id, label: locations[i].name});
        }

        return(
            <div style={{marginTop: 30}}>
                <div className='row'>
                    <Card className='search-box' id='search' style={{width: 500}}>
                        <CardTitle  >
                            <h3 id='searchHeader'>Create a Route</h3>
                        </CardTitle>
                        <CardBody>
                            <Form>
                                <Form.Row>
                                    <Form.Group className = "col-12">
                                        <Form.Label><b>Start Station</b> </Form.Label>
                                        <Select
                                            name = "form-field-name"
                                            defaultValue = {this.state.startStation}
                                            onChange = {this.handleStartStChange}
                                            options = {opts}
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group className = "col-12">
                                        <Form.Label><b>Destination Station</b></Form.Label>
                                        <Select
                                            name = "form-field-name"
                                            value = {this.state.destinationStation}
                                            onChange = {this.handleDestinationStChange}
                                            options = {opts}
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group className="col-8 d-flex">
                                        <p><b>Start Day</b></p>
                                        <DatePicker className='ml-2' selected = {this.state.timeRoute} onChange={this.handleTimeRoute} />
                                    </Form.Group>
                                    <Form.Group className='ml-auto mr-2'>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group className="col-8 d-flex">
                                        <p><b>End Day</b></p>
                                        <DatePicker className='ml-2' selected = {this.state.timeRouteTwo} onChange={this.handleTimeRouteTwo} />
                                    </Form.Group>
                                    <Form.Group className='ml-auto mr-2'>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group className = "col-12">
                                        <Form.Label><b>Start Station</b> </Form.Label>
                                        <Select
                                            name = "form-field-name"
                                            defaultValue = {this.state._startStation}
                                            onChange = {this._handleStartStChange}
                                            options = {opts}
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group className = "col-12">
                                        <Form.Label><b>Destination Station</b></Form.Label>
                                        <Select
                                            name = "form-field-name"
                                            value = {this.state._destinationStation}
                                            onChange = {this._handleDestinationStChange}
                                            options = {opts}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group className="col-8 d-flex">
                                        <p><b>Start Day</b></p>
                                        <DatePicker className='ml-2' selected = {this.state._timeRoute} onChange={this._handleTimeRoute} />
                                    </Form.Group>

                                    <Form.Group className="col-8 d-flex">
                                        <p><b>End Day</b></p>
                                        <DatePicker className='ml-2' selected = {this.state._timeRouteTwo} onChange={this._handleTimeRouteTwo} />
                                    </Form.Group>
                                    <Form.Group className='ml-auto mr-2'>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group className = "col-12">
                                        <Form.Label><b>Start Station</b> </Form.Label>
                                        <Select
                                            name = "form-field-name"
                                            defaultValue = {this.state.__startStation}
                                            onChange = {this.__handleStartStChange}
                                            options = {opts}
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group className = "col-12">
                                        <Form.Label><b>Destination Station</b></Form.Label>
                                        <Select
                                            name = "form-field-name"
                                            value = {this.state.__destinationStation}
                                            onChange = {this.__handleDestinationStChange}
                                            options = {opts}
                                        />
                                    </Form.Group>
                                </Form.Row>
                            </Form>

                            <Form.Row>
                                <Form.Group className="col-8 d-flex">
                                    <p><b>Start Day</b></p>
                                    <DatePicker className='ml-2' selected = {this.state.__timeRoute} onChange={this.__handleTimeRoute} />
                                </Form.Group>
                                <Form.Group className="col-8 d-flex">
                                    <p><b>End Day</b></p>
                                    <DatePicker className='ml-2' selected = {this.state.__timeRouteTwo} onChange={this.__handleTimeRouteTwo} />
                                </Form.Group>
                                <Form.Group className='ml-auto mr-2'>
                                    <Button className='btn-secondary' onClick = {this.handleSubmit}>
                                        Submit Route
                                    </Button>
                                </Form.Group>
                            </Form.Row>

                        </CardBody>

                    </Card>
                </div
                ></div>
        )
    }
}

export default CreateRoute;