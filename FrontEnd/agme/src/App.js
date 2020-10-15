import React from 'react';
import './pages/css/App.css';
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Help from "./pages/Help";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getDecodedJwtFromLocalStorage}  from "./mock/operations/mock/functions/utils";//Add decode func
import {getResources}  from "./mock/operations/mock/functions/operations";//Add decode func

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

    constructor(){
        super();
        const authDetails = getDecodedJwtFromLocalStorage();
        const expired = authDetails&&((authDetails.exp - new Date().getTime()/1000)  < 0);
        if(authDetails){

            this.state = {
                authenticated: !expired,
                token:((!expired)&&localStorage.getItem('credentials')) || null,
                content: "",
                type: authDetails.role
            }
        }

        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleContentChangeRequest = this.handleContentChangeRequest.bind(this)
        this.handleContentChangeRequestSignup = this.handleContentChangeRequestSignup.bind(this)


    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){
            this.setState({
                content:<LandingPage 
                    authenticated={this.state&&this.state.authenticated} 
                    handleAuthentication={this.handleAuthentication} 
                    handleContentChangeRequest={this.handleContentChangeRequest}
                    handleContentChangeRequestSignup={this.handleContentChangeRequestSignup}
                    type={this.state&&this.state.type}
                    expiry={this.state&&this.state.expiry}
                    />
                })
        }
    }

    //To handle component change
    handleContentChangeRequest(e, isComponent){
        try{
            e.preventDefault();
        }catch(error){}
        let component = "";

        //to let each navbar to change component rendered directly
        if(isComponent){
            component = e;
        }else{
            const contentString = e.target ? e.target.getAttribute('name') : e;
            switch(contentString){
                case "signup":
                    component = <Signup handleAuthentication={this.handleAuthentication} handleContentChangeRequest={this.handleContentChangeRequest} handleContentChangeRequestSignup={this.handleContentChangeRequestSignup}/>
                    break;
                case "providers":
                    component = <ViewProviders/>
                    break;
                case "login":
                    component = <Login handleContentChangeRequest={this.handleContentChangeRequest} handleContentChangeRequestSignup={this.handleContentChangeRequestSignup} handleAuthentication={this.handleAuthentication}/>
                    break;
                case "help":
                    component = <Help handleContentChangeRequest={this.handleContentChangeRequest} />
                    break;
                default:
                    console.log("no content available?");
            }  
        }
        this._isMounted&&this.setState({content:component})
    }
    handleContentChangeRequestSignup(componentName){
 
        const contentString = componentName;
        let component = "";
        switch(contentString){
            case "signup":
                component = <Signup handleContentChangeRequestSignup={this.handleContentChangeRequestSignup} handleContentChangeRequest={this.handleContentChangeRequest}/>
                break;
            case "providers":
                component = <ViewProviders/>
                break;
            case "login":
                component = <Login handleContentChangeRequest={this.handleContentChangeRequest} handleAuthentication={this.handleAuthentication}/>
                break;
            default:
                console.log("no content available?");
        }  
        this._isMounted&&this.setState({content:component})
    }

    handleAuthentication(){
        getResources();
        //save to local storage to persist
        const credentials = JSON.parse(localStorage.getItem('credentials'));
        const authDetails = getDecodedJwtFromLocalStorage();
        const expired = authDetails&&((authDetails.exp - new Date().getTime()/1000)  < 0);

        if((!credentials)||expired){return;}

        const role = authDetails.role
        this._isMounted&&this.setState({
            token:authDetails.jwt,
            authenticated: true,
            role: authDetails.role, 
            content:<LandingPage 
                authenticated={true} 
                handleAuthentication={this.handleAuthentication} 
                handleContentChangeRequest={this.handleContentChangeRequest}
                type={role}
                token={authDetails.jwt}
                expiry={authDetails.expiry}
                />
        })
    }

    handleLogout(e){
        e.preventDefault();
        //clear localStorage
        localStorage.clear();
        this.setState({
            token:null,
            authenticated:false,
            expiry: null,
            content:<LandingPage handleAuthentication={this.handleAuthentication} handleContentChangeRequest={this.handleContentChangeRequest}/>
        })
    }
    render(){
        return (
            <div className="App">
                <CustomisedError>
                    <NavigationBar handleLogout={this.handleLogout} token={this.state&&this.state.token} handleSelectNavBar={this.handleContentChangeRequest}/>
                    {this.state&&this.state.content}
                </CustomisedError>
            </div>
        );
    }
}
