import React from 'react';
import UpcomingAppointments from './UpcomingAppointments';
import UserServices from './UserServices';
import ViewProviders from './ViewProviders';

/**
 * A simple component to map to other components - avoid use of switch statements
 * **/
export default class ComponentsHandler extends React.Component{
    render(){
        const mapper = {
            upcomingAppointments: <UpcomingAppointments/>,
            userServices: <UserServices/>,
            providers: <ViewProviders/>
        }
        return mapper[this.props.component]
    }
}
