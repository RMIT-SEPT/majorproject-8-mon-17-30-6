import React from 'react';
import Button from "react-bootstrap/Button"
import { apiCall } from '../../mock/operations/mock/functions/operations';
const {apiCall, getDecodedJwtFromLocalStorage} = require('../../mock/operations/mock/functions/operations');

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
        this._isMounted = false;
        this.addNewSubmit = this.addNewSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    addNewSubmit() {

    }

    handleInputChange(e) {

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        apiCall('company', 'getBookings', null, 'GET').then(response=>{
            const username = getDecodedJwtFromLocalStorage().sub;

            if (response.statusCode == 200) {
                let all = new Set();
                let company = new Set();

                const companyBookings = response.body.filter(booking=>{
                    all.add(booking.bookingID);
                    const hasBooking = booking.company.filter(company=>{return company.username===username}).length>0;

                    if (hasBooking) {
                        company.add(booking.bookingID);
                    }
                    return hasBooking;
                });
            }
        });
    }

    render() {

    }
}