import React from 'react';
const config = require('../../config.json');
/**
 * Employee Upcoming Appointments
 * **/
export class UpcomingAppointments extends React.Component{

    constructor(props){
        super(props);
        this.test = this.test.bind(this)
    }
    test(){
        //hack to use a dummy user
        let options = {
            method: 'post',
            mode:"cors",
            headers: {
                "Content-Type": "application/JSON",
                Accept: "application/JSON",
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                "username": "dummy",
                "password": "12345678",
                "role": "USER"
            })
        }
        fetch(config.api.url+config.api.uri.common.login)
    }
    render(){
        return (
            <div>
                Upcoming appointments...
            </div>
        )
    }
}