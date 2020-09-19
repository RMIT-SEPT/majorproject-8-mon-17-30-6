import React from 'react';
import Button from "react-bootstrap/Button";

const functions = require('../../apiOperations')

/***
 * Basic flow: This component should simply handle authentication.
 *  When authentication is succesfull (backend returns 200), the authentication details should propagate to
 *  the parent component App.js which should then display the LandingPage.js
 * ***/
export default class CreateABooking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCallingServer: false,
            failed: false,
            serviceTypeName: "",
            options: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    showAvailableServices(){
        functions.getAllServicesForUser().then(response=>{
            var arr = [];
            var i = 0;
            arr.push(<option key={i} value=""  disabled defaultValue>Choose a Service</option>);
            for(var key in response.body){
                arr.push(<option key={i} value={key}>{response.body.companyName[key]}</option>);
                i++;
              }
              this.setState({options:arr,isCallingServer:false, called:true});
        }
        )
    
    return <React.Fragment>
        <select className="form-control" name={"serviceTypeName"} value={this.state.entity.serviceTypeName}  onChange={this.handleInputChange}>{this.state.options}</select>      
    </React.Fragment>
    

    }
    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }

    render(){
        return (
            <div className={"new-booking"}>
                <h3 className="title">New Booking</h3>
                <div className="form-container">
                    <br/>
                    {this.showAvailableServices()}
                </div>
            </div>
        )
    }
}