import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './upcomingevent.css';
import Spinner from 'react-bootstrap/Spinner'
const functions = require('../../apiOperations')
export default class UpcomingAppointments extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            called: false
        }
    }

    componentDidMount(){
        functions.getCall('user', 'getBookings').then(r=>{
            if(r.statusCode===200){
                console.log(r.body)
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
                    const time = appointment.startDateTime;
                    const dateTime = new Date(Number(2000+time.split("-")[2].split(" ")[0]),time.split("-")[1]-1,time.split("-")[0],time.split(" ")[1].split(":")[0]);
                    const year = dateTime.getFullYear();
                    const month = (dateTime.getMonth()+1) < 10 ? "0"+(dateTime.getMonth()+1) : dateTime.getMonth()+1;
                    const date = (dateTime.getDate()) < 10 ? "0"+(dateTime.getDate()) : dateTime.getDate();
                    const hours = dateTime.getHours();
                    const minutes = dateTime.getMinutes() < 10 ? "0"+dateTime.getMinutes() : dateTime.getMinutes();
                    return <Card key={key}>
                        <Card.Header>
                            {date+"/"+month+"/"+year+" - "+hours+":"+minutes}
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