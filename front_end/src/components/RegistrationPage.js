import {fetchSchedule} from "../redux/ScheduleActionCreators";
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => ({
    fetchSchedule: (path) => dispatch(fetchSchedule(path))
});

const mapStateToProps = (state) => ({
    registrationApproveState: state.registrationApproveState
});


class RegistrationForm extends Component {
    render() {


        return (<div>


        </div>)
    }
}


class RegistrationPage extends Component{

    constructor(props){
        super(props)
    }

    render() {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
