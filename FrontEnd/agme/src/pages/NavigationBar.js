import React from 'react';
import {getDecodedJwtFromLocalStorage}  from "../functions/utils";//Add decode func
import ProviderNavigationBar from './providers/ProviderNavigationBar';
import UserNavigationBar from './users/UserNavigationBar';
import AdminNavigationBar from './administrators/AdminNavigationBar'
import VisitorNavigationBar from './visitors/VisitorNavigationBar'
import CompanyNavigationBar from './company/CompanyNavigationBar';
import EmployeeNavigationBar from './employee/EmployeeNavigationBar';
import './css/navigationbar.css';
/***
 * This class should handle the Navigation bar so that the appropriate menu's are displayed
 * ****/
export default class NavigationBar extends React.Component{

    render(){
        const decodedJwtPayload = getDecodedJwtFromLocalStorage();
        const expired = decodedJwtPayload&&((decodedJwtPayload.exp - new Date().getTime()/1000)  < 0);
        if(decodedJwtPayload&&(!expired)){
            if(decodedJwtPayload.role.toUpperCase().includes('PROVIDER')){
                return (
                    <ProviderNavigationBar 
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
            }else if(decodedJwtPayload.role.toUpperCase().includes('COMPANY')){
                return (
                <CompanyNavigationBar 
                    handleLogout={this.props.handleLogout} 
                    token={this.props&&this.props.token} 
                    handleSelectNavBar={this.props.handleSelectNavBar}    
                />
                )
            }else if(decodedJwtPayload.role.toUpperCase().includes('EMPLOYEE')){
                return (
                <EmployeeNavigationBar 
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