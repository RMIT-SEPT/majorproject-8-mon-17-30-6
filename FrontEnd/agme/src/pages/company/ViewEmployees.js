import React from 'react';
import Employee from '../../model/Employee';
import { EmployeeSchedule } from './EmployeeSchedule';
import './viewEmployees.css'
const {apiCall} = require('../../functions/operations');

export class ViewEmployees extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            employees: localStorage.getItem('company_employees') ? JSON.parse(localStorage.getItem('company_employees')) : [],
            selectedEmployee: null,
            bookings:localStorage.getItem('company_bookings') ? JSON.parse(localStorage.getItem('company_bookings')) :  []
        }
        this._isMounted = false;
        this.callDeleteBooking = this.callDeleteBooking.bind(this);
        this.handleSelectEmployee = this.handleSelectEmployee.bind(this);
    }

    componentDidMount(){
        this._isMounted=true;
        // if(!this.state.employees){
            apiCall('company', 'getEmployees', null, "get" ).then(response=>{
                if(response.statusCode===200){
                    const employees = response.body.map(employee=>{return new Employee(employee)});
                    this._isMounted&&this.setState({employees:employees})
                }
            });
        // }
        if(!this.state.bookings){
            apiCall('company', 'getBookings', null, "get").then(response=>{
                if(response.statusCode===200){
                    this.setState({bookings:response.body})
                }
            });
        }

    }

    //need to delete here, otherwise children components wont re-render properly
    callDeleteBooking(e){
        e.preventDefault();
        const bookingId = e.currentTarget.value;
        apiCall('company', 'deleteBooking', bookingId, 'delete').then(response=>{
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
        console.log(this.state)
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