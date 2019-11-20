import React, {Component} from "react";
import {baseUrl} from "../../shared/BaseUrl";
import {Loading} from "../Loading";

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

export default Profile;
