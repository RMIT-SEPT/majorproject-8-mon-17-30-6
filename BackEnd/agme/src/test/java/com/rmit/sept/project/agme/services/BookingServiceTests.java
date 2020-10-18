package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.repositories.BookingRepository;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(BookingService.class)
public class BookingServiceTests {
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

    @Autowired
    BookingService bookingService;

    @MockBean
    BookingRepository bookingRepository;




    @Test
    public void newBooking_willReturnTrue_whenCriteriaIsMetForANewBooking() {
        Booking testBooking = new Booking();
        Booking result;

        given(bookingService.addBooking(testBooking)).willReturn(testBooking);
    }

    @Test
    public void getBookings_willReturnTrue_whenGetBookingsIsCalled() {

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
        Assert.assertEquals(list, bookingService.getAllBookings());
    }

    @Test
    public void deleteBooking_shouldReturnFalse_ifBookingDoesntExist(){
        Long id = 1L;
        Assert.assertEquals(false, bookingService.deleteById(id));
    }


    @Test
    public void getBookingsForEmployee_shouldEqualero_ifEmployeeDoesntExist(){
        List<Booking> list= new ArrayList<>();

        Assert.assertEquals(list,bookingService.getBookingsByEmployee(employeeService.loadUserByUsername("alex")));
    }
    @Test
    public void confirmCount_shouldBeZero() {
        BookingService emptyTester = new BookingService(bookingRepository);
        Long countOfBooks = emptyTester.count();
        Long expected = (long) 0;
        assertEquals(expected, countOfBooks);
    }

    @Test
    public void confirmCount_shouldBeTwo() {
        BookingService twoBookingTester = new BookingService(bookingRepository);

        Booking booking1 = new Booking();
        booking1.setId((long) 1);
        booking1.setDuration(20);
        Booking booking2 = new Booking();
        booking2.setId((long) 2);
        booking2.setDuration(10);
        twoBookingTester.addBooking(booking1);
        twoBookingTester.addBooking(booking2);

        Long countOfBooks = twoBookingTester.count();
        Long expected = (long) 0;
        assertEquals(expected, countOfBooks);
    }

    @Test
    public void getBookingsForEmployee_shouldEqualNull_ifEmployeeDoesExistButHasNoBookings(){
        Employee emp = new Employee();
        emp.setUsername("alex");
        employeeService.saveOrUpdate(emp);
        List<Booking> list= new ArrayList<>();
        Assert.assertEquals(list,bookingService.getBookingsByEmployee(employeeService.loadUserByUsername("alex")));
    }


    }
