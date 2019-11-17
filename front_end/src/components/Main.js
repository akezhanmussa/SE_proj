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
import jwt_decode from 'jwt-decode';
import PassengerPage from "./PassengerPage";


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

const AdminRouter = (props) => {
    const PrivateAdminRoute = ({component: Component, ...rest}) => {
        return <Route {...rest} render={ (propsx) => (
            props.admin.isAuthenticated
                ? <Component {...propsx}/>
                : <Redirect to='/admin/login'/>
        )}/>
    };

    return(
        <Switch>
            <PrivateAdminRoute exact path={props.match.url} component={() => <Admin admin={props.admin}/>}/>
            <Route exact path={props.match.url + '/login'} component={() => <AdminLogin admin={props.admin}/> }/>
        </Switch>
    );
};


class Main extends Component{

    componentDidMount() {
        this.checkExpirationDate();
    }

    checkExpirationDate(){
        if(this.props.loginUser.isAuthenticated){
            const token = this.props.loginUser.token;
            var jt = "";
            try {
                jt = jwt_decode(token);
            }catch (e) {
                console.log(e);
            }
            const now = new Date().getTime();
            const timeleft = jt.exp * 1000 - now;
            if (timeleft < 0) {
                this.props.logout();
            }
        }
    }

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

        const callAdminPage = ({match}) => {
            return (
                <AdminRouter admin={this.props.admin} match={match}/>
            );
        };

        const callUserPage = ({match}) => {
            return(
                <div>
                    <NavigationBar loginState={this.props.loginUser} login={this.props.login}/>
                    <Switch>
                        <Route exact path={match.url} component={() => <Home  logout = {this.props.logout} submitData={this.props.submitRegistrationForm} loginUser = {this.props.loginUser} login = {this.props.login} fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>}/>
                        <Route exact path={match.url + '/buy_ticket/:routeId'} component={BuyTicket}/>
                        <Route exact path={match.url + '/registration'} component={() => <RegistrationPage submitData = {this.props.submitRegistrationForm} registrationApproveState = {this.props.registrationApproveState}/>}/>
                        <Route exact path={match.url + '/my_account'} component={() => <PassengerPage loginUser={this.props.loginUser} logout={this.props.logout}/>}/>
                        <Redirect to='/home'/>
                    </Switch>
                </div>
            );
        };

        return (
            <div>
                <Switch>
                    <Route path='/admin' component={callAdminPage}/>
                    <Route path='/home' component={callUserPage}/>
                    <Redirect to='/home'/>
                </Switch>

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));