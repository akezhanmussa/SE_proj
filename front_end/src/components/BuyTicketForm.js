import React, {Component} from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";



class BuyTicketForm extends Component{
    render() {
        const route = {
            destination: "Almaty",
            endTime: "17/10/2019 16:26:17",
            id: 2,
            origin: "Astana",
            startTime: "17/10/2019 16:25:14",
            train: {trainId: 2, capacity: 200}
        };
        console.log(this.props)
        return (
            <div className='container mt-3'>
                <div className='row' style={{height:"80px"}}>
                    <div className='col-4 d-flex justify-content-center align-items-center' style={{borderRight: '2px solid blue', borderBottom:"1px solid blue"}}>
                        <i className="fa fa-check" style={{fontSize:"30px", color:"green" }}></i>
                        <h4>Train selected</h4>
                    </div>
                    <div className='col-4 d-flex justify-content-center align-items-center' style={{borderRight: '2px solid blue', borderBottom:"1px solid blue"}}>
                        <i className="fa fa-check" style={{fontSize:"30px", color:"green" }}></i>
                        <h4>Place reserved</h4>
                    </div>
                    <div className='col-4 d-flex justify-content-center align-items-center' style={{backgroundColor:"#f3f4f5", borderBottom:"1px solid blue"}}>
                        <h4>Checkout</h4>
                    </div>
                </div>
                <div className='row mt-2'>
                    <h3>{route.origin} -> {route.destination}</h3>
                    <div className='container' style={{border:"1px solid #c2c4c3"}}>
                        <div className='row pt-2' style={{borderBottom:"1px solid #c2c4c3"}}>
                            <div className='col-6'>
                                <p>Train number</p>
                            </div>
                            <div className='col-6'>
                                <p>{route.train.trainId}</p>
                            </div>
                        </div>
                        <div className='row pt-2' style={{borderBottom:"1px solid #c2c4c3"}}>
                            <div className='col-6'>
                                <p>Start date</p>
                            </div>
                            <div className='col-6'>
                                <p>{route.startTime}</p>
                            </div>
                        </div>
                        <div className='row pt-2' style={{borderBottom:"1px solid #c2c4c3"}}>
                            <div className='col-6'>
                                <p>End date</p>
                            </div>
                            <div className='col-6'>
                                <p>{route.endTime}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <FillTicket/>

            </div>
        );
    }
}

class FillTicket extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
        console.log("firstname " + this.firstame.value + " lastname " + this.lastname.value + this.docId.value + this.doctype.value)
    }
    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for='firstname'>
                        Firstname
                    </Label>
                    <Input type="text" id="firstname" name="firstname"
                           innerRef={(input) => this.firstame = input} />
                </FormGroup>
                <FormGroup>
                    <Label for='lastname'>
                        Lastname
                    </Label>
                    <Input type="text" id="lastname" name="lastname"
                           innerRef={(input) => this.lastname = input} />
                </FormGroup>
                <FormGroup>
                    <Label for="doctype">Select document type</Label>
                    <Input type="select" name="select" id="doctype" innerRef={(input) => this.doctype = input}>
                        <option>National Id</option>
                        <option>Passport</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for='docId'>
                        Enter ID of your document
                    </Label>
                    <Input type="text" id="docId" name="docId"
                           innerRef={(input) => this.docId = input} />
                </FormGroup>
            </Form>
        );
    }
};

export default BuyTicketForm;