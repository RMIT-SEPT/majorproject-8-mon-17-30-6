import React from 'react';
import {getDecodedJwtFromLocalStorage}  from "../../mock/operations/mock/functions/utils";//Add decode func
import './services.css'
import Spinner from 'react-bootstrap/Spinner';

const {apiCall} = require('../../mock/operations/mock/functions/operations');
//To view list of services
export class CompanyServices extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            services: [],
            done: false
        }
        this._isMounted = false;
        apiCall('company', 'getAllServices','','GET').then(response=>{
            const username = getDecodedJwtFromLocalStorage().sub;
            if(response.statusCode === 200){
                const services = response.body.filter(service=>{
                    return service.company.filter(company=>{return company.username===username}).length>0
                });
                console.log(services)
                this._isMounted &&this.setState({
                    done:true,
                    services: services
                })
            }
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){
        if(!this.state.done){
            return <div className="calling">
            <div className="spinnerOutter">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            </div>
            <br/>
            <p>Please wait while we retrieve the services.</p>
        </div>
        }else{
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
                <h5>These are my services</h5>
                {servicesComponents}
            </div>
        )
    }
}
}
