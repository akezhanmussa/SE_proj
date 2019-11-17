import React, {Component} from 'react';
import {Form, Col, Button} from 'react-bootstrap';
import Input from "reactstrap/es/Input";

class CreateAgentForm extends Component{

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone_number: '',
            userName: '',
            region: '',
            hiddenMessage: '',
            showIndicator: false
        }

        this.handleAttribute = this.handleAttribute.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleAttribute = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = () => {

        let res = this.validate([
            this.state.userName,
            this.state.firstName,
            this.state.lastName,
            this.state.phone_number,
            this.state.email,
            this.state.region
        ])
        this.setState({hiddenMessage: res ? "" : "One of the fields is empty, Please Fill it"})
    }

    validate = (args) => {
        let BreakException = {};
        try{
            args.forEach(function(elem){
                if (elem.length === 0){
                    throw BreakException;
                }
            })
        }catch(e){
            return false
        }
        return true
    }


    render(){
        let fieldComponents = [
            {"name": "firstName", "placeholder": "First Name", "value": this.state.firstName},
            {"name": "lastName", "placeholder": "Last Name", "value": this.state.lastName},
            {"name": "userName", "placeholder": "User Name", "value": this.state.username},
            {"name": "region", "placeholder": "Region", "value": this.state.region},
            {"name": "email", "placeholder": "Email", "value": this.state.email},
            {"name": "phone_number", "placeholder": "Phone Number", "value": this.state.phoneNumber}
            ]

        const rows = [];
        let components = [];
        const hiddenMessageStyle = { color: 'red' };


        fieldComponents.forEach(function(elem,index){
            let className = "";

            if (index === 0){
                className = "mt-4"
            }

            if (index % 2 == 1){
                components.push(<FieldComponent type = 'ml-4 mr-2' name = {elem.name} placeholder = {elem.placeholder} value = {elem.value} onChange = {this.handleAttribute} ></FieldComponent>)
                rows.push(<Form.Row className = {className}>{components}</Form.Row>)
                components = []
            }else{
                components.push(<FieldComponent type = "ml-2" name = {elem.name} placeholder = {elem.placeholder} value = {elem.value} onChange = {this.handleAttribute} ></FieldComponent>)
            }
        }.bind(this))


        return (<div className='row justify-content-around'>
            <div className='reg-form' style={{width: 500}}>
                <Form>
                    <h3 className= "ml-2" >Agent Creation</h3>
                    <div className = 'line'></div>
                    {rows}
                    <h8 className = "ml-2 mt-2" style = {hiddenMessageStyle} >{this.state.hiddenMessage}</h8>
                </Form>
                <Button className='btn-secondary ml-2 mt-4' onClick = {this.handleSubmit}>Create Agent</Button>
            </div>
        </div>)
    }
}


const FieldComponent = (props) => {
    return(
        <Form.Group className = {props.type} as = {Col}>
            <Form.Label>{props.placeholder}</Form.Label>
            <Input
                type = "text"
                name = {props.name}
                placeholder = {props.placeholder}
                value = {props.value}
                onChange = {props.onChange}
                required
            />
        </Form.Group>
    )
}

export default CreateAgentForm;
