import React from 'react';
import Navbar from "../../../node_modules/react-bootstrap/Navbar";
import Nav from "../../../node_modules/react-bootstrap/Nav";
import NavDropdown from "../../../node_modules/react-bootstrap/NavDropdown";
import '../css/navigationbar.css'
import { GrLogout } from "react-icons/gr";
import {getDecodedJwtFromLocalStorage}  from "../../mock/operations/mock/functions/utils";//Add decode func

/***
 * This class should handle the Navigation bar so that the appropriate menu's are displayed
 * ****/
export default class UserNavigationBar extends React.Component{

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
                            <NavDropdown title="Services" id="basic-nav-dropdown">
                                <NavDropdown.Item name="providers" onClick={this.props.handleSelectNavBar}>Providers</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item name="services" onClick={this.props.handleSelectNavBar}>Services</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Manage Appointments" id="basic-nav-dropdown">
                                <NavDropdown.Item name="upcomingAppointments" onClick={this.props.handleSelectNavBar}>View my appointments</NavDropdown.Item>
                              
                            </NavDropdown>
                        </Nav>
                        
                    </Navbar.Collapse>
                    {logoutButton()}      
                </Navbar>
        )
    }
}