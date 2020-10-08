import React from 'react';
import Button from "react-bootstrap/Button";
import './css/signup.css';
import User from '../model/User';
import FormFields from '../miscelaneous/FormFields';
import SelectOptions from '../miscelaneous/SelectOptions'
const functions = require('../mock/operations/mock/functions/operations.js');
const errorMessages = require('../model/errorMessages.json').signup;

export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCallingServer: false,
            failed: false,
            error: "",
            options: [],
            called: false,
            entity: new User(),
            errors: new Set()
        };
        
        this.handleSignupRequest = this.handleSignupRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.showError = this.showError.bind(this)
    }
    
    handleSignupRequest(){
        //mock for now
        this.setState({isCallingServer:true});

        functions.apiCall('common', 'signup',this.state.entity, 'post').then(response=>{
            if(response.statusCode===200){
                this.setState({isCallingServer:false});
                alert("Signup succesful. Please login");
                this.props.handleContentChangeRequest('login');
                }else{
                    this.setState({
                        isCallingServer:false,
                        errors: new Set(JSON.parse(response.body).errorDetails.missingFields)
                    });
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

    showSignupButtonButton(){
        if(this.state.isCallingServer){
            return <Button variant={"secondary"}>processing</Button>
        }
        if(this.state.entity.isComplete()&&(!this.state.isCallingServer)){
            return <React.Fragment><br></br><Button className="btn btn-success form-control" onClick={this.handleSignupRequest}>Signup</Button></React.Fragment>
        }
    }

    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.state.entity.setField(e.target.name,e.target.value);
        this.setState({[name]:value});
    }

    showFieldsBasedOnRole(){
        const fields ={
            COMPANY: ['companyName'],
        }
        if(fields[this.state.entity.role]){
            return   <React.Fragment>
                    <FormFields showError={this.showError} fields={fields[this.state.entity.role]} entity={this.state.entity} onChange={this.handleInputChange}/>
            </React.Fragment>
        }
        return ""
    }
 
    showCompanyInput(){
        if (!this.state.called && (this.state.entity.role==='EMPLOYEE')){
        functions.apiCall('user', 'getCompanies',null, 'get').then(response=>{
            if(response.statusCode===200){
                var arr = [];
                var i = 0;
                arr.push(<option key={i} value=""  disabled defaultValue>Choose a Company</option>);
                for(var key in response.body){
                    arr.push(<option key={i+1} value={key}>{response.body[key]}</option>);
                    i++;
                  }
                  this.setState({options:arr,isCallingServer:false, called:true});
            }
        }
        )
    }
    if (this.state.entity.role === 'EMPLOYEE'){
    return <React.Fragment><br></br>
        <select className="form-control" name={"companyUsername"} value={this.state.entity.companyUsername||""} placeholder="role" onChange={this.handleInputChange}>{this.state.options}</select>      
        <label className= "errorLabel">{this.showError('companyUsername')}</label>

    </React.Fragment>
    }

    }
        
    render(){
        return (
            <div className={"login"}>
                <h3 className="title">Please fill out the details below</h3>
                <div className="form-container">
                    <SelectOptions
                        className="form-control"
                        name="role"
                        entity={this.state.entity}
                        placeholder="role"
                        onChange={this.handleInputChange}
                        options={[{value:"USER",label: "User"},{value:"COMPANY",label: "Company"},{value:"EMPLOYEE",label: "Employee"}]}
                        defaultValue={{value: "", label: "Choose a role"}}
                    />
                    <FormFields showError={this.showError} fields={['username', 'name']} entity={this.state.entity} onChange={this.handleInputChange}/>
                    {this.showFieldsBasedOnRole()}
                    {this.showCompanyInput()}
                    <FormFields showError={this.showError} fields={['email']} entity={this.state.entity} onChange={this.handleInputChange}/>
                    <FormFields showError={this.showError} fields={['phone', 'address']} entity={this.state.entity} onChange={this.handleInputChange}/>
                    <FormFields showError={this.showError} fields={['password', 'confirmPassword']} type='password' entity={this.state.entity} onChange={this.handleInputChange}/>
                    {this.showSignupButtonButton()}
                    <p name="login" className="signup_info" onClick={this.props.handleContentChangeRequest}>Already a member? Login here</p>
                </div>
            </div>
        )
    }
}