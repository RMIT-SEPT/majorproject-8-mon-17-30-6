package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {


//    Mockn beans and required beans
    @Autowired
    MockMvc mvc;

    @MockBean
    UserRepository userRepository;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    ServiceTypeService serviceTypeService;

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
    BookingController bookingController;

    @Test
    public void getBookings_shouldReturnHTTPStatus400_NoBookingIsFound() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/user/bookings"))
                .andExpect(status().isForbidden());
    }
    @Test
    public void getBookings_shouldReturnHTTPStatus400_userExistsButNotLoggedIn() throws Exception {
        Booking booking = new Booking();
        bookingService.addBooking(booking);
        mvc.perform(MockMvcRequestBuilders.get("/user/bookings"))
                .andExpect(status().isForbidden());
    }
    @Test
    public void getBookings_shouldReturnHTTPStatus403_userDoesNotExist() throws Exception {
        Booking booking = new Booking();
        User user = new User();
        userService.saveOrUpdateUser(user);
        bookingService.addBooking(booking);
        mvc.perform(MockMvcRequestBuilders.get("/user/bookings"))
                .andExpect(status().isForbidden());
    }

}
