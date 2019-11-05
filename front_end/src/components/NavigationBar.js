import React, {Component} from 'react';
import {Navbar, Nav, Form, Button, NavItem} from 'react-bootstrap';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {NavLink} from "react-router-dom"
import {Loading} from "./Loading";

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
                <button className='btn btn-light' onClick={this.toggleModal}>Login</button>
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
                        {this.props.loginState.isLoading ? (<Loading/>) : (<div/>)}
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
                                <NavLink className='nav-link' to='/home'>Home</NavLink>
                            </NavItem>
                            {this.props.loginUser.isAuthenticated
                                ? <div></div>
                                :<NavLink className='nav-link' to='/registration'>Registration</NavLink>
                            }

                        </Nav>
                        <Nav className = "ml-auto">
                            {this.props.loginUser.isAuthenticated
                                ? <NavLink className='nav-link' to='/my_account'>My account</NavLink>
                                :<LoginModalForm login={this.props.login} loginState = {this.props.loginState}/>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

