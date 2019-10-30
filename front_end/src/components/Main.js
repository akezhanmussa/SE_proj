import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {fetchSchedule} from '../redux/ScheduleActionCreators'
import Home from './Home';
import {Loading} from './Loading'

const mapDispatchToProps = (dispatch) => ({
    fetchSchedule: (path) => dispatch(fetchSchedule(path))
});

const mapStateToProps = (state) => ({
    schedule: state.schedule
});


class Main extends Component{
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/home' component={() => <Home fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>}/>
                    <Route path='/map' component={() => <Loading/>}/>
                    <Redirect to='home'/>
                </Switch>

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));