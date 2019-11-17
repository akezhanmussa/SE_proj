import React, {Component} from 'react';
import CreateTicketForAgent from './CreateTicketForAgent';
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
};

class AgentProfile extends Component{


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
                    <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings"
                       role="tab" aria-controls="v-pills-settings" aria-selected="false">My tickets</a>
                </div>
                <div className="offset-1 tab-content col-8" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                         aria-labelledby="v-pills-home-tab">Profile
                    </div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel"
                         aria-labelledby="v-pills-profile-tab">...
                    </div>
                    <div className="tab-pane fade" id="v-pills-create-ticket" role="tabpanel"
                         aria-labelledby="v-pills-messages-tab">
                        <CreateTicket/>
                    </div>
                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel"
                         aria-labelledby="v-pills-settings-tab">
                        <button onClick={()=>console.log("fasd")}>
                            adsfsd
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AgentProfile;