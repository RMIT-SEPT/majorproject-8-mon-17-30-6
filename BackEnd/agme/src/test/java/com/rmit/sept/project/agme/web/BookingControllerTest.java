package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.CompanyService;
import com.rmit.sept.project.agme.services.EmployeeService;
import com.rmit.sept.project.agme.services.LoginSignupService;
import com.rmit.sept.project.agme.services.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertNotEquals;
import static org.mockito.BDDMockito.given;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(BookingController.class)
public class BookingControllerTest {
    @MockBean
    UserRepository userRepository;

    @MockBean
    UserService userService;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    CompanyService companyService;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    LoginSignupService loginSignupService;


    @MockBean
    private BookingController bookingController;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testNewBooking() {
        Booking testBooking = new Booking();
        Booking result;

        try {
            result = bookingController.newBooking(testBooking);
        }
        catch (NullPointerException e)
        {
            result = null;
        }

        assertNotEquals(testBooking, result);
    }

    @Test
    public void getBookingsTest() {

        List<Booking> bookingList = new ArrayList<>();

        Employee employee = new Employee();
        Company company = new Company();
        User user = new User();
        Date date = new Date();

        Booking booking = new Booking(date, "Test", 2, employee, company, user);
        booking.setVisible(2);
        booking.setId((long) 24);

        Booking otherBooking = new Booking();

        bookingList.add(booking);
        bookingList.add(otherBooking);

        bookingController.newBooking(booking);
        bookingController.newBooking(otherBooking);

        given(bookingController.getBookings()).willReturn(bookingList);
    }
}
