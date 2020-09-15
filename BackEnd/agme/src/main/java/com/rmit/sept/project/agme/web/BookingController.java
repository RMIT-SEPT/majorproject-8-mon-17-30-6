package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.CompanyService;
import com.rmit.sept.project.agme.services.EmployeeService;
import com.rmit.sept.project.agme.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("")
public class BookingController {
    @Autowired
    BookingService bookingService;

    @Autowired
    CompanyService companyService;

    @Autowired
    UserService userService;

    @Autowired
    EmployeeService employeeService;

    @PostMapping("/booking")
    Booking newBooking(@RequestBody BookingRequest bookingRequest) {
        User user = (User)userService.loadUserByUsername(bookingRequest.getUserUsername());
        Company company = companyService.loadUserByUsername(bookingRequest.getCompanyUsername());
        Employee employee = employeeService.loadUserByUsername(bookingRequest.getEmployeeUsername());
        Booking booking = new Booking(new Date(), "asdasd", 32, employee, company, user);
        return bookingService.addBooking(booking);
    }

    @GetMapping("/booking")
    List<Booking> getBookings() {
        return bookingService.getAllBookings();
    }
    public BookingController(){

    }
}
