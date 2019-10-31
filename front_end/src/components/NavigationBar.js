import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, NavItem} from 'react-bootstrap';
import {Input, Modal, ModalBody, ModalHeader} from "reactstrap";
import {NavLink} from "react-router-dom"

class LoginModalForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            email:'',
            username:'',
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
        console.log("Inside the logal modal")
        console.log(typeof this.props.login + " ")
        return (
            <div>
                <button className='btn btn-light' onClick={this.toggleModal}>Login</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                        <Form.Group controlId="formBasicUserName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter username"
                                          name = "username"
                                          value = {this.state.username}
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
                        <Button className = 'btn-secondary' variant="primary" type="submit" onClick={() => this.props.login({"username":this.state.username, "password":this.state.password})}>
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
                            <NavItem className='nav-item mr-2'>
                                <button className='btn btn-light' onClick = {() => this.props.goHome()}>Home</button>
                            </NavItem>
                            {this.props.loginUser.isAuthenticated
                                ? <div></div>
                                :<button className='btn btn-light' onClick = {() => this.props.goRegistration()}>Registration</button>
                            }
                            {/*<NavLink className='nav-link' to='/home'>Home</NavLink>*/}
                            {/*<NavLink className='nav-link' to='/registration'>Registration</NavLink>*/}
                        </Nav>
                        <Nav className = "ml-auto">
                            {this.props.loginUser.isAuthenticated
                                ? <button className='btn btn-light' onClick = {() => this.props.goMyAccount()}>My account</button>
                                :<LoginModalForm login={this.props.login}/>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

