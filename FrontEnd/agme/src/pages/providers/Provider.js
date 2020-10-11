import React from 'react';
import Entity from '../../model/Entity';
import '../css/provider.css'
const {apiCall} = require('../../mock/operations/mock/functions/operations');

export default class Provider extends React.Component{
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
    }
    addNewSubmit(){
        apiCall('company', 'newService',this.state.entity,'post').then(r=>{
            if (r.statusCode === 200){
                alert("New service has been added");
            }
        }
        )
    }
    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.state.entity.setField(e.target.name,e.target.value);
        this.setState({[name]:value})
    }
    render(){
        return (
            <div className="newService">
            <h1>Add a new service</h1>
            <label>Service Name</label>
            <input name="description" value={this.state.name} type="text" onChange={this.handleInputChange}></input>
            <label>Description</label>
            <input name="name" type="text" value={this.state.description} onChange={this.handleInputChange}></input>
            <button onClick={this.addNewSubmit()}>add new</button>
            </div>
        )
    }
}