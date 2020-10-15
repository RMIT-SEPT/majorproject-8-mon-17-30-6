import React from 'react';
import Button from "react-bootstrap/Button";
import './css/login.css';
import Spinner from 'react-bootstrap/Spinner'

const {apiCall} = require('../mock/operations/mock/functions/operations')

export default class Help extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCallingServer: false,
            failed: false,
            error: null,
            name: "",
            email: "",
            serviceName: "",
            message: ""
        };
        this.handleAuthenticateRequest = this.handleAuthenticateRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this._isMounted = false;
    }

    showSubmitButton(){
        if(this.state.isCallingServer){
            return <Button variant={"secondary"}><Spinner animation="border" role="status">
            </Spinner> Submitting...</Button>
        }
        if(this.state.name&&this.state.email&&this.state.message&&(!this.state.isCallingServer)){
            return <Button variant="success" className="authenticate_button" onClick={this.handleReportRequest}>Submit</Button>
        }
    }

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleReportRequest(){
        localStorage.clear(); //to make sure localStorage is clean whenever we login again

        //mock for now
        this.setState({isCallingServer:true});
        const payload = {
            name:this.state.name,
            email: this.state.email,
            serviceName: this.state.serviceName,
            message: this.state.message
        }
        apiCall('common','help',payload, 'post').then(response=>{
            if(response){
                if(response.statusCode===200){
                    this._isMounted&&this.setState({isCallingServer:false});
                }else{
                    this._isMounted&&this.setState({isCallingServer:false, failed:true,error:response.body})
                }
            }else{
                this._isMounted&&this.setState({isCallingServer:false, failed:true,error:"No response from the server. Either the server your internet connection is down."})
            }
        })
    }

    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }

    showError(){
        if(this.state.error){
        return <p className="errorInfo">{this.state.error||"Could not post error!"}</p>
        }else{
            return <p></p>
        }
    }

    render(){
        return (
            <div className="login_outter">
                <div className={"login"}>
                <h3 className="title">Report an Issue</h3>
                <div className="form-container">
                <br></br>
                <div>This form is used to report any issues related to site functionality</div>
                <br></br>
                <div>Queries relating to providers and booking information should be directed to the specific provider</div>
                <br></br>
                <input type="text" name={"name"} value={this.state.name} placeholder="Name" className="form-control" onChange={this.handleInputChange}/>
                <br></br>
                <input type="text" name={"email"} value={this.state.email} className="form-control" placeholder="Email" onChange={this.handleInputChange}/>
                <br></br>
                <input type="text" name={"serviceName"} value={this.state.serviceName} className="form-control" placeholder="Service (If applicable)" onChange={this.handleInputChange}/>
                <br></br>
                <textarea rows="4" cols="50" name={"message"} value={this.state.message} className="form-control" placeholder="Message" onChange={this.handleInputChange}/>

                {this.showError()}
                {this.showSubmitButton()}
                </div>
            </div>
            </div>
        )
    }
}
