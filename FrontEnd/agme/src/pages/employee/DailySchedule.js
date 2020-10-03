import React from 'react';
import Button from "react-bootstrap/Button";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner'

import './dailyschedule.css'
export default class DailySchedule extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showModal : false,
            isUpdatingAvailability:false
        }

        this.callback = this.callback.bind(this);
    }

    /**
     * A callback function to pass to EmployeeAvailabilityManager
     * **/
    callback(isUpdatingAvailability, error){
        this.setState({isUpdatingAvailability:isUpdatingAvailability,showModal:isUpdatingAvailability, error:error});
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
                <p>Please wait while we block timethe time slot {this.props.employeeAvailabilityManager.date} from {this.props.employeeAvailabilityManager.time}:00 to  {this.props.employeeAvailabilityManager.time+1}:00</p>
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
            const hoursComponent = Object.keys(this.props.employeeAvailabilityManager.times).map((key,i)=>{
                const isAvailable = (this.props.employeeAvailabilityManager.times[key] ===null)
                if(isAvailable){
                    return (
                        <div className="time_available" key={i}>
                        <span className="label">{key<10? "0"+key:key}:00 - {(Number(key)+1)%24<10? "0"+(Number(key)+1)%24 : (Number(key)+1)%24}:00</span>
                        <span className="toggle">
                            <BsToggleOn className="available" onClick={e=>{
                                e.preventDefault();
                                this.props.employeeAvailabilityManager.setTime(key)
                                this.setState({
                                    showModal:true,
                                    selectedAppointment:this.props.employeeAvailabilityManager.times[key]
                                })
                            }}/>
                            </span>
                    </div>
                    )
                }else{
                    const name = this.props.employeeAvailabilityManager.times[key]&&this.props.employeeAvailabilityManager.times[key].user.name;
                    const username = this.props.employeeAvailabilityManager.times[key]&&this.props.employeeAvailabilityManager.times[key].user.username;
                    //blocked for yourselg
                    if(username==='dummy'){
                        return (
                            <div className="time_unavailable" key={i}>
                            <span className="label">{key<10? "0"+key:key}:00 - {(Number(key)+1)%24<10? "0"+(Number(key)+1)%24 : (Number(key)+1)%24}:00</span>
                            <span className="toggle">
                                <BsToggleOff className="unavailable" onClick={e=>{
                                e.preventDefault();
                                this.props.employeeAvailabilityManager.setTime(key)
                                this.setState({
                                    showModal:true,
                                    selectedAppointment:this.props.employeeAvailabilityManager.times[key]
                                })
                            }}/>
                                </span>
                            <span className="slot_details">
                                You have made this time slot unvailable
                            </span>
                        </div>
                        )
                    }else if(username){
                        return (
                            <div className="time_unavailable" key={i}>
                            <span className="label">{key<10? "0"+key:key}:00 - {(Number(key)+1)%24<10? "0"+(Number(key)+1)%24 : (Number(key)+1)%24}:00</span>
                            <span className="toggle">
                                <BsToggleOff className="unavailable" onClick={e=>{
                                e.preventDefault();
                                this.props.employeeAvailabilityManager.setTime(key)
                                this.setState({showModal:true,selectedAppointment:this.props.employeeAvailabilityManager.times[key]})
                            }}/>
                                </span>
                            <span className="slot_details">
                                This is a booking for {name}
                            </span>
                        </div>
                        )
                    }

                }
                
            });
            return (
                <div>
                    <Modal show={this.state.showModal}>
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>{this.modalTitle()}</Modal.Title>
                                </Modal.Header>
            
                                <Modal.Body>
                                    <p>{this.modalBody()}</p>
                                </Modal.Body>
            
                                <Modal.Footer>
                                      {this.modalFooter()}                          
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal>
                    {hoursComponent}
                </div>
            );
        }else{
            return (
                <div>Loading schedule</div>
            );
        }
    }
}