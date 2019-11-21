import React, {Component} from 'react';
import AgentPage from './Agent/AgentPage';
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
    constructor(props){
        super(props);
        this.state = {
            isManager: false
        }
    }
    componentDidMount() {
        this.checkExpirationDate();
    }

    checkExpirationDate(){
        if(this.props.admin.isAuthenticated){
            const token = this.props.admin.admin_token;
            var jt = jwt_decode(token);
            this.setState({isManager: jt.user_role == "agent" ? false : true});
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
                {
                    this.state.isManager ? <ManagerProfile admin={this.props.admin}/>
                    : <AgentPage admin={this.props.admin}/>
                }
            </div>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Admin));