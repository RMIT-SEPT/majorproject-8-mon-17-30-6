import React from 'react';
import Login from "./Login";
import UserDashboard from './users/UserDashboard';
import Administrator from './administrators/Administrator';
import CompanyDashboard from './company/CompanyDashboard'
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
            console.log(this.props.type)
            switch(this.props.type.toUpperCase()){
                
                case "USER":
                    return <UserDashboard token={this.props.token} expiry={this.props.expiry}/>;
                case "COMPANY":
                    return <CompanyDashboard token={this.props.token} expiry={this.props.expiry}/>;
                case "ADMIN":
                    return <Administrator token={this.props.token} expiry={this.props.expiry}/>;
                default:
                    return <div>Cannot load your content</div>;            
            }
            
        }else{
            //something is not right - force reauthentication
            return this.state.content;
        }
    }
}