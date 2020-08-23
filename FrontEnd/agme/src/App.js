import React from 'react';
import './pages/css/App.css';
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import { GrLogout } from "react-icons/gr";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../node_modules/react-bootstrap/Navbar";
import Nav from "../node_modules/react-bootstrap/Nav";
import NavDropdown from "../node_modules/react-bootstrap/NavDropdown";
import Form from "../node_modules/react-bootstrap/Form";
import FormControl from "../node_modules/react-bootstrap/FormControl";
import Button from "../node_modules/react-bootstrap/Button";

/**
 * Basic Flow
 * 
 * 1. If User has an active token stored (has been authenticated), show relevant content
 *  The token will tell what type of content to show
 *  - Administrators
 *  - Providers
 *  - Basic users
 * 
 * **/
export default class App extends React.Component{

    constructor(props){
        super(props);



        //check local storage if user is authenticated
        let authenticated = false;
        let token = null;
        let content = "";
        let expiry = null;
        let type = null;
        const credentials = localStorage.getItem('credentials')&&(JSON.parse(localStorage.getItem('credentials')))
        if(credentials){
            expiry = credentials.expiry;
            if(new Date(expiry)>new Date()){
                authenticated = true;
                token = credentials.token;
                type = credentials.type;
            }
        }

        this.state = {
            authenticated: authenticated,
            token:token,
            content: content,
            type: type
        }
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleContentChangeRequest = this.handleContentChangeRequest.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }

    componentDidMount(){
        this.setState({
            content:<LandingPage 
                authenticated={this.state.authenticated} 
                handleAuthentication={this.handleAuthentication} 
                handleContentChangeRequest={this.handleContentChangeRequest}
                type={this.state.type}
                expiry={this.state.expiry}
                />
            })

    }

    handleContentChangeRequest(e){
        const content = e.target.getAttribute('name');
        switch(content){
            case "signup":
                this.setState({content :<Signup handleAuthentication={this.handleAuthentication} handleContentChangeRequest={this.handleContentChangeRequest}/>})
            break;
            default:
                console.log("default")
        }
    }

    handleAuthentication(authenticationDetails){

        //save to local storage to persist
        localStorage.setItem('credentials',JSON.stringify(authenticationDetails))
        this.setState({
            token:authenticationDetails.token,
            authenticated:true,
            type: authenticationDetails.type,
            expiry: authenticationDetails.expiry,
            content: <LandingPage 
                authenticated={true} 
                handleAuthentication={this.handleAuthentication} 
                handleContentChangeRequest={this.handleContentChangeRequest}
                type={authenticationDetails.type}
                expiry={authenticationDetails.expiry}
            />
        })
    }

    handleLogout(e){
        e.preventDefault();
        //clear localStorage
        localStorage.removeItem("credentials");
        this.setState({
            token:null,
            authenticated:false,
            expiry: null,
            content:<LandingPage handleAuthentication={this.handleAuthentication} handleContentChangeRequest={this.handleContentChangeRequest}/>
        })
    }
    render(){

        const logoutButton = ()=>{
            if(this.state.authenticated){
                return <GrLogout className="logout" onClick={this.handleLogout}/>
            }
        }
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
                            {logoutButton()}      
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                {this.state.content}
            </div>
        );
    }
}

