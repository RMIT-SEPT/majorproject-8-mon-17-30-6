import React from 'react';
import {CompanyAppointmentList} from './CompanyAppointmentList';
import Entity from '../../model/Entity';
import '../css/provider.css'
const {apiCall} = require('../../mock/operations/mock/functions/operations');

export default class CompanyDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCallingServer: false,
            failed: false,
            error: null,
            description: "",
            name: "",
            entity: new Entity()
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNewSubmit = this.addNewSubmit.bind(this);

    }
    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({[name]:value})
    }
    addNewSubmit(){
        if (!this.state.isCallingServer){
            this.setState({isCallingServer:true})
        this.state.entity.setField("name",this.state.name);
        this.state.entity.setField("description",this.state.description);
        apiCall('company', 'newService' , this.state.entity ,'post').then(r=>{
            if(r.statusCode === 200){
                if (r.statusCode === 200){
                    alert("New service has been added");
                }

                
            }
        })
    }
    }
    render(){
        return (
            <React.Fragment>
            <CompanyAppointmentList/>
            <div className="newService">
            <h1>Add a new service</h1>
            <br/><br/>
            <input type="text" name={"name"} value={this.state.name} placeholder="name" className="form-control" onChange={this.handleInputChange}/>
            <br/>
            <input type="text" name={"description"} value={this.state.description} className="form-control" placeholder="description" onChange={this.handleInputChange}/>
            <br/>
            <button onClick={(e) => {this.addNewSubmit()}}>add new</button>
            </div>
            </React.Fragment>
        )
    }
}
