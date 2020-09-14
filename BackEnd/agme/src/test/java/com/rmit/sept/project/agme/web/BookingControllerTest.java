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

import static org.junit.Assert.assertEquals;
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

        Booking booking = new Booking(date, "Test", 120, employee, company, user);
        booking.setVisible(2);
        booking.setId((long) 24);

        Booking otherBooking = new Booking();

        bookingList.add(booking);
        bookingList.add(otherBooking);

        bookingController.newBooking(booking);
        bookingController.newBooking(otherBooking);

        given(bookingController.getBookings()).willReturn(bookingList);
    }

    @Test
    public void getBookingByIdTest() {

        Long id = 1000L;
        Employee employee = new Employee();
        Company company = new Company();
        User user = new User();
        Date date = new Date();

        Booking temp = new Booking(date, "Test", 120, employee, company, user);
        temp.setId(id);

        bookingController.newBooking(temp);

        given(bookingController.getBookingById(id)).willReturn(temp);
    }

    @Test
    public void getBookingsByCompanyTest() {

        Booking temp1 = new Booking();
        Company comp1 = new Company();
        temp1.setCompany(comp1);

        Booking temp2 = new Booking();
        temp2.setCompany(comp1);

        Booking temp3 = new Booking();
        Company comp2 = new Company();
        temp3.setCompany(comp2);

        bookingController.newBooking(temp1);
        bookingController.newBooking(temp2);
        bookingController.newBooking(temp3);

        List<Booking> list = new ArrayList<>();
        list.add(temp1);
        list.add(temp2);

        given(bookingController.getBookingsByCompany(comp1)).willReturn(list);

    }

    @Test
    public void getBookingsByEmployeeTest() {

        Booking temp1 = new Booking();
        Employee emp1 = new Employee();
        temp1.setEmployee(emp1);

        Booking temp2 = new Booking();
        temp2.setEmployee(emp1);

        Booking temp3 = new Booking();
        Employee emp2 = new Employee();
        temp3.setEmployee(emp2);

        bookingController.newBooking(temp1);
        bookingController.newBooking(temp2);
        bookingController.newBooking(temp3);

        List<Booking> list = new ArrayList<>();
        list.add(temp1);
        list.add(temp2);

        given(bookingController.getBookingsByEmployee(emp1)).willReturn(list);

    }
}
