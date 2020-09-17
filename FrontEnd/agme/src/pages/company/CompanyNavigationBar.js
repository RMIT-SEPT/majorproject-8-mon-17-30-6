import React from 'react';
import Navbar from "../../../node_modules/react-bootstrap/Navbar";
import Nav from "../../../node_modules/react-bootstrap/Nav";
import NavDropdown from "../../../node_modules/react-bootstrap/NavDropdown";
import '../css/navigationbar.css'
import { GrLogout } from "react-icons/gr";
import {getDecodedJwtFromLocalStorage}  from "../../mock/operations/mock/functions/utils";//Add decode func
import AddService from './AddService';
import CompanyDashboard from './CompanyDashboard';
import CompanyAppointmentList from './CompanyAppointmentList';
/***
 * This class should handle the Navigation bar so that the appropriate menu's are displayed
 * ****/
export default class CompanyNavigationBar extends React.Component{

    constructor(props){
        super(props);
        this.handleSelectNavBar = this.handleSelectNavBar.bind(this)
    }

    handleSelectNavBar(e){
        e.preventDefault();
        const name = e.target.name;
        switch(name){
            case 'services':
                this.props.handleSelectNavBar(<AddService/>, true)
                break;
            case 'upcomingAppointments':
                this.props.handleSelectNavBar(<CompanyDashboard/>, true)
                break;
            case 'appointmentsList':
                this.props.handleSelectNavBar(<CompanyAppointmentList/>, true)
                break;
            default:
                break;
        }
    }
    render(){
        const decodedJwtPayload = getDecodedJwtFromLocalStorage();
        const logoutButton = ()=>{
            if(decodedJwtPayload&&(decodedJwtPayload.exp>decodedJwtPayload.iat)){
                return <GrLogout className="logout" onClick={this.props.handleLogout}/>
            }
        }
        return (
            <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">AGME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <NavDropdown.Item>{decodedJwtPayload.sub}</NavDropdown.Item>
                            <NavDropdown title="Services" id="basic-nav-dropdown">
                                <NavDropdown.Item name="services" onClick={this.handleSelectNavBar}>Add Service</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            <NavDropdown title="Appointments" id="basic-nav-dropdown">
                                <NavDropdown.Item name="upcomingAppointments" onClick={this.handleSelectNavBar}>View Appointments</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item name="appointmentsList" onClick={this.handleSelectNavBar}>Search All Appointments</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                    {logoutButton()}
                </Navbar>
        )
    }
}
