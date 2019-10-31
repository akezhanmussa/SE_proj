import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {NavLink} from "react-router-dom"

class LoginModalForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
    
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
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
                            <NavLink className='nav-link' to='/home'>Home</NavLink>
                            <NavLink className='nav-link' to='/registration'>Registration</NavLink>
                        </Nav>
                        <Nav className = "ml-auto">
                            <LoginModalForm/>                 
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

