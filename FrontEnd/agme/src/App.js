import React from 'react';
import './pages/css/App.css';
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Services from "./pages/services/Services";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getDecodedJwtFromLocalStorage}  from "./mock/operations/mock/functions/utils";//Add decode func
import ViewProviders from './pages/users/ViewProviders';
import NavigationBar from './pages/NavigationBar';
import CustomisedError from "./miscelaneous/CustomisedError";
const utils = require('./mock/operations/mock/functions/utils')
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
        this.handleContentChangeRequest = this.handleContentChangeRequest.bind(this)
        this.handleContentChangeRequestSignup = this.handleContentChangeRequestSignup.bind(this)


    }

    componentDidMount(){
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

    //To handle component change
    handleContentChangeRequest(e, isComponent){
        console.log(isComponent)
        try{
            e.preventDefault();
        }catch(error){
            console.log(error)
        }
        let component = "";
        //to let each navbar to change component rendered directly
        if(isComponent){
            console.log('component is true...')
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
                case "services":
                        component = <Services/>
                        break;
                case "login":
                    component = <Login handleContentChangeRequest={this.handleContentChangeRequest} handleContentChangeRequestSignup={this.handleContentChangeRequestSignup}/>
                    break;
                default:
                    console.log("no content available?");
            }  
        }

        this.setState({content:component})
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
            case "services":
                component = <Services handleContentChangeRequest={this.handleContentChangeRequest} handleAuthentication={this.handleAuthentication}/>
                break;
            default:
                console.log("no content available?");
        }  
        this.setState({content:component})
    }

    handleAuthentication(){
        //save to local storage to persist
        const credentials = localStorage.getItem('credentials');
        if(!credentials){return;}
        const authDetails = utils.decodeJwt(JSON.parse(credentials).jwt);
        authDetails.role = 'user';//remove this once backend is fixed
        console.log(authDetails)
        const role = authDetails.role
        this.setState({
            token:authDetails.jwt,
            authenticated:true,
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
        localStorage.removeItem("credentials");
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
