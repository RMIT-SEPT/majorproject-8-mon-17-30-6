import React from 'react';
import AgmeServices from '../company/AgmeServices'
const {apiCall} = require('../../mock/operations/mock/functions/operations');
/***
 * Component for user to view available services. It might look dupplicate from the
 * AgmeServices component, but this is to be used when user is authenticated as 
 * USER, so we may need to add new features for next release, thus it makes sense
 * to separate components.
 * **/
export default class UserServices extends React.Component{
    constructor(props){
        super(props)
        this.state = {services: []}
        this._isMounted = false;
    }

    componentWillUnmount(){
        this._idMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        //check for localStorage before making this call
        const services = localStorage.getItem('user_services') ? JSON.parse(localStorage.getItem('user_services')) : [];
        if(services&&services.length){
            this.setState({
                services: services
            })
        }else{
            apiCall('user', 'getAllServices',null,'get').then(response=>{
                if(response.statusCode === 200){
                    this._idMounted &&this.setState({
                        services: response.body
                    })
                }
            })
        }

    }

    render(){
        return (
            <div>
                <h5>These are all services registed in AGME</h5>
                <AgmeServices/>
            </div>
        )
    }
}