import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {fetchSchedule} from '../redux/ScheduleActionCreators'
import Home from './Home';
import BuyTicketForm from './BuyTicketForm';
import RegistrationPage from "./RegistrationPage";
import {submitRegistrationForm} from "../redux/RegistrationApproveActionCreators";

import Admin from './Admin';
import AdminLogin from './AdminLogin';

const mapDispatchToProps = (dispatch) => ({
    fetchSchedule: (path) => dispatch(fetchSchedule(path)),
    submitRegistrationForm: (path) => dispatch(submitRegistrationForm(path))
});

const mapStateToProps = (state) => ({
    schedule: state.schedule,
    registrationApproveState: state.registrationApproveState
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
                <BuyTicketForm
                    route={route[0]}
                />
            );
        };


        return (
            <div>
                <Switch>
                    <Route path='/home' component={() => <Home fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>}/>
                    <Route path='/buy_ticket/:routeId' component={BuyTicket}/>
                    <Route path='/registration' component={() => <RegistrationPage submitData={this.props.submitRegistrationForm}/>}/>
                    <Route exact path='/admin' component={Admin}/>
                    <Route path='/admin/login' component={AdminLogin} />
                    <Redirect to='home'/>
                </Switch>

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));