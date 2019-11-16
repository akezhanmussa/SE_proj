import React, {Component} from 'react';
import AgentProfile from './AgentProfile';
import ManagerProfile from './ManagerProfile';
import { adminLogout } from '../redux/AdminLoginActionCreator';
import {NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import {Nav, NavItem} from "react-bootstrap";

const mapDispatchToProps = (dispatch) => ({
   logoutAdmin: () => dispatch(adminLogout())
});

<<<<<<< HEAD
class Admin extends Component{

=======
const NavBar = (props) => {
    return(
        <Navbar id='adminNavbar'>
            <NavbarBrand className='ml-5'>Railways App</NavbarBrand>
            <Nav className='ml-auto'>
                <NavItem className='nav-item mr-5'>
                    <button className='nav-link logoutButton' onClick={props.logoutAdmin}>Logout</button>
                </NavItem>
            </Nav>
        </Navbar>
    );
};


class Admin extends Component{
>>>>>>> 07b9533e33830d59b959072cc1fe3d190bdff331
    render() {
        return(
            <React.Fragment>
                <NavBar logoutAdmin={this.props.logoutAdmin}/>
                <AgentProfile/>
                {/*<ManagerProfile/>*/}
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Admin));