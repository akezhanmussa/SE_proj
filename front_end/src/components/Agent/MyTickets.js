import React, {Component} from "react";
import {baseUrl} from "../../shared/BaseUrl";
import {Loading} from "../../shared/Loading";
import RenderTickets from './RenderTickets';


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
                .then(res => {
                    if(res.ok)
                        return res.json();
                    else {
                        throw new Error("Error " + res.status)
                    }
                })
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

export default MyTickets;
