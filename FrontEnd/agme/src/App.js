import React from 'react';
import './App.css';
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../node_modules/react-bootstrap/Navbar";
import Nav from "../node_modules/react-bootstrap/Nav";
import NavDropdown from "../node_modules/react-bootstrap/NavDropdown";
import Form from "../node_modules/react-bootstrap/Form";
import FormControl from "../node_modules/react-bootstrap/FormControl";
import Button from "../node_modules/react-bootstrap/Button";

export default class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            token:null,
            content: ""
        }
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleContentChangeRequest = this.handleContentChangeRequest.bind(this);

    }

    componentDidMount(){
        this.setState({content:<LandingPage handleAuthentication={this.handleAuthentication} handleContentChangeRequest={this.handleContentChangeRequest}/>})
    }

    handleContentChangeRequest(e){
        const content = e.target.getAttribute('name');
        switch(content){
            case "signup":
                this.setState({content:<Signup handleAuthentication={this.handleAuthentication} handleContentChangeRequest={this.handleContentChangeRequest}/>})
            break;
            default:
                console.log("default")
        }
    }

    handleAuthentication(token){
        this.setState({
            token:token,
            authenticated:true
        })
    }
    render(){
        return (
            <div className="App">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">AGME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search provider" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                {this.state.content}
            </div>
        );
    }
}

