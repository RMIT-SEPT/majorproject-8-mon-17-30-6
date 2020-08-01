import React from 'react';
import Button from "react-bootstrap/Button";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCallingServer: false,
            failed: false,
            error: null,
            username: null,
            password: null
        };
        this.handleAuthenticateRequest = this.handleAuthenticateRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleAuthenticateRequest(){
        //mock for now
        this.setState({isCallingServer:true}); //to disable Authenticate button while calling the server

        setTimeout(function() { //3 seconds
            this.setState({isCallingServer: false}) //After 1 second, set render to true;
            //assume authentication is OK
            this.props.handleAuthentication("some fake token here from server...")
        }.bind(this), 3000)
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

    render(){
        return (
            <div className={"login"}>
                <input type="text" name={"username"} value={this.state.username} placeholder="Username" onChange={this.handleInputChange}/>
                <br/>
                <input type="text" name={"password"} value={this.state.password} placeholder="Password" onChange={this.handleInputChange}/>
                <br/>
                {this.showAuthenticateButton()}
            </div>
        )
    }
}