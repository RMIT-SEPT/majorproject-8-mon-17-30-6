import React from 'react';
import { AiFillCar } from "react-icons/ai";
import '../../pages/css/providerCards.css';
export default class ProviderCard extends React.Component{
    render(){
        return (
            <table className="providerCard">
                <tbody>
                    <tr>
                        <td className="logo"><AiFillCar/></td>
                        <td className="providerDescription">
                            <h5>{this.props.data.name}</h5>
                            <p className="serviceDescription">Services provided: {this.props.data.services}</p>
                            <p>Click on the icon on the left to choose this</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        )
    }
}