import React from 'react';
import './pages/css/App.css';
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getDecodedJwtFromLocalStorage}  from "./mock/operations/mock/functions/utils";//Add decode func
import ViewProviders from './pages/users/ViewProviders';
import NavigationBar from './pages/NavigationBar';
import CustomisedError from "./miscelaneous/CustomisedError";
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
        const authDetails = getDecodedJwtFromLocalStorage();
        if(authDetails){

            this.state = {
                authenticated: true,
                token:localStorage.getItem('credentials'),
                content: "",
                type: authDetails.role
            }
        }


        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSelectNavBar = this.handleSelectNavBar.bind(this)

    }

    componentDidMount(){
        this.setState({
            content:<LandingPage 
                authenticated={this.state&&this.state.authenticated} 
                handleAuthentication={this.handleAuthentication} 
                handleContentChangeRequest={this.handleSelectNavBar}
                type={this.state&&this.state.type}
                expiry={this.state&&this.state.expiry}
                />
            })

    }

    handleAuthentication(){
        const authDetails = getDecodedJwtFromLocalStorage();
        const role = authDetails.role
        this.setState({
            token:authDetails.jwt,
            authenticated:true,
            role: authDetails.role, 
            content:<LandingPage 
                authenticated={true} 
                handleAuthentication={this.handleAuthentication} 
                handleContentChangeRequest={this.handleSelectNavBar}
                type={role}
                token={authDetails.jwt}
                expiry={authDetails.expiry}
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
            content:<LandingPage handleAuthentication={this.handleAuthentication} handleContentChangeRequest={this.handleSelectNavBar}/>
        })
    }

    //To handle component change
    handleSelectNavBar(e){
        e.preventDefault();
        const contentString = (e.target&&e.target.getAttribute('name') || e);
        let component = "";
        switch(contentString){
            case "signup":
                component = <Signup handleAuthentication={this.handleAuthentication} handleContentChangeRequest={this.handleSelectNavBar}/>
                break;
            case "providers":
                component = <ViewProviders/>
                break;
            default:
                console.log("no content available?");
        }  
        this.setState({content :component})

    }
    render(){
        return (
            <div className="App">
                <CustomisedError>
                    <NavigationBar handleLogout={this.handleLogout} token={this.state&&this.state.token} handleSelectNavBar={this.handleSelectNavBar}/>
                    {this.state&&this.state.content}
                </CustomisedError>
            </div>
        );
    }
}

