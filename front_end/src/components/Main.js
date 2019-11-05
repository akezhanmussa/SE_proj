import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {fetchSchedule} from '../redux/ScheduleActionCreators'
import Home from './Home';
import BuyTicketForm from './BuyTicketForm';
import NavigationBar from './NavigationBar';
import RegistrationPage from "./RegistrationPage";
import {submitRegistrationForm} from "../redux/RegistrationApproveActionCreators";
import {login,logout} from "../redux/LoginActionCreator";
import Admin from './Admin';
import AdminLogin from './AdminLogin';
import PassengerPage from "./PassengerPage";
import {Button} from "react-bootstrap";

const mapDispatchToProps = (dispatch) => ({
    fetchSchedule: (path) => dispatch(fetchSchedule(path)),
    submitRegistrationForm: (path) => dispatch(submitRegistrationForm(path)),
    login: (path) => dispatch(login(path)),
    logout: () => dispatch(logout())
});

const mapStateToProps = (state) => ({
    schedule: state.schedule,
    registrationApproveState: state.registrationApproveState,
    admin: state.admin,
    loginUser: state.loginUser
});


class Main extends Component{
    render() {

        const BuyTicket = ({match}) => {
            let route = this.props.schedule.schedule.filter(route => route.id === parseInt(match.params.routeId, 10));
            if (route.length === 0)
                return (
                    <div>
                        Select Ticket First
                    </div>
                );
            return (
                <BuyTicketForm route={route[0]} loginUser={this.props.loginUser}/>
            );
        };

        const PrivateAdminRoute = ({component: Component, ...rest}) => {
            return <Route {...rest} render={ (props) => (
                 this.props.admin.isAuthenticated
                    ? <Component {...props}/>
                    : <Redirect to='/admin/login'/>
                )}/>
        };
        return (
            <div>
                <NavigationBar loginState={this.props.loginUser} login={this.props.login}/>
                {console.log(this.props.loginUser)}
                <Switch>
                    <Route path='/home' component={() => <Home  logout = {this.props.logout} submitData={this.props.submitRegistrationForm} loginUser = {this.props.loginUser} login = {this.props.login} fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>}/>
                    <Route path='/buy_ticket/:routeId' component={BuyTicket}/>
                    <Route path='/registration' component={() => <RegistrationPage submitData={this.props.submitRegistrationForm}/>}/>
                    <Route path='/my_account' component={() => <PassengerPage loginUser={this.props.loginUser} logout={this.props.logout}/>}/>
                    <PrivateAdminRoute exact path='/admin' component={Admin}/>
                    <Route path='/admin/login' component={() => <AdminLogin admin={this.props.admin}/> }/>
                    <Redirect to='home'/>
                </Switch>

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));