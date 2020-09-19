import '../css/userDash.css';
import React from 'react';
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
            calledDays: false,

            days: [],
            dayToBook: ""
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
        <select className="form-control" name={"serviceTypeName"} value={this.state.serviceTypeName}  onChange={this.handleInputChange}>{this.state.options}</select>      
    </React.Fragment>
    

    }
    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
        if (this.state.dayToBook !== "" && this.state.serviceTypeName !== ""){
            this.showAvailableTimes();
        }
    }

    showAvailableTimes(){
        if (!this.state.called){
            functions.getAvailabilityForService(this.state.serviceTypeName,this.state.dayToBook).then(response=>{
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
            <select className="form-control" name={"serviceTypeName"} value={this.state.serviceTypeName}  onChange={this.handleInputChange}>{this.state.options}</select>      
        </React.Fragment>
    }
    showDaysToBook(){
        if (!this.state.calledDays){
        var today = new Date(2);
        console.log(today);
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
        console.log(this.state.days);
    }
        return <React.Fragment>
        <select className="form-control" name={"arr"} value={this.state.dayToBook}  onChange={this.handleInputChange}>{this.state.days}</select>      
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

                    <br>
                    </br>
                </div>
            </div>
        )
    }
}