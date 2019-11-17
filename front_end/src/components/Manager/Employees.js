import React, {Component} from 'react';
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import ManagerProfile from "./ManagerProfile";
import {getAgentsUrl, getStationWorkersUrl} from "../../shared/BaseUrl";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {Form} from "react-bootstrap";
import FieldComponent from "./FieldComponent";


const fetchEmployee = (type) => {

    let targetUrl = type === "station_worker" ? getStationWorkersUrl : getAgentsUrl;
    let body = {"token":localStorage.getItem("admin_token")}

    return fetch(targetUrl, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(body)
    })
        .then(response => {
            return response.json();
        })
        .then(response => {
            return response;
        })
        .catch (error => {
            throw error
        });
}

class EmployeeUpdate extends Component {
    constructor(props){
        super(props)

        this.state = {
            isModalOpen: false,
            workingHours:0,
            salary:0.0
        }

        this.handleAttribute = this.handleAttribute.bind(this)
        this.actModal = this.actModal(this)
    }

    actModal(){
        console.log("I am called in the MODAL")
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleAttribute = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render(){

        let fields = [
            {"name": "workingHours", "placeholder": "Working Hours", "value": this.state.workingHours},
            {"name": "salary", "placeholder": "Salary", "value": this.state.salary}
        ]

        let rows = []

        fields.forEach(elem => {
                rows.push( <FieldComponent typeForm = {"number"}
                                           name = {elem.name}
                                           placeholder = {elem.placeholder}
                                           value = {elem.value}
                                           onChange = {this.handleAttribute}>
                            </FieldComponent>)
            }
        )

        return(
            <div>
                <button className='ui header btn-light' onClick={this.actModal}>Salary/Hours</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.actModal}>
                    <div>
                        <ModalBody>
                            <ModalHeader>
                                <h4>
                                    Salary/Hours Update
                                </h4>
                            </ModalHeader>
                            <Form>
                                <Form.Row>
                                    {rows}
                                </Form.Row>
                            </Form>
                        </ModalBody>
                    </div>
                </Modal>
            </div>
        )
    }
}

const EmployeeTable = (props) => {

    let attributes = []
    let rows = []

    if (props.isworker){
        props.workerAttributes.forEach(elem =>{
            attributes.push(<th className="col-set-width" scope="col">{elem}</th>)
        })
        props.workers.forEach(worker =>{
            rows.push(
                <tr>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.firstName}
                        </h6>
                    </td>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.lastName}
                        </h6>
                    </td>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.salary}
                        </h6>
                    </td>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.stationId}
                        </h6>
                    </td>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.stationWorkerId}
                        </h6>
                    </td>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.workingHours}
                        </h6>
                    </td>
                    <td>
                        <EmployeeUpdate></EmployeeUpdate>
                    </td>
                </tr>
            )
        })
    }else{
        props.agentAttributes.forEach(elem =>{
            attributes.push(<th className="col-set-width" scope="col">{elem}</th>)
        })
        props.agents.forEach(worker =>{
            rows.push(
                <tr>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.firstName}
                        </h6>
                    </td>

                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.lastName}
                        </h6>
                    </td>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.salary}
                        </h6>
                    </td>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.stationId}
                        </h6>
                    </td>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.idAgent}
                        </h6>
                    </td>
                    <td className = "center aligned">
                        <h6 className = "ui header ml-4">
                            {worker.workingHours}
                        </h6>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className = 'container'>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    {attributes}
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}


class Employees extends Component{

    constructor(props){
        super(props)
        this.state = {
            workerAttributes:["First Name", "Last Name","Salary","Station Id","Station Worker Id","Working Hours","Update"],
            agentAttributes:["First Name","Last Name","Salary","Station Id","Agent Id", "Working Hours"],
            workers:[],
            agents:[],
            checked:false
        }
    }

    componentDidMount() {
        ["station_worker","agent"].forEach(function (elem) {
            console.log(elem)
            fetchEmployee(elem).then(res =>{
                if (elem === "station_worker"){
                    console.log(res)
                    this.setState({workers:res})
                }else{
                    this.setState({agents:res})
                }
                // this.setState({workers:res})
            }).catch(err =>{
                console.log(err)
            })
        }.bind(this))
    }

    render(){

        return(
            <div>
                <div className="mt-4 mb-4 ml-3">
                    <BootstrapSwitchButton onChange={(checked) => {this.setState({ checked: checked})}} onstyle = "secondary" width = {100} onlabel='Station Workers' offlabel='Agents' checked={false}/>
                </div>
                <EmployeeTable isworker = {this.state.checked}
                               workerAttributes = {this.state.workerAttributes}
                               agentAttributes = {this.state.agentAttributes}
                               workers = {this.state.workers}
                               agents = {this.state.agents}
                ></EmployeeTable>
            </div>
        )
    }
}

export default Employees;