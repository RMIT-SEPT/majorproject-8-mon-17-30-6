import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { mount } from "enzyme";
import App from "./App";
import Signup from './pages/Signup';
import sinon from 'sinon';
const adapter = new Adapter();
configure({ adapter });
const handleClickStub = sinon.spy();
describe("App", () => {
  let component;

  beforeEach(() => {
    component = mount(<App handleClick={handleClickStub}/>);
  });

  it("1 - It should show a login box telling the user is not authenticated", () => {
    //get the content from the App component - simply the LandingPage
    const landingPage = mount(component.state().content); 
    //Get the content from LandingPage - should be login page when starting
    const loginPage = mount(landingPage.state().content); 
    const title = loginPage.find(".login").find(".title").text();
    expect(title).toEqual("You are not authenticated");
  });


  it("2 - It should allow an unregistered user to click on sign up", () => {
    //simulate click om signup component
    component.find(".signup_info").last().simulate('click');
    //The App content should match with Signup
    expect(mount(component.state().content).containsMatchingElement(<Signup />)).toEqual(true);
  });

});