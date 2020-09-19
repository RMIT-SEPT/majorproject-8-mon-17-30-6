import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const appointments = require('./mock/mockAppointments.json');
export default class CompanyAppointmentList extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            haveSearchDate: false,
            haveSearchName: false,
            haveSearchServiceType: false,
            haveSearchTimeRangeStart: false,
            haveSearchTimeRangeEnd: false,
            searchDataDate: "",
            searchDataName: "",
            searchDataServiceType: "",
            searchDataTimeRangeStart: "",
            searchDataTimeRangeEnd: ""
        }

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});

        switch (name) {
          case "searchDataDate":
            if (value === "") {
              this.setState({haveSearchDate:false});
            }
            else {
              this.setState({haveSearchDate:true});
            }
            break;
          case "searchDataName":
            if (value === "") {
              this.setState({haveSearchName:false});
            }
            else {
              this.setState({haveSearchName:true});
            }
            break;
          case "searchDataServiceType":
            if (value === "") {
              this.setState({haveSearchServiceType:false});
            }
            else {
              this.setState({haveSearchServiceType:true});
            }
            break;
          case "searchDataTimeRangeStart":
            if (value === "") {
              this.setState({haveSearchTimeRangeStart:false});
            }
            else {
              this.setState({haveSearchTimeRangeStart:true});
            }
            break;
          case "searchDataTimeRangeEnd":
            if (value === "") {
              this.setState({haveSearchTimeRangeEnd:false});
            }
            else {
              this.setState({haveSearchTimeRangeEnd:true});
            }
            break;

          default:

        }
    }



    render(){
            //check if the cards have a date filter set, and if so check
            //if not, all should be shown
            //filters by:
            //Date
            //any name (company, user, employee)
            //serviceType
            //also, ignore case
            const cards = appointments
              .filter(appointment =>
              new Date(appointment.startDateTime).toDateString() === new Date(this.state.searchDataDate).toDateString() ||
              !this.state.haveSearchDate)
                .filter(appointment =>
                appointment.employee.name.toUpperCase() === this.state.searchDataName.toUpperCase() ||
                appointment.user.name.toUpperCase() === this.state.searchDataName.toUpperCase() ||
                appointment.company.name.toUpperCase() === this.state.searchDataName.toUpperCase() ||
                !this.state.haveSearchName)
                  .filter(appointment =>
                  appointment.serviceType.toUpperCase() === this.state.searchDataServiceType.toUpperCase() ||
                  !this.state.haveSearchServiceType)
                    .filter(appointment =>
                    ((this.state.searchDataTimeRangeStart.substring(0,2) <= new Date(appointment.startDateTime).getHours()) &&
                    (new Date(appointment.startDateTime).getHours()<= this.state.searchDataTimeRangeEnd.substring(0,2))) ||
                    (!this.state.haveSearchTimeRangeEnd || !this.state.haveSearchTimeRangeStart))

              .map(appointment=>{
                console.log(this.state.searchDataTimeRangeStart.substring(0,2) <= new Date(appointment.startDateTime).getHours() <= this.state.searchDataTimeRangeEnd.substring(0,2));
                console.log(this.state.searchDataTimeRangeStart.substring(0,2));
                console.log(new Date(appointment.startDateTime).getHours());
                console.log(this.state.searchDataTimeRangeEnd.substring(0,2));
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
                                    Customer: {appointment.user.name}
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
                Date:           <input name="searchDataDate" type="date" placeholder="Date of Appointment" value={this.state.searchDataDate} onChange={this.handleFilter}/><br/>
                Name:           <input name="searchDataName" type="text" placeholder="Name" value={this.state.searchDataName} onChange={this.handleFilter}/><br/>
                Service Type:   <input name="searchDataServiceType" type="text" placeholder="Service Type" value={this.state.searchDataServiceType} onChange={this.handleFilter}/><br/>
              Time Range:       <input name="searchDataTimeRangeStart" type="time" placeholder="Start" value={this.state.searchDataTimeRangeStart} onChange={this.handleFilter}/>-
                                <input name="searchDataTimeRangeEnd" type="time" placeholder= "End" value={this.state.searchDataTimeRangeEnd} onChange={this.handleFilter}/>
                        <Accordion defaultActiveKey="0">
                            {cards}
                        </Accordion>
                    </div>
        )
    }
}
