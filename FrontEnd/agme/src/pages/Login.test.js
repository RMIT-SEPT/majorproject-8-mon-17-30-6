import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { shallow } from "enzyme";
import Login from './Login'
const adapter = new Adapter();
configure({ adapter });
const component = shallow(<Login/>)
jest.mock('../functions/operations',()=>{
    return {
        apiCall: async ()=>{
            return {
                statusCode: 400,
                body: "Invalid username and password"
            }
        }
    }
});

describe("<Login/>", () => {
    beforeEach(()=>{
        component.setState({
            username: "foo",
            password: "foo",
            role: "USER"
        });
        component.instance().handleAuthenticateRequest()
    })
  it("should display error when entering invalid username and password combination", async () => {  
    expect(component.find('.form-container').find('.errorInfo').text()).toEqual("Invalid username and password");
  });

});