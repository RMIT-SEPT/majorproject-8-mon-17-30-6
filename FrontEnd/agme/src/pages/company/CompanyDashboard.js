import React from 'react';
import Carousel from '../../miscelaneous/carousel/Carousel';

const employees = [
    {
        "id": "001",
        "name": "Monalisa",
        "serviceTypes": ["HAIRDRESSER", "GYM"],
        "appointments": [
            {
                "date": "2020-09-22",
                "times": [8,9],
                "serviceType": "HAIRDRESSER",
                "customer":{
                    "name": "Marlene"
                }
            },
            {
                "date": "2020-09-22",
                "times": [10],
                "serviceType": "GYM",
                "customer":{
                    "name": "Jack"
                }
            }
        ]
    },
    {
        "id": "002",
        "name": "Josh",
        "serviceTypes": ["DENTIST"],
        "appointments": [
            {
                "date": "2020-09-22",
                "times": [8,9],
                "serviceType": "DENTIST",
                "customer":{
                    "name": "Francine"
                }
            },
            {
                "date": "2020-09-22",
                "times": [11],
                "serviceType": "DENTIST",
                "customer":{
                    "name": "Douglas"
                }
            }
        ]
    }
]

export default class CompanyDashboard extends React.Component{
    
    constructor(props){
        super(props);
        this.state ={
            selectedEmployeeId: "",
            selectedService: ""
        }

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(e){
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    render(){

        const startDate = new Date();
        const end = new Date(startDate.getTime()+30*24*60*60*1000)
        return (
            <div>
                <Carousel handleFilter={this.handleFilter} employees={employees} selectedService={this.state.selectedService} selectedEmployeeId={this.state.selectedEmployeeId}/>
            </div>
        )
    }
}