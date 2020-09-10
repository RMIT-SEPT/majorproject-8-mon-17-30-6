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
            confirmPasswordErrorMsg: "",
            showCompanyName: false,
            companyName: "",
            companyNameError: false,
            companyNameErrorMsg: "",
            showEmployeeInfo: false,
            userType: "",
            userTypeError: false,
            userTypeErrorMsg: "",
            options: [],
            called: false,
            companyUsername: ""

        };
        
        this.showCompanyNameInput = this.showCompanyNameInput.bind(this);
        this.handleSignupRequest = this.handleSignupRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleSignupRequest(){
        //mock for now
        this.setState({isCallingServer:true});

        functions.signupNewUser(this.state.username,this.state.fname, this.state.phone, this.state.address, this.state.role, this.state.password,
             this.state.confirmPassword, this.state.companyName, this.state.userType).then(response=>{
            if(response.statusCode===200){
                this.setState({isCallingServer:false});
                alert("Signup succesful. Please login");
                this.props.handleContentChangeRequestSignup('login');
                }else{
                    this.setState({isCallingServer:false});
                    const errorResult = JSON.parse(response.body);
                    const  fullError = errorResult.errorDetails.missingFields;
                    this.checkForError(fullError);
            }
        })
        
    }
    checkForError(fields){
        this.setState({fnameError:false,confirmPasswordError:false,passwordError:false,phoneError:false,usernameError:false,companyNameError:false, userTypeError:false});

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
            }else 
            if (value === "companyName"){
                this.setState({companyNameError:true});
            }else
            if (value === "userType"){
                this.setState({userTypeError:true});
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
        if (this.state.companyNameError){
            this.setState({companyNameErrorMsg:"Company name cannot be blank"});

        }else{
            this.setState({companyNameErrorMsg:""});
        }
        if (this.state.userTypeError){
            this.setState({userTypeErrorMsg:"User type cannot be blank"});

        }else{
            this.setState({userTypeErrorMsg:""});
        }
   
    }
    showSignupButtonButton(){
        if(this.state.isCallingServer){
            return <Button variant={"secondary"}>processing</Button>
        }
        if(this.state.password&&this.state.username&&this.state.fname&&this.state.phone&&this.state.address&&this.state.role&&this.state.confirmPassword&&(!this.state.isCallingServer)){
            return <Button className="btn btn-success form-control" onClick={this.handleSignupRequest}>Signup</Button>
        }
    }

    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
        if (e.target.value === "COMPANY"){
            this.setState({showCompanyName:true})
        }else{
            if (e.target.name === "role"){
            this.setState({showCompanyName:false})
            }
        }
        if (e.target.value === "EMPLOYEE"){
            this.setState({showEmployeeInfo:true})
        }else{
            if (e.target.name === "role"){
            this.setState({showEmployeeInfo:false})
            }
        }
    }

    showError(){

            return <p className="errorInfo">{this.state.error}</p>
    }
    showCompanyNameInput(){
        if (this.state.showCompanyName === true){
            return   <React.Fragment>
            <input className="form-control" type="text" required name={"companyName"} value={this.state.companyName} placeholder="Company Name" onChange={this.handleInputChange}/>                    
            <label className= "errorLabel">{this.state.companyNameErrorMsg}</label>
            <br/>  </React.Fragment>
        }
    }
    showEmployeeInfo(){
        if (this.state.showEmployeeInfo === true){
            return   <React.Fragment>
            <input className="form-control" type="text" required name={"userType"} value={this.state.userType} placeholder="User Type" onChange={this.handleInputChange}/>                    
            <label className= "errorLabel">{this.state.userTypeErrorMsg}</label>
            <br/>  </React.Fragment>
        }
    }
 

         
    

    showCompanyInput(){
        if (!this.state.called && this.state.showEmployeeInfo){
        functions.getCompaniesFromAPI().then(response=>{
            var arr = [];

            var i = 0;
            for(var key in response.body){
                arr.push(<option value={key}>{response.body[key]}</option>);
              }
              this.setState({options:arr,isCallingServer:false, called:true});
        }
        )
    }
    if (this.state.showEmployeeInfo){
    return <React.Fragment>
    <select className="form-control" name={"company"} value={this.state.companyUsername} placeholder="Company" onChange={this.handleInputChange}>{this.state.options}</select>
    <br/>
    </React.Fragment>
    }

}
        
    
    render(){
        return (
            <div className={"signup"}>
                <h3 className="title">Please fill out the details below</h3>
                <div className="form-container">
                    <select className="form-control" name={"role"} value={this.state.role} placeholder="role" onChange={this.handleInputChange}>
                        <option value="" disabled defaultValue>Choose a role</option>
                        <option value="USER">User</option>
                        <option value="COMPANY">Company</option>
                        <option value="EMPLOYEE">Employee</option>
                    </select>
                    <br/>
                    <input className="form-control" required type="text" name={"username"} value={this.state.username} placeholder="Username" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.usernameErrorMsg}</label>
                    <br/>
                    <input className="form-control" type="text" name={"fname"} value={this.state.fname} placeholder="name" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.fnameErrorMsg}</label>
                    <br/>
                    {this.showCompanyNameInput()}
                    {this.showEmployeeInfo()}
                    {this.showCompanyInput()}
                    <input className="form-control" type="text" name={"phone"} value={this.state.phone} placeholder="phone" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.phoneErrorMsg}</label>
                    <br/>
                    <input className="form-control" type="text" name={"address"} value={this.state.address} placeholder="address" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.addressErrorMsg}</label>
                    <br/>
           
                    <input className="form-control" type="password" name={"password"} value={this.state.password} placeholder="Password" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.passwordErrorMsg}</label>
                    <br/>
                    <input  className="form-control" type="password" name={"confirmPassword"} value={this.state.confirmPassword} placeholder="confirmPassword" onChange={this.handleInputChange}/>
                    <label className= "errorLabel">{this.state.confirmPasswordErrorMsg}</label><br></br>
                    {this.showError()}
                    {this.showSignupButtonButton()}
                    <p name="login" className="signup_info" onClick={this.props.handleContentChangeRequest}>Already a member? Login here</p>
                </div>
            </div>
        )
    }
}