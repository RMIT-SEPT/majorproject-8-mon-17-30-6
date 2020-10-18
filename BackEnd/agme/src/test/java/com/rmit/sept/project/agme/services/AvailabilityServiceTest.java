package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Admin;
import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.repositories.AdminRepository;
import com.rmit.sept.project.agme.repositories.BookingRepository;
import com.rmit.sept.project.agme.services.AvailabilityService;
import com.rmit.sept.project.agme.security.JwtUtil;
import org.junit.Assert;
import org.junit.Assert.*;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.rmit.sept.project.agme.model.Role.ADMIN;

@RunWith(SpringRunner.class)
@WebMvcTest(AvailabilityService.class)
public class AvailabilityServiceTest
{
    @MockBean
    AdminRepository adminRepository;

    @MockBean
    AdminService adminService;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    UserService userService;

    @MockBean
    CompanyService companyService;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    LoginSignupService loginSignupService;

    @MockBean
    BookingService bookingService;

    @MockBean
    BookingRepository bookingRepository;

    @Autowired
    AvailabilityService availabilityService;

    @Test
    public void getAvailabilityForService_shouldReturnFullList_whenNoUserGiven() {
        Date date = new Date();
        List<Integer> noNameAvailable = availabilityService.getAvailabilityForService("",date);

        List<Integer> fullList = new ArrayList<>();

        for (int i = 9; i < 18; i++) {
            fullList.add(i);
        }

        Assert.assertEquals(fullList,noNameAvailable);
    }

    @Test
    public void getAvailabilityForService_shouldReturnTwoTakenSlots_whenDuration2BookingIsMade() {
        Date date = new Date();

        Employee employee = new Employee();
        employee.setName("test admin");
        employee.setUsername("alex");
        employee.setPhone("00");
        employee.setAddress("addy");
        employee.setConfirmPassword("password");
        employee.setName("name");
        employee.setRole(ADMIN);
        employee.setPassword("password");
        Long id = 1L;

        Booking booking = new Booking();

        booking.setEmployee(employee);
        booking.setDuration(2);
        booking.setId(id);
        booking.setStartDateTime(date);

        bookingService.addBooking(booking);

        List<Integer> takenList = availabilityService.getAvailabilityForService("alex",date);

        Assert.assertEquals(2,takenList.size());
    }

}
