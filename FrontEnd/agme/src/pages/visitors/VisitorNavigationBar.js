import React from 'react';
import Navbar from "../../../node_modules/react-bootstrap/Navbar";
import Nav from "../../../node_modules/react-bootstrap/Nav";
import '../css/navigationbar.css'
/***
 * This class should handle the Navigation bar so that the appropriate menu's are displayed
 * ****/
export default class VisitorNavigationBar extends React.Component{

    render(){
        return (
            <Navbar className="userNavbar">
                    <Navbar.Brand className="brand">AGME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link className="userNavbar">Home</Nav.Link>
                            <Nav.Link name="login" onClick={this.props.handleSelectNavBar}>Login</Nav.Link>
                            <Nav.Link name="help" onClick={this.props.handleSelectNavBar}>Help/Report</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
        )
    }
}