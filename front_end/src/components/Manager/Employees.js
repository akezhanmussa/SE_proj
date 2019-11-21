import React, {Component} from 'react';
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import ManagerProfile from "./ManagerProfile";
import {getAgentsUrl, getStationWorkersUrl,updateAgentSalWorkUrl,updateWorkerSalWorkUrl} from "../../shared/BaseUrl";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {Form,Button} from "react-bootstrap";
import FieldComponent from "./FieldComponent";
import DatePicker from "react-datepicker";
import {Loading} from "../../shared/Loading";


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
            console.log(response)
            return response;
        })
        .catch (error => {
            throw error
        });
}


class EmployeeTable extends Component {

    constructor(props){
        super(props)

        this.state = {
            employees: [],
            expandedRows: [],
            salary:"",
            workingHours:"",
            id:"",
            isworker:"",
            isLoading:false,
            agents:[],
            workers:[]
        }

        this.handleAttribute = this.handleAttribute.bind(this)
        this.submitSalaryHours = this.submitSalaryHours.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
    }


    handleRowClick(rowId){
        const isRowCurrentlyExpanded = this.state.expandedRows.includes(rowId);

        const newExpandedRows = isRowCurrentlyExpanded ?
            this.state.expandedRows.filter(id => id !== rowId) :
            this.state.expandedRows.concat(rowId);

        this.setState({expandedRows : newExpandedRows});
    }


    submitSalaryHours = () => {

        const body = {"token":localStorage.getItem("admin_token"),"salary":this.state.salary,"workingHours":this.state.workingHours,"id":this.state.id}
        let mainUrl = this.props.isworker ? updateWorkerSalWorkUrl: updateAgentSalWorkUrl
        console.log("HERE IN THE METHOD")
        console.log(mainUrl)
        let type = this.props.isworker ? "station_worker" : "agent"
        this.setState({isLoading:true})
        updateOrGet(mainUrl, body, "POST").then(res => {
            console.log("EVERYTHING WAS UPDATED")
            fetchEmployee(type).then(res => {
                this.setState({isLoading:false})
                if (type === "agent"){
                    this.setState({agents:res})
                }else{
                    this.setState({workers:res})
                }
            }).catch(error => {
                this.setState({isLoading:false})
                throw error
            })
        }).catch(e => {
            console.log("ERROR")
            this.setState({isLoading:false})
        })

    }


    handleAttribute = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }


    renderItem(item, isworker){
        const id = isworker ? item.stationWorkerId : item.idAgent
        const clickCallback = () => this.handleRowClick(id);

        const rows = []

        if (isworker){
            rows.push(
                    <tr onClick = {clickCallback} key = {"worker-" + id}>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.firstName}
                            </h6>
                        </td>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.lastName}
                            </h6>
                        </td>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.salary}
                            </h6>
                        </td>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.workingHours}
                            </h6>
                        </td>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.stationId}
                            </h6>
                        </td>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.stationWorkerId}
                            </h6>
                        </td>
                    </tr>
                )

        }else{
                rows.push(
                    <tr onClick = {clickCallback} key = {"agent-worker-" + id}>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.firstName}
                            </h6>
                        </td>

                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.lastName}
                            </h6>
                        </td>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.salary}
                            </h6>
                        </td>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.workingHours}
                            </h6>
                        </td>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.stationId}
                            </h6>
                        </td>
                        <td className = "center aligned">
                            <h6 className = "ui header ml-4">
                                {item.idAgent}
                            </h6>
                        </td>
                    </tr>
                )
        }

        const buttons = []

        if(this.state.expandedRows.includes(id)){

            if (this.state.salary === ""){
                this.setState({salary:item.salary})
            }

            if (this.state.workingHours === ""){
                this.setState({workingHours:item.workingHours})
            }

            console.log("I am here")
            console.log(isworker)
            console.log(id)
            console.log(this.state.id)

            if (id === "" || id !== this.state.id){
                this.setState({id:id})
            }

            buttons.push(
                <div>
                    <Form>
                        <Form.Row>
                            <FieldComponent type = {'ml-4'} typeForm = {"number"} name = {"salary"} placeholder = {"Salary"} value = {this.state.salary} onChange = {this.handleAttribute} ></FieldComponent>
                            <FieldComponent type = {'ml-4'} typeForm = {"number"} name = {"workingHours"} placeholder = {"WorkingHours"} value = {this.state.workingHours} onChange = {this.handleAttribute} ></FieldComponent>
                            <Form.Group className = 'ml-4 mt-2 mb-4'>
                                {this.state.isLoading ? <Loading></Loading> : <div></div>}
                                <Button className = "btn-secondary" onClick = {this.submitSalaryHours}>Submit</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </div>
            )

        }

        if (buttons.length !== 0){
            rows.push(buttons)
        }

        return rows
    }


    render(){
        let attributes = []
        let rows = []
        console.log(this.state)

        if (this.props.isworker){
            this.props.workerAttributes.forEach(elem =>{
                attributes.push(<th className="col-set-width" scope="col">{elem}</th>)
            })

            //     renderItem(item, isworker, worker, agent){
            console.log("FDFDFDFD")
            console.log(this.state.workers)
            this.props.workers.forEach(worker =>{
                const itemRow = this.renderItem(worker, this.props.isworker)
                rows = rows.concat(itemRow)
            })
        }else{
            this.props.agentAttributes.forEach(elem =>{
                attributes.push(<th className="col-set-width" scope="col">{elem}</th>)
            })

            this.props.agents.forEach(agent =>{
                const itemRow = this.renderItem(agent, this.props.isworker)
                rows = rows.concat(itemRow)
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
}


class Employees extends Component{

    constructor(props){
        super(props)
        this.state = {
            workerAttributes:["First Name", "Last Name","Salary","Working Hours","Station Worker Id","Station Id"],
            agentAttributes:["First Name","Last Name","Salary","Working Hours","Station Id", "Agent Id"],
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
                    <BootstrapSwitchButton onChange={(checked) => {this.setState({ checked: checked})}} onstyle = "secondary" width = {100} onlabel='Workers' offlabel='Agents' checked={false}/>
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