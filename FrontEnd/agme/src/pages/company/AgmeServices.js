import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import './services.css';
import Spinner from 'react-bootstrap/Spinner';
import {getDecodedJwtFromLocalStorage}  from "../../mock/operations/mock/functions/utils";//Add decode func
const {apiCall} = require('../../mock/operations/mock/functions/operations');
//To view list of services
export default class AgmeServices extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            services : this.props.filterByUsername ? localStorage.getItem("company_services")&&JSON.parse(localStorage.getItem("company_services")) : localStorage.getItem("agme_all_services")&&JSON.parse(localStorage.getItem("agme_all_services")),
            done: false
        }
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        //try again if localStorage does not work
        if(!this.state.services){
            apiCall('company', 'getAllServices','','GET').then(response=>{
                const username = getDecodedJwtFromLocalStorage()&&getDecodedJwtFromLocalStorage().sub;
                if(response.statusCode === 200){
                    let services = response.body;
                    if(this.props.filterByUsername){
                        services = services.filter(service=>{
                            return service.company.filter(company=>{return company.username===username}).length>0
                        })
                    }
                    this._isMounted &&this.setState({
                        done:true,
                        services: services
                    })
                }else{
                    this._isMounted &&this.setState({
                        done:true,
                        services: null
                    })
                }
            });
        }
        
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){
        if(this.state.services&&this.state.services.length){
            const rows = this.state.services.map(service=>{return {name:service.name,description:service.description}})
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
            return (
                <div className="upcoming_appointments_table" >
                    <BootstrapTable keyField='id' data={ rows } columns={ columns } filter={ filterFactory() } />
                </div>
            );
        }else{
            if(this.state.done){
                return "No services available"
            }else{
                return (
                    <div className="spinnerOutter">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading services...</span>
                        </Spinner>
                    </div>
                    );
            }
        }
    }
}
