import '../css/userDash.css';
import React from 'react';
import Booking from '../../model/Booking';
import EmplpoyeeAvailability from './EmployeeAvailability';
import Spinner from 'react-bootstrap/Spinner';
const {apiCall} = require('../../mock/operations/mock/functions/operations')

export default class UserNewAppointment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            booking: new Booking({}),
            isCallingServer: true,
            options: [],
            called: false,
            getServicesStatus: null,
            calledTime: false,
            calledDays: false,
            employees: [],
            employee: "",
            array: [],
            timeSlots: []
        };
        this.handleBookingChange = this.handleBookingChange.bind(this);
        this.handleBookingRequestForUser = this.handleBookingRequestForUser.bind(this);
        this.getAllServices = this.getAllServices.bind(this);
        this.updateBooking = this.updateBooking.bind(this)
    }

    updateBooking(e){
        e&&e.preventDefault();
        const booking = new Booking(JSON.parse(JSON.stringify(this.state.booking)));
        this.setState({booking:booking})
    }
    //Calls getService API and populates service options
    getAllServices(){
        //only call api if it hasnt been called yet
        //only call it is there is no state.httpStatusCode
        if(!this.state.getServicesStatus){
            apiCall('user', 'getAllServices', null,'get').then(response=>{
                let options = this.state.options;
                if(response.statusCode===200){
                    this.setState({isCallingServer:false});
                    var servicetypes = [];
                    var i = 1;
                    servicetypes.push(<option key={0} value={"DEFAULT"} disabled>Choose a Service</option>);
                    response.body.forEach((serviceType) =>
                    servicetypes.push(<option key={serviceType.name} value={serviceType.name}>{serviceType.name}</option>),i++);
                    options = servicetypes;
                }
                this.setState({
                    getServicesStatus: response.statusCode,
                    options:options
                })
                }
            )
        }
    }

    handleBookingChange(e){
        e.preventDefault();
        const key = e.target.name;
        const value = e.target.value;
        const booking = new Booking(JSON.parse(JSON.stringify(this.state.booking)));
        booking.setField(key,value)
        this.setState({booking:booking, availabilities: null}, function (){
            if((key==='date')||(key==='duration')){
                this.state.booking.getAvailability().then(response=>{
                    if(response){
                        if(response.statusCode===200){
                            const booking = new Booking(JSON.parse(JSON.stringify(this.state.booking)));
                            booking.availabilities = response.body
                            this.setState({booking:booking, isCallingServer:false, availabilities: response.body})
                        }
                    }
                })
            }
        });
  
    }

    handleTimeValue(index){
        var options = [];
        for (var i =0; i<this.state.array[index-1].length ;i++){
                options.push(<option key={i} value={this.state.array[index-1][i]}>{this.state.array[index-1][i]}</option>);
        }
        this.setState({timeSlots:options});

    }

    getNextDate(date){
        return new Date(date.getTime()+1*24*60*60*1000);
    }
    // displays the days that can be booked
    showDuration(){
        if (this.state.booking.serviceType !== ""){
            return (
            <React.Fragment>
                <label>Duration</label>
                <select 
                    defaultValue="DEFAULT"
                    className="form-control" 
                    name={"duration"} 
                    onChange={this.handleBookingChange}
                >
                    <option key={0} value={"DEFAULT"} disabled>Choose a duration</option>
                    {[1,2,3,4].map((d)=>{return <option key={d} value={d}>{d} hour(s)</option>})}
                </select> 
            </React.Fragment>
            )
        }
    }

    showDates(){
        if(this.state.booking.duration){
            let initial = new Date();
            const dates = []
            for(let i = 0 ; i < 30; i++){
                dates.push(
                    <option key={i+1} value={initial.toString()}>
                        {initial.toDateString()}
                    </option>
                )
                initial.setDate(initial.getDate() + 1)
            }
            return (
                <React.Fragment>
                    <label>Date</label>
                    <select defaultValue="DEFAULT" className="form-control" name={"date"} onChange={this.handleBookingChange}>
                        <option key={0} value={"DEFAULT"} disabled>Choose a date</option>
                        {dates}
                    </select>      
                </React.Fragment>
            )
        }
    }

    handleBookingRequestForUser(){
        //mock for now
        this.setState({isCallingServer:true});
        this.state.booking.handleBookingRequest()
        .then(response=>{
            if(response.statusCode===200){
                this.setState({isCallingServer:false});
                alert("booking successful");
            }else{
                this.setState({isCallingServer:false, failed:true,error:response})
            }
        })      
    }

    render(){
        this.getAllServices();
        if(this.state.getServicesStatus){
            if(this.state.getServicesStatus===200){
                return (
                    <div className={"new-booking"}>
                        <h3 className="title">New Booking</h3>
                        <div className="form-container">
                            <br/>
                            <React.Fragment>
                                <label>Service</label>
                                <select value={this.state.booking.serviceType||"DEFAULT"} className="form-control" name={"serviceType"} onChange={this.handleBookingChange}>{this.state.options}</select>      
                            </React.Fragment>
                            <br></br>
                            {this.showDuration()}
                            <br></br>
                            {this.showDates()}
                            <EmplpoyeeAvailability updateBooking={this.updateBooking} booking={this.state.booking} availabilities={this.state.availabilities}/>
                            <br></br>
                            {this.state.booking.isComplete() &&<button className="btn btn-success" onClick={this.handleBookingRequestForUser}>Submit</button>}
                            <br>
                            </br>
                        </div>
                    </div>
                )
            }else{
                //getServices called but API failed?
                return (
                    <div className={"new-booking"}>
                    <h3 className="title">New Booking</h3>
                    <div className="form-container">
                        <p>Unfortunately we could not load available services at this time.</p>
                    </div>
                    </div>
                );
            }
        }else{
            //hasnt even completed that call yet
            return (
                <div className={"new-booking"}>
                <h3 className="title">Retrieving services</h3>
                <div className="form-container">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                    <p>Please wait while we figure out what services are available to you.</p>
                </div>
                </div>
            );
        }

    }
}