import React, {Component} from 'react';
import AgentProfile from './AgentProfile';
import ManagerProfile from './Manager/ManagerProfile';
import { adminLogout } from '../redux/AdminLoginActionCreator';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import {Nav, NavItem} from "react-bootstrap";
import jwt_decode from "jwt-decode";


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
    componentDidMount() {
        this.checkExpirationDate();
    }

    checkExpirationDate(){
        if(this.props.admin.isAuthenticated){
            const token = this.props.admin.admin_token;
            var jt = "";
            try {
                jt = jwt_decode(token);
            }catch (e) {
                console.log(e);
            }
            const now = new Date().getTime();
            const timeleft = jt.exp * 1000 - now;
            if (timeleft < 0) {
                this.props.logoutAdmin();
            }
        }
    };

    render() {
        return(
            <div id='admin'>
                <NavBar logoutAdmin={this.props.logoutAdmin}/>
                {/*<AgentProfile admin={this.props.admin}/>*/}
                <ManagerProfile/>
            </div>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Admin));