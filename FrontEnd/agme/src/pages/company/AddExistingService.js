import React from 'react';
import Button from "react-bootstrap/Button";
import './services.css'
import Entity from '../../model/Entity';
import '../css/provider.css'
const {apiCall, getDecodedJwtFromLocalStorage} = require('../../mock/operations/mock/functions/operations');
//To view list of services
export default class AddExistingService extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allServices: localStorage.getItem("agme_all_services") ? JSON.parse(localStorage.getItem("agme_all_services")) : [],
            companyServices:localStorage.getItem("company_services") ? JSON.parse(localStorage.getItem("company_services")) : [],
            available:localStorage.getItem("company_available_services") ? JSON.parse(localStorage.getItem("company_available_services")) : [],
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
    addNewSubmit(e){
        e.preventDefault();
        if (!this.state.isCallingServer){
            this.setState({isCallingServer:true})
            this.state.entity.setField("name",this.state.name);
            this.state.entity.setField("description",this.state.description);
            apiCall('company', 'newService' , this.state.entity ,'post').then(r=>{
                if(r.statusCode === 200){
                    if (r.statusCode === 200){
                        alert("New service has been added");
                    }
                    console.log(r)
                    //update localStorage
                    let allServices = this.state.allServices;
                    let companyServices = this.state.companyServices;
                    let availableServices = this.state.available.filter(s=>{return s.name!==r.body.name});
                    console.log(availableServices)

                    allServices.push(r.body);
                    companyServices.push(r.body);

                    localStorage.setItem("agme_all_services",JSON.stringify(allServices))
                    localStorage.setItem("company_services",JSON.stringify(companyServices));
                    localStorage.setItem("company_available_services",JSON.stringify(availableServices));

                    this._isMounted&&this.setState({
                        allServices:allServices,
                        companyServices:companyServices,
                        available:availableServices,
                        isCallingServer: false
                    })
                }else{
                    this._isMounted&&this.setState({
                        isCallingServer: false
                    })
                }

            })
        }
        
     
    }

    componentWillUnmount(){
        this._isMounted = false;
    }
    componentDidMount(){
        this._isMounted = true;
        //just in case localStorage is empty
        if(!this.state.allServices || (this.state.allServices.length===0)){
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
    }

    handleInputChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
    }

    showInputFields(){
        const isExisting = this.state.available.filter(service=>{return service.name===this.state.name}).length>0;
        if(isExisting){
            return <div>
                <Button
                    onClick={e=>{
                        e.preventDefault();
                        this.setState({
                            name:null,
                            description: null
                        });
                    }}
                >
                    Type new
                    </Button>
            </div>
        }else{
            return (
                <div>
                    <input type="text" name={"name"} value={this.state.name} placeholder="name" className="form-control" onChange={this.handleInputChange}/>
                    <br/>
                    <input type="text" name={"description"} value={this.state.description} className="form-control" placeholder="description" onChange={this.handleInputChange}/>
                    <br/>
                </div>
            );
        }
    }

    render(){
        if(this.state.available&&(this.state.available.length>0)){
            const options = this.state.available.map((option,i)=>{
            return <option key={i} value={option.name}>{option.name}</option>
            });
            let button;
            if(this.state.name){
                button = <Button onClick={this.addNewSubmit} variant="success">Add</Button>
            }else{
                button = <Button variant="secondary">Add</Button>
            }
            return (
                <React.Fragment>
                <div className="newService">
                <h1>Add a new service</h1>
                <br/><br/>
                <p>Select an existing service or add a new one</p>
                    <select name="name" onChange={this.handleInputChange} defaultValue="DEFAULT">
                            <option value="DEFAULT" disabled>Choose a service</option>
                            {options}
                    </select>
                    {this.showInputFields()}
                    <br/>
                    {button}
                </div>
                </React.Fragment>
            );
        }
        return (
            <div className="newService">
                <h1>Add a new service</h1>
                <br/><br/>
                <input type="text" name={"name"} value={this.state.name} placeholder="name" className="form-control" onChange={this.handleInputChange}/>
                <br/>
                <input type="text" name={"description"} value={this.state.description} className="form-control" placeholder="description" onChange={this.handleInputChange}/>
                <br/>
                <button onClick={this.addNewSubmit}>add new</button>
            </div>
        )
    }
}
