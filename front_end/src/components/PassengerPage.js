import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {getInfoUrl} from "../shared/BaseUrl";

const getUserInfo = (token) => {
    const toDict = {"token":token}
    return fetch(getInfoUrl, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(toDict)
    })
        .then(res => res.json())
        .then(res => {
                console.log(res.firstName)
                console.log(res.lastName)
                return res;
        }
        ).catch(error =>{
            throw error
        }
    )
}

class PassengerPage extends Component{

    constructor(props){
        super(props)
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            phoneNumber:"",
            userName:""
        }
    }

    componentDidMount() {
        console.log("I AM IN THE PASSENGER")
        console.log(this.props.loginUser.token)
        getUserInfo(this.props.loginUser.token)
            .then(response => {
                this.setState({...this.state, firstName:response.firstName, lastName: response.lastName, phoneNumber:response.phoneNumber});
            }
        ).catch(error =>
            console.log(error)
        )
    }

    render(){
        return(
            <div>
                <RenderUserInfo phoneNumber = {this.state.phoneNumber} firstName = {this.state.firstName} userName = {this.state.userName}/>
            </div>
        )
    }
}

const RenderUserInfo = (props) => {
    return(
        <div className='row justify-content-around'>
            <div className='info-form' style={{width: 500}}>
                <form>
                    <h3>{props.firstName}</h3>
                    <h5>{props.userName}</h5>
                    <div className = 'profile_info profile_info_short'>
                        <div className = 'clear_fix profile_info_row '>
                            <div className = 'label fl_l'>Phone Number</div>
                            <div class = 'labeled'>
                                <a>{props.phoneNumber}</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default withRouter(PassengerPage)