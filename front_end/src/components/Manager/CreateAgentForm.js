import React, {Component} from 'react';
import {Form, Col, Button} from 'react-bootstrap';
import Input from "reactstrap/es/Input";
import {submitAgentUrl} from "../../shared/BaseUrl";
import FieldComponent from "./FieldComponent";


const submitAgent = (data) => {
    return fetch(submitAgentUrl, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(data)
    })
        .then(res => {
            console.log(res);
            if(res.ok)
                return res.json();
            else
                throw Error("error " + res.status);
        })
        .catch (error => {
            throw error
        });
}

class CreateAgentForm extends Component{

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone_number: '',
            userName: '',
            salary:'',
            workHours:'',
            password:"",
            hiddenMessage: '',
            showIndicator: false,
            colorHidden: "red"
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
            this.state.password,
            this.state.workHours,
            this.state.salary
        ])


        let salary = parseFloat(this.state.salary)
        let workingHours = parseInt(this.state.workHours)

        if (isNaN(salary) || isNaN(workingHours)){
            res = false;
        }

        this.setState({hiddenMessage: res ? "" : "One of the fields is empty or\n salary is not float or\n working hours is not int"})

        if (res){
            submitAgent({
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email,
                username:this.state.userName,
                phoneNumber:this.state.phone_number,
                salary: salary,
                password: this.state.password,
                workHours: workingHours,
                token:localStorage.getItem("admin_token")
            }).then(res => {
                    this.setState({colorHidden:"green"})
                    this.setState({hiddenMessage:"Agent was created"})
            }).catch(error =>{
                this.setState({colorHidden:"red"})
                this.setState({hiddenMessage:"Please check attributes"})
                }
            )

        }
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
            {"name": "email", "placeholder": "Email", "value": this.state.email},
            {"name": "phone_number", "placeholder": "Phone Number", "value": this.state.phone_number},
            {"name": "workHours", "placeholder": "Working Hours", "value": this.state.workHours},
            {"name": "password", "placeholder": "Password", "value": this.state.password},
            {"name": "salary", "placeholder": "Salary", "value": this.state.salary}
        ]

        const rows = [];
        let components = [];
        const hiddenMessageStyle = {color:this.state.colorHidden};

        fieldComponents.forEach(function(elem,index){
            let className = "";

            if (index === 0){
                className = "mt-4"
            }

            if (index % 2 == 1 || index == fieldComponents.length - 1){

                let type = "ml-2 mr-2"

                if (index === fieldComponents.length - 1){
                    type = "ml-2 mr-2"
                }

                components.push(<FieldComponent type = {type} typeForm = {"text"} name = {elem.name} placeholder = {elem.placeholder} value = {elem.value} onChange = {this.handleAttribute} ></FieldComponent>)
                rows.push(<Form.Row className = {className}>{components}</Form.Row>)
                components = []
            }else if (index % 2 == 0 ){
                components.push(<FieldComponent type = "ml-2" typeForm = {"text"} name = {elem.name} placeholder = {elem.placeholder} value = {elem.value} onChange = {this.handleAttribute} ></FieldComponent>)
            }
        }.bind(this))


        return (<div className='row justify-content-around'>
            <div className='reg-form-agent' style={{width: 500}}>
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


export default CreateAgentForm;
