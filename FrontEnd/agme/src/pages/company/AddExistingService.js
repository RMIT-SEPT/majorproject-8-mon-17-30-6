import React from 'react';
import Button from "react-bootstrap/Button";
import './services.css'
const {apiCall, getDecodedJwtFromLocalStorage} = require('../../mock/operations/mock/functions/operations');
//To view list of services
export class AddExistingService extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            services:[],
            serviceName: ""
        }
        this._isMounted = false;
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }
    componentDidMount(){
        this._isMounted = true;
        apiCall('company','getAllServices', null, 'GET').then(response=>{
            const username = getDecodedJwtFromLocalStorage().sub;
            if(response.statusCode === 200){
                let all = new Set();
                let company = new Set();
                const companyServices = response.body.filter(service=>{
                    all.add(service.name);
                    const hasService = service.company.filter(company=>{return company.username===username}).length>0;
                    if(hasService){
                        company.add(service.name)
                    }
                    return hasService;
                });
                const available = response.body.filter(c=>{
                    return !company.has(c.name)
                })

                this._isMounted&&this.setState({
                    allServices: response.body,
                    companyServices: companyServices,
                    available: available
                });
            }
        })
    }

    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
    }
    render(){
        if(this.state.available&&(this.state.available.length>0)){
            const options = this.state.available.map((option,i)=>{
            return <option key={i} value={option.name}>{option.name}</option>
            });
            let button;
            if(this.state.serviceName){
                button = <Button variant="success">Add</Button>
            }else{
                button = <Button variant="secondary">Add</Button>
            }
            return (
                <div>
                    <h5>Select an existing service to add</h5>
                    <select name="serviceName" onChange={this.handleInputChange}>
                        <option value="" disabled defaultValue>Choose a service</option>
                        {options}
                    </select>
                    {button}
                </div>
            );
        }
        return (
            <div>
                <p>It seems that your company already provides all services available through AGME.</p>
                <p>Thinking of expanding? Add a New Service.</p>
            </div>
        )
    }
}
