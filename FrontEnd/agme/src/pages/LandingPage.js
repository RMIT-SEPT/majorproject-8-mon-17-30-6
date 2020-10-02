import React from 'react';
import Login from "./Login";
import UserNewAppointment from './users/UserNewAppointment';
import Provider from './providers/Provider';
import Administrator from './administrators/Administrator';
import CompanyDashboard from './company/CompanyDashboard';
import EmployeeDashboard from './employee/EmployeeDashboard';

/**
 * Basic flow:
 *  LandingPage component is rendered when the App component has set up authentication details sucessfully
 *  The parent component (App) sends the authentication type as props, so this landing page should further call
 *  the appropriate component for each user type
 * 
 * **/
export default class LandingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content: <Login handleContentChangeRequest={this.props.handleContentChangeRequest} handleAuthentication={this.props.handleAuthentication}/>
            
        }
    }

    render(){
        if(this.props.authenticated){
            switch(this.props.type.toUpperCase()){
                case "EMPLOYEE":
                    return <EmployeeDashboard/>;
                case "USER":
                    return <UserNewAppointment/>;
                case "COMPANY":
                    return <CompanyDashboard />;
                case "ADMIN":
                    return <Administrator/>;
                case "PROVIDER":
                    return <Provider/>;
                default:
                    return <div>Cannot load your content</div>;            
            }
            
        }else{
            //something is not right - force reauthentication
            return this.state.content;
        }
    }
}