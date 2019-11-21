import React, {Component} from "react";
import {baseUrl} from "../../shared/BaseUrl";
import {Loading} from "../../shared/Loading";
import {Button, Form} from "react-bootstrap";

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            errMess: null
        }
    }
    componentDidMount() {
        console.log(this.props.profile)
        if(!this.props.profile){
            console.log("here")
            this.setState({isLoading: true});
            fetch(baseUrl + '/admin/mypage', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({token:this.props.admin.admin_token})
            })
                .then(res => {
                    console.log(res);
                    return res.json()
                })
                .then(res => {
                    console.log(res);
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
                <div className='row justify-content-around'>
                    {/*<div className='info-form' style={{width: 450}}>*/}
                    {/*    <Form>*/}
                    {/*        <h3>{this.props.profile.firstName}</h3>*/}
                    {/*        <h5>{this.props.profile.userName}</h5>*/}
                    {/*        <div className = 'profile_info profile_info_short'>*/}
                    {/*            <div className = 'clear_fix profile_info_row '>*/}
                    {/*                <div className = 'label fl_l'>First Name</div>*/}
                    {/*                <div className = 'labeled'>*/}
                    {/*                    <a>{this.props.firstName}</a>*/}
                    {/*                </div>*/}
                    {/*                <div className = 'clear_fix:after'></div>*/}
                    {/*            </div>*/}
                    {/*            <div className='clear_fix profile_info_row '>*/}
                    {/*                <div className='label fl_l'>Last Name</div>*/}
                    {/*                <div className='labeled'>*/}
                    {/*                    <a>{this.props.profile.lastName}</a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className='clear_fix profile_info_row '>*/}
                    {/*                <div className='label fl_l'>Email</div>*/}
                    {/*                <div className='labeled'>*/}
                    {/*                    <a>{this.props.profile.email}</a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className='clear_fix profile_info_row '>*/}
                    {/*                <div className='label fl_l'>Phone Number</div>*/}
                    {/*                <div className='labeled'>*/}
                    {/*                    <a>{this.props.profile.phoneNumber}</a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </Form>*/}
                    {/*</div>*/}
                </div>
            );
        }
    }
}

export default Profile;
