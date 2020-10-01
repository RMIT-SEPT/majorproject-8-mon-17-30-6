import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './upcomingevent.css';
import Spinner from 'react-bootstrap/Spinner';
import { BsTrash } from "react-icons/bs"; 
import Button from "react-bootstrap/Button";
import Booking from '../../model/Booking'
const {apiCall} = require('../../mock/operations/mock/functions/operations');
export default class UpcomingAppointments extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            called: false
        }
    }

    componentDidMount(){
        apiCall('user', 'getBookings',null,'get').then(r=>{
            if(r.statusCode===200){
                this.setState({appointments:r.body, failed: false, called: true})
            }else{
                this.setState({failed: true, called: true})
            }
        });
    }

    render(){
        if(!this.state.called){
            return <div className="calling">
                <div className="spinnerOutter">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div>
                <br/>
                <p>Please wait while we retrieve your bookings.</p>
                
            </div>
        }else{
            if(this.state.failed){
                return <div>Ooops. Something went wrong, we could not retrieve your bookings</div>
            }else{
                const cards = this.state.appointments.map((appointment,key)=>{
                    const booking = new Booking(appointment);
                    return <Card key={key}>
                        <Card.Header>
                            {booking.getDateString()}
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className="upcoming_event_company">
                                    <p>
                                        Company: {appointment.company.name}
                                    </p>
                                    <p>
                                        {appointment.employee.userType}: {appointment.employee.name}
                                    </p>
                                    <p>Service: {appointment.serviceType.name}</p>
                                    <p>Duration: {appointment.duration} hours</p>
                                    <Button variant="danger">
                                        <BsTrash/> Delete Booking id {appointment.id}
                                    </Button>
                                </div>
                                </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                })
        
                return (
                    <div>
                        <h3>Your upcoming events</h3>
                        <Accordion defaultActiveKey="0">
                            {cards}
                        </Accordion>
                    </div>
                )
            }
        }


    }
}