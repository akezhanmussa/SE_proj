import React, {Component} from 'react';
import CreateTicketForAgent from './CreateTicketForAgent';
import {Loading} from "./Loading";
import {baseUrl, getInfoUrl} from "../shared/BaseUrl";
import RoutesTable from "./RoutesTable";
import {locations} from "../shared/Locations";
import {Form, FormGroup, Input, Label} from "reactstrap";
class CreateTicket extends Component{
    constructor(props){
        super(props);
        this.collectData = this.collectData.bind(this);
    }
    collectData = (body) => {
        body.owner_document_id = this.docId.value;
        body.owner_document_type = this.doctype.value;
        body.owner_firstname = this.firstame.value;
        body.owner_lastname = this.lastname.value;
        body.token = this.props.admin.admin_token;
        console.log(body);
        return fetch(baseUrl + '/agent/buy-ticket', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log(response)
                if(response.ok) {
                    alert("Thanks, your request is submitted. Wait for approving");
                }else{
                    var error = new Error("Error " + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .catch (error => {
                alert(error + "\nTry again");
            });
    };
    render() {
        return (
            <div className='mt-2'>
                <Form>
                    <div className='row'>
                        <FormGroup className='col-6'>
                            <Label for='firstname'>
                                Firstname
                            </Label>
                            <Input type="text" id="firstname" name="firstname"
                                   innerRef={(input) => this.firstame = input}/>
                        </FormGroup>
                        <FormGroup className='col-6'>
                            <Label for='lastname'>
                                Lastname
                            </Label>
                            <Input type="text" id="lastname" name="lastname"
                                   innerRef={(input) => this.lastname = input}/>
                        </FormGroup>
                    </div>
                    <div className='row'>
                        <FormGroup className='col-6'>
                            <Label for="doctype">Select document type</Label>
                            <Input type="select" name="select" id="doctype" innerRef={(input) => this.doctype = input}>
                                <option>National Id</option>
                                <option>Passport</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className='col-6'>
                            <Label for='docId'>
                                Enter ID of your document
                            </Label>
                            <Input type="text" id="docId" name="docId"
                                   innerRef={(input) => this.docId = input}/>
                        </FormGroup>
                    </div>
                    {/*<div className='row mr-auto'>*/}
                    {/*    <button className='btn btn-secondary ml-auto mb-2' onClick={this.handleSubmit}>Buy ticket*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </Form>
                <CreateTicketForAgent collectData={this.collectData}/>
            </div>
        );
    }
}


class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            errMess: null
        }
    }
    componentDidMount() {
        if(!this.props.profile){
            this.setState({isLoading: true});
            fetch(baseUrl, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(this.props.admin.admin_token)
            })
                .then(res => res.json())
                .then(res => {
                    this.props.fetchProfile(res.body);
                    this.setState({isLoading: false});
                })
                .catch(error => {
                    this.setState({isLoading: false});
                    this.setState({errMess: error.message});
                })
        }
    }

    render() {
        if(this.state.isLoading){
            return <Loading/>;
        }else if(this.state.errMess) {
            return (
                <div>{this.state.errMess}</div>
            );
        }
        else{
            return (
                <div>

                </div>
            );
        }
    }

}
class TicketPool extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            errMess: null
        };
        this.pullOneTicket = this.pullOneTicket.bind(this);
    }
    componentDidMount() {
        if(this.props.pullTickets.length === 0){
            this.setState({isLoading: true});
            fetch(baseUrl + "/agent/get-unapproved-tickets", {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({token: this.props.admin.admin_token})
            })
                .then(res => res.json())
                .then(res => {
                    this.props.fetchPullTicket(res);
                    this.setState({isLoading: false});
                })
                .catch(error => {
                    this.setState({isLoading: false});
                    this.setState({errMess: error.message});
                })
        }
    }

    pullOneTicket = (id) => {
        alert("Wait please!!!");
        this.setState({isLoading: true});
        fetch(baseUrl + "/agent/assign-ticket", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({token: this.props.admin.admin_token, ticketID: id})
        })
            .then(res => res.json())
            .then(res => {
                if(res.status !== "success"){
                    var error = new Error("Error " + res.status);
                    error.response = res;
                    throw error;
                }
                this.props.fetchPullTicket(res.data);
                this.setState({isLoading: false});
                fetch(baseUrl + "/agent/get-agent-ticket", {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body:JSON.stringify({token: this.props.admin.admin_token})
                })
                    .then(res => res.json())
                    .then(res => {
                        this.props.fetchMyTickets(res);
                    })
                    .catch(error => {})
            })
            .catch(error => {
                this.setState({isLoading: false});
                this.setState({errMess: error.message});
            });
    };
    render() {
        if(this.state.isLoading){
            return <Loading/>;
        }else if(this.state.errMess) {
            return (
                <div>{this.state.errMess}</div>
            );
        }
        else{
            return (
                <RenderTickets tickets={this.props.pullTickets} pullOneTicket={this.pullOneTicket} pull={true}/>
            );
        }
    }
}
class MyTickets extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            errMess: null
        };
        this.approveTicket = this.approveTicket.bind(this);
    }
    componentDidMount() {
        if(this.props.myTickets.length === 0){
            this.setState({isLoading: true});
            fetch(baseUrl + "/agent/get-agent-ticket", {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({token: this.props.admin.admin_token})
            })
                .then(res => res.json())
                .then(res => {
                    this.props.fetchMyTickets(res);
                    this.setState({isLoading: false});
                })
                .catch(error => {
                    this.setState({isLoading: false});
                    this.setState({errMess: error.message});
                })
        }
    }

    approveTicket = (id, st) => {
        alert("Wait please!!!");
        this.setState({isLoading: true});
        fetch(baseUrl + "/ticket/update-status", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({token: this.props.admin.admin_token, ticketID: id, isApproved: st})
        })
            .then(res => res.json())
            .then(res => {
                this.props.fetchMyTickets(res);
                this.setState({isLoading: false});
            })
            .catch(error => {
                this.setState({isLoading: false});
                this.setState({errMess: error.message});
            })

    };
    render() {
        if(this.state.isLoading){
            return <Loading/>;
        }else if(this.state.errMess) {
            return (
                <div>{this.state.errMess}</div>
            );
        }
        else{
            return (
                <RenderTickets tickets={this.props.myTickets} approveTicket={this.approveTicket} pull={false}/>
            );
        }
    }

}
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


class AgentProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            profile: null,
            pullTickets: [],
            myTickets: []
        };
        this.fetchProfile = this.fetchProfile.bind(this);
        this.fetchPullTicket = this.fetchPullTicket.bind(this);
        this.fetchMyTickets = this.fetchMyTickets.bind(this);
    }

    fetchProfile = (profile)=> {
        this.setState(prevState => ({
            ...prevState,
            profile: profile
        }));
    };

    fetchPullTicket = (pull)=> {
        this.setState(prevState => ({
            ...prevState,
            pullTickets: pull
        }));
    };

    fetchMyTickets = (tickets)=> {
        this.setState(prevState => ({
            ...prevState,
            myTickets: tickets
        }));
    };


    render() {
        return (
            <div className= 'container d-flex' >
                <div className="col-3 nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home"
                       role="tab" aria-controls="v-pills-home" aria-selected="true">Profile</a>
                    <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile"
                       role="tab" aria-controls="v-pills-profile" aria-selected="false">Update Profile</a>
                    <a className="nav-link" id="v-pills-create-ticket-tab" data-toggle="pill" href="#v-pills-create-ticket"
                       role="tab" aria-controls="v-pills-create-ticket" aria-selected="false">Create ticket</a>
                    <a className="nav-link" id="v-pills-my-tickets-tab" data-toggle="pill" href="#v-pills-my-tickets"
                       role="tab" aria-controls="v-pills-settings" aria-selected="false">My tickets</a>
                    <a className="nav-link" id="v-pills-ticket-pull-tab" data-toggle="pill" href="#v-pills-ticket-pull"
                       role="tab" aria-controls="v-pills-settings" aria-selected="false">Ticket Pull</a>
                </div>
                <div className="offset-1 tab-content col-8" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                         aria-labelledby="v-pills-home-tab">
                        <Profile profile={this.state.profile} fetchPfofile={this.fetchProfile} admin={this.props.admin}/>
                    </div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel"
                         aria-labelledby="v-pills-profile-tab">...
                    </div>
                    <div className="tab-pane fade" id="v-pills-create-ticket" role="tabpanel"
                         aria-labelledby="v-pills-messages-tab">
                        <CreateTicket admin={this.props.admin}/>
                    </div>
                    <div className="tab-pane fade" id="v-pills-my-tickets" role="tabpanel"
                         aria-labelledby="v-pills-my-tickets-tab">
                        <MyTickets fetchMyTickets={this.fetchMyTickets} myTickets={this.state.myTickets} admin={this.props.admin}/>
                    </div>
                    <div className="tab-pane fade" id="v-pills-ticket-pull" role="tabpanel"
                         aria-labelledby="v-pills-ticket-pull-tab">
                        <TicketPool pullTickets={this.state.pullTickets} fetchPullTicket={this.fetchPullTicket} admin={this.props.admin} fetchMyTickets={this.fetchMyTickets}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AgentProfile;