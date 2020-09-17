import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const appointments = require('./mock/mockAppointments.json');
export default class CompanyAppointmentList extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            noDate: true,
            searchDate: null,
            selectedEmployeeId: "",
            selectedService: ""
        }

        this.handleDateFilter = this.handleDateFilter.bind(this);
    }

    handleDateFilter(e){
        e.preventDefault();
        this.setState({noDate: false});
        this.setState({searchDate: e.target.value});
    }

    render(){
            //check if the cards have a date filter set, and if so check
            //if not, all should be shown
            const cards = appointments.filter(appointment =>
              new Date(appointment.startDateTime).toDateString() === new Date(this.state.searchDate).toDateString() ||
              this.state.noDate).map(appointment=>{

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
                Search by Date: <input type="date" value={this.state.searchDate} onChange={this.handleDateFilter}/>
                <Accordion defaultActiveKey="0">
                    {cards}
                </Accordion>
            </div>
        )
    }
}
