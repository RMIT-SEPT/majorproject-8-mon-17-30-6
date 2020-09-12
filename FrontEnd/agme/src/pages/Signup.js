import React from 'react';
import Button from "react-bootstrap/Button";
import './css/signup.css';
import Entity from '../model/Entity';
const functions = require('../apiOperations');
const errorMessages = require('../model/errorMessages.json').signup;

/***

 * ***/
export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCallingServer: false,
            failed: false,
            error: "",
            showCompanyName: false,
            showEmployeeInfo: false,
            options: [],
            called: false,
            entity: new Entity(),
            errors: new Set()
        };
        
        this.handleSignupRequest = this.handleSignupRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }
    

    handleSignupRequest(){
        //mock for now
        this.setState({isCallingServer:true});

        functions.signupNewUser(this.state.entity).then(response=>{
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

    showError(field){
        if(!this.state.errors){
            return "";
        }
        if(!this.state.errors.has(field)){
            return ""
        }else{
            return errorMessages[field]|| ""
        }
    }
    checkForError(fields){
        this.setState({
            errors:new Set(fields)
        });
    }

    showSignupButtonButton(){
        if(this.state.isCallingServer){
            return <Button variant={"secondary"}>processing</Button>
        }
        if(this.state.entity.isComplete()&&(!this.state.isCallingServer)){
            return <Button className="btn btn-success form-control" onClick={this.handleSignupRequest}>Signup</Button>
        }
    }

    //only to be called for role
    handleRoleChange(e){
        e.preventDefault();
        this.setState({
            role: e.target.value,
            showCompanyName: (e.target.value==='COMPANY'),
            showEmployeeInfo: (e.target.value==='EMPLOYEE')
        });
        this.state.entity.setField('role', e.target.value)
    }

    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.state.entity.setField(e.target.name,e.target.value);
        this.setState({[name]:value});
    }

    showFieldsBasedOnRole(){
        switch(this.state.entity.role){
            case 'COMPANY':
                return   <React.Fragment>
                    <br/>
            <input className="form-control" type="text" required name={"companyName"} value={this.state.entity.companyName} placeholder="Company Name" onChange={this.handleInputChange}/>                    
            <label className= "errorLabel">{this.showError('companyName')}</label>
            </React.Fragment>
            case 'EMPLOYEE':
                return   <React.Fragment>
                    <br/>
                <input className="form-control" type="text" required name={"userType"} value={this.state.entity.userType} placeholder="User Type" onChange={this.handleInputChange}/>                    
                <label className= "errorLabel">{this.showError('userType')}</label>
                <br/>  </React.Fragment>
            default:
                return ""
        }
    }
 
    showCompanyInput(){
        if (!this.state.called && this.state.showEmployeeInfo){
        functions.getCompaniesFromAPI().then(response=>{
            var arr = [];
            var i = 0;
            arr.push(<option key={i} value=""  disabled defaultValue>Choose a Company</option>);
            for(var key in response.body){
                arr.push(<option key={i} value={key}>{response.body[key]}</option>);
                i++;
              }
              this.setState({options:arr,isCallingServer:false, called:true});
        }
        )
        console.log(this.state.companyUsername)
    }
    if (this.state.showEmployeeInfo){
    return <React.Fragment>
    <select className="form-control" name={"companyUsername"} value={this.state.entity.companyUsername} placeholder="role" onChange={this.handleInputChange}>{this.state.options}</select>

    <label className= "errorLabel">{this.showError('companyUsername')}</label>

    </React.Fragment>
    }

    }

    showFormFields(fields, type){
        return fields.map((field,i)=>{
            return <b key={i}>
                <br/>
                <input className="form-control" required type={type} name={field} value={this.state.entity[field]||""} placeholder={field} onChange={this.handleInputChange}/>
                <label className= "errorLabel">{this.showError(field)}</label>
            </b>
        })
    }
        
    render(){
        return (
            <div className={"login"}>
                <h3 className="title">Please fill out the details below</h3>
                <div className="form-container">
                    <select className="form-control" name={"role"} value={this.state.entity.role||""} placeholder="role" onChange={this.handleRoleChange}>
                        <option value="" disabled defaultValue>Choose a role</option>
                        <option value="USER">User</option>
                        <option value="COMPANY">Company</option>
                        <option value="EMPLOYEE">Employee</option>
                    </select>
                    {this.showFormFields(['username', 'name'], 'text')}
                    {this.showFieldsBasedOnRole()}
                    {this.showCompanyInput()}
                    {this.showFormFields(['phone', 'address'], 'text')}
                    {this.showFormFields(['password', 'confirmPassword'], 'password')}       
                    {this.showSignupButtonButton()}
                    <p name="login" className="signup_info" onClick={this.props.handleContentChangeRequest}>Already a member? Login here</p>
                </div>
            </div>
        )
    }
}