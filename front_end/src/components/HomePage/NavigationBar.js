import React, {Component} from 'react';
import {Navbar, Nav, Form, Button} from 'react-bootstrap';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {NavLink} from "react-router-dom"
import {Loading} from "../../shared/Loading";

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
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleAttribute = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleLogin = (event) => {
        event.preventDefault();
        this.props.login({"userName":this.state.userName, "password":this.state.password});
    };



    render() {
        return (
            <div>
                <Nav className='ml-auto'>
                    <NavLink className='btn nav-link' to='/home/registration'>Registration</NavLink>
                    <button className='btn nav-link' onClick={this.toggleModal}>Login</button>
                </Nav>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    {this.props.loginState.isLoading ? (<Loading/>) : (
                        <div>
                                <ModalHeader toggle={this.toggleModal}>
                                    Login
                                </ModalHeader>
                            <ModalBody>
                                <Form.Group controlId="formBasicUserName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="username"
                                                  name = "userName"
                                                  value = {this.state.userName}
                                                  onChange = {this.handleAttribute}
                                    />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label><Form.Control type="password"
                                                  placeholder="Password"
                                                  name = "password"
                                                  value = {this.state.password}
                                                  onChange = {this.handleAttribute}
                                    />
                                </Form.Group>
                                <Button className = 'btn-secondary' onClick={this.handleLogin}>
                                    Submit
                                </Button>
                            </ModalBody>
                        </div>
                    )}
                </Modal>
            </div>
        )
    }
}

export default class NavigationBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
    }


    render(){
        return (
            <div style={{marginBottom: 70}}>
                <Navbar id='homeNavbar' expand="md">
                    <div className='container'>
                    <Navbar.Brand href="/home" style={{color: 'white'}}>
                        Railways App
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="navbar-nav ml-auto">
                        <Nav className = "ml-auto" >
                            {this.props.loginState.isAuthenticated
                                ? <NavLink className='btn nav-link' to='/home/my_account'>My account</NavLink>
                                : <LoginModalForm login={this.props.login} loginState = {this.props.loginState}/>
                            }
                            {this.props.loginState.isAuthenticated
                                ? <button className='btn nav-link' onClick={this.props.logout}>Logout</button>
                                : null
                            }
                        </Nav>
                    </Navbar.Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}

