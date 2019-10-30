import {submitRegistrationForm} from "../redux/RegistrationApproveActionCreators";


const mapDispatchToProps = (dispatch) => ({
    submitRegistrationForm: (path) => dispatch(submitRegistrationForm(path))
});

const mapStateToProps = (state) => ({
    registrationApproveState: state.registrationApproveState
});


class RegistrationForm extends Component {
    render() {
        return (
            <div>
                
                
                
                
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
