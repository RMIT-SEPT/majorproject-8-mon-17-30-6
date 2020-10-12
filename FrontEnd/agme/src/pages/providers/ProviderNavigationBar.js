import React from 'react';
import Navbar from "../../../node_modules/react-bootstrap/Navbar";
import Nav from "../../../node_modules/react-bootstrap/Nav";
import NavDropdown from "../../../node_modules/react-bootstrap/NavDropdown";
import '../css/navigationbar.css'
import { IoIosLogOut } from "react-icons/io";
import { IconContext } from "react-icons";
import {getDecodedJwtFromLocalStorage}  from "../../mock/operations/mock/functions/utils";//Add decode func

/***
 * This class should handle the Navigation bar so that the appropriate menu's are displayed
 * ****/
export default class ProviderNavigationBar extends React.Component{

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
