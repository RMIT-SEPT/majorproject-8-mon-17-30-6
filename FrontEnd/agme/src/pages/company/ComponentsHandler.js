import React from 'react';
import AgmeServices from './AgmeServices';
import {CompanyServices} from './CompanyServices';
import {AddExistingService} from './AddExistingService';
import {ViewEmployees} from './ViewEmployees';
import {CompanyAppointmentList} from './CompanyAppointmentList';
/**
 * A simple component to map to other components - avoid use of switch statements
 * **/
export default class ComponentsHandler extends React.Component{
    render(){
        const mapper = {
            agmeServices: <AgmeServices/>,
            companyServices: <CompanyServices/>,
            addExistingServices: <AddExistingService/>,
            viewEmployees: <ViewEmployees/>,
            viewBookings: <CompanyAppointmentList/>
        }
        return mapper[this.props.component]
    }
}
