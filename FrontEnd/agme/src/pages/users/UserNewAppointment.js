import '../css/userDash.css';
import React from 'react';
import Booking from '../../model/Booking';
import EmplpoyeeAvailability from './EmployeeAvailability';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import { FcAlarmClock, FcDownload } from "react-icons/fc";
import {AiFillSchedule} from "react-icons/ai";
import BootstrapTable from 'react-bootstrap-table-next';
const {apiCall} = require('../../functions/operations')

export default class UserNewAppointment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            booking: new Booking({}),
            isCallingServer: true,
            options: [],
            called: false,
            newCall: false,
            getServicesStatus: null,
            calledTime: false,
            calledDays: false,
            employees: [],
            employee: "",
            array: [],
            timeSlots: [],
            classname: "upcomingApt",
            upcBookings: 0
        };
        this.handleBookingChange = this.handleBookingChange.bind(this);
        this.handleBookingRequestForUser = this.handleBookingRequestForUser.bind(this);
        this.getAllServices = this.getAllServices.bind(this);
        this.updateBooking = this.updateBooking.bind(this)
        this.changeClass = this.changeClass.bind(this);
        this._isMounted = false;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }
    componentDidMount(){
        this._isMounted = true;
        //only make api call if necessary
        this.getAllServices();
        const upcomingBookings = localStorage.getItem('user_upcoming-bookings') ? JSON.parse(localStorage.getItem('user_upcoming-bookings')) : [];
        if(upcomingBookings&&upcomingBookings.length){
            this.setState({appointments:upcomingBookings, failed: false, newCall: true})
        }else{
            apiCall('user', 'upcomingBookings',null,'get').then(r=>{
                if(r.statusCode===200){
                    if(this._isMounted){
                        this.setState({appointments:r.body, failed: false, newCall: true})
                    }
                }else{
                    if(this._isMounted){
                        this.setState({failed: true, newCall: true})
                    } 
                }
            });
        }
        
    }
    updateBooking(e){
        e&&e.preventDefault();
        const booking = new Booking(JSON.parse(JSON.stringify(this.state.booking)));
        this._isMounted&&this.setState({booking:booking})
    }
    //Calls getService API and populates service options
    getAllServices(){
        //only call api if it hasnt been called yet
        //only call it is there is no state.httpStatusCode
        if(!this.state.getServicesStatus){
            const allServices = localStorage.getItem('user_services') ? JSON.parse(localStorage.getItem('user_services')) : [];

            if(allServices&&allServices.length){
                let options = [<option key={0} value={"DEFAULT"} disabled>Choose a Service</option>];
                allServices.forEach((service,i)=>{
                    options.push(<option key={i+1} value={service.name}>{service.name}</option>);
                })
                this.setState({
                    getServicesStatus: 200,
                    options:options
                })
            }else{
                apiCall('user', 'getAllServices', null,'get').then(response=>{
                    let options = this.state.options;
                    if(response.statusCode===200){
                        this._isMounted&&this.setState({isCallingServer:false});
                        var servicetypes = [];
                        var i = 1;
                        servicetypes.push(<option key={0} value={"DEFAULT"} disabled>Choose a Service</option>);
                        response.body.forEach((serviceType) =>
                        servicetypes.push(<option key={serviceType.name} value={serviceType.name}>{serviceType.name}</option>),i++);
                        options = servicetypes;
                    }
                    this._isMounted&&this.setState({
                        getServicesStatus: response.statusCode,
                        options:options
                    })
                    }
                )
            }
            
        }
    }

    handleBookingChange(e){
        e.preventDefault();
        const key = e.target.name;
        const value = e.target.value;
        const booking = new Booking(JSON.parse(JSON.stringify(this.state.booking)));
        booking.setField(key,value)
        this._isMounted&&this.setState({booking:booking, availabilities: null}, function (){
            if((key==='date')||(key==='duration')){
                this.setState({isUpdatingAvailability:true})
                this.state.booking.getAvailability().then(response=>{
                    if(response){
                        if(response.statusCode===200){
                            const booking = new Booking(JSON.parse(JSON.stringify(this.state.booking)));
                            booking.availabilities = response.body
                            this._isMounted&&this.setState({isUpdatingAvailability:false,booking:booking, isCallingServer:false, availabilities: response.body})
                        }
                    }
                })
            }
        });

    }

    handleTimeValue(index){
        var options = [];
        for (var i =0; i<this.state.array[index-1].length ;i++){
                options.push(<option key={i} value={this.state.array[index-1][i]}>{this.state.array[index-1][i]}</option>);
        }
        this._isMounted&&this.setState({timeSlots:options});

    }

    getNextDate(date){
        return new Date(date.getTime()+1*24*60*60*1000);
    }
    //displays the days that can be booked
    showDuration(){
        if (this.state.booking.serviceType !== ""){
            return (
            <React.Fragment>
                <label>Duration</label>
                <select
                    defaultValue="DEFAULT"
                    className="form-control"
                    name={"duration"}
                    onChange={this.handleBookingChange}
                >
                    <option key={0} value={"DEFAULT"} disabled>Choose a duration</option>
                    {[1,2,3,4].map((d)=>{return <option key={d} value={d}>{d} hour(s)</option>})}
                </select>
            </React.Fragment>
            )
        }
    }

    showDates(){
        if(this.state.booking.duration){
            let initial = new Date();
            initial.setDate(initial.getDate() + 2);
            const dates = []
            for(let i = 0 ; i < 30; i++){
                dates.push(
                    <option key={i+1} value={initial.toString()}>
                        {initial.toDateString()}
                    </option>
                  )
                initial.setDate(initial.getDate() + 1)
            }
            return (
                <React.Fragment>
                    <label>Date</label>
                    <select defaultValue="DEFAULT" className="form-control" name={"date"} onChange={this.handleBookingChange}>
                        <option key={0} value={"DEFAULT"} disabled>Choose a date</option>
                        {dates}
                    </select><br></br>
                </React.Fragment>
            )
        }
    }

    handleBookingRequestForUser(){
        //mock for now
        this._isMounted&&this.setState({isCallingServer:true});
        this.state.booking.handleBookingRequest()
        .then(response=>{
            if(response.statusCode===200){
                this._isMounted&&this.setState({isCallingServer:false,isUpdatingAvailability:false});
                //update localstorage
                let bookings = localStorage.getItem('user_bookings') ? JSON.parse(localStorage.getItem('user_bookings')) : []
                if(bookings&&bookings.length){
                    bookings.push(response.body)
                }
                localStorage.setItem('user_bookings',JSON.stringify(bookings))
                alert("booking successful");
            }else{
                this._isMounted&&this.setState({isCallingServer:false, failed:true,error:response, isUpdatingAvailability:false})
            }
        })
    }


    showUpcoming(){
        if(!this.state.newCall){
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
                return "";
            }else{
            let upcBookings = this.state.appointments.length;

            const data = this.state.appointments.map(appointment=>{
                return new Booking(appointment).getBookingInfo();
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
              }
            ];

            return (
                <div>
                    <div className="title">
                    <p>
                      <FcAlarmClock className="alarm"/> Upcoming Apointments (Next 48h)
                      </p>

                    </div>
                        <div className="body">
                        <p>
                          You have {upcBookings} appointments coming soon.
                        </p>
                            <Button onClick={this.changeClass} variant={this.state.classname==='noClass' ? "danger" : "success"} className="showUpcomming">{this.state.classname==='noClass' ? "Hide" : "View"}</Button>
                        <div className={this.state.classname}>
                        <div className="upcoming_appointments_table" >
                            <BootstrapTable keyField='id' data={ data } columns={ columns } filter={ filterFactory() } />
                        </div>
                        </div>
                        </div>
                </div>
              )
            }
        }
    }
    changeClass(){
        if (this.state.classname === "upcomingApt"){
            this._isMounted&&this.setState({classname:"noClass"});
        }else{
            this._isMounted&&this.setState({classname:"upcomingApt"});

        }

    }
    render(){
        if(this.state.getServicesStatus){
            if(this.state.getServicesStatus===200){
                return (
                    <div className="newAppointmentOutter">
                        <React.Fragment>
                        <div className={"new-booking"}>
                         {this.showUpcoming()}
                        </div>
                      
                      <div className={"new-booking"}>
                          <div className="title">
                              <AiFillSchedule className="alarm"/>
                              <h3>New Booking</h3>
                          </div>
                          <div className="body">
                              <br/>
                              <React.Fragment>
                                  <label>Service</label>
                                  <select value={this.state.booking.serviceType||"DEFAULT"} className="form-control" name={"serviceType"} onChange={this.handleBookingChange}>{this.state.options}</select>
                              </React.Fragment>
                              <br/>
                              {this.showDuration()}
                              <br/>
                              {this.showDates()}
                              <EmplpoyeeAvailability isUpdatingAvailability={this.state.isUpdatingAvailability} updateBooking={this.updateBooking} booking={this.state.booking} availabilities={this.state.availabilities}/>
                              <br/>
                              {this.state.booking.isComplete() &&<button className="btn btn-success" onClick={this.handleBookingRequestForUser}>Submit</button>}
                              <br/>
                          </div>
                      </div>
                    </React.Fragment>
                    </div>
                )
            }else{
                //getServices called but API failed?
                return (
                    <div className={"new-booking"}>
                    <h3 className="title">New Booking</h3>
                    <div className="form-container">
                        <p>Unfortunately we could not load available services at this time.</p>
                    </div>
                    </div>
                );
            }
        }else{
            //hasnt even completed that call yet
            return (
                <div className={"new-booking"}>
                <div className="title">
                <FcDownload className="alarm"/>
                    <h3>Retrieving services</h3>
                </div>
                <div className="body">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                    <p>Please wait while we figure out what services are available to you.</p>
                </div>
                </div>
            );
        }

    }
}
