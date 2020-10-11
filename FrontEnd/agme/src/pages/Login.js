import React from 'react';
import Button from "react-bootstrap/Button";
import './css/login.css';
import Spinner from 'react-bootstrap/Spinner'

const {apiCall} = require('../mock/operations/mock/functions/operations')

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
            password: "",
            role: ""
        };
        this.handleAuthenticateRequest = this.handleAuthenticateRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleAuthenticateRequest(){
        //mock for now
        this.setState({isCallingServer:true});
        const payload = {
            username:this.state.username,
            password: this.state.password,
            role: this.state.role
        }
        apiCall('common','login',payload, 'post').then(response=>{
            if(response.statusCode===200){
                localStorage.setItem('credentials', JSON.stringify(response.body));
                this._isMounted&&this.setState({isCallingServer:false});
                this.props.handleAuthentication(); //propagate response with token
            }else{
                localStorage.removeItem('credentials')
                this._isMounted&&this.setState({isCallingServer:false, failed:true,error:response})
            }
        })
        
    }

    showAuthenticateButton(){
        if(this.state.isCallingServer){
            return <Button variant={"secondary"}><Spinner animation="border" role="status">
          </Spinner> Authenticating...</Button>
        }
        if(this.state.password&&this.state.username&&this.state.role&&(!this.state.isCallingServer)){
            return <Button className="form-control btn btn-success" onClick={this.handleAuthenticateRequest}>Authenticate</Button>
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
                <div className="form-container">
                <br/><br/>
                <input type="text" name={"username"} value={this.state.username} placeholder="Username" className="form-control" onChange={this.handleInputChange}/>
                <br/>
                <input type="password" name={"password"} value={this.state.password} className="form-control" placeholder="Password" onChange={this.handleInputChange}/>
                <br/>
                <select className="form-control" name={"role"} value={this.state.role} required placeholder="role" onChange={this.handleInputChange}>
                <option value="" disabled defaultValue>Choose a role</option>
                <option value="USER">User</option>
                <option value="COMPANY">Company</option>
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>

            </select>
            <br/>
                {this.showError()}
                {this.showAuthenticateButton()}
                <p name="signup" className="signup_info" onClick={this.props.handleContentChangeRequest}>Or click here to Sign up</p>
            </div>
            </div>
        )
    }
}
