import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { shallow } from "enzyme";
import Help from './Help'
const adapter = new Adapter();
configure({ adapter });
const component = shallow(<Help/>)
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

    expect(component.find('.form-container').find('.errorInfo').text()).toEqual("Could not Submit Report");
  });

});