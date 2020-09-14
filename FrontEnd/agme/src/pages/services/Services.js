import React from 'react';
import './services.css'
//mocked services
const services = require('./mock/services.json')
//To view list of services
export default class Services extends React.Component{
    constructor(props){
        super(props)
        this.state = {services: this.props.services || services}
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
                {servicesComponents}
            </div>
        )
    }
}