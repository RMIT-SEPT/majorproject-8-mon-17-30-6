package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.repositories.CompanyRepository;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@AutoConfigureMockMvc(addFilters = false)
@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(CompanyController.class)
public class CompanyControllerTests {
    @Autowired
    MockMvc mvc;

    @MockBean
    UserRepository userRepository;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    LoginSignupService loginSignupService;

    @MockBean
    UserService userService;

    @MockBean
    ServiceTypeService serviceTypeService;

    @MockBean
    CompanyService companyService;

    @MockBean
    CompanyRepository companyRepository;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    BookingService bookingService;
    @Test
    public void getBookings_shouldReturnHTTPStatus400_NoBookingIsFoundForCompany() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/company/bookings"))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void getBookings_shouldReturnHTTPStatus400_CompanyExistsButNotLoggedIn() throws Exception {
        Booking booking = new Booking();
        bookingService.addBooking(booking);
        mvc.perform(MockMvcRequestBuilders.get("/company/bookings"))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void getBookings_shouldReturnHTTPStatus403_userDoesNotExist() throws Exception {
        Booking booking = new Booking();
        Company company = new Company();
        companyService.saveOrUpdate(company);
        bookingService.addBooking(booking);
        mvc.perform(MockMvcRequestBuilders.get("/company/bookings"))
                .andExpect(status().isBadRequest());
    }
}
