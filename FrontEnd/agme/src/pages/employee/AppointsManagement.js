import React from 'react';
const {apiCall} = require('../../mock/operations/mock/functions/operations');

/**
 * Employee Upcoming Appointments
 * **/
export class AppointsManagement extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            appointments:[]
        }
    }
    render(){
        apiCall('employee', 'getBookings', null, 'get').then(response=>{
            console.log(response)
        })
        return (
            <div>
                Upcoming appointments...
            </div>
        )
    }
}