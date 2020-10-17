import React from 'react';
import Button from "react-bootstrap/Button";
import { BsTrash } from "react-icons/bs"; 
import './availability.css';
export class EmployeeAvailability extends React.Component{

    constructor(props){
        super(props);
        //simply to force re-rendering when changing a booking
        this.state={
            updateCounter: 0
        }
    }
    findBookingByTime(time){
        try{
            return this.props.bookings.filter(booking=>{
                const bookingTime = booking.startDateTime.split(" ")[1].split(":00:")[0]
                return (booking.startDateTime.includes(this.props.date))&&(Number(bookingTime)===Number(time))
            })[0]
        }catch(e){
            return null
        }
    }

    render(){
        const times = [8,9,10,11,12,13,14,15,16,17];
        let availableTimes = new Set(times);
        Array.from(this.props.times).forEach(time=>{availableTimes.delete(time)})
        const availabilityComponent = times.map((time,i)=>{
        const booking = this.findBookingByTime(time)&&(
            <span className="delete_info">
                Delete Booking id: 
                {this.findBookingByTime(time).id}
                <Button value={(this.findBookingByTime(time).id)} className="button_info" variant="secondary" onClick={this.props.deleteBooking}><BsTrash/></Button>
            </span>); 
            let button = null;
            let action = null;
            if(availableTimes.has(time)){
                button = <Button variant="success">Available</Button>
            }else{
                button = <Button variant="secondary">Unvailable</Button>
                action = <Button value={(this.findBookingByTime(time).id)} variant="secondary" className="schedule_delete_button" onClick={this.props.deleteBooking}><BsTrash/></Button>
            }
            return <div className="hour" key={i}>
                <span className="label">{time}</span>
                {button}{action}{booking}
            </div>
        })
        return <div className="employee_availability">
            <p>
                Click on <Button className="button_info" variant="secondary"><BsTrash/></Button>
                to delete a booked time slot
            </p>
            
           {availabilityComponent}
       </div>
    }
}