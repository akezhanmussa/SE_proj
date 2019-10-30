import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {fetchSchedule} from '../redux/ScheduleActionCreators'
import Home from './Home';
import BuyTicketForm from './BuyTicketForm';


const mapDispatchToProps = (dispatch) => ({
    fetchSchedule: (path) => dispatch(fetchSchedule(path))
});

const mapStateToProps = (state) => ({
    schedule: state.schedule
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
        }


        return (
            <div>
                <Switch>
                    <Route path='/home' component={() => <Home fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>}/>
                    <Route path='/buy_ticket/:routeId' component={BuyTicket}/>
                    <Redirect to='home'/>
                </Switch>

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));