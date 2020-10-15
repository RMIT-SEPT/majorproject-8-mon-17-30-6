import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { mount, shallow } from "enzyme";
import AddExistingService from "./AddExistingService";
const adapter = new Adapter();
const agme_all_services = require('../../mock/data/agme_all_services.json');
const company_services = require('../../mock/data/company_services.json')
const company_available_services = require('../../mock/data/company_available_services.json')
configure({ adapter });
jest.mock('../../mock/operations/mock/functions/operations',()=>{
    return {
        apiCall: async ()=>{
            return {
                statusCode: 200,
                body:     {
                    "id": 1,
                    "name": "Plumbing",
                    "description": "Just another plumbing service"
                }
            }
        }
    }
});
jest.spyOn(window, 'alert').mockImplementation(() => {});

describe("Services", () => {

    beforeEach(()=>{
        localStorage.setItem('agme_all_services', JSON.stringify(agme_all_services));
        localStorage.setItem('company_services', JSON.stringify(company_services));
        localStorage.setItem('company_available_services', JSON.stringify(company_available_services));
    });

    it("1 - It should display available services within Agme that can be added to the company", () => {  
        const container = mount(<AddExistingService/>) 
        const select = container.find('select');
        expect(select.childAt(0).html()).toEqual("<option value=\"DEFAULT\" disabled=\"\" selected=\"\">Choose a service</option>");
        expect(select.childAt(1).html()).toEqual("<option value=\"Plumbing\">Plumbing</option>");
        expect(select.childAt(2).html()).toEqual("<option value=\"Electrical\">Electrical</option>");
        expect(select.childAt(3).html()).toEqual("<option value=\"App Building\">App Building</option>");
        expect(select.childAt(4).html()).toEqual("<option value=\"Soccer\">Soccer</option>");
        expect(select.childAt(5).html()).toEqual("<option value=\"Table Design\">Table Design</option>");
        expect(select.childAt(6).html()).toEqual("<option value=\"Insect removal\">Insect removal</option>");
        expect(select.childAt(7).html()).toEqual("<option value=\"CO2 Replacement\">CO2 Replacement</option>");
        expect(select.childAt(8).html()).toEqual("<option value=\"Coles Delivery\">Coles Delivery</option>");

    });


});

describe("Services", () => {
    let container;
    let select;
    beforeEach(()=>{
        localStorage.setItem('agme_all_services', JSON.stringify(agme_all_services));
        localStorage.setItem('company_services', JSON.stringify(company_services));
        localStorage.setItem('company_available_services', JSON.stringify(company_available_services));
        container = mount(<AddExistingService/>) ;
        select = container.find('select');
        select.simulate('change',{target: { value : 'Plumbing'}});
        container.setState({name: "Plumbing",serviceName: "Plumbing", isCallingServer:false})
        container.instance().addNewSubmit();

    });
    
    it("2 - It should localStorage with new data", () => {  
        const hasNewService =JSON.parse(localStorage.getItem('company_services')).filter(s=>{return s.name==="Plumbing"}).length>0
        expect(hasNewService).toEqual(true);
    });

    it("3 - It should component state with new data", () => {  
        const hasNewService =container.state().companyServices.filter(s=>{return s.name==="Plumbing"}).length>0
        expect(hasNewService).toEqual(true);
    });

});