import React from 'react';
import Employee from '../../model/Employee';
import { EmployeeSchedule } from './EmployeeSchedule';
import Booking from '../../model/Booking';
import './viewEmployees.css'
const {getCompanyEmployees, getCompanyBookings, deleteBooking} = require('../../mock/operations');

export class ViewEmployees extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            employees: [],
            selectedEmployee: null,
            bookings:[]
        }

        getCompanyEmployees().then(response=>{
            if(response.statusCode===200){
                const employees = response.body.map(employee=>{return new Employee(employee)});
                this.setState({employees:employees})
            }
        });

        getCompanyBookings().then(response=>{
            if(response.statusCode===200){
                this.setState({bookings:response.body})
            }
        });

        this.callDeleteBooking = this.callDeleteBooking.bind(this);
        this.handleSelectEmployee = this.handleSelectEmployee.bind(this);
    }

    //need to delete here, otherwise children components wont re-render properly
    callDeleteBooking(e){
        e.preventDefault();
        const bookingId = e.currentTarget.value;
        deleteBooking(bookingId).then(response=>{
            if(response.statusCode===204){
                const bookings = this.state.bookings.filter(booking=>{
                    return Number(booking.id)!==Number(bookingId);
                });
                this.setState({bookings:bookings})
            }
        })

    }

    handleSelectEmployee(e){
        e.preventDefault();
        this.setState({[e.target.name]: new Employee(JSON.parse(e.target.value))})
    }

    render(){
        if(this.state.employees.length>0){
            const options = this.state.employees.map((employee,i)=>{
            return <option key={i+1} value={JSON.stringify(employee)}>{`ID:${employee.id} - ${employee.name}`}</option>
            });

            return (
                <div className="viewEmployee">
                    <h5>Select an employee</h5>
                    <select name="selectedEmployee" defaultValue={'DEFAULT'} onChange={this.handleSelectEmployee}>
                        <option value={'DEFAULT'} disabled>Select an employee</option>
                        {options}
                    </select>
                    <EmployeeSchedule deleteBooking={this.callDeleteBooking} employee={new Employee(this.state.selectedEmployee)} bookings={this.state.bookings}/>
                </div>
            )
        }
        return (
            <div>
                <h5>Select an Employee</h5>
            </div>
        );
    }
}