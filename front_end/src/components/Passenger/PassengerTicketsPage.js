import React, {Component} from 'react';
import {getTiketsUrl} from "../../shared/BaseUrl";
import {Button} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import {NavLink} from "react-router-dom"

const getPassengerData = (token) => {
    const toDict = {"token":token}
    return fetch(getTiketsUrl, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(toDict)
    })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                var error = new Error("Error " + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch (error => console.log("Error"));
};

class PassengerTicketsPage extends Component{

    constructor(props) {
            super(props);
            this.state = {
                passengerTickets: []
            }
    }


    componentDidMount() {
        getPassengerData(this.props.token)
            .then(response => {
                if (response.error)
                    throw response.error;
                this.setState({passengerTickets: response})
                console.log(response)
            })
            .catch(err => console.log("err"));
    }

    render() {
        return(
            <div style={{marginTop:30}}>
                {this.state.passengerTickets.length > 0 ?
                <RenderTickets passengerTickets={this.state.passengerTickets}/>
                : <div></div>}
            </div>
        );
    }
}

const RenderTickets = (props) => {
    const rows = [];
    for(let i = 0; i < props.passengerTickets.length; i++){
        let newRow =
            <tr key={i}>
                <td>
                    {i + 1}
                </td>
                <td>
                    {props.passengerTickets[i].ownerFirstName + " " + props.passengerTickets[i].ownerLastName}
                </td>
                <td>
                    {props.passengerTickets[i].ownerDocumentType + " " + props.passengerTickets[i].ownerDocumentId}
                </td>
                <td>
                    {props.passengerTickets[i].startDate}
                </td>

                <td>
                    {props.passengerTickets[i].endDate}
                </td>
                <td>
                    {props.passengerTickets[i].status}
                </td>
                <td>
                    <NavLink className='btn' to={'/home/print_ticket/' +props.passengerTickets[i].ticketID}>Print</NavLink>
                </td>
            </tr>
        rows.push(newRow)
    }
    return(
        <div className = 'container'>
        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Document</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Status</th>
                <th scope='col'>Print ticket</th>
            </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
        </div>
    );
};

export default withRouter(PassengerTicketsPage);