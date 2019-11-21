import React, {Component} from 'react';
import {Loading} from "../../shared/Loading";
import {baseUrl} from "../../shared/BaseUrl";
import {locations} from "../../shared/Locations";

class PrintTicket extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            errMess: null,
            ticket: {
                startDate: "2018-12-12",
                endDate: "2018-12-12",
                idOrigin: 3,
                idDestination: 4,
                ownerFirstName:"Izat",
                ownerLastName:"Khamiyev",
                ownerDocumentType: "Passport",
                ownerDocumentId: "123444"
            }
        };
    }

    componentDidMount() {
        const toDict = {userToken: this.props.loginUser.token, agentToken: this.props.admin.admin_token, ticketID: this.props.id};
        this.setState({isLoading: true});
        console.log(JSON.stringify(toDict));
        return fetch(baseUrl + '/user/fetch-ticket', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(toDict)
        })
            .then(res => {
                console.log(res)
                if(res.ok)
                    return res.json();
                else {
                    throw new Error("Error " + res.status)
                }
            })
            .then(response => {
                console.log(response);
                this.setState({ticket: response});
                this.setState({isLoading: false});
            })
            .catch (error => {
                console.log(error)
                this.setState({isLoading: false});
                this.setState({errMess: error.message});
            });
    }

    render() {
        const intToStr = (id) => {
            return locations.filter(loc => id === parseInt(loc.id))[0].name;
        };
        if(this.state.isLoading)
            return (<Loading/>);
        else if(this.state.errMess){
            return (<div>{this.state.errMess}</div>);
        }else{
            return (
                <div style={{backgroundColor: 'rgba(255, 255, 255, .95)'}}>
                    <div className='container mt-3'>
                        <div className='row' style={{height:"80px"}}>
                            <div className='col-4 d-flex justify-content-center align-items-center' style={{borderRight: '2px solid blue', borderBottom:"1px solid blue"}}>
                                <i className="fa fa-check" style={{fontSize:"30px", color:"green" }}></i>
                                <h4>Train selected</h4>
                            </div>
                            <div className='col-4 d-flex justify-content-center align-items-center' style={{borderRight: '2px solid blue', borderBottom:"1px solid blue"}}>
                                <i className="fa fa-check" style={{fontSize:"30px", color:"green" }}></i>
                                <h4>Place reserved</h4>
                            </div>
                            <div className='col-4 d-flex justify-content-center align-items-center' style={{borderBottom:"1px solid blue"}}>
                                <i className="fa fa-check" style={{fontSize:"30px", color:"green" }}></i>
                                <h4>Checkout</h4>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <h3>{intToStr(this.state.ticket.idOrigin)} -> {intToStr(this.state.ticket.idDestination)}</h3>
                            <div className='container' style={{border:"1px solid #c2c4c3"}}>

                                <div className='row pt-2' style={{borderBottom:"1px solid #c2c4c3"}}>
                                    <div className='col-6'>
                                        <p>Start date</p>
                                    </div>
                                    <div className='col-6'>
                                        <p>{this.state.ticket.startDate}</p>
                                    </div>
                                </div>
                                <div className='row pt-2' style={{borderBottom:"1px solid #c2c4c3"}}>
                                    <div className='col-6'>
                                        <p>End date</p>
                                    </div>
                                    <div className='col-6'>
                                        <p>{this.state.ticket.endDate}</p>
                                    </div>
                                </div>
                                <div className='row pt-2' style={{borderBottom:"1px solid #c2c4c3"}}>
                                    <div className='col-6'>
                                        <p>Price</p>
                                    </div>
                                    <div className='col-6'>
                                        <p>{this.state.ticket.price}</p>
                                    </div>
                                </div>
                                <div className='row pt-2' style={{borderBottom:"1px solid #c2c4c3"}}>
                                    <div className='col-6'>
                                        <p>Status</p>
                                    </div>
                                    <div className='col-6'>
                                        <p>{this.state.ticket.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3 row'>
                            <h4>Passenger's personal information</h4>
                        </div>
                        <div className='mt-3 row' style={{backgroundColor:"#f3f4f5", border:"1px solid #c2c4c3"}}>
                            <div className='container' style={{border:"1px solid #c2c4c3"}}>
                                <div className='row pt-2'>
                                    <div className='col-6'>
                                        <p>Firstname and Lastname</p>
                                    </div>
                                    <div className='col-6'>
                                        <p>{this.state.ticket.ownerFirstName + " " + this.state.ticket.ownerLastName}</p>
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className='col-6'>
                                        <p>Document Type</p>
                                    </div>
                                    <div className='col-6'>
                                        <p>{this.state.ticket.ownerDocumentType}</p>
                                    </div>
                                </div>
                                <div className='row pt-2'>
                                    <div className='col-6'>
                                        <p>Document Id</p>
                                    </div>
                                    <div className='col-6'>
                                        <p>{this.state.ticket.ownerDocumentId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default PrintTicket;