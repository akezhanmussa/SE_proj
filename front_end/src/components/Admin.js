import React, {Component} from 'react';
import AgentProfile from './AgentProfile';
import ManagerProfile from './ManagerProfile';

class Admin extends Component{
    render() {
        return(
            <React.Fragment>
                <AgentProfile/>
                <ManagerProfile/>
            </React.Fragment>
        );
    }
}

export default Admin;