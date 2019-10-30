import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col, Media } from 'reactstrap';

class AdminLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = (event) => {
        //this.props.loginAdmin({ username: this.state.username, password: this.state.password });
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        // if (this.props.auth.isAuthenticated) {
        //     this.props.history.push('/admin');
        // }
        // const errMess = this.props.auth.errMess;
        let errMess = null;
        return (
            <div id="login">
                <div className='container align-items-center h-100'>
                    <div className='row h-100 justify-content-center align-items-center '>
                        <Form className='col-8 col-md-4 my-auto' onSubmit={this.handleLogin}>
                            <Row className='form-group'>
                                <Col md={10}>
                                    <Input type='text' name='username' id='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={10}>
                                    <Input type='password' name='password' id='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
                                </Col>
                            </Row>
                            <div >
                                {
                                    errMess ?
                                        <p style={{ color: 'white' }}>{errMess}</p> :
                                        null
                                }
                            </div>
                            <Row >
                                <Col >
                                    <Button type="submit" value="submit" color="secondary">Login</Button>
                                </Col>
                            </Row>

                        </Form>

                    </div>
                </div>
            </div>
        );
    }
}

export default AdminLogin;