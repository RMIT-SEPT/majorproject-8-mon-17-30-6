import React from 'react';
import '../css/admin.css';
import Spinner from 'react-bootstrap/Spinner';
import '../../model/Entity'
import Entity from '../../model/Entity';
const {apiCall} = require('../../mock/operations/mock/functions/operations')

export default class Administrator extends React.Component{
    constructor(props){
    super(props);
    this.state = {
        isCallingServer: false,
        options: [],
        isValid: false,
        called: false,
        company:"",
        entity: new Entity()
    };
    this.showCompanies = this.showCompanies.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.closeACompany = this.closeACompany.bind(this);

    
}

handleInputChange(e){
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.state.entity.setField(e.target.name,e.target.value);
    console.log(value);
    if (name === "username"){
        this.setState({isValid:true})
    }
    this.setState({[name]:value})
}
showCompanies(){
    if (!this.state.isCallingServer){
    apiCall('admin', 'closeCompany',null,'get').then(response=>{
        let options = this.state.options;
        if(response.statusCode===200){
            var company = [];
            var i = 1;
            company.push(<option key={0} value={"DEFAULT"} defaultValue disabled>Choose a Business</option>);
            // eslint-disable-next-line
            response.body.forEach((c) =>
            company.push(<option key={c.username} value={c.username}>{c.name}</option>),i++);
            options = company;
        }    
        this.setState({
            getServicesStatus: response.statusCode,
            options:options,
            isCallingServer:true
        })
    });
}

}
closeACompany(){
    this.refs.btn.setAttribute("disabled", "disabled");
    apiCall('admin', 'closeCompany',this.state.entity,'post').then(response=>{
        console.log(response)
        if(response.statusCode===200){
            alert("Cancellation successful")
            this.refs.btn.removeAttribute("disabled");
        }else{
            alert("something went wrong")
            this.refs.btn.removeAttribute("disabled");
        }
    })
}
displayCompanies(){
    return <select defaultValue={"DEFAULT"} className="form-control" name={"username"} onChange={this.handleInputChange}> {this.state.options}</select>     

}
showCloseBusiness(){
    if (this.state.isValid){
    return <button ref="btn" className="btn btn-danger form-control" onClick={this.closeACompany}>close business</button>
    }
}

    render(){
        this.showCompanies();
        console.log(this.state.isCallingServer);

        if(!this.state.isCallingServer){
            return <div className="closeBusiness"><div className="calling">
                <div className="spinnerOutter">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div>
                <br/>
                <p>Please wait while we retrieve your bookings.</p>
            </div>
            </div>
        }else{
        return (
            <div className="closeBusiness">
            <label>Company</label>
            {this.displayCompanies()}
            <br></br>
            {this.showCloseBusiness()}
            </div>
        )
    }
}
}