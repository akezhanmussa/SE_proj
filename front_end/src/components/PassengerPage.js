import React, {Component} from 'react';
import {baseUrl} from "../shared/BaseUrl";
import {Button} from "react-bootstrap";

const getPassengerData = (passenger) => {
    console.log(passenger)
    let body = {idPassenger: passenger.token};
    return fetch(baseUrl + '/gettickets', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(body)
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

class PassengerPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            passengerTickets: []
        }
    }


    componentDidMount() {
        getPassengerData(this.props.passenger)
            .then(response => this.setState({passengerTickets: response}))
            .catch(err => console.log("err"));
    }

    finishSession = () => {
        this.props.logout();
        this.props.goHome();
    };


    render() {
        return(
            <div>
                {this.state.passengerTickets.length > 0 ?
                <RenderTickets passengerTickets={this.state.passengerTickets}/>
                : <div></div>}
                <Button className='btn-secondary' onClick = {() => this.finishSession()}>Logout</Button>
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
            </tr>
        rows.push(newRow)
    }
    return(
        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Document</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

export default PassengerPage;