import '../css/userDash.css';
import React from 'react';
import Booking from '../../model/Booking';
const functions = require('../../apiOperations')

export default class UserDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            booking: new Booking({}),
            isCallingServer: false,
            options: [],
            called: false,
            calledTime: false,
            calledDays: false,
            employees: [],
            dates: [],
            employee: "",
            array: [],
            timeSlots: []
        };
        this.handleBookingChange = this.handleBookingChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBookingRequestForUser = this.handleBookingRequestForUser.bind(this);
        this.showAvailableServices = this.showAvailableServices.bind(this);
        this.showAvailableTimes = this.showAvailableTimes.bind(this);
    }

    // Show available services
    showAvailableServices(){
        // if the command hasnt been executed
        if (!this.state.called){
            // get all services
            functions.getAllServicesForUser().then(response=>{
                if(response.statusCode===200){
                    this.setState({isCallingServer:false});
            var servicetypes = [];
            var i = 1;
            //  add default to array
            servicetypes.push(<option key={0} value={"DEFAULT"} disabled>Choose a Service</option>);

            // loops through services and adds them
            response.body.forEach((serviceType) =>
                servicetypes.push(<option key={serviceType.name} value={serviceType.name}>{serviceType.name}</option>),
                i++);
            this.setState({options:servicetypes,isCallingServer:false, called:true});
                }else{
                    this.setState({isCallingServer:false,called:true});
                }
            }
        )
        
    }
    return <React.Fragment>
    <label>Service</label>
    <select value={this.state.booking.serviceType||"DEFAULT"} className="form-control" name={"serviceType"} onChange={this.handleBookingChange}>{this.state.options}</select>      
</React.Fragment>
 
}

// Handle input change
    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
        if (name === "employee"){
            var index = e.nativeEvent.target.selectedIndex;
            this.handleTimeValue(index)

        }
    }

    handleBookingChange(e){
        e.preventDefault();
        const key = e.target.name;
        const value = e.target.value;
        let booking = new Booking(this.state.booking);
        booking.setField(key,value)
        this.setState({booking:booking});
        console.log(this.state.booking)
    }
    

    // Makes a request to get employees and display the availability.
    showAvailableTimes(){
        if(!this.state.calledTime){
            this.state.booking.getAvailability()
            .then(response=>{
                if(response){
                    this.setState({isCallingServer:false, booking: new Booking(this.state.booking)})
                }
            })
        }
        if(this.state.booking.available){
            return "available"
        }
    }

    handleTimeValue(index){
        var options = [];
        for (var i =0; i<this.state.array[index-1].length ;i++){
                options.push(<option key={i} value={this.state.array[index-1][i]}>{this.state.array[index-1][i]}</option>);
        }
        this.setState({timeSlots:options});

    }

    //format date object fo dd-mm-yy hh:mm:ss
    formatDateToDayMonthYearTime(date){
        const day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
        const month = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
        const year = date.getFullYear().toString()[2]+date.getFullYear().toString()[3];
        const hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
        return `${day}-${month}-${year} ${hour}-00:00`
    }
    formatDateToDayMonthYear(date){
        const day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
        const month = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
        const year = date.getFullYear().toString()[2]+date.getFullYear().toString()[3];
        return `${day}-${month}-${year}`
    }

    getNextDate(date){
        return new Date(date.getTime()+2*24*60*60*1000);
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
                <br></br>  
                <br></br>
            </React.Fragment>
            )
        }
    }

    showDates(){
        if(this.state.booking.duration){
            let initial = (this.getNextDate(new Date()));
            const dates = []
            for(let i = 0 ; i < 30; i++){
                dates.push(
                    <option key={i+1} value={initial}>
                        {initial.toDateString()}
                    </option>
                )
                initial = this.getNextDate(initial)
            }
            return (
                <React.Fragment>
                    <label>Date</label>
                    <select value={this.state.booking.date||"DEFAULT"} className="form-control" name={"date"} onChange={this.handleBookingChange}>
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
        console.log(this.state)
        functions.handleBookingRequest(this.state.serviceName,this.state.duration, this.state.employee, this.state.dateBooked, this.state.chosen).then(response=>{
            if(response.statusCode===200){
                this.setState({isCallingServer:false});
                alert("booking successful");
            }else{
                this.setState({isCallingServer:false, failed:true,error:response})
            }
        })
        
    }

    showAuthenticationButton(){
        if ((this.state.serviceName !== "") &&(this.state.employee !== "")&&(this.state.dateBooked !== "") &&(Number(this.state.chosen))){
            
            return <button className="btn btn-success" onClick={this.handleBookingRequestForUser}>Submit</button>
        }
    }
    render(){
        
        return (
            <div className={"new-booking"}>
                <h3 className="title">New Booking</h3>
                <div className="form-container">
                    <br/>
                    {this.showAvailableServices()}
                    <br></br>
                    {this.showDuration()}
                    <br></br>
                    {this.showDates()}
                    {this.showAvailableTimes()}
                    <br></br>
                    {this.showAuthenticationButton()}
                    <br>
                    </br>
                </div>
            </div>
        )
    }
}