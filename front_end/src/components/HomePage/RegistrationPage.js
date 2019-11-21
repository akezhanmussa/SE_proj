import {Form, Col,InputGroup, Button} from "react-bootstrap"
import {Input} from "reactstrap";
import React, {Component} from 'react';
import {Loading} from "../../shared/Loading";



class RegistrationForm extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName:'',
            email:'',
            phone_number:'',
            password: '',
            userName:'',
            confirm_password:'',
            hiddenMessage:'',
            showIndicator:false
        }
        this.handleAttribute = this.handleAttribute.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit = () => {
        this.setState({hiddenMessage:""});
        if (this.state.userName === ''){
            this.setState({hiddenMessage: "Username has to be filled"})
        } else if (this.state.confirm_password !== this.state.password || this.state.password === ''){
            this.setState({hiddenMessage: "Password does not match with the initial password or empty"})
        }else{
            this.setState({hiddenMessage: ""})
            this.props.submitData({
                "firstName":this.state.firstName,
                "lastName":this.state.lastName,
                "email":this.state.email,
                "phoneNumber":this.state.phone_number,
                "userName":this.state.userName,
                "password":this.state.password
            })
        }
    }

    handleAttribute = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({showIndicator: false})
        }, 8000)
    }


    render() {

        return (
            <div>
                {this.props.registrationApproveState.isLoading ? (
                    <LoadingWithDelay showIndicator = {this.state.showIndicator}/>
                ):(
                    <div className='row justify-content-around'>
                        <div className='reg-form' style={{width: 500}}>
                            <form>
                                <h3>Registration</h3>
                                <Form.Row className = "mt-4">
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>First name</Form.Label>
                                        <Input
                                            type="text"
                                            name = "firstName"
                                            id="name_reg_id"
                                            placeholder = "First Name"
                                            value = {this.state.firstName}
                                            onChange = {this.handleAttribute}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="customLastName">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last name"
                                            name = "lastName"
                                            value = {this.state.lastName}
                                            onChange = {this.handleAttribute}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="customUserName">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeholder="Username"
                                                aria-describedby="inputGroupPrepend"
                                                name = "userName"
                                                value = {this.state.userName}
                                                onChange = {this.handleAttribute}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="phoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Phone Number"
                                            name = "phone_number"
                                            value = {this.state.phone_number}
                                            onChange = {this.handleAttribute}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a phone number.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="7" controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            name = "email"
                                            value = {this.state.email}
                                            onChange = {this.handleAttribute}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="7" controlId="passwordOne">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name = "password"
                                            value = {this.state.password}
                                            onChange = {this.handleAttribute}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="7" controlId="passwordTwo">
                                        <Form.Label>Password Confirm</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            name = "confirm_password"
                                            value = {this.state.confirm_password}
                                            onChange = {this.handleAttribute}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label >{this.state.hiddenMessage}</Form.Label>
                                </Form.Row>
                                <Button className='btn-secondary' onClick = {() => this.handleSubmit()}>Submit form</Button>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        )
    }
}

const LoadingWithDelay = (props) => {
    return (
        <div>
            {props.showIndicator ? (<Loading/>) : (<div></div>)}
        </div>
    )
}

export default class RegistrationPage extends Component{

    render() {
        return (
            <div>
                <RegistrationForm submitData={this.props.submitData} registrationApproveState = {this.props.registrationApproveState}/>
            </div>
        )
    }
}


