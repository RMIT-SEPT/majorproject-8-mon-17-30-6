import React from 'react';
import './upcomingevent.css';
import Spinner from 'react-bootstrap/Spinner';
import { BsTrash } from "react-icons/bs"; 
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Booking from '../../model/Booking';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
const {apiCall} = require('../../functions/operations');
export default class UpcomingAppointments extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            called: false,
            showModal: false,
            isDeletingBooking: false,
            deleted: false,
            deletedFailed:false
        }
        this.closeModal = this.closeModal.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this._isMounted = false;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    closeModal(e){
        e.preventDefault();
        this.setState({showModal: false});
    }

    //Should open a modal to confirm deletion
    handleDeleteClick(e){
        e.preventDefault();
        this.setState({isDeletingBooking:true});
        const bookingId = this.state.booking.id;
        apiCall('user', 'deleteBooking', bookingId, 'DELETE').then(response=>{
            if(RegExp('^2[0-9]{2}$').test(response.statusCode)){
                //delete appointment
                const appointments = this.state.appointments.filter(a=>{
                    return a.id!==this.state.booking.id
                })
                this.setState({
                    appointments: appointments,
                    isDeletingBooking:false,
                    deleted: true,
                    deletedFailed: false,
                    showModal:false
                })
            }else{
                this.setState({
                    isDeletingBooking:false,
                    deleted: false,
                    deletedFailed: true,
                    shoModal:false
                })
            }
        })
    }

    componentDidMount(){
        this._isMounted = true;
        const bookings = localStorage.getItem('user_bookings') ? JSON.parse(localStorage.getItem('user_bookings')) : [];
        if(bookings&&bookings.length){
            this.setState({appointments:JSON.parse(localStorage.getItem('user_bookings')), failed: false, called: true})
        }else{
            apiCall('user', 'getBookings',null,'get').then(r=>{
                if(r.statusCode===200){
                    this._isMounted&&this.setState({appointments:r.body, failed: false, called: true})
                }else{
                    this._isMounted&&this.setState({failed: true, called: true})
                }
            });
        }

    }

    modal(){
        //to make sure modal does not show up if boking is not set
        if(this.state.booking&&this.state.showModal){
            if(this.state.isDeletingBooking){
                return (
                    <Modal show={this.state.showModal}>
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>Cancelling...</Modal.Title>
                                </Modal.Header>
            
                                <Modal.Body>
                                    <p> Please wait while we cancel your appointment</p>
                                </Modal.Body>
                            </Modal.Dialog>
                            </Modal>
                );
            }else{
                //not currently deleting a booking
                if(this.deleted){
                    return (
                        <Modal show={this.state.showModal}>
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>Appointment was canceled</Modal.Title>
                                </Modal.Header>
            
                                <Modal.Body>
                                    <p> Your appointment was cancelled.</p>
                                </Modal.Body>
            
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={e=>{
                                        e.preventDefault();
                                        this.setState({showModal:false})
                                    }}>Cancel</Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal>
                    );
                }else{
                    /**
                     * 2 scenarios in this block. 
                     * Scenario A: A previous deletion failed
                     * Scenario B: No deletion was attempted yet
                     * **/
                    if(this.state.deletedFailed){
                        return <Modal show={this.state.showModal}>
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>Cancelation failed</Modal.Title>
                                </Modal.Header>
            
                                <Modal.Body>
                                    <p>
                                        Unfortunately we could not cancel your appointment with {this.state.booking.employee.name} scheduled to start at {this.state.booking.getDateString()} at this time?                                </p>
                                </Modal.Body>
            
                                <Modal.Footer>
                                <Button variant="secondary" onClick={e=>{
                                        e.preventDefault();
                                        this.setState({showModal:false})
                                    }}>Cancel</Button>                                
                                    </Modal.Footer>
                            </Modal.Dialog>
                            </Modal>
                    }else{
                        return (
                            <Modal show={this.state.showModal}>
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>Confirm cancelation</Modal.Title>
                                </Modal.Header>
            
                                <Modal.Body>
                                    <p>
                                        Are you sure you want to cancel your booking with {this.state.booking.employee.name} scheduled to start at {this.state.booking.getDateString()}?                                </p>
                                </Modal.Body>
            
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={e=>{
                                        e.preventDefault();
                                        this.setState({showModal:false})
                                    }}>Cancel</Button>
                                    <Button variant="danger" onClick={this.handleDeleteClick}>Go ahead</Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                            </Modal>
                        );
                    }
                }
            }

        }
    }

    render(){
        if(!this.state.called){
            return <div className="calling">
                <div className="spinnerOutter">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div>
                <br/>
                <p>Please wait while we retrieve your bookings.</p>
            </div>
        }else{
            if(this.state.failed){
                return <div>Ooops. Something went wrong, we could not retrieve your bookings</div>
            }else{
                const data = this.state.appointments.map(appointment=>{
                    const booking = new Booking(appointment)
                    const action = booking.isOldBooking() ? "" :<Button variant="danger" onClick={e=>{
                        e.preventDefault();
                        this.setState({booking:booking,showModal:true})
                    }}>
                        <BsTrash/> </Button>
                    return {
                        id: appointment.id,
                        startDateTime: appointment.startDateTime,
                        duration: appointment.duration,
                        service: appointment.serviceType.name,
                        companyName:appointment.company.name,
                        contactNumber: appointment.company.phone,
                        workerName: appointment.employee.name,
                        action: action

                    }
                })
                //table build
                const columns = [{
                    dataField: 'id',
                    text: 'Booking id'
                  }, {
                    dataField: 'startDateTime',
                    text: 'Date / Time',
                    filter: textFilter({
                      comparator: Comparator.LIKE
                    })
                  },  {
                    dataField: 'duration',
                    text: 'Duration (h)',
                    filter: textFilter({
                      comparator: Comparator.LIKE
                    })
                  },{
                    dataField: 'service',
                    text: 'Service',
                    filter: textFilter()
                  }, {
                    dataField: 'companyName',
                    text: 'Company',
                    filter: textFilter()
                  }, {
                    dataField: 'contactNumber',
                    text: 'Telephone',
                    filter: textFilter()
                  }, {
                    dataField: 'workerName',
                    text: 'Provider name',
                    filter: textFilter()
                  }, {
                    dataField: 'action',
                    text: 'Action',
                  }
                ];
                  
                return (
                    <div>
                        {this.modal()}
                        <div className="upcoming_appointments_table" >
                            <BootstrapTable keyField='id' data={ data } columns={ columns } filter={ filterFactory() } />
                        </div>
                    </div>
                )
            }
        }
    }
}