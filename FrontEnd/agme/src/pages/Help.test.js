import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { shallow } from "enzyme";
import Help from './Help'
const adapter = new Adapter();
configure({ adapter });
const component = shallow(<Help/>)


describe("<Help/>", () => {
    beforeEach(()=>{
        component.setState({
            name: "foo",
            email: "bar",
            serviceName: "baz",
            message: "Foo Bar Baz"
        });
        component.instance().handleReportRequest()
    })
  it("should display error unable to work", async () => {
      component.setState({
          name: "foo",
          email: "bar",
          serviceName: "baz",
          message: "Foo Bar Baz"
      });
      component.instance().handleReportRequest()
      jest.mock('../functions/operations',()=>{
          return {
              apiCall: async ()=>{
                  return {
                      statusCode: 400,
                      body: "Could not Submit Report"
                  }
              }
          }
      });
    expect(component.find('.form-container').find('.errorInfo').text()).toEqual("Could not Submit Report");
  });

    it("should display error unable to work 2", async () => {
        component.setState({
            name: "foofoo",
            email: "barbar",
            serviceName: "bazbaz",
            message: "Foo Bar Baz x2"
        });

        component.instance().handleReportRequest()
        jest.mock('../functions/operations',()=>{
            return {
                apiCall: async ()=>{
                    return {
                        statusCode: 200,
                        body: "Could not Submit Report"
                    }
                }
            }
        });
        expect(component.find('.form-container').find('.errorInfo').text()).toEqual("Invalid username and password");
    });

    it("should display a success response", async () => {
        component.setState({
            name: "foofoo",
            email: "barbar",
            serviceName: "bazbaz",
            message: "Foo Bar Baz x2"
        });

        component.instance().handleReportRequest()
        jest.mock('../functions/operations',()=>{
            return {
                apiCall: async ()=>{
                    return {
                        statusCode: 200,
                        body: "Report Submitted Successfully"
                    }
                }
            }
        });
        expect(component.find('.form-container').find('.errorInfo').text()).toEqual("Report Submitted Successfully");
    });

    it("should display a success response x2 ", async () => {
        component.setState({
            name: "a Real User",
            email: "barbar@real_user.net",
            serviceName: "Barber",
            message: "Foo Bar Baz x2 This is padding"
        });

        component.instance().handleReportRequest()
        jest.mock('../functions/operations',()=>{
            return {
                apiCall: async ()=>{
                    return {
                        statusCode: 200,
                        body: "Report Submitted Successfully"
                    }
                }
            }
        });
        expect(component.find('.form-container').find('.errorInfo').text()).toEqual("Report Submitted Successfully");
    });

});