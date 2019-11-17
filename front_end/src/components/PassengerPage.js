import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {getInfoUrl} from "../shared/BaseUrl";
import BuyTicketForm from "./BuyTicketForm";
import {Button, Form} from "react-bootstrap";
import PassengerTicketsPage from "./PassengerTicketsPage";

const getUserInfo = (token) => {
    const toDict = {"token":token}
    return fetch(getInfoUrl, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(toDict)
    })
        .then(res => res.json())
        .then(res => {
                return res;
        }
        ).catch(error =>{
            throw error
        }
    )
};

class PassengerPage extends Component{

    constructor(props){
        super(props)
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            phoneNumber:"",
            userName:"",
            isOpen: false
        }
    }

    componentDidMount() {
        getUserInfo(this.props.loginUser.token)
            .then(response => {
                this.setState({...this.state,
                    firstName:response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    phoneNumber:response.phoneNumber,
                    userName: response.userName
                });
            }
        ).catch(error =>
            console.log(error)
        )
    }

    handleSubmit = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    finishSession = () => {
        this.props.logout();
        this.props.history.push('/home');
    };

    render(){
        return(
            <div>
                {this.props.loginUser.token ?
                    (
                        <div>
                            <RenderUserInfo phoneNumber = {this.state.phoneNumber}
                                            firstName = {this.state.firstName}
                                            lastName = {this.state.lastName}
                                            email = {this.state.email}
                                            phoneNumber = {this.state.phoneNumber}
                                            userName = {this.state.userName}
                                            handleSubmit = {this.handleSubmit.bind(this)}
                                            finishSession = {this.finishSession.bind(this)}
                            />
                            {this.state.isOpen ?  (<PassengerTicketsPage token = {this.props.loginUser.token}></PassengerTicketsPage>) : <div></div>}
                        </div>
                    )
                    :
                    (<div className='row justify-content-around'>
                        <div className='info-form' style={{width: 450}}>
                            <h3>Please Log in</h3>
                        </div>
                            </div>)
                }

            </div>
        )
    }
}

const RenderUserInfo = (props) => {
    return(
        <div className='row justify-content-around'>
            <div className='info-form' style={{width: 450}}>
                <Form>
                    <h3>{props.firstName}</h3>
                    <h5>{props.userName}</h5>
                    <div className = 'profile_info profile_info_short'>
                        <div className = 'clear_fix profile_info_row '>
                            <div className = 'label fl_l'>First Name</div>
                            <div className = 'labeled'>
                                <a>{props.firstName}</a>
                            </div>
                            <div className = 'clear_fix:after'></div>
                        </div>
                        <div className='clear_fix profile_info_row '>
                            <div className='label fl_l'>Last Name</div>
                            <div className='labeled'>
                                <a>{props.lastName}</a>
                            </div>
                        </div>
                        <div className='clear_fix profile_info_row '>
                            <div className='label fl_l'>Email</div>
                            <div className='labeled'>
                                <a>{props.email}</a>
                            </div>
                        </div>
                        <div className='clear_fix profile_info_row '>
                            <div className='label fl_l'>Phone Number</div>
                            <div className='labeled'>
                                <a>{props.phoneNumber}</a>
                            </div>
                        </div>
                    </div>
                    <div className = 'line'></div>

                    <Form.Row>
                        <Form.Group className="col-8 d-flex">
                            <Button className='btn-secondary' onClick = {() => props.handleSubmit()}>Get tickets</Button>
                        </Form.Group>
                        <Form.Group className='ml-auto mr-2'>
                            <Button className='btn-secondary mr-2' onClick = {() => props.finishSession()}>Logout</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        </div>
    )
}


export default withRouter(PassengerPage)