import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {Input, Modal, ModalBody, ModalHeader} from "reactstrap";
import {NavLink} from "react-router-dom"

class LoginModalForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            email:'',
            userName:'',
            password:''
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleAttribute = this.handleAttribute.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleAttribute = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {

        return (
            <div>
                <button className='btn btn-secondary' onClick={this.toggleModal}>Login</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                        <Form.Group controlId="formBasicUserName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter userName"
                                          name = "userName"
                                          value = {this.state.userName}
                                          onChange = {this.handleAttribute}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
    
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          name = "password"
                                          value = {this.state.password}
                                          onChange = {this.handleAttribute}
                            />
                        </Form.Group>
                        <Button className = 'btn-secondary' variant="primary" type="submit" onClick={() => this.props.login({"userName":this.state.userName, "password":this.state.password})}>
                            Submit
                        </Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export default class NavigationBar extends Component{

    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false
        };
    }


    render(){
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>Railways App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Button className='btn-secondary' onClick = {() => this.props.goHome()}>Home</Button>
                            <Button className='btn-secondary' onClick = {() => this.props.goRegistration()}>Registration</Button>
                            {/*<NavLink className='nav-link' to='/home'>Home</NavLink>*/}
                            {/*<NavLink className='nav-link' to='/registration'>Registration</NavLink>*/}
                        </Nav>
                        <Nav className = "ml-auto">
                            {this.props.loginUser.isAuthenticated
                                ? <Button className='btn-secondary' onClick = {() => this.props.goMyAccount()}>My account</Button>
                                :<LoginModalForm login={this.props.login}/>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

