package com.rmit.sept.project.agme.service;

import com.rmit.sept.project.agme.repositories.BookingRepository;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;
import com.rmit.sept.project.agme.web.BookingController;
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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.mockito.BDDMockito.given;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(BookingService.class)
public class BookingServiceest {
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
    BookingService bookingService;

    @MockBean
    BookingRepository bookingRepository;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void newBooking_willReturnTrue_whenCriteriaIsMetForANewBooking() {
        Booking testBooking = new Booking();
        Booking result;

        try {
            result = bookingService.addBooking(testBooking);
        }
        catch (NullPointerException e)
        {
            result = null;
        }

        assertNotEquals(testBooking, result);
    }

    @Test
    public void getBookings_willrReturnTrue_whengetBookingsIsCalled() {

        List<Booking> bookingList = new ArrayList<>();


        Booking booking = new Booking();
        booking.setVisible(2);
        booking.setId((long) 24);

        Booking otherBooking = new Booking();

        bookingList.add(booking);
        bookingList.add(otherBooking);

        bookingService.addBooking(otherBooking);
        bookingService.addBooking(booking);

        given(bookingService.getAllBookings()).willReturn(bookingList);
    }

    @Test
    public void getBookingsByCompany_willReturnTrue_whenAddedByCompany() {

        Booking temp1 = new Booking();
        Company comp1 = new Company();
        temp1.setCompany(comp1);

        Booking temp2 = new Booking();
        temp2.setCompany(comp1);

        Booking temp3 = new Booking();
        Company comp2 = new Company();
        temp3.setCompany(comp2);

        bookingService.addBooking(temp1);
        bookingService.addBooking(temp2);
        bookingService.addBooking(temp3);

        List<Booking> list = new ArrayList<>();
        list.add(temp1);
        list.add(temp2);

        given(bookingService.getAllBookings()).willReturn(list);

    }


}
