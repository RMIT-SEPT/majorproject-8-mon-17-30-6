import React from 'react';
import Button from "react-bootstrap/Button";
import './css/login.css';
const functions = require('../apiOperations')

/***

 * ***/
export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCallingServer: false,
            failed: false,
            error: null,
            username: "",
            password: "",
            confirmPassword: "",
            fname: "",
            role: "",
            address: "",
            phone: ""

        };
        
        this.handleSignupRequest = this.handleSignupRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleSignupRequest(){
        //mock for now
        this.setState({isCallingServer:true});

        functions.signupNewUser(this.state.username,this.state.fname, this.state.phone, this.state.address, this.state.role, this.state.password, this.state.confirmPassword).then(response=>{
            if(response.statusCode===200){
                this.setState({isCallingServer:false});
                alert("Signup succesful. Please login");
                this.props.handleContentChangeRequest('login');
                
                }else{
                this.setState({isCallingServer:false, failed:true,error:response})
            }
        })
        
    }

    showSignupButtonButton(){
        if(this.state.isCallingServer){
            return <Button variant={"secondary"}>processing</Button>
        }
        if(this.state.password&&this.state.username&&this.state.fname&&this.state.phone&&this.state.address&&this.state.role&&this.state.confirmPassword&&(!this.state.isCallingServer)){
            return <Button onClick={this.handleSignupRequest}>Signup</Button>
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
            <div className={"signupNew"}>
                <h3 className="title">You are not authenticated</h3>
                <input type="text" name={"username"} value={this.state.username} placeholder="Username" onChange={this.handleInputChange}/>
                <br/>
                <input type="text" name={"fname"} value={this.state.fname} placeholder="name" onChange={this.handleInputChange}/>
                <br/>
                <input type="text" name={"phone"} value={this.state.phone} placeholder="phone" onChange={this.handleInputChange}/>
                <br/>
                <input type="text" name={"address"} value={this.state.address} placeholder="address" onChange={this.handleInputChange}/>
                <br/>
                <input type="text" name={"role"} value={this.state.role} placeholder="role" onChange={this.handleInputChange}/>
                <br/>
                <input type="password" name={"password"} value={this.state.password} placeholder="Password" onChange={this.handleInputChange}/>
                <br/>
                <input type="password" name={"confirmPassword"} value={this.state.confirmPassword} placeholder="confirmPassword" onChange={this.handleInputChange}/>
                {this.showError()}
                {this.showSignupButtonButton()}
                <p name="login" className="login_info" onClick={this.props.handleContentChangeRequest}>Or click here to Sign up</p>
            </div>
        )
    }
}