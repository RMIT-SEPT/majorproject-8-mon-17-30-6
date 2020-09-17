import React from 'react';
import {getDecodedJwtFromLocalStorage}  from "../mock/operations/mock/functions/utils";//Add decode func
import UserNavigationBar from './users/UserNavigationBar';
import AdminNavigationBar from './administrators/AdminNavigationBar'
import VisitorNavigationBar from './visitors/VisitorNavigationBar'
import CompanyNavigationBar from './company/CompanyNavigationBar'

/***
 * This class should handle the Navigation bar so that the appropriate menu's are displayed
 * ****/
export default class NavigationBar extends React.Component{

    render(){
        const decodedJwtPayload = getDecodedJwtFromLocalStorage();
        if(decodedJwtPayload&&(decodedJwtPayload.exp>decodedJwtPayload.iat)){
            if(decodedJwtPayload.role.toUpperCase().includes('COMPANY')){
                return (
                    <CompanyNavigationBar 
                        handleLogout={this.props.handleLogout} 
                        token={this.props&&this.props.token} 
                        handleSelectNavBar={this.props.handleSelectNavBar}    
                    />
                    )
            }else if(decodedJwtPayload.role.toUpperCase().includes('USER')){
                return (
                    <UserNavigationBar 
                        handleLogout={this.props.handleLogout} 
                        token={this.props&&this.props.token} 
                        handleSelectNavBar={this.props.handleSelectNavBar}
                    />
                )
            }else if(decodedJwtPayload.role.toUpperCase().includes('ADMIN')){
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
                localStorage.removeItem('credentials');
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