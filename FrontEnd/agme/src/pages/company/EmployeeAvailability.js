import React from 'react';
import Button from "react-bootstrap/Button";
import './availability.css';
export class EmployeeAvailability extends React.Component{
    render(){
        const times = [8,9,10,11,12,13,14,15,16,17];
        let availableTimes = new Set(times);
        Array.from(this.props.times).forEach(time=>{availableTimes.delete(time)})
        const availabilityComponent = times.map((time,i)=>{
            let button = null;
            if(availableTimes.has(time)){
                button = <Button variant="success">Available</Button>
            }else{
                button = <Button variant="secondary">Unvailable</Button>
            }
            return <div className="hour" key={i}>
                <span className="label">{time}</span>
                {button}
            </div>
        })
        return <div className="employee_availability">
           {availabilityComponent}
       </div>
    }
}