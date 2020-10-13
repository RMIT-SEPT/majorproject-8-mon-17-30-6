import React from 'react';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import Booking from '../../model/Booking';
import Spinner from 'react-bootstrap/Spinner';
const {apiCall} = require('../../mock/operations/mock/functions/operations');

export class CompanyAppointmentList extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            haveDataFromServer: false
        }
        this._isMounted = false;
    }

    componentWillUnmount(){
      this._isMounted = false;
    }
    componentDidMount() {
      this._isMounted = true;
      let appointments = localStorage.getItem('company_bookings')&&JSON.parse(localStorage.getItem('company_bookings'));
      if(appointments && appointments.length){
        this._isMounted&&this.setState({"haveDataFromServer":true, appointments:appointments})
      }else{
        apiCall('company', 'getBookings', null, 'get').then(response=>{
          let appointments = response.body;
          for (var i = 0; i < appointments.length; i++) {
            var time = appointments[i].startDateTime.replace(' ','T');
            var time2 = "20" + time.substr(6,2) + "-" + time.substr(3,2) + "-" + time.substr(0,2) + time.substr(8,9);
            appointments[i].startDateTime = time2;
          }
          this._isMounted&&this.setState({"haveDataFromServer":true, appointments:appointments})
      });
      }
    }

    render(){
      if (this.state.haveDataFromServer === false) {
        return(
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading appointments</span>
      </Spinner>);
      }
      else{
        if (!(this.state.appointments||this.state.appointments.length)) {
          return <p>
            <h2>No Current Bookings.</h2>
          </p>;
        }
        else {
          const data = this.state.appointments.map(appointment=>{
            return new Booking(appointment).getBookingInfo();
          })
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
            <div className="upcoming_events_outter">
                <h3>Your upcoming events</h3>
                <div className="upcoming_appointments_table" >
                            <BootstrapTable keyField='id' data={ data } columns={ columns } filter={ filterFactory() } />
                </div>
                    </div>
          )
          }
      }
      }

}
