import React, {Component} from "react";
import {locations} from "../../shared/Locations";

class RenderTickets extends Component{
    render() {
        const intToStr = (id) => {
            return locations.filter(loc => id === parseInt(loc.id))[0].name;
        };
        const tickets = this.props.tickets.map((ticket, idx) => {
            return(
                <div className='row mt-1' key={idx} style={{borderBottom: "1px solid #E7E7E7"}}>
                    <div className='col-3'>
                        <p style={{textAlign:"center"}}><b>{intToStr(ticket.idOrigin)}</b></p>
                        <p style={{textAlign:"center"}}>{ticket.startDate}</p>
                    </div>
                    <div className='col-3'>
                        <p style={{textAlign:"center"}}><b>{intToStr(ticket.idDestination)}</b></p>
                        <p style={{textAlign:"center"}}>{ticket.endDate}</p>
                    </div>
                    <div className='col-3'>
                        <p style={{textAlign:"center"}}>{ticket.ownerFirstName + " " + ticket.ownerLastName}</p>
                        <p style={{textAlign:"center"}}>{ticket.ownerDocumentId}</p>
                    </div>
                    <div className='col-3 d-flex justify-content-center'>
                        {
                            this.props.pull ?
                                <button className='btn btn-light' onClick={() => this.props.pullOneTicket(ticket.ticketID)}> Pull One</button>
                                :
                                <div>
                                    <button className='btn btn-success' style={{width: 100}} onClick={() => this.props.approveTicket(ticket.ticketID, true)}> Approve</button>
                                    <button className='btn btn-danger' style={{width: 100}} onClick={() => this.props.approveTicket(ticket.ticketID, false)}> Decline</button>
                                </div>
                        }
                    </div>
                </div>
            );
        });
        return (
            <div className='mt-2'>
                <div className='row mt-1' style={{borderBottom: "1px solid #E7E7E7"}}>
                    <div className='col-3'>
                        <p style={{textAlign: "center"}}><b>Origin and start date</b></p>
                    </div>
                    <div className='col-3'>
                        <p style={{textAlign: "center"}}><b>Destination and end date</b></p>
                    </div>
                    <div className='col-3'>
                        <p style={{textAlign: "center"}}><b>Owner name and ID</b></p>
                    </div>
                    <div className='col-3'>
                        <p style={{textAlign: "center"}}><b>You need to act</b></p>
                    </div>
                </div>
                {tickets}
            </div>
        );
    }
}

export default RenderTickets;