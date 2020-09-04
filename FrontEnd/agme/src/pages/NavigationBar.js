import React from 'react';
import Navbar from "../../node_modules/react-bootstrap/Navbar";
import Nav from "../../node_modules/react-bootstrap/Nav";
import NavDropdown from "../../node_modules/react-bootstrap/NavDropdown";
import './css/navigationbar.css'
import { GrLogout } from "react-icons/gr";
import {getDecodedJwtFromLocalStorage}  from "../mock/operations/mock/functions/utils";//Add decode func

/***
 * This class should handle the Navigation bar so that the appropriate menu's are displayed
 * ****/
export default class NavigationBar extends React.Component{
    render(){
         //uncomment to test error
         //throw new Error({errorId: "AGME ERROR",errorDetails: []});

        const decodedJwtPayload = getDecodedJwtFromLocalStorage();
        if(decodedJwtPayload){
            if(decodedJwtPayload.role==='provider'){
                //show navigation bar for providers
            }else if(decodedJwtPayload.role==='user'){
                //show navigation bar for user
            }else if(decodedJwtPayload.role==='administrator'){
                //show navigation bar for admin
            }else{
                //Not expected to have any different role - throw an error
            }

        }else{
            //no user authenticated
        }

        const logoutButton = ()=>{
            if(this.props.authenticated){
                return <GrLogout className="logout" onClick={this.handleLogout}/>
            }
        }
        return (
            <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">AGME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Services" id="basic-nav-dropdown">
                                <NavDropdown.Item name="providers" onClick={this.props.handleSelectNavBar}>Providers</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        
                    </Navbar.Collapse>
                    {logoutButton()}      
                </Navbar>
        )
    }
}