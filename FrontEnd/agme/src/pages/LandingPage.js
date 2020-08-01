import React from 'react';
import Login from "./Login";

export default class LandingPage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.authenticated){
            return (
                <div>
                    You are authenticated
                </div>
            )
        }else{
            return (
                <Login handleAuthentication={this.props.handleAuthentication}/>
            )
        }
    }
}