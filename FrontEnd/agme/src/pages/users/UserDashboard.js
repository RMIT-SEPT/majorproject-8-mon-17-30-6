import '../css/userDash.css';
import React from 'react';
const functions = require('../../apiOperations')

export default class UserDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCallingServer: false,
            options: [],
            called: false,
            calledTime: false,
            calledDays: false,
            employees: [],
            days: [],
            employee: "",
            array: [],
            timeSlots: [],
            chosen: "",
            duration: "1",
            serviceName: "",
            dateBooked: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBookingRequestForUser = this.handleBookingRequestForUser.bind(this);
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
            servicetypes.push(<option key={0} value=""   defaultValue>Choose a Service</option>);

            // loops through services and adds them
            this.serviceType = response.body.map((serviceType) =>
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
    <select className="form-control" name={"serviceName"} value={this.state.serviceName}  onChange={this.handleInputChange}>{this.state.options}</select>      
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
    

    // Makes a request to get employees and display the availability.
    showAvailableTimes(){
        console.log(this.state.serviceName)
        if (!this.state.calledTime && this.state.serviceName !== "" && this.state.dateBooked !== "" ){
            // gets todays date
            var today = new Date();
            var day = today.getDate();
            var d = this.state.dateBooked.substr(0,2);
            var diff = d-day;

            // sets the date according the one selected
            today.setDate(today.getDate() + diff);

            // javascript counts 00 as a month
            var month = today.getMonth();
            month = month +1;

            // date in correct formatting
            var dateT = today.getDate() + "-" + month + "-" + today.getFullYear().toString().substr(-2) + " " + today.getHours() + ":00:00"
            var i = 1;

            functions.getAvailabilityForService(this.state.serviceName,dateT, this.state.duration).then(response=>{
                if(response.statusCode===200){
                    this.setState({isCallingServer:false});

                this.setState({dateBooked:dateT})
                var employeesVal = [];
                var employeeAvailability = [];
                employeesVal.push(<option key={0} value="" >Please select an employee</option>);
                // maps employee names
                this.serviceType = response.body.map((serviceType) =>
                    employeesVal.push(<option key={serviceType.name} value={serviceType.username}>{serviceType.name}</option>),
                    this.setState({employees:employeesVal,isCallingServer:false, calledTime:true}),
                    i++,
                );

                // array of employee availablilty
                this.serviceType = response.body.map((serviceType) =>
                    employeeAvailability.push(serviceType.availability),
                    this.setState({array:employeeAvailability})
                );
            }else{
                this.setState({isCallingServer:false})
            }
            }
            
            )
    }
    // render select bo for employees and timeslots
    if (this.state.serviceName !== "" && this.state.dateBooked !== ""){
        return <React.Fragment>
        <label>Employee</label>
            <select className="form-control" name={"employee"} onChange={this.handleInputChange}>{this.state.employees}</select> <br></br>
            <label>Time</label>
            <select className="form-control" name={"chosen"} value={this.state.chosen}  onChange={this.handleInputChange}>{this.state.timeSlots}</select>      
        </React.Fragment>
    }
    }

    handleTimeValue(index){
        var options = [];
        for (var i =0; i<this.state.array[index-1].length ;i++){
                options.push(<option key={i} value={this.state.array[index-1][i]}>{this.state.array[index-1][i]}</option>);
        }
        this.setState({timeSlots:options});

    }

    
    // displays the days that can be booked
    showDaysToBook(){
        if (!this.state.calledDays && this.state.serviceName !== ""){
        var today = new Date();
        var day = today.getDate() +2;
        var arr = [];
        console.log(day)
        arr.push(<option key={0} value="" disabled defaultValue>Choose a Day</option>);
        today.setDate(today.getDate() + 2);

        for (var i = 0; i<29; i++){
            arr.push(<option key={today.getDate()} value={today.getDate()}>{today.toString().slice(0, -25)}</option>);
            today.setDate(today.getDate() + 1);
        }
        this.setState({days:arr,isCallingServer:false, calledDays:true});
    }

    if (this.state.serviceName !== ""){
        return <React.Fragment>
  
        <label>Duration</label>
        <select className="form-control" name={"duration"} value={this.state.duration}  onChange={this.handleInputChange}>
        <option defaultValue value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        </select><br></br>  
        <label>Day</label>
        <select className="form-control" name={"dateBooked"} value={this.state.dateBooked}  onChange={this.handleInputChange}>{this.state.days}</select>   
        <br></br>
        </React.Fragment>
    }
    }
    handleBookingRequestForUser(){
        //mock for now
        this.setState({isCallingServer:true});
        functions.handleBookingRequest(this.state.serviceName,this.state.duration, this.state.employee, this.state.dateBooked.substr(0,8) + this.state.chosen + ":00:00").then(response=>{
            if(response.statusCode===200){
                this.setState({isCallingServer:false});
                alert("booking successful");
            }else{
                this.setState({isCallingServer:false, failed:true,error:response})
            }
        })
        
    }

    showAuthenticationButton(){
        if (this.state.serviceName !== "" &&this.state.employee !== "" &&this.state.dateBooked !== "" &&this.state.chosen){
            
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
                    {this.showDaysToBook()}
                    <br></br>

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