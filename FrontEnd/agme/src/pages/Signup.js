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
            error: "",
            username: "",
            password: "",
            confirmPassword: "",
            fname: "",
            role: "",
            address: "",
            phone: "",
            usernameError: false,
            phoneError: false,
            passwordError: false,
            confirmPasswordError: false,
            phoneErrorMsg: "",
            usernameErrorMsg: "",
            passwordErrorMsg: "",
            addressError: "",
            addressErrorMsg: "",
            fnameErrorMsg: "",
            fnameError: false,
            confirmPasswordErrorMsg: ""


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
                this.props.handleContentChangeRequestSignup('login');
                }else{
                    console.log(this.state.confirmPassword);
                    console.log(this.state.password);
                    this.setState({isCallingServer:false});
 
                    const errorResult = JSON.parse(response.body);
                    const fullError = errorResult.errorDetails.missingFields;
                    this.checkForError(fullError);
            }
        })
        
    }
    checkForError(fields){
        this.setState({fnameError:false,confirmPasswordError:false,passwordError:false,phoneError:false,usernameError:false});

        Object.values(fields).map((value) => {
            if (value === "phone"){
                this.setState({phoneError:true});
            }else 
            if (value === "password"){
                this.setState({passwordError:true});
            }else 
            if (value === "username"){
                this.setState({usernameError:true});
            }else 
            if (value === "address"){
                this.setState({addressError:true});
            }else 
            if (value === "name"){
                this.setState({fnameError:true});
            }else 
            if (value === "confirmPassword"){
                this.setState({confirmPasswordError:true});
            }
            return console.log(value);
        })
        this.setError();
    }

    setError(){

        if (this.state.phoneError){
            this.setState({phoneErrorMsg:"invalid phone number"})
    
        }else{
            this.setState({phoneErrorMsg:""})
        }
        if (this.state.usernameError){
            this.setState({usernameErrorMsg:"Username is taken"})
        }else{
            this.setState({usernameErrorMsg:""})
        }
        if (this.state.passwordError){
            this.setState({passwordErrorMsg:"Password must be at least 6 characters long"})
        }else{
            this.setState({passwordErrorMsg:""})
        }
        if (this.state.addressError){
            this.setState({addressErrorMsg:"Password must be at least 6 characters long"})
        }else{
            this.setState({addressErrorMsg:""})
        }
        if (this.state.fnameError){
            this.setState({fnameErrorMsg:"Password must be at least 6 characters long"})
        }else{
            this.setState({fnameErrorMsg:""})
        }  
        if (this.state.confirmPasswordError){
            this.setState({confirmPasswordErrorMsg:"Passwords do not match"});

        }else{
            this.setState({confirmPasswordErrorMsg:""});

        }
   
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
        this.setState({[name]:value});
        console.log(this.state.confirmPassword);
        console.log(this.state.password);
    }

    showError(){

            return <p className="errorInfo">{this.state.error}</p>
    }

    render(){
        return (
            <div className={"signup"}>
                <h3 className="title">Please fill out the details below</h3>
                <div className="form-container">
                    <input className="form-control" type="text" name={"username"} value={this.state.username} placeholder="Username" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.usernameErrorMsg}</label>
                    <br/>
                    <input className="form-control" type="text" name={"fname"} value={this.state.fname} placeholder="name" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.fnameErrorMsg}</label>
                    <br/>
                    <input className="form-control" type="text" name={"phone"} value={this.state.phone} placeholder="phone" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.phoneErrorMsg}</label>
                    <br/>
                    <input className="form-control" type="text" name={"address"} value={this.state.address} placeholder="address" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.addressErrorMsg}</label>
                    <br/>
                    <select className="form-control" name={"role"} value={this.state.role} placeholder="role" onChange={this.handleInputChange}>
                    <option value="" disabled defaultValue>Choose a role</option>
                    <option value="USER">User</option>
                    <option value="PROVIDER">Provider</option>
                    <option value="ADMIN">Admin</option>
                   </select>
                    <br/>
                    <input className="form-control" type="password" name={"password"} value={this.state.password} placeholder="Password" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.passwordErrorMsg}</label>
                    <br/>
                    <input  className="form-control" type="password" name={"confirmPassword"} value={this.state.confirmPassword} placeholder="confirmPassword" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.confirmPasswordErrorMsg}</label>
                    {this.showError()}
                    {this.showSignupButtonButton()}
                    <p name="login" className="signup_info" onClick={this.props.handleContentChangeRequest}>Already a member? Login here</p>
                </div>
            </div>
        )
    }
}