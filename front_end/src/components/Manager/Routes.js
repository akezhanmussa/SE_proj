import React, {Component} from 'react';



const RenderTickets = (props) => {
    const rows = [];
    for(let i = 0; i < props.routes.length; i++){
        let newRow =
            <tr key={i}>
                <td>
                    {i + 1}
                </td>
                <td>
                    {props.routes[i].ownerFirstName + " " + props.passengerTickets[i].ownerLastName}
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
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    );
};


class Routes extends Component{
    constructor(props){
        super(props)
        this.state = {
            routes: []
        }

    }

    render(){
        return(
            <div>

            </div>
        )
    }
}



export default Routes;