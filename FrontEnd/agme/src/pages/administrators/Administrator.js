import React from 'react';
import '../css/admin.css';
import Spinner from 'react-bootstrap/Spinner';
const {apiCall} = require('../../mock/operations/mock/functions/operations')

export default class Administrator extends React.Component{
    constructor(props){
    super(props);
    this.state = {
        isCallingServer: false,
        options: [],
        isValid: false,
        called: false,
        company:""
    };
    this.showCompanies = this.showCompanies.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

}

handleInputChange(e){
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "company"){
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
            company.push(<option key={c.username} value={c.name}>{c.name}</option>),i++);
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

displayCompanies(){
    return <select defaultValue={"DEFAULT"} className="form-control" name={"company"} onChange={this.handleInputChange}> {this.state.options}</select>     

}
showCloseBusiness(){
    if (this.state.isValid){
    return <button className="btn btn-danger form-control">close business</button>
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