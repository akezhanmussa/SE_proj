import React, {Component} from 'react';
import AgentProfile from './AgentProfile';
import ManagerProfile from './ManagerProfile';
import { adminLogout } from '../redux/AdminLoginActionCreator';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
   logoutAdmin: () => dispatch(adminLogout())
});

class Admin extends Component{
    render() {
        return(
            <React.Fragment>
                <AgentProfile/>
                <ManagerProfile/>
                <button onClick={this.props.logoutAdmin}> logout </button>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Admin));