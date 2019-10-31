import React, {Component} from 'react';
import RoutesTable from './RoutesTable';
import { Schedule } from '../shared/Schedule';
import MapComponent from './MapComponent';
import NavigationBar from "./NavigationBar";
import RegistrationPage from "./RegistrationPage";
import PassengerPage from "./PassengerPage";
class Home extends Component{

    constructor(props){
        super(props)
        this.schedule = Schedule;
        this.state = {
            currentState:"Home"
        }
        this.goHome = this.goHome.bind(this)
        this.goRegistration = this.goRegistration.bind(this)

    }

    goHome = () => {
        this.setState({currentState:"Home"})
    }

    goRegistration = () => {
        console.log("I am in the reg")
        this.setState({currentState:"Registration"})
    }

    goMyAccount = () =>{
        this.setState({currentState:"My Account"})
    }


    render() {

        if (this.state.currentState === "Home"){
            return(
                <div>
                    <NavigationBar goMyAccount = {this.goMyAccount} goHome = {this.goHome} goRegistration = {this.goRegistration} loginUser = {this.props.loginUser} login = {this.props.login}/>
                    <div className='container'>
                        <div className='row justify-content-around'>
                            <MapComponent schedule = {this.props.schedule}></MapComponent>
                        </div>
                        <RoutesTable fetchSchedule={this.props.fetchSchedule} schedule={this.props.schedule}/>
                    </div>
                </div>
            );
        }else if (this.state.currentState === "Registration") {
            return(<div>
                <NavigationBar goMyAccount = {this.goMyAccount} goHome = {this.goHome} goRegistration = {this.goRegistration} loginUser = {this.props.loginUser} login = {this.props.login}/>
                <RegistrationPage submitData={this.props.submitData}></RegistrationPage>
            </div>)
        }else if (this.state.currentState === "My Account"){
            return(
                <div>
                    <NavigationBar goMyAccount = {this.goMyAccount} goHome = {this.goHome} goRegistration = {this.goRegistration} loginUser = {this.props.loginUser} login = {this.props.login}/>
                    <PassengerPage goHome = {this.goHome} logout = {this.props.logout} passenger = {this.props.loginUser}/>
                </div>
            )
        }

    }
}

export default Home;
