import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


var appointments = [];

const functions = require('../../apiOperations.js');

export class CompanyAppointmentList extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            error: false,
            haveSearchDate: false,
            haveSearchName: false,
            haveSearchServiceType: false,
            haveSearchTimeRangeStart: false,
            haveSearchTimeRangeEnd: false,
            searchDataDate: "",
            searchDataName: "",
            searchDataServiceType: "",
            searchDataTimeRangeStart: "",
            searchDataTimeRangeEnd: "",
            searchDataOldBookings: false,
            haveDataFromServer: false
        }

        this.handleFilter = this.handleFilter.bind(this);
    }

    componentDidMount() {
      functions.getCompanyBookings().then(response=>{
          appointments = response.body;
          console.log(appointments);
          console.log(response);
          if (response.statusCode === 200) {
            for (var i = 0; i < appointments.length; i++) {
              var time = appointments[i].startDateTime.replace(' ','T');
              var time2 = "20" + time.substr(6,2) + "-" + time.substr(3,2) + "-" + time.substr(0,2) + time.substr(8,9);
              appointments[i].startDateTime = time2;
            }
            this.setState({"haveDataFromServer":true});
          }
          else {
            this.setState({"error":response.statusCode});
          }
          this.render()
      });

    }

    handleFilter(e){
        // e.preventDefault();
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
          case "searchDataOldBookings":
            this.setState({allowOldBookings:!this.state.allowOldBookings});

            break;
          default:

        }
        this.render();
    }





    render(){
      if (this.state.haveDataFromServer === false) {
        return <Card>
          <h2>Loading Data...</h2>
        </Card>;
      }
      else if (appointments.length === 0) {
        return <Card>
          <h2>No Current Bookings.</h2>
        </Card>;
      }
      else if (this.state.error !== false) {
        return <Card>
          <h2>Error Number {this.state.error} recieved. Please try again later.</h2>
        </Card>;
      }
      else {
        //each .filter handles a different search box
        const currentCards = appointments
        .filter(appointment =>
        new Date(appointment.startDateTime) > new Date() ||
        this.state.haveSearchDate ||
        this.state.allowOldBookings)
          .filter(appointment =>
          new Date(appointment.startDateTime).toDateString() === new Date(this.state.searchDataDate).toDateString() ||
          !this.state.haveSearchDate)
            .filter(appointment =>
            appointment.employee.name.toUpperCase().indexOf(this.state.searchDataName.toUpperCase()) > -1  ||
            appointment.user.name.toUpperCase().indexOf(this.state.searchDataName.toUpperCase()) > -1   ||
            appointment.company.name.toUpperCase().indexOf(this.state.searchDataName.toUpperCase()) > -1  ||
            !this.state.haveSearchName)
            .filter(appointment =>
            appointment.serviceType.name.toUpperCase() === this.state.searchDataServiceType.toUpperCase() ||
            !this.state.haveSearchServiceType)
              .filter(appointment =>
              ((this.state.searchDataTimeRangeStart.substring(0,2) <= new Date(appointment.startDateTime).getHours()) &&
              (new Date(appointment.startDateTime).getHours()<= this.state.searchDataTimeRangeEnd.substring(0,2))) ||
              (!this.state.haveSearchTimeRangeEnd || !this.state.haveSearchTimeRangeStart))
              .map(appointment=>{

              var time = appointment.startDateTime;
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
                                  Employee Assigned: {appointment.employee.name}
                              </p>
                              <p>Service: {appointment.serviceType.name}</p>
                              <p>Duration: {appointment.duration} Hours</p>
                          </div>
                      </Card.Body>
                  </Accordion.Collapse>
              </Card>
          })

        return (
          <div>
              <h3>Your upcoming events</h3>
              View Old Bookings?  <input name="searchDataOldBookings" type="checkbox" value={this.state.allowOldBookings} onChange={this.handleFilter}/><br/>
              Date:               <input name="searchDataDate" type="date" placeholder="Date of Appointment" value={this.state.searchDataDate} onChange={this.handleFilter}/><br/>
              Name:               <input name="searchDataName" type="text" placeholder="Name" value={this.state.searchDataName} onChange={this.handleFilter}/><br/>
              Service Type:       <input name="searchDataServiceType" type="text" placeholder="Service Type" value={this.state.searchDataServiceType} onChange={this.handleFilter}/><br/>
              Time Range:         <input name="searchDataTimeRangeStart" type="time" value={this.state.searchDataTimeRangeStart} onChange={this.handleFilter}/>-
                                  <input name="searchDataTimeRangeEnd" type="time" value={this.state.searchDataTimeRangeEnd} onChange={this.handleFilter}/>
                      <Accordion defaultActiveKey="0">
                          {currentCards}
                      </Accordion>
                  </div>
        )
        }
      }

}
