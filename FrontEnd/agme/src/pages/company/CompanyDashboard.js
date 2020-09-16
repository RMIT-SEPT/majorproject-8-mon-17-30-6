import React from 'react';
import Carousel from '../../miscelaneous/carousel/Carousel'
export default class CompanyDashboard extends React.Component{
    


    render(){

        const startDate = new Date();
        const end = new Date(startDate.getTime()+30*24*60*60*1000)
        return (
            <div>
                <Carousel/>
            </div>
        )
    }
}