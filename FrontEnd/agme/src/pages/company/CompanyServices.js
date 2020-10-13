import React from 'react';
import {getDecodedJwtFromLocalStorage}  from "../../mock/operations/mock/functions/utils";//Add decode func
import './services.css'
import Spinner from 'react-bootstrap/Spinner';
import AgmeServices from './AgmeServices';

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
                this._isMounted &&this.setState({
                    done:true,
                    services: services
                })
            }
        });
    }

    componentDidMount(){
        this._isMounted = true;
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){
        if(!this.state.done){
            return <div className="calling">
            <div className="spinnerOutter">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading services...</span>
            </Spinner>
            </div>
            <br/>
            <p>Please wait while we retrieve the services.</p>
        </div>
        }else{
            let servicesComponents;
            if((!this.state.services)||(this.state.services.length===0)){
                servicesComponents = "No services available";
            }else{
                servicesComponents = <AgmeServices services={this.state.services}/>;
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
