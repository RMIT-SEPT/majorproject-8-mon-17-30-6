import React from 'react';
import Navbar from "../../../node_modules/react-bootstrap/Navbar";
import Nav from "../../../node_modules/react-bootstrap/Nav";
import NavDropdown from "../../../node_modules/react-bootstrap/NavDropdown";
import '../css/navigationbar.css'
import { IoIosLogOut } from "react-icons/io";
import { IconContext } from "react-icons";
import {FaUser} from "react-icons/fa";
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
        const expired = (decodedJwtPayload.exp - new Date().getTime()/1000)  < 0
        const logoutButton = ()=>{
            if(!expired){
                return <IconContext.Provider value={{ color: 'white', size: '40px' }}>
                  <div>
                    <IoIosLogOut className="logout" onClick={this.props.handleLogout}/>
                  </div>
                </IconContext.Provider>
            }
        }
        return (
            <Navbar className="userNavbar">
                    <Navbar.Brand className="brand">AGME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <NavDropdown.Item name="userNewAppointment" className="userName" onClick={this.handleSelectNavBar}><FaUser/>{decodedJwtPayload.sub}</NavDropdown.Item>
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
