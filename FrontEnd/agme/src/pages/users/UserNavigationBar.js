import React from 'react';
import Navbar from "../../../node_modules/react-bootstrap/Navbar";
import Nav from "../../../node_modules/react-bootstrap/Nav";
import NavDropdown from "../../../node_modules/react-bootstrap/NavDropdown";
import '../css/navigationbar.css'
import { GrLogout } from "react-icons/gr";
import {getDecodedJwtFromLocalStorage}  from "../../mock/operations/mock/functions/utils";//Add decode func
import ComponentsHandler from './ComponentsHandler';
/***
 * This class should handle the Navigation bar so that the appropriate menu's are displayed
 * ****/
export default class UserNavigationBar extends React.Component{
    constructor(props){
        super(props);
        this.handleSelectNavBar = this.handleSelectNavBar.bind(this);
    }

    handleSelectNavBar(e){
        e.preventDefault();
        this.props.handleSelectNavBar(<ComponentsHandler component={e.target.name}/>, true);
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
                    <Navbar.Brand>AGME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <NavDropdown.Item name="userNewAppointment" onClick={this.handleSelectNavBar}>{decodedJwtPayload.sub}</NavDropdown.Item>
                            <NavDropdown title="Services" id="basic-nav-dropdown">
                                <NavDropdown.Item name="viewProviders" onClick={this.handleSelectNavBar}>Providers</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item name="userServices" onClick={this.handleSelectNavBar}>View Services</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="My Appointments" id="basic-nav-dropdown">
                                <NavDropdown.Item name="userNewAppointment" onClick={this.handleSelectNavBar}>New appointment</NavDropdown.Item>
                                <NavDropdown.Item name="upcomingAppointments" onClick={this.handleSelectNavBar}>Manage my appointments (view/delete)</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                    {logoutButton()}
                </Navbar>
        )
    }
}
