import React, {Component} from 'react';
import CreateTicket from './CreateTicket';
import Profile from './Profile';
import MyTickets from './MyTickets';
import TicketPool from './TicketPool';

class AgentPage extends Component{
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
        console.log(this.state);
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
                <div className="col-2 nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home"
                       role="tab" aria-controls="v-pills-home" aria-selected="true">Profile</a>
                    <a className="nav-link" id="v-pills-create-ticket-tab" data-toggle="pill" href="#v-pills-create-ticket"
                       role="tab" aria-controls="v-pills-create-ticket" aria-selected="false">Create ticket</a>
                    <a className="nav-link" id="v-pills-my-tickets-tab" data-toggle="pill" href="#v-pills-my-tickets"
                       role="tab" aria-controls="v-pills-settings" aria-selected="false">My tickets</a>
                    <a className="nav-link" id="v-pills-ticket-pull-tab" data-toggle="pill" href="#v-pills-ticket-pull"
                       role="tab" aria-controls="v-pills-settings" aria-selected="false">Ticket Pull</a>
                </div>
                <div className="offset-1 tab-content col-9" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                         aria-labelledby="v-pills-home-tab">
                        <Profile profile={this.state.profile} fetchProfile={this.fetchProfile} admin={this.props.admin}/>
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

export default AgentPage;