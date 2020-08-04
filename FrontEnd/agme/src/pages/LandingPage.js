import React from 'react';
import Login from "./Login";
import Signup from "./Signup";

export default class LandingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content: <Login handleContentChangeRequest={this.props.handleContentChangeRequest} handleAuthentication={this.props.handleAuthentication}/>
        }
    }

    render(){
        if(this.props.authenticated){
            return (
                <div>
                    You are authenticated
                </div>
            )
        }else{
            return this.state.content;
        }
    }
}