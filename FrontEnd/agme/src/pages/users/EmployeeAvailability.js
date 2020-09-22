import '../css/userDash.css';
import React from 'react';

export default class EmmployeeAvailability extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            availabilities: this.props.availabilities,
            selectedEmployee: ""
        }
    }
    render(){
        if(this.props.availabilities&&(this.props.availabilities.length>0)){
            console.log(this.props)
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
        }
        return (
            <div>
               No time available for this date and duration
            </div>
        )
    }
}