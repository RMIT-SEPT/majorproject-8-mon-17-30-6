import React from 'react';
import AppointsManagement from './AppointsManagement';
import EmployeeDashboard from './EmployeeDashboard';

/**
 * A simple component to map to other components - avoid use of switch statements
 * **/
export default class ComponentsHandler extends React.Component{
    render(){
        const mapper = {
            appointsManagement: <AppointsManagement/>,
            employeeDashboard: <EmployeeDashboard/>
        }
        return mapper[this.props.component]||""
    }
}