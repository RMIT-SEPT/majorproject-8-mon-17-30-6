import React from 'react';
//import Button from "react-bootstrap/Button";
import './services.css'
//mocked services
//const services = require('./mock/services.json');
const {getAllServicesProvider} = require('../../mock/operations');
//To view list of services
export class AgmeServices extends React.Component{
    constructor(props){
        super(props)
        this.state = {services: []}
        getAllServicesProvider().then(response=>{
            if(response.statusCode === 200){
                this.setState({
                    services: response.body
                })
            }
        })
    }


    render(){
        let servicesComponents = (this.state.services)
            &&(this.state.services.length>0)
            &&this.state.services.map((service,i)=>{
            return <div key={i} className={"card"}>
                <div className={"_"+i}>
                    <div className="header"><p>{service.name}</p></div>
                    <div className="container">
                    <p>{service.description}</p>
                    </div>
                </div>
            </div>
        });
        if(!(servicesComponents&&(servicesComponents.length))){
            servicesComponents = "No services available";
        }
        return (
            <div>
                <h5>These are all services registed in AGME</h5>
                {servicesComponents}
            </div>
        )
    }
}