import React from 'react';
import {EmployeeAvailability} from './EmployeeAvailability';
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
            const availabilityComponent = this.state.date ? <EmployeeAvailability times={times}/> : "";
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