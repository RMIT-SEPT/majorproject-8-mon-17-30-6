import React from 'react';
import './services.css';
import Spinner from 'react-bootstrap/Spinner';

const {apiCall} = require('../../mock/operations/mock/functions/operations');
//To view list of services
export default class AgmeServices extends React.Component{
    constructor(props){
        super(props)
        this.state = {services: this.props.services}
        this._isMounted = false;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        if(!this.props.services){
            apiCall('company', 'getAllServices','','GET').then(response=>{
                if(response.statusCode === 200){
                    this._isMounted&&this.setState({
                        services: response.body
                    })
                }
            })
        }
    }

    render(){
        if(!this.state.services){
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
                <h5>These are all services registered in AGME</h5>
                {servicesComponents}
            </div>
        )
    }}
}
