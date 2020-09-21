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
                            <TableCell align="right">Attending&nbsp;Team&nbsp;Member</TableCell>
                            <TableCell align="right">Cancellable</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookingsData.map((booking) => (
                            <Row key={booking.id} row={booking}/>
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

    const credentials = localStorage.getItem('credentials') && (JSON.parse(localStorage.getItem('credentials')))
    const authDetails = utils.decodeJwt(JSON.parse(credentials).jwt)
    const customerID = authDetails.customerID

    buttonCancel = (row.user.id === customerID && bookingChangeAllowed)
        ? <Button onClick={() => {
            alert('clicked')
        }}> Cancel Booking </Button>//Update DB and change button state
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
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.startDateTime}</TableCell>
                <TableCell align="right">{row.company.name}</TableCell>
                <TableCell align="right">{row.duration}</TableCell>
                <TableCell align="right">{row.serviceType.name}</TableCell>
                <TableCell align="right">{row.employee.name}</TableCell>
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
        id: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        visible: PropTypes.number.isRequired,
        startDateTime: PropTypes.string.isRequired,
        employee: PropTypes.shape({
            username: PropTypes.string,
            name: PropTypes.string.isRequired,
            password: PropTypes.string,
            confirmPassword: PropTypes.string,
            address: PropTypes.string,
            phone: PropTypes.string,
            lastLogin: PropTypes.string,
            createdAt: PropTypes.string,
            updatedAt: PropTypes.string,
            role: PropTypes.string,
            id: PropTypes.number.isRequired,
            company: PropTypes.string,
            companyUsername: PropTypes.string,
            accountNonExpired: PropTypes.bool,
            accountNonLocked: PropTypes.bool,
            credentialsNonExpired: PropTypes.bool,
            enabled: PropTypes.bool,
            authorities: PropTypes.arrayOf(
                PropTypes.shape({
                    authority: PropTypes.string,
                })
            )
        }),
        company: PropTypes.shape({
            username: PropTypes.string,
            name: PropTypes.string.isRequired,
            password: PropTypes.string,
            confirmPassword: PropTypes.string,
            address: PropTypes.string,
            phone: PropTypes.string,
            lastLogin: PropTypes.string,
            createdAt: PropTypes.string,
            updatedAt: PropTypes.string,
            role: PropTypes.string,
            id: PropTypes.number.isRequired,
            companyName: PropTypes.string,
            enabled: PropTypes.bool,
            authorities: PropTypes.arrayOf(
                PropTypes.shape({
                    authority: PropTypes.string,
                })
            )
        }),
        user: PropTypes.shape({
            username: PropTypes.string,
            name: PropTypes.string.isRequired,
            password: PropTypes.string,
            confirmPassword: PropTypes.string,
            address: PropTypes.string,
            phone: PropTypes.string,
            lastLogin: PropTypes.string,
            createdAt: PropTypes.string,
            updatedAt: PropTypes.string,
            role: PropTypes.string,
            id: PropTypes.number.isRequired,
            accountNonExpired: PropTypes.bool,
            accountNonLocked: PropTypes.bool,
            credentialsNonExpired: PropTypes.bool,
            authorities: PropTypes.arrayOf(
                PropTypes.shape({
                    authority: PropTypes.string,
                })
            )
        }),
        serviceType: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    }).isRequired,
};