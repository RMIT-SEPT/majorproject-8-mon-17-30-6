import React from 'react';
const {apiCall} = require('../../mock/operations/mock/functions/operations');
/***
 * Component for user to view available services. It might look dupplicate from the
 * AgmeServices component, but this is to be used when user is authenticated as 
 * USER, so we may need to add new features for next release, thus it makes sense
 * to separate components.
 * **/
export default class UserServices extends React.Component{
    constructor(props){
        super(props)
        this.state = {services: []}
        apiCall('company', 'getAllServices',null,'get').then(response=>{
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