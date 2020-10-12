import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
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
                <span className="sr-only">Loading...</span>
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
            const columns = [{
                dataField: 'name',
                text: 'Service',
                filter: textFilter({
                  comparator: Comparator.LIKE
                })
              }, {
                dataField: 'description',
                text: 'Description',
                filter: textFilter({
                  comparator: Comparator.LIKE
                })
              }
            ];
            const rows = this.state.services.map(service=>{return {name:service.name,description:service.description}})
            console.log(this.state)
            servicesComponents = (
                <div className="upcoming_appointments_table" >
                    <BootstrapTable keyField='id' data={ rows } columns={ columns } filter={ filterFactory() } />
                </div>
            );
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
