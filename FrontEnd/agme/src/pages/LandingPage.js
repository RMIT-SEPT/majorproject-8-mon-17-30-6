import React from 'react';
import Login from "./Login";
import BasicUserContent from './users/BasicUserContent';
import Provider from './providers/Provider';
import Administrator from './administrators/Administrator';

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
        console.log('landing page rendering...')
        if(this.props.authenticated){
            switch(this.props.type.toUpperCase()){
                case "BASIC_USER":
                    return <BasicUserContent token={this.props.token} expiry={this.props.expiry}/>;
                case "ADMINISTRATOR":
                    return <Administrator token={this.props.token} expiry={this.props.expiry}/>;
                case "PROVIDER":
                    return <Provider token={this.props.token} expiry={this.props.expiry}/>;
                default:
                        return this.state.content;            
            }
            
        }else{
            //something is not right - force reauthentication
            return this.state.content;
        }
    }
}