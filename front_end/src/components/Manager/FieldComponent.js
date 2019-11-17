import {Col, Form} from "react-bootstrap";
import Input from "reactstrap/es/Input";
import React from "react";

const FieldComponent = (props) => {
    return(
        <Form.Group className = {props.type} as = {Col}>
            <Form.Label>{props.placeholder}</Form.Label>
            <Input
                type = {props.typeForm}
                name = {props.name}
                placeholder = {props.placeholder}
                value = {props.value}
                onChange = {props.onChange}
                required
            />
        </Form.Group>
    )
}

export default FieldComponent;