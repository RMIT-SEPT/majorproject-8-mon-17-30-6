import React from 'react';
import Button from "react-bootstrap/Button";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner'
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import './dailyschedule.css'
export default class DailySchedule extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showModal : false,
            isUpdatingAvailability:false
        }
        this.callback = this.callback.bind(this);
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    /**
     * A callback function to pass to EmployeeAvailabilityManager
     * **/
    callback(isUpdatingAvailability, error){
        this._isMounted&&this.setState({isUpdatingAvailability:isUpdatingAvailability,showModal:isUpdatingAvailability, error:error});
    }

    modalTitle(){
        if(this.state.selectedAppointment){
            const isDummyAppointment = this.props.employeeAvailabilityManager.isDummyAppointment();
            if(isDummyAppointment){
                return `Unblock time slot ${this.props.employeeAvailabilityManager.date} from ${this.props.employeeAvailabilityManager.time}:00 to ${Number(this.props.employeeAvailabilityManager.time)+1}:00`
            }
            return "Cancel Booking"
        }else{
            if(this.state.isUpdatingAvailability){
                return `Blocking ${this.props.employeeAvailabilityManager.date} from ${this.props.employeeAvailabilityManager.time}:00 to ${Number(this.props.employeeAvailabilityManager.time)+1}:00`

            }else{
                return `Block slot ${this.props.employeeAvailabilityManager.date} from ${this.props.employeeAvailabilityManager.time}:00 to ${Number(this.props.employeeAvailabilityManager.time)+1}:00`
            }
        }
    }
    modalBody(){
        if(this.state.isUpdatingAvailability){
            return <div>
                <Spinner animation="border" role="status"/>
                Please wait while we block the time slot {this.props.employeeAvailabilityManager.date} from {this.props.employeeAvailabilityManager.time}:00 to  {Number(this.props.employeeAvailabilityManager.time)+1}:00
            </div>
        }
        if(this.state.selectedAppointment){
            const isDummyAppointment = this.props.employeeAvailabilityManager.isDummyAppointment();
            if(isDummyAppointment){
                return "By confirming you will make this slot time available again."
            }else{
                return "You are about to cancel an appointment. You cannot partially cancel the appointment. If the appointment is booked for more than 1 hour, the whole slot will be canceled."
            }
        }else{
            return "Please confirm to block this time slot. Once you confirm it, no user will be able to see this slot as available."
        }
    }

    modalFooter(){
        if(this.state.isUpdatingAvailability){
            return "";
        }
        if(this.state.selectedAppointment){
            const isDummyAppointment = this.props.employeeAvailabilityManager.isDummyAppointment();
            if(isDummyAppointment){
                return (
                    <div>
                        <Button className="footer_buttons" variant="primary" onClick={e=>{
                            e.preventDefault();
                            this.props.employeeAvailabilityManager.deleteBooking(this.callback);
                            }}>Confirm
                        </Button>
                        <Button  className="footer_buttons" variant="secondary" onClick={e=>{
                            e.preventDefault();
                            this.setState({showModal:false})
                            }}>Cancel
                        </Button>
                    </div>
                );
            }
            return (
                <div>
                    <Button className="footer_buttons" variant="danger" onClick={e=>{
                        e.preventDefault();
                        this.props.employeeAvailabilityManager.deleteBooking(this.callback);
                    }}>Confirm
                    </Button>
                    <Button  className="footer_buttons" variant="secondary" onClick={e=>{
                        e.preventDefault();
                        this.setState({showModal:false})
                        }}>Cancel
                    </Button>
            </div>
            );
        }else{
            return (
                <div>
                    <Button className="footer_buttons" variant="danger" onClick={e=>{
                        e.preventDefault();
                        this.props.employeeAvailabilityManager.blockTime(this.callback)
                        
                        }}>Block it
                    </Button>
                    <Button  className="footer_buttons" variant="secondary" onClick={e=>{
                        e.preventDefault();
                        this.setState({showModal:false})
                        }}>Cancel
                    </Button>
                </div>
                
            );
        }
    }
    render(){
        if(this.props.employeeAvailabilityManager&&this.props.employeeAvailabilityManager.times){


            const columns = [{
                dataField: 'time',
                text: 'Time slot'
              }, {
                dataField: 'status',
                text: 'Availability'
              },{
                dataField: 'details',
                text: 'Details'
              }
            ];

            let rows = [];
            for(let i = 8 ; i < 18; i++){
                const isAvailable = this.props.employeeAvailabilityManager.times[i] ===null;
                let status;
                let details = "Available"
                if(isAvailable){
                    status = <BsToggleOn className="available" onClick={e=>{
                        e.preventDefault();
                        this.props.employeeAvailabilityManager.setTime(i)
                        this.setState({
                            showModal:true,
                            selectedAppointment:this.props.employeeAvailabilityManager.times[i]
                            })
                        }}
                    />
                }else{
                    const name = this.props.employeeAvailabilityManager.times[i]&&this.props.employeeAvailabilityManager.times[i].user.name;
                    const isDummy = (this.props.employeeAvailabilityManager.times[i]&&this.props.employeeAvailabilityManager.times[i].user.username) === "dummy";
                    if(isDummy){
                        details = "You blocked this time slot"
                    }else{
                        details = "You are providing service to "+name;
                    }
                    status = <BsToggleOff className="unvailable" onClick={e=>{
                        e.preventDefault();
                        this.props.employeeAvailabilityManager.setTime(i)
                        this.setState({
                            showModal:true,
                            selectedAppointment:this.props.employeeAvailabilityManager.times[i]
                            })
                        }}
                    />
                }
                rows.push({
                    time: i,
                    status: status,
                    details: details
                })
            }

            return (
                <div className="employee_schedule">
                    <div>
                        <h4>Daily Schedule</h4>
                    </div>
                    <Modal show={this.state.showModal}>
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>{this.modalTitle()}</Modal.Title>
                                </Modal.Header>
            
                                <Modal.Body>
                                    {this.modalBody()}
                                </Modal.Body>
            
                                <Modal.Footer>
                                      {this.modalFooter()}                          
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal>
                    
                    <div className="upcoming_appointments_table" >
                        <BootstrapTable keyField='id' data={ rows } columns={ columns }/>
                    </div>
                </div>
            );
        }else{
            return (
                <div>Loading schedule</div>
            );
        }
    }
}