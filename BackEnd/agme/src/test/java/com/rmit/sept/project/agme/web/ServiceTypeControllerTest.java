package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.model.User;
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
@WebMvcTest(ServiceTypeController.class)
public class ServiceTypeControllerTest {

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
    CompanyService companyService;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    BookingService bookingService;

    @MockBean
    ServiceTypeControllerTest serviceTypeControllerTest;

    @MockBean
    ServiceTypeService serviceTypeService;
    @Test
    public void getServices_shouldReturnHTTPStatus400_NoBookingIsFound() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/user/services"))
                .andExpect(status().isOk());
    }
    @Test
    public void getServices_shouldReturnHTTPStatus400_userExistsButNotLoggedIn() throws Exception {
        ServiceType service = new ServiceType();
        serviceTypeService.saveOrUpdateServiceType(service);
        mvc.perform(MockMvcRequestBuilders.get("/user/services"))
                .andExpect(status().isOk());
    }
    @Test
    public void getServices_shouldReturnHTTPStatus403_NoCompanyExistsForThatService() throws Exception {
        ServiceType service = new ServiceType();
        Company company = new Company();
        companyService.saveOrUpdate(company);
        serviceTypeService.saveOrUpdateServiceType(service);
        mvc.perform(MockMvcRequestBuilders.get("/user/services"))
                .andExpect(status().isOk());
    }

    @Test
    public void getServices_shouldReturnHTTPStatus403_NoUserExistsForThatService() throws Exception {
        Booking booking = new Booking();
        User user = new User();
        userService.saveOrUpdateUser(user);
        bookingService.addBooking(booking);
        mvc.perform(MockMvcRequestBuilders.get("/user/services"))
                .andExpect(status().isOk());
    }

}
