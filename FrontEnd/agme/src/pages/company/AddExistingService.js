import React from 'react';
import Button from "react-bootstrap/Button";
import './services.css'
import Entity from '../../model/Entity';
import '../css/provider.css'
const {apiCall, getDecodedJwtFromLocalStorage} = require('../../mock/operations/mock/functions/operations');
//To view list of services
export class AddExistingService extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            services:[],
            serviceName: "",
            isCallingServer: false,
            failed: false,
            error: null,
            description: "",
            name: "",
            entity: new Entity()
        }
        this._isMounted = false;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addNewSubmit = this.addNewSubmit.bind(this);
    }
    addNewSubmit(){
            if (!this.state.isCallingServer){
                this.setState({isCallingServer:true})
            this.state.entity.setField("name",this.state.name);
            this.state.entity.setField("description",this.state.description);
            apiCall('company', 'newService' , this.state.entity ,'post').then(r=>{
                if(r.statusCode === 200){
                    console.log(r);
                    if (r.statusCode === 200){
                        alert("New service has been added");
                    }
    
                    
                }
            })
        }
        
     
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
                <React.Fragment>
                <div>
                    <h5>Select an existing service to add</h5>
                    <select name="serviceName" onChange={this.handleInputChange}>
                        <option value="" disabled defaultValue>Choose a service</option>
                        {options}
                    </select>
                    {button}
                </div>
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
            );
        }
        return (
            <div>
        
                <div className="newService">
                <h1>Add a new service</h1>
                <br/><br/>
                <input type="text" name={"name"} value={this.state.name} placeholder="name" className="form-control" onChange={this.handleInputChange}/>
                <br/>
                <input type="text" name={"description"} value={this.state.description} className="form-control" placeholder="description" onChange={this.handleInputChange}/>
                <br/>
                <button onClick={(e) => {this.addNewSubmit()}}>add new</button>
                </div>
            </div>
        )
    }
}
