import React from 'react';
import './services.css'
import AgmeServices from './AgmeServices';

//To view list of services
export class CompanyServices extends React.Component{
    render(){
        return (
            <div>
                <h4>My services</h4>
                <AgmeServices filterByUsername={true}/>
            </div>
        )
    }
}
