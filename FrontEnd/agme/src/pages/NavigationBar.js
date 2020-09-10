import React from 'react';
import {getDecodedJwtFromLocalStorage}  from "../mock/operations/mock/functions/utils";//Add decode func
import ProviderNavigationBar from './providers/ProviderNavigationBar';
import UserNavigationBar from './users/UserNavigationBar';
import AdminNavigationBar from './administrators/AdminNavigationBar'
import VisitorNavigationBar from './visitors/VisitorNavigationBar'


/***
 * This class should handle the Navigation bar so that the appropriate menu's are displayed
 * ****/
export default class NavigationBar extends React.Component{

    render(){
        const decodedJwtPayload = getDecodedJwtFromLocalStorage();
        if(decodedJwtPayload&&(decodedJwtPayload.exp>decodedJwtPayload.iat)){
            if(decodedJwtPayload.role==='provider'){
                return (
                    <ProviderNavigationBar 
                        handleLogout={this.props.handleLogout} 
                        token={this.props&&this.props.token} 
                        handleSelectNavBar={this.props.handleSelectNavBar}
                        />
                )
            }else if(decodedJwtPayload.role==='user'){
                return (
                    <UserNavigationBar 
                        handleLogout={this.props.handleLogout} 
                        token={this.props&&this.props.token} 
                        handleSelectNavBar={this.props.handleSelectNavBar}
                    />
                )
            }else if(decodedJwtPayload.role==='administrator'){
                return (
                <AdminNavigationBar 
                    handleLogout={this.props.handleLogout} 
                    token={this.props&&this.props.token} 
                    handleSelectNavBar={this.props.handleSelectNavBar}    
                />
                )
            }else{
                /***
                 * Should never enter this block unless token was tampered
                 * ***/
                localStorage.remoteItem('credentials');
                throw new Error({
                    errorId: "INVALID_LOGIN",
                    message: "Your session has expired. Please refresh your browser."
                })
            }

        }else{
            //no user authenticated
            return (
                <VisitorNavigationBar handleSelectNavBar={this.props.handleSelectNavBar}/>
            )
        }


    }
}