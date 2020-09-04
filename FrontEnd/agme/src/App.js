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
        this.handleSelectNavBar = this.handleSelectNavBar.bind(this)

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
        const authDetails = getDecodedJwtFromLocalStorage()
        console.log(authDetails)
        const role = authDetails.role
        this.setState({
            token:authenticationDetails.jwt,
            authenticated:true,
            role: authDetails.role, 
            content:<LandingPage 
                authenticated={true} 
                handleAuthentication={this.handleAuthentication} 
                handleContentChangeRequest={this.handleContentChangeRequest}
                type={role}
                token={authenticationDetails.jwt}
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
            content:<LandingPage handleAuthentication={this.handleAuthentication} handleContentChangeRequest={this.handleContentChangeRequest}/>
        })
    }

    handleSelectNavBar(e){
        e.preventDefault()
        console.log(e.target.name)
        if(e.target.name === 'providers'){
            this.setState({
                content: <ViewProviders/>
            })
        }
    }
    render(){
        
        return (
            
            <div className="App">
                <CustomisedError>
                    <NavigationBar token={this.state.token} authenticated={this.state.authenticated} handleSelectNavBar={this.handleSelectNavBar}/>
                    {this.state.content}
                </CustomisedError>
            </div>
        );
    }
}

