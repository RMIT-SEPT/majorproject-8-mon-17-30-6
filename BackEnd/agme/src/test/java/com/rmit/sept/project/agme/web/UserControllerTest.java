package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Role;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;
import net.minidev.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashMap;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@AutoConfigureMockMvc(addFilters = false)
@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {
    @TestConfiguration
    static class UserServiceTestConfiguration {

        @Bean
        public UserService userService() {
            return new UserService();
        }
    }
    @Autowired
    MockMvc mvc;

    @MockBean
    UserRepository userRepository;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    LoginSignupService loginSignupService;

    @Autowired
    UserService userService;


    @MockBean
    CompanyService companyService;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    BookingService bookingService;

    @Test
    public void getBookings_shouldReturnHTTPStatus400_NoBookingIsFound() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/bookings"))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void getBookings_shouldReturnHTTPStatus400_userExistsButNotLoggedIn() throws Exception {
        Booking booking = new Booking();
        bookingService.addBooking(booking);
        mvc.perform(MockMvcRequestBuilders.get("/bookings"))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void getBookings_shouldReturnHTTPStatus403_userDoesNotExist() throws Exception {
        Booking booking = new Booking();
        User user = new User();
        userService.saveOrUpdateUser(user);
        bookingService.addBooking(booking);
        mvc.perform(MockMvcRequestBuilders.get("/bookings"))
                .andExpect(status().isBadRequest());
    }
}
