import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { mount, shallow } from "enzyme";
import AgmeServices from "./AgmeServices";
const adapter = new Adapter();
const services = require('./mock/services.json')
configure({ adapter });
const component = shallow(<AgmeServices services={services}/>)
/***
* Example: Providing services.json as data, then component should render
* 
* <div>
*    <div className="card">
*        <div className="_0">
*            <div className="header">
*                <p>GYM</p>
*            </div>
*            <div className="container">
*                <p>
*                    A gym is a club, building, or large room, usually containing special equipment, where people go to do physical exercise and get fit.
*                </p>
*            </div>
*        </div>
*    </div>
*    ... repeat for all services...
* </div>
* ***/

describe("Services", () => {

  it("It should display description for all services", () => {     
    
    expect(component.find('div').find('h5').text()).toEqual("These are all services registered in AGME") 
  });


  it("It should display description for all services", () => {     
    services.forEach((service,i)=>{
        expect(component.find('.card').find('._'+i).find('.container').find('p').text()).toEqual(service.description)
    })  
  });

  it("It should display name for all services", () => {  
    const component = shallow(<AgmeServices services={services}/>)
    services.forEach((service,i)=>{
        expect(component.find('.card').find('._'+i).find('.header').find('p').text()).toEqual(service.name)
    }) 
  });

});