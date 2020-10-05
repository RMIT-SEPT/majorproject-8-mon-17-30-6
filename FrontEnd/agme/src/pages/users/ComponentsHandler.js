import React from 'react';
import UpcomingAppointments from './UpcomingAppointments';
import UserServices from './UserServices';
import ViewProviders from './ViewProviders';
import UserNewAppointment from './UserNewAppointment';

/**
 * A simple component to map to other components - avoid use of switch statements
 * **/
export default class ComponentsHandler extends React.Component{
    render(){
        const mapper = {
            userNewAppointment: <UserNewAppointment/>,
            upcomingAppointments: <UpcomingAppointments/>,
            userServices: <UserServices/>,
            viewProviders: <ViewProviders/>
        }
        return mapper[this.props.component]
    }
}
