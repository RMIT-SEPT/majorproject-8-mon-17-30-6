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
export default class CompanyNavigationBar extends React.Component{


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
                    <Navbar.Brand href="#home">AGME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <NavDropdown.Item>{decodedJwtPayload.sub}</NavDropdown.Item>
                            <NavDropdown title="Services" id="basic-nav-dropdown">
                                <NavDropdown.Item name="providers" onClick={this.props.handleSelectNavBar}>Providers</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item name="agmeServices" onClick={this.handleSelectNavBar}>Agme Services</NavDropdown.Item>
                                <NavDropdown.Item name="companyServices" onClick={this.handleSelectNavBar}>My Services</NavDropdown.Item>
                                <NavDropdown.Item name="addExistingServices" onClick={this.handleSelectNavBar}>Add an existing service</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Employees" id="basic-nav-dropdown">
                                <NavDropdown.Item name="viewEmployees" onClick={this.handleSelectNavBar}>View Employees</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    {logoutButton()}      
                </Navbar>
        )
    }
}