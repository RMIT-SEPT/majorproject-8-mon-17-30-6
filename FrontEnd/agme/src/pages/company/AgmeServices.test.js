import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { mount, shallow } from "enzyme";
import AgmeServices from "./AgmeServices";
const adapter = new Adapter();
const services = require('../../mock/data/services.json')
configure({ adapter });
const component = mount(<AgmeServices/>)


describe("Services", () => {

  it("1 - It should display correct number of services services", () => {  
    localStorage.setItem('agme_all_services', JSON.stringify(services))  
    const container = mount(<AgmeServices/>) 
    const tbody = container.find('tbody');
    expect(tbody.find('tr')).toHaveLength(12);
  });


  it("2 - It should display correct name for all services", () => {  
    localStorage.setItem('agme_all_services', JSON.stringify(services))  
    const container = mount(<AgmeServices/>) 
    const tbody = container.find('tbody');
    const rows = tbody.find('tr')
    rows.forEach((row,i)=>{
      const columns = row.find('td');
      expect(columns.at(0).text()).toEqual(services[i].name); 
    })   
    
  });

  it("3 - It should display correct description for all services", () => {  
    localStorage.setItem('agme_all_services', JSON.stringify(services))  
    const container = mount(<AgmeServices/>) 
    const tbody = container.find('tbody');
    const rows = tbody.find('tr')
    rows.forEach((row,i)=>{
      const columns = row.find('td');
      expect(columns.at(1).text()).toEqual(services[i].description); 
    })   
  });

});