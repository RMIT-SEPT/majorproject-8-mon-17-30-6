import React from 'react';
import Button from "react-bootstrap/Button";
import './css/login.css';
const functions = require('../apiOperations')

/***
 * Basic flow: This component should simply handle authentication.
 *  When authentication is succesfull (backend returns 200), the authentication details should propagate to
 *  the parent component App.js which should then display the LandingPage.js
 * ***/
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCallingServer: false,
            failed: false,
            error: null,
            username: "",
            password: ""
        };
        this.handleAuthenticateRequest = this.handleAuthenticateRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleAuthenticateRequest(){
        //mock for now
        this.setState({isCallingServer:true});

        functions.authenticate(this.state.username,this.state.password).then(response=>{
            if(response.statusCode===200){
                this.setState({isCallingServer:false});
                this.props.handleAuthentication(response.body); //propagate response with token
            }else{
                this.setState({isCallingServer:false, failed:true,error:response})
            }
        })
        
    }

    showAuthenticateButton(){
        if(this.state.isCallingServer){
            return <Button variant={"secondary"}>Authenticating</Button>
        }
        if(this.state.password&&this.state.username&&(!this.state.isCallingServer)){
            return <Button onClick={this.handleAuthenticateRequest}>Authenticate</Button>
        }
    }

    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }

    showError(){
        if(this.state.error){
            return <p className="errorInfo">Invalid Credentials supplied!</p>
        }else{
            return <p></p>
        }
    }

    render(){
        return (
            <div className={"login"}>
                <h3 className="title">You are not authenticated</h3>
                <input type="text" name={"username"} value={this.state.username} placeholder="Username" onChange={this.handleInputChange}/>
                <br/>
                <input type="text" name={"password"} value={this.state.password} placeholder="Password" onChange={this.handleInputChange}/>
                <br/>
                {this.showError()}
                {this.showAuthenticateButton()}
                <p name="signup" className="signup_info" onClick={this.props.handleContentChangeRequest}>Or click here to Sign up</p>
            </div>
        )
    }
}