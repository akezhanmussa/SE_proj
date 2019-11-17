import React, {Component} from 'react';
import CreateTicketForAgent from './CreateTicketForAgent';
import {Loading} from "./Loading";
import {baseUrl, getInfoUrl} from "../shared/BaseUrl";
import RoutesTable from "./RoutesTable";
import {locations} from "../shared/Locations";
class CreateTicket extends Component{
    constructor(props){
        super(props);
        this.collectData = this.collectData.bind(this);
    }
    collectData = (body) => {
        console.log(body)
    };
    render() {
        return (
            <CreateTicketForAgent collectData={this.collectData}/>
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
        }
    }
    componentDidMount() {
        if(this.props.pullTickets.length === 0){
            this.setState({isLoading: true});
            fetch(baseUrl, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(this.props.admin.admin_token)
            })
                .then(res => res.json())
                .then(res => {
                    this.props.fetchPullTicket(res.body);
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
                <RenderTickets tickets={this.props.pullTickets} pull={true}/>
            );
        }
    }
}
const RenderTickets = (props) => {
    const intToStr = (id) => {
        return locations.filter(loc => id === parseInt(loc.id))[0].name;
    };
    const tickets = props.tickets.map((ticket, idx) => {
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
                <div>

                </div>
            </div>
        );
    });
    return(
        <div className='mt-2'>
            <div className='row mt-1' style={{borderBottom: "1px solid #E7E7E7"}}>
                <div className='col-3'>
                    <p style={{textAlign:"center"}}><b>Origin and start date</b></p>
                </div>
                <div className='col-3'>
                    <p style={{textAlign:"center"}}><b>Destination and end date</b></p>
                </div>
                <div className='col-3'>
                    <p style={{textAlign:"center"}}><b>Owner name and ID</b></p>
                </div>
                <div>
                    <p style={{textAlign:"center"}}><b>You need to act</b></p>
                </div>
            </div>
            {tickets}
        </div>
    );
};

class AgentProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            profile: null,
            pullTickets: [{"idOrigin": 3,"idDestination": 7, "startDate":"2019","endDate":"2019", "ownerFirstName":"izat", "ownerLastName":"izat", "ownerDocumentId":12},
                {"idOrigin": 3,"idDestination": 7, "startDate":"2019","endDate":"2019", "ownerFirstName":"izat", "ownerLastName":"izat", "ownerDocumentId":12}]
        };
        this.fetchProfile = this.fetchProfile.bind(this);
        this.fetchPullTicket = this.fetchPullTicket.bind(this);
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

    render() {
        return (
            <div className= 'container d-flex'>
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
                       role="tab" aria-controls="v-pills-settings" aria-selected="false">Ticket Pool</a>
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
                        <CreateTicket/>
                    </div>
                    <div className="tab-pane fade" id="v-pills-my-tickets" role="tabpanel"
                         aria-labelledby="v-pills-my-tickets-tab">
                        <button onClick={()=>console.log("fasd")}>
                            adsfsd
                        </button>
                    </div>
                    <div className="tab-pane fade" id="v-pills-ticket-pull" role="tabpanel"
                         aria-labelledby="v-pills-ticket-pull-tab">
                        <TicketPool pullTickets={this.state.pullTickets} fetchPullTicket={this.fetchPullTicket} admin={this.props.admin}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AgentProfile;