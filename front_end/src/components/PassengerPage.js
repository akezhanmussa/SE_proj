import React, {Component} from 'react';
import {baseUrl} from "../shared/BaseUrl";
import {Button} from "react-bootstrap";

// const getPassengerData = (passenger) => {
//     let body = {passengerId: passenger.token};
//     return fetch(baseUrl + '/buyticket', {
//         method: 'POST',
//         headers: {'Content-Type':'application/json'},
//         body: JSON.stringify(body)
//     })
//         .then(response => {
//             console.log(response)
//             if(response.ok){
//                 return response.json();
//             }
//             else{
//                 var error = new Error("Error " + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         })
//         .catch (error => console.log("Error"));
// };

class PassengerPage extends Component{
    componentDidMount() {
        // getPassengerData(this.props.passenger)
        //     .then(response => this.passengerTickets = response)
        //     .catch(err => console.log("err"));
    }

    finishSession = () => {
        this.props.logout();
        this.props.goHome();
    }


    render() {
        return(
            <div>
                {/*{this.passengerTickets}*/}
                <Button className='btn-secondary' onClick = {() => this.finishSession()}>Logout</Button>
            </div>
        );
    }
}

export default PassengerPage;