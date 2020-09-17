import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './upcomingevent.css';

const appointments = require('./mock/upcomingAppointments.json');
export default class UpcomingAppointments extends React.Component{
    render(){

        const cards = appointments.map(appointment=>{
            const time = appointment.startDateTime;
            const dateTime = new Date(time);
            const year = dateTime.getFullYear();
            const month = (dateTime.getMonth()+1) < 10 ? "0"+(dateTime.getMonth()+1) : dateTime.getMonth()+1;
            const date = (dateTime.getDate()) < 10 ? "0"+(dateTime.getDate()) : dateTime.getDate();
            const hours = dateTime.getHours();
            const minutes = dateTime.getMinutes() < 10 ? "0"+dateTime.getMinutes() : dateTime.getMinutes();
            return <Card>
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
                            <p>Service: {appointment.serviceType}</p>
                            <p>Duration: {appointment.duration} minutes</p>
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