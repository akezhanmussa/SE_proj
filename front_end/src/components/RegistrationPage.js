import {submitRegistrationForm} from "../redux/RegistrationApproveActionCreators";
import {Form, Col,InputGroup, Button} from "react-bootstrap"
import {Input} from "reactstrap";
import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";


class RegistrationForm extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName:'',
            email:'',
            phone_number:'',
            password: '',
            username:''
        }
        this.handleFirstName = this.handleFirstName.bind(this);
    }


    handleFirstName = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    

    render() {
        return (
            <div>
                <Input
                    type="text"
                    name = "firstName"
                    id="name_reg_id"
                    placeholder = "Username"
                    value = {this.state.firstName}
                    onChange = {this.handleFirstName}
                />
                <div className='row justify-content-around'>
                    <div className='reg-form' style={{width: 500}}>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>First name</Form.Label>

                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Username</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                        Please choose a username.
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" required />
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="State" required />
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom05">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control type="text" placeholder="Zip" required />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Check
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                            />
                        </Form.Group>
                        <Button type="submit" onClick = {() => this.props.submitData({"firstName":this.state.firstName})}>Submit form</Button>
                    </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default class RegistrationPage extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                <RegistrationForm submitData={this.props.submitData}/>
            </div>
        )
    }
}


