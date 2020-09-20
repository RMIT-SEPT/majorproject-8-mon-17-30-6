import React from 'react';
import Employee from '../../model/Employee';
import Booking from '../../model/Booking';
import { EmployeeSchedule } from './EmployeeSchedule';
const {getCompanyEmployees, getCompanyBookings} = require('../../mock/operations');
export class ViewEmployees extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            employees: [],
            selectedEmployee: null,
            bookings:require('./mock/bookings.json')
        }
        getCompanyEmployees().then(response=>{
            if(response.statusCode===200){
                const employees = response.body.map(employee=>{return new Employee(employee)});
                this.setState({employees:employees})
            }
        });

        //TODO - uncomment these lines once we can have bookings coming from API
        // getCompanyBookings().then(response=>{
        //     if(response.statusCode===200){
        //         const bookings = response.body.map(booking=>{return new Booking(booking)});
        //         this.setState({bookings:bookings})
        //     }
        // });


        this.handleSelectEmployee = this.handleSelectEmployee.bind(this);
    }

    handleSelectEmployee(e){
        e.preventDefault();
        console.log(new Employee(JSON.parse(e.target.value)))
        this.setState({[e.target.name]: new Employee(JSON.parse(e.target.value))})
    }

    render(){
        if(this.state.employees.length>0){
            const options = this.state.employees.map((employee,i)=>{
            return <option key={i+1} value={JSON.stringify(employee)}>{`ID:${employee.id} - ${employee.name}`}</option>
            });

            return (
                <div>
                    <h5>Select an employee</h5>
                    <select name="selectedEmployee" defaultValue={'DEFAULT'} onChange={this.handleSelectEmployee}>
                        <option value={'DEFAULT'} disabled>Select an employee</option>
                        {options}
                    </select>
                    <EmployeeSchedule employee={new Employee(this.state.selectedEmployee)} bookings={this.state.bookings}/>
                </div>
            )
        }
        console.log(this.state)
        return (
            <div>
                <h5>Select an Employee</h5>
            </div>
        );
    }
}