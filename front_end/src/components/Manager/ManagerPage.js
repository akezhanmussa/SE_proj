import React, {Component} from 'react';
import {baseUrl,fethchManagerProfileURL} from "../../shared/BaseUrl";
import {Loading} from "../../shared/Loading";
import {Button, Form} from "react-bootstrap";


class ManagerPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            errMess: null
        }
    }

    componentDidMount(){
        if(!this.props.profile){
            this.setState({isLoading: true});
            fetch(baseUrl + '/admin/mypage', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({token:this.props.admin.admin_token})
            })
                .then(res => {
                    if(res.ok)
                        return res.json();
                    else {
                        throw new Error("Error " + res.status)
                    }
                })
                .then(res => {
                    this.props.fetchProfile(res);
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
        else if(this.props.profile){
            return (
                <div className='row justify-content-start d-flex'>
                    <img className='mt-4 ml-4' src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" width='250' height='250'/>
                    <div className='info-form' style={{backgroundColor:"white"}}>
                        <Form>
                            <h3>{this.props.profile.firstName}</h3>
                            <h5>{this.props.profile.userName}</h5>
                            <div className = 'profile_info profile_info_short'>
                                <div className = 'clear_fix profile_info_row '>
                                    <div className = 'label fl_l'>First Name</div>
                                    <div className = 'labeled'>
                                        <a>{this.props.profile.firstName}</a>
                                    </div>
                                    <div className = 'clear_fix:after'></div>
                                </div>
                                <div className='clear_fix profile_info_row '>
                                    <div className='label fl_l'>Last Name</div>
                                    <div className='labeled'>
                                        <a>{this.props.profile.lastName}</a>
                                    </div>
                                </div>
                                <div className='clear_fix profile_info_row '>
                                    <div className='label fl_l'>Email</div>
                                    <div className='labeled'>
                                        <a>{this.props.profile.email}</a>
                                    </div>
                                </div>
                                <div className='clear_fix profile_info_row '>
                                    <div className='label fl_l'>Phone Number</div>
                                    <div className='labeled'>
                                        <a>{this.props.profile.phoneNumber}</a>
                                    </div>
                                </div>
                                <div className='clear_fix profile_info_row '>
                                    <div className='label fl_l'>Salary</div>
                                    <div className='labeled'>
                                        <a>{this.props.profile.salary + 'kzt'}</a>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                </div>
            );
        }
    }
}


export default ManagerPage;