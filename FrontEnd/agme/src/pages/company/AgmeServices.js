import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
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
        let servicesComponents =(
            <div className="upcoming_appointments_table" >
                <BootstrapTable keyField='id' data={ rows } columns={ columns } filter={ filterFactory() } />
            </div>)
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
