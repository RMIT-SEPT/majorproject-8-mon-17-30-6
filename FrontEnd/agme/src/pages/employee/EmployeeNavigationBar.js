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
export default class EmployeeNavigationBar extends React.Component{


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
                        <NavDropdown.Item className="userName"><FaUser/>{decodedJwtPayload.sub}</NavDropdown.Item>
                            <NavDropdown title="Services" id="basic-nav-dropdown">
                                <NavDropdown.Item name="appointsManagement" onClick={this.handleSelectNavBar}>Manage my appointments</NavDropdown.Item>
                                <NavDropdown.Item name="employeeDashboard" onClick={this.handleSelectNavBar}>My Dashboard</NavDropdown.Item>

                            </NavDropdown>
                            <Nav.Link name="help" onClick={this.props.handleSelectNavBar}>Help/Report</Nav.Link>

                        </Nav>

                    </Navbar.Collapse>
                    {logoutButton()}
                </Navbar>
        )
    }
}
