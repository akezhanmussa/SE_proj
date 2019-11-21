import React, {Component} from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";
import {baseUrl} from "../../shared/BaseUrl";
import {locations} from "../../shared/Locations";
import { withRouter } from 'react-router-dom';

class BuyTicketForm extends Component{

    componentDidMount() {
        window.scrollTo(0,0);
    }
    render() {
        const route = {
            destination: this.props.route.destination,
            endTime: this.props.route.endTime,
            id: this.props.route.id,
            origin: this.props.route.origin,
            startTime: this.props.route.startTime,
            train: this.props.route.train,
            price: this.props.route.price
        };
        return (
            <div style={{backgroundColor: 'rgba(255, 255, 255, .95)'}}>
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
                                    <p>Price</p>
                                </div>
                                <div className='col-6'>
                                    <p>{route.price}</p>
                                </div>
                            </div>
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
                    <div className='mt-3 row'>
                        <h4>Fill the passenger's personal information</h4>
                    </div>
                    <div className='mt-3 row' style={{backgroundColor:"#f3f4f5", border:"1px solid #c2c4c3"}}>
                        <FillTicket route={this.props.route} loginUser={this.props.loginUser} history={this.props.history}/>
                    </div>
                </div>
            </div>
        );
    }
}

class FillTicket extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        if(!this.props.loginUser.isAuthenticated){
            alert("Login first !!!");
            return;
        }
        let body = {
            scheduleId: this.props.route.id,
            token: this.props.loginUser.token,
            origin_id: locations.filter(loc => this.props.route.origin === loc.name)[0].id,
            destination_id: locations.filter(loc => this.props.route.destination === loc.name)[0].id,
            owner_document_id: this.docId.value,
            price: this.props.route.price,
            start_date: this.props.route.startTime,
            end_date: this.props.route.endTime,
            owner_document_type: this.doctype.value,
            owner_firstname: this.firstame.value,
            owner_lastname: this.lastname.value
        };
        console.log(body);
        return fetch(baseUrl + '/buyticket', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        })

            .then(response => {
                if(response.ok) {
                    let mes = "Thanks, your request is submitted. Wait for approving";
                    if(window.confirm(mes)){
                        this.props.history.push('/home/my_account');
                    }
                }else{
                    let error = new Error("Error " + response.status + ': ' + response.statusText);
                    throw error;
                }
            })
            .catch (error => {
                alert(error + "\nTry again");
            });
    }
    render() {
        return (
            <div className='container mt-2'>
                <Form>
                    <div className='row'>
                        <FormGroup className='col-6'>
                            <Label for='firstname'>
                                Firstname
                            </Label>
                            <Input type="text" id="firstname" name="firstname"
                                   innerRef={(input) => this.firstame = input} />
                        </FormGroup>
                        <FormGroup className='col-6'>
                            <Label for='lastname'>
                                Lastname
                            </Label>
                            <Input type="text" id="lastname" name="lastname"
                                   innerRef={(input) => this.lastname = input} />
                        </FormGroup>
                    </div>
                    <div className='row'>
                        <FormGroup className='col-6'>
                            <Label for="doctype">Select document type</Label>
                            <Input type="select" name="select" id="doctype" innerRef={(input) => this.doctype = input}>
                                <option>National Id</option>
                                <option>Passport</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className='col-6'>
                            <Label for='docId'>
                                Enter ID of your document
                            </Label>
                            <Input type="text" id="docId" name="docId"
                                   innerRef={(input) => this.docId = input} />
                        </FormGroup>
                    </div>
                    <div className='row mr-auto'>
                        <button className='btn btn-secondary ml-auto mb-2' onClick={this.handleSubmit}>Buy ticket</button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default withRouter(BuyTicketForm);