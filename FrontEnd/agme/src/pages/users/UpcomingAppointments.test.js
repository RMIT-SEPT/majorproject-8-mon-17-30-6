import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { mount, shallow } from "enzyme";
import UpcomingAppointments from "./UpcomingAppointments";
const adapter = new Adapter();
const user_bookings = require('../../mock/data/user_bookings.json')
configure({ adapter });



describe("Services", () => {

    beforeEach(()=>{
        localStorage.setItem('user_bookings', JSON.stringify(user_bookings));
    })
    it("1 - It should display correct number of appointments", () => {  
        const component = mount(<UpcomingAppointments/>)
        const tbody = component.find('tbody');
        expect(tbody.find('tr')).toHaveLength(13);
    });

    it("1 - It should display all relevant appointment information", () => {  
        const component = mount(<UpcomingAppointments/>)
        const tbody = component.find('tbody');
        const rows = tbody.find('tr')
        rows.forEach((row,i)=>{
            const columns = row.find('td');
            expect(columns.at(0).text()).toEqual(user_bookings[i].id.toString()); 
            expect(columns.at(1).text()).toEqual(user_bookings[i].startDateTime); 
            expect(columns.at(2).text()).toEqual(user_bookings[i].duration.toString()); 
            expect(columns.at(3).text()).toEqual(user_bookings[i].serviceType.name); 
            expect(columns.at(4).text()).toEqual(user_bookings[i].company.name); 
            expect(columns.at(5).text()).toEqual(user_bookings[i].company.phone); 
            expect(columns.at(6).text()).toEqual(user_bookings[i].employee.name); 
        })
    });

});