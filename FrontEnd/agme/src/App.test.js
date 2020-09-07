import "jest-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { mount } from "enzyme";
import App from "./App";
const adapter = new Adapter();
configure({ adapter });

describe("App", () => {
  let component;

  beforeEach(() => {
    component = mount(<App />);
  });

  it("It should show a login box telling the user is not authenticated", () => {
    //get the content from the App component - simply the LandingPage
    const landingPage = mount(component.state().content); 

    //Get the content from LandingPage - should be login page when starting
    const loginPage = mount(landingPage.state().content); 
    const title = loginPage.find(".login").find(".title").text();
    expect(title).toEqual("You are not authenticated");
  });

});