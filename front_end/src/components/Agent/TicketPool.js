import React, {Component} from "react";
import {baseUrl} from "../../shared/BaseUrl";
import {Loading} from "../../shared/Loading";
import RenderTickets from './RenderTickets';

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
                .then(res => {
                    if(res.ok)
                        return res.json();
                    else {
                        throw new Error("Error " + res.status)
                    }
                })
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
export default TicketPool;