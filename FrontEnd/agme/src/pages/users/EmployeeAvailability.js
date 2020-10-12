import '../css/userDash.css';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default class EmmployeeAvailability extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            availabilities: this.props.availabilities,
            selectedEmployee: ""
        }
    }
    render(){
        console.log(this.props)
        if(this.props.isUpdatingAvailability){
            return <div>
                <div className="spinnerOutter">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
                <p>Please wait while we retrieve availability. Please select a date if you haven't done it already</p>
            </div>
        }
        if(this.props.availabilities){
            if((this.props.availabilities.length>0)){
                const employeeOptions = this.props.availabilities.map((availability,i)=>{
                    return (
                        <option key={i+1} value={availability.username}>{availability.name}</option>
                    )
                });
                const times = this.state.selectedEmployee&&this.props.availabilities.filter(availability=>{
                    return availability.username === this.state.selectedEmployee
                });
                const timeOptions = times&&(times.length>0)&&(
                    <React.Fragment>
                        <label>Time</label>
                        <select
                            name="time"
                            defaultValue="DEFAULT"
                            className="form-control"
                            onChange={e=>{
                                e.preventDefault();
                                this.props.booking.setTime(e.target.value);
                                this.props.updateBooking(); //to force parent to re-render
                            }} 
                        >
                            <option key={0} value={"DEFAULT"} disabled>Choose time</option>
    
                            {
                                times[0].availability.map((time,i)=>{
                                    return (
                                        <option key={i+1} value={time}>{`${time}:00:00`}</option>
                                    )
                                })
                            }
                        </select>
                    </React.Fragment>
                )
    
                return (
                    <div>
                 <React.Fragment>
                    <label>Select an employee</label>
                    <select 
                        defaultValue="DEFAULT"
                        className="form-control" 
                        name={"employeeUsername"}
                        onChange={e=>{
                            e.preventDefault();
                            this.setState({selectedEmployee:e.target.value})
                            this.props.booking.setEmployeeUsername(e.target.value)
                        }} 
                    >
                        <option key={0} value={"DEFAULT"} disabled>Select an employee</option>
                        {employeeOptions}
                    </select>      
            </React.Fragment>
            {timeOptions}                   
                    </div>
                )
            }else{
                return (
                    <div>
                    No time available for this date and duration
                    </div>
                )
            }
        }else{
            return "";
        }
    }
}