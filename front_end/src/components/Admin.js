import React, {Component} from 'react';
import AgentProfile from './AgentProfile';
import ManagerProfile from './ManagerProfile';
import { adminLogout } from '../redux/AdminLoginActionCreator';
import {NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import {Nav, NavItem} from "react-bootstrap";
import Home from "./Home";

const mapDispatchToProps = (dispatch) => ({
   logoutAdmin: () => dispatch(adminLogout())
});

const NavBar = (props) => {
    return(
        <Navbar id='adminNavbar'>
            <NavbarBrand className='ml-5' style={{color: 'white'}}>Railways App</NavbarBrand>
            <Nav className='ml-auto'>
                <NavItem className='nav-item mr-5'>
                    <button className='nav-link logoutButton' onClick={props.logoutAdmin}>Logout</button>
                </NavItem>
            </Nav>
        </Navbar>
    );
};


class Admin extends Component{
    render() {
        return(
            <div id='admin'>
                <NavBar logoutAdmin={this.props.logoutAdmin}/>
                <AgentProfile fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>
                {/*<ManagerProfile/>*/}
            </div>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Admin));