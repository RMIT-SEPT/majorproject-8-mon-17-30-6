import React from 'react';
import EmployeeAvailabilityManager from '../../model/EmployeeAvailabilityManager';
import Spinner from 'react-bootstrap/Spinner';
import DailySchedule from './DailySchedule';

export default class AppointsManagement extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: ""
        }
        this.updateComponent = this.updateComponent.bind(this);
        this._isMounted = false;
    }

    /**
     * To make sure the EmployeeAvailabilityManager is called only after
     * the component has mounted
     * **/
    componentDidMount(){
        this._isMounted = true;
        new EmployeeAvailabilityManager(this.state,this.updateComponent)
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    updateComponent(employeeAvailabilityManager, dummyUserStatus,appointmentsStatus){
        if(dummyUserStatus){
            this._isMounted &&this.setState({
                employeeAvailabilityManager:employeeAvailabilityManager,
                dummyUserStatus:dummyUserStatus
            });
        }else{
            this._isMounted &&this.setState({
                employeeAvailabilityManager:employeeAvailabilityManager,
                appointmentsStatus:appointmentsStatus
            });          
        }
    }

    render(){
        if(this.state.dummyUserStatus&&this.state.appointmentsStatus){
            if((this.state.dummyUserStatus===200)&&(this.state.appointmentsStatus===200)){
                return (
                    <div>
                        <input type="date" name="date" onChange={e=>{
                            e.preventDefault();
                            this.state.employeeAvailabilityManager.setDate(e.target.value);
                            this.setState({date:e.target.value}) //to force re-render child component

                            }}
                        />
                        <DailySchedule date={this.state.date} employeeAvailabilityManager={this.state.employeeAvailabilityManager}/>
                    </div>
                );
            }else{
                return (
                    <div>Oooops, sorry we cannot fulfill your request now.</div>
                );
            }
        }else{
            return (
            <div>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <p>Please wait while we take care of a few things before you can manage your schedule.</p>
                <p>This may take a while.</p>
            </div>                  
            );
        }
    }
}