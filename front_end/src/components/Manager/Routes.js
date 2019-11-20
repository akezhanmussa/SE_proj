import React, {Component} from 'react';
import {getRoutesUrl} from "../../shared/BaseUrl";
import {Button, Form} from "react-bootstrap"
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import DatePicker from 'react-datepicker'
import {Loading} from "../Loading";

const getRoutesData = () => {
    let body = {"token":localStorage.getItem("admin_token")}
    return fetch(getRoutesUrl, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(body)
    })
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response)
            return response;
        })
        .catch (error => {
            throw error
        });
}

class RouteModalForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            isModalOpen:false,
            origin:props.origin,
            destination:props.destination,
            newStartTime:new Date(),
            newEndTime:new Date()
        }

        this.handleTimeRoute = this.handleTimeRoute.bind(this)
        this.actModal = this.actModal.bind(this)
    }

    actModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleTimeRoute = (timeRoute) => {
        this.setState({timeRoute})
    };

    handleSubRoute = () => {

    }

    render(){
        return(
            <div>
                <button className='btn btn-light' onClick={this.actModal}>Time Route</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.actModal}>
                    <div>
                        <ModalBody>
                            <ModalHeader>
                                <h4>
                                    Time Route
                                </h4>
                            </ModalHeader>
                            <div className='search-box' >
                                <Form>
                                    <Form.Row>
                                        <p className="ml-2">
                                            New Start Time
                                        </p>
                                        <DatePicker className='ml-2' selected = {this.state.newStartTime} onChange={this.handleTimeRoute} />
                                    </Form.Row>
                                    <Form.Row>
                                        <p className="mt-3 ml-2">
                                            New End Time
                                        </p>
                                        <DatePicker className='mt-3 ml-3 mr-2' selected = {this.state.newEndTime} onChange={this.handleTimeRoute} />
                                    </Form.Row>
                                </Form>
                            </div>
                            <Button className='mt-3 btn-secondary' onClick = {this.handleSubRoute}>
                                Update Route
                            </Button>
                        </ModalBody>
                    </div>
                </Modal>
            </div>
        )
    }
}

class Routes extends Component {
    constructor() {
        super();

        this.state = {
            routes : [],
            expandedRows : [],
            mapToWord:{"1":"January","2":"February","3":"March","10":"October"}
        };

        this.changeRouteTime = this.changeRouteTime.bind(this)
    }

    componentDidMount() {
        getRoutesData().then(res =>{
                this.setState({routes:res})
            }
        ).catch(error =>
            {
                throw error
            }
        )
    }

    handleRowClick(rowId) {
        const isRowCurrentlyExpanded = this.state.expandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            this.state.expandedRows.filter(id => id !== rowId) :
            this.state.expandedRows.concat(rowId);

        this.setState({expandedRows : newExpandedRows});
    }

    changeRouteTime = () => {

    }

    renderItem(item) {
        const clickCallback = () => this.handleRowClick(item.id);

        const itemRows = [
            <tr onClick={clickCallback} key={"row-data-" + item.id}>
                <td>{item.origin}</td>
                <td>{item.destination}</td>
            </tr>
        ];

        let subRoutes = []


        if(this.state.expandedRows.includes(item.id)) {

            item.routes.forEach(function(elem){
                console.log()

                let startTime = new Date(elem.startTime)
                let stTodayTime = startTime.getHours() + " : " + startTime.getMinutes()
                let stYearMonth = startTime.getFullYear() + " " + this.state.mapToWord[startTime.getMonth()]

                let endTime = new Date(elem.endTime)
                let enTodayTime = endTime.getHours() + " : " + endTime.getMinutes()
                let enYearMonth = endTime.getFullYear() + " " + this.state.mapToWord[endTime.getMonth()]

                if (startTime.getMinutes() === 0){
                    stTodayTime += "0"
                }

                if (endTime.getMinutes() === 0){
                    enTodayTime += "0"
                }


                subRoutes.push(
                    <tr>
                        <td className = "left aligned">
                            <h7 className = "ui header">
                                {stTodayTime}
                                <span className = "sub header">
                                    {startTime.getFullYear()}
                                </span>
                                <span className = "sub header">
                                    {this.state.mapToWord[endTime.getMonth()]}
                                </span>
                                <span className = "sub header">
                                    {elem.origin}
                                </span>
                            </h7>
                        </td>

                        <td className = "center aligned">
                            <h6 className = "ui header">
                                {elem.duration}
                            </h6>
                        </td>

                        <td className = "right aligned">
                            <h7 className = "ui header">
                                {enTodayTime}
                                <span className = "sub header">
                                    {endTime.getFullYear()}
                                </span>
                                <span className = "sub header">
                                    {this.state.mapToWord[endTime.getMonth()]}
                                </span>
                                <span className = "sub header">
                                    {elem.destination}
                                </span>
                            </h7>

                        </td>
                        <td>
                            <RouteModalForm></RouteModalForm>
                        </td>
                    </tr>
                );
            }.bind(this))
        }

        let subRouteTable = [
            <div>
                <table className="table mt-2 container">
                    <thead className="thead-light">
                    <tr>
                        <th className="left aligned" scope="col">Start Destination</th>
                        <th className="center aligned" scope="col">Duration</th>
                        <th className="right aligned" scope="col">End Destination</th>
                        <th className="right aligned" scope="col">Change Time</th>
                    </tr>
                    </thead>
                    <tbody>{subRoutes}</tbody>
                </table>
                <Button className = "btn-danger mt-2 mb-4">Delete Whole Route</Button>
            </div>
        ]

        if (subRoutes.length !== 0)
            itemRows.push(subRouteTable)
        return itemRows;
    }

    render() {
        let allItemRows = [];

        this.state.routes.forEach(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return (
            <div className = 'container'>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th className="col-set-width left aligned" scope="col">Start Destination</th>
                        <th className="col-set-width center aligned" scope="col">End Destination</th>
                    </tr>
                    </thead>
                    <tbody>{allItemRows}</tbody>
                </table>
            </div>
        );
    }
}
export default Routes;