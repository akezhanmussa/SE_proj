import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {baseUrl} from "../shared/BaseUrl";

const getUserInfo = (token) => {
    return fetch(baseUrl + '/gettickets', {
        method: 'POST',
        headers: {'Authorization': token},
    })
        .then(res => res.json())
        .then(res => {
                return res
            }
        ).catch(error =>
        console.log(error)
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
        const userInfo = getUserInfo(this.props.loginUser.token)
        this.setState({firstName:userInfo.firstName, lastName: userInfo.lastName, phoneNumber:userInfo.phoneNumber});
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