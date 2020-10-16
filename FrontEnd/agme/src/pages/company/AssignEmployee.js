import React from 'react';
import Button from "react-bootstrap/Button"

export class AssignEmployee extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isCallingServer: false,
            failed: false,
            error: null,
            employeeID: "",
            bookingID: ""
        }
        this.addNewSubmit = this.addNewSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {

    }
}