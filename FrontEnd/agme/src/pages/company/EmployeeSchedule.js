import React from 'react';

export class EmployeeSchedule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }

    }

    handleSelectDate(e){
        e.preventDefault();
        
    }

    render(){
        if(this.props.employee.id){
            const bookings = this.props.employee.getBookings(this.props.bookings);
            console.log(bookings);
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
            console.log(bookingsDictionary)
            return (
                <div>
                    <div>
                        <label for="date">Pick a date</label>
                        <input name="date" type="date"/>
                    </div>
                </div>
            );
        }
        return ""

    }
}