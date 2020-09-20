import '../css/userDash.css';
import React from 'react';
import { array } from 'prop-types';
const functions = require('../../apiOperations')

export default class UserDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCallingServer: false,
            failed: false,
            serviceTypeName: "",
            options: [],
            called: false,
            calledTime: false,
            calledDays: false,
            employees: [],
            days: [],
            dayToBook: "",
            employee: "",
            timeToBook: "",
            name: "",
            selected: "",
            array: [],
            timeSlots: [],
            calledSlot: false,
            calledAl: false

        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    showAvailableServices(){
        if (!this.state.called){
        functions.getAllServicesForUser().then(response=>{
            var arr = [];
            var i = 1;
            arr.push(<option key={0} value=""  disabled defaultValue>Choose a Service</option>);

            this.serviceType = response.body.map((serviceType) =>
            arr.push(<option key={i} value={serviceType.name}>{serviceType.name}</option>),
            i++
            );
              this.setState({options:arr,isCallingServer:false, called:true});
        }
    
        )
    }
    
    
    return <React.Fragment>
        <select className="form-control" name={"serviceTypeName"} value={this.state.serviceName}  onChange={this.handleInputChange}>{this.state.options}</select>      
    </React.Fragment>
    

    }
    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        if (name === "employee"){
            var index = e.nativeEvent.target.selectedIndex;

            {this.handleTimeValue(index)}

        }
        this.setState({[name]:value})

    }
    showAvailableTimes(){
        if (!this.state.calledTime){
            var today = new Date();
            var day = today.getDay();
            var diff = this.state.dayToBook-day;
            today = new Date(diff);

            var dateT = today.getDay() + "-" + today.getMonth() + "-" + today.getFullYear().toString().substr(-2) + " " + today.getHours() + ":00:00"
            var i = 1;

            functions.getAvailabilityForService("mark",dateT).then(response=>{
                var employeesVal = [];
                var employeeAvailability = [];
                employeesVal.push(<option key={0} value=""  disabled defaultValue>Employee</option>);
                // maps employee names
                this.serviceType = response.body.map((serviceType) =>
                    employeesVal.push(<option key={i} value={serviceType}>{serviceType.name}</option>),
                    this.setState({employees:employeesVal,isCallingServer:false, calledTime:true}),
                    i++,
                );

                // array of employee availablilty
                this.serviceType = response.body.map((serviceType) =>
                    employeeAvailability.push(serviceType.availability),
                    this.setState({array:employeeAvailability})
                );
            }
            )
    }
        return <React.Fragment>
            <select className="form-control" name={"employee"} value={this.state.employee}  onChange={this.handleInputChange}>{this.state.employees}</select> 
            <br></br>     
            <select className="form-control" name={"timeToBook"} value={this.state.timeToBook}  onChange={this.handleInputChange}>{this.state.timeSlots}</select>      


        </React.Fragment>
    }

    handleTimeValue(index){
        console.log(index)
        var options = [];
        console.log(this.state.array)
        for (var i =0; i<5;i++){
            options.push(<option key={i} value={this.state.array[index-1][i]}>{this.state.array[index-1][i]}</option>);
        }
        this.setState({timeSlots:options});

    }
    showDaysToBook(){
        if (!this.state.calledDays){
        var today = new Date(2);
        var day = today.getDay();
        var arr = [];
        arr.push(<option key={0} value=""  disabled defaultValue>Choose a Day</option>);

        for (var i = 0; i<30; i++){
            if (day !== 30 && day < 31){
            arr.push(<option key={i} value={day}>{day}</option>);
        }
            day++;
        }
        this.setState({days:arr,isCallingServer:false, calledDays:true});
    }
        return <React.Fragment>
        <select className="form-control" name={"dayToBook"} value={this.state.dayToBook}  onChange={this.handleInputChange}>{this.state.days}</select>      
        </React.Fragment>
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

                    <br>
                    </br>
                </div>
            </div>
        )
    }
}