import React from 'react';
import '../../pages/css/availableTimes.css';

//Derived from Boilerplate taken from materia-ui documentation
//https://material-ui.com/components/tables/
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'; //Adds float shadow to table
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import Button from "@material-ui/core/Button";

//Mock data
import BookingData from '../../mock/data/Bookings.json'
import * as utils from "../../mock/operations/mock/functions/utils";//Add decode func
//call the api
const bookingsData = BookingData;


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

//This component returns upcoming bookings for a user
    //TODO Backend getBookings for customerID (Please Ensure that bookingID is returned in response)
/* *
  "date": "string",
  "companyUsername": "string",
  "duration": "string",
  "serviceType": "string"
* */

export default class BookingTimes extends React.Component {
    render() {
        return (

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Booking&nbsp;Time</TableCell>
                            <TableCell align="right">Company&nbsp;Name</TableCell>
                            <TableCell align="right">Duration&nbsp;(mins)</TableCell>
                            <TableCell align="right">Type&nbsp;of&nbsp;Service</TableCell>
                            <TableCell align="right">Cancellable</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookingsData.map((booking) => (
                            <Row key={booking.bookingID} row={booking}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    let buttonCancel;

    //allow user to cancel booking if 24 hours before AND they are currently logged in
    const bookingDateTime = Date.parse(row.startDateTime);
    const currentDateTime = Date.now();
    const bookingLockoutTime = 24 * 60 * 60 * 1000;
    const bookingChangeAllowed = (currentDateTime - bookingDateTime < bookingLockoutTime)

    const credentials = localStorage.getItem('credentials')&&(JSON.parse(localStorage.getItem('credentials')))
    const authDetails = utils.decodeJwt(JSON.parse(credentials).jwt)
    const customerID = authDetails.customerID

    buttonCancel = (row.customerID===customerID && bookingChangeAllowed)
        ? <Button onClick={() => { alert('clicked') }}> Cancel Booking </Button>//Update DB and change button state
        : <Button variant="contained" disabled> Cancel Booking</Button>

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.bookingID}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.companyUsername}</TableCell>
                <TableCell align="right">{row.duration}</TableCell>
                <TableCell align="right">{row.serviceType}</TableCell>
                <TableCell align="right">{bookingChangeAllowed ? MoodIcon : MoodBadIcon}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Cancel your booking
                            </Typography>
                           {buttonCancel}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        serviceType: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        companyUsername: PropTypes.string,
    }).isRequired,
};