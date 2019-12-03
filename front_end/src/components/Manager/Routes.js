import React, {Component} from 'react';
import {getRoutesUrl,updateSubRouteUrl,deleteWholeRouteUrl} from "../../shared/BaseUrl";
import {Button, Form} from "react-bootstrap"
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import DatePicker from 'react-datepicker'
import {Loading} from "../../shared/Loading";


var dateFormat = require('dateformat');


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

const getParsedDate = (date) =>{
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10)dd='0'+dd
    if(mm<10)mm='0'+mm
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
};

class RouteModalForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            isModalOpen:false,
            origin:props.origin,
            destination:props.destination,
            newStartTime:new Date(),
            newEndTime:new Date(),
            routeId:this.props.routeId,
            hiddenMessage: "",
            color:"red"
        }


        this.handleNewStartTime = this.handleNewStartTime.bind(this)
        this.handleNewEndTime = this.handleNewEndTime.bind(this)
        this.actModal = this.actModal.bind(this)
    }

    actModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleNewStartTime= (newStartTime) => {
        this.setState({newStartTime})
    };

    handleNewEndTime = (newEndTime) => {
        this.setState({newEndTime})
    };



    handleSubRoute = () => {

        let newStartTime = getParsedDate(this.state.newStartTime) + " 00:00:00"
        let newEndTime = getParsedDate(this.state.newEndTime) + " 00:00:00"

        console.log(this.state.routeId + " " + newStartTime + " " + newEndTime)

        let body = {"token":localStorage.getItem("admin_token"), "routeId":this.state.routeId, "startTime":newStartTime, "endTime":newEndTime}

        updateOrGet(updateSubRouteUrl,body,"POST").then(res => {
            console.log("HERE")
            this.props.fetchRoutes()
            this.setState({hiddenMessage:"The subroute was updated successfully"})
            this.setState({color:"green"})
        }).catch(error => {
            this.setState({hiddenMessage:"Can't update the sub route, time clash"})
            this.setState({color:"red"})
        })
    }

    render(){
        const hiddenMessageStyle = {color:this.state.color};

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
                                        <DatePicker className='ml-2' selected = {this.state.newStartTime} onChange={this.handleNewStartTime} />
                                    </Form.Row>
                                    <Form.Row>
                                        <p className="mt-3 ml-2">
                                            New End Time
                                        </p>
                                        <DatePicker className='mt-3 ml-3 mr-2' selected = {this.state.newEndTime} onChange={this.handleNewEndTime} />
                                    </Form.Row>
                                </Form>
                            </div>
                            <div className = 'line'></div>
                            <h8 className = "ml-2 mt-2" style = {hiddenMessageStyle}>{this.state.hiddenMessage}</h8>
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
    constructor(props) {
        super(props);

        this.state = {
            routes : [],
            expandedRows : [],
            id:"",
            mapToWord:{"1":"January","2":"February","3":"March","10":"October", "9":"September", "11":"November","8":"August"},
            isLoading:false
        };

        this.deleteWholeRoute = this.deleteWholeRoute.bind(this)
        this.handleFetchRoutes = this.handleFetchRoutes.bind(this)
    }

    fetchRoute(){
        let bodyToken = {"token":localStorage.getItem("admin_token")}
        updateOrGet(getRoutesUrl, bodyToken,"POST").then(res =>{
                console.log("The routes archieved")
                console.log(res)
                console.log("-------------------")
                this.setState({routes:res})
            }
        ).catch(error =>
            {
                throw error
            }
        )
    }

    componentDidMount() {
       this.fetchRoute()
    }

    handleRowClick(rowId) {
        const isRowCurrentlyExpanded = this.state.expandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            this.state.expandedRows.filter(id => id !== rowId) :
            this.state.expandedRows.concat(rowId);

        this.setState({expandedRows : newExpandedRows});
    }

    handleFetchRoutes(){
        this.fetchRoute()
    }

    deleteWholeRoute = () => {
        let bodyToken = {"token":localStorage.getItem("admin_token"),"scheduleId":this.state.id}
        updateOrGet(deleteWholeRouteUrl, bodyToken, "POST").then(res =>{
            this.setState({isLoading:true})
            updateOrGet(getRoutesUrl, bodyToken,"POST").then(res =>{
                this.setState({routes:res})
                this.setState({isLoading:false})
                }
            ).catch(error =>
                {
                    this.setState({isLoading:false})
                    throw error
                }
            )
        }).catch(e =>{
            throw e
        })
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
                                    {this.state.mapToWord[endTime.getMonth()] + " " + endTime.getDay()}
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
                                    {this.state.mapToWord[endTime.getMonth()] + " " + endTime.getDay()}
                                </span>
                                <span className = "sub header">
                                    {elem.destination}
                                </span>
                            </h7>

                        </td>
                        <td>
                            <RouteModalForm fetchRoutes = {() => this.handleFetchRoutes()} routeId ={elem.routeId}></RouteModalForm>
                        </td>
                    </tr>
                );
            }.bind(this))
        }

        if (this.state.id === ""){
            this.setState({id:item.id})
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
                {this.state.isLoading ? <Loading></Loading> : <div></div>}
                <Button className = "btn-danger mt-2 mb-4" onClick={this.deleteWholeRoute}>Delete Whole Route</Button>
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