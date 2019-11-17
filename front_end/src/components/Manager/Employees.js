import React, {Component} from 'react';
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import ManagerProfile from "./ManagerProfile";
import {getAgentsUrl, getStationWorkersUrl} from "../../shared/BaseUrl";


const fetchEmployee = (type) => {

    let targetUrl = type === "station_worker" ? getStationWorkersUrl : getAgentsUrl;
    console.log(targetUrl)
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

const EmployeeTable = (props) => {

    let attributes = []

    if (props.isworker){
        props.workerAttributes.forEach(elem =>{
            attributes.push(<th className="col-set-width" scope="col">{elem}</th>)
        })
    }else{
        props.agentAttributes.forEach(elem =>{
            attributes.push(<th className="col-set-width" scope="col">{elem}</th>)
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
                </tbody>
            </table>
        </div>
    )
}


class Employees extends Component{

    constructor(props){
        super(props)
        this.state = {
            workerAttributes:["Salary","Station id","Working Hours"],
            agentAttributes:["First Name","Second Name","username"],
            checked:false
        }
    }

    componentDidMount() {
        fetchEmployee("station_worker").then(res =>{
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
    }

    render(){

        return(
            <div>
                <div className="mt-4 mb-4 ml-3">
                    <BootstrapSwitchButton onChange={(checked) => {this.setState({ checked: checked})}} onstyle = "secondary" width = {100} onlabel='Station Workers' offlabel='Agents' checked={false}/>
                </div>
                <EmployeeTable isworker = {this.state.checked} workerAttributes = {this.state.workerAttributes} agentAttributes = {this.state.agentAttributes}></EmployeeTable>
            </div>
        )
    }
}

export default Employees;