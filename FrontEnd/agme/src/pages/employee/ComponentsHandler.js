import React from 'react';
import { UpcomingAppointments } from './UpcomingAppointments';
/**
 * A simple component to map to other components - avoid use of switch statements
 * **/
export default class ComponentsHandler extends React.Component{
    render(){
        const mapper = {
            upcomingAppointments: <UpcomingAppointments/>
        }
        return mapper[this.props.component]
    }
}