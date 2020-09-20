import React from 'react';
import {EmployeeAvailability} from './EmployeeAvailability';
const {deleteBooking} = require('../../mock/operations');

export class EmployeeSchedule extends React.Component{
    constructor(props){
        super(props);
        this.handleSelectDate = this.handleSelectDate.bind(this)
        this.state = {
            date: ""
        }
    }


    handleSelectDate(e){
        e.preventDefault();
        const value = e.target.value.split("-");
        this.setState({date: `${value[2]}-${value[1]}-${value[0]}`});
    }

    render(){
        console.log(this.props.bookings)
        if(this.props.employee.id){
            const bookings = this.props.employee.getBookings(this.props.bookings);
            const bookingsDictionary = {}
            bookings.forEach(booking=>{
                let date = booking.date.split(" ")[0];
                if(!bookingsDictionary[date]){
                    bookingsDictionary[date] = {
                        times: new Set()
                    }
                }
                bookingsDictionary[date].times.add(booking.time)
            });
            const times = bookingsDictionary[this.state.date] ? (bookingsDictionary[this.state.date].times) : new Set();
            const availabilityComponent = this.state.date ? <EmployeeAvailability date={this.state.date} times={times} bookings={bookings} deleteBooking={this.props.deleteBooking}/> : "";
            return (
                <div>
                    <div>
                        <label htmlFor="date">Pick a date</label>
                        <input name="date" type="date" onChange={this.handleSelectDate}/>
                    </div>
                    {availabilityComponent}
                </div>
            );
        }
        return ""

    }
}