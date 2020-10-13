import React from 'react';
import {getDecodedJwtFromLocalStorage}  from "../../mock/operations/mock/functions/utils";//Add decode func
import './services.css'
import Spinner from 'react-bootstrap/Spinner';
import AgmeServices from './AgmeServices';

const {apiCall} = require('../../mock/operations/mock/functions/operations');
//To view list of services
export class CompanyServices extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <h4>My services</h4>
                <AgmeServices filterByUsername={true}/>
            </div>
        )
    }
}
