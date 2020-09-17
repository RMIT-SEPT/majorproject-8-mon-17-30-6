package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class BookingController {

    @Autowired
    UserService userService;

    @Autowired
    EmployeeService employeeService ;
    @Autowired
    CompanyService companyService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    ServiceTypeService serviceTypeService;

    final BookingService bookingService;
    public BookingController(BookingService bookingService){

        this.bookingService = bookingService;
    }

//    Creates a new booking for a user based on the jwt token
    @PostMapping("/new-booking")
    Booking newBooking(@RequestBody BookingRequest booking, @RequestHeader("Authorisation") String authorisationHeader) {
//        Gets usrename from the jwt token
        String username = "";
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
//        Instantiates a user, service, employee and company for the bookings.
        User user = (User)userService.loadUserByUsername(username);
        Employee employee = employeeService.loadUserByUsername(booking.getEmployeeUsername());
        Company company = companyService.loadUserByUsername(booking.getCompanyUsername());
        ServiceType serviceType = serviceTypeService.loadServiceByName(booking.getServiceType());
//      Creates a new booking
        Booking newBooking = new Booking(booking.getDate(), booking.getDuration(), employee, company, user, booking.getHour(), serviceType);
//        Returns the booking
        return bookingService.addBooking(newBooking);
    }


    @GetMapping("/bookings/find")
    Booking getBookingById(Long id) { return bookingService.getBookingById(id); }

    @GetMapping("/bookings/getbycompany")
    List<Booking> getBookingsByCompany(Company company) { return bookingService.getBookingsByCompany(company); }

    @GetMapping("/bookings/getbyemployee")
    List <Booking> getBookingsByEmployee(Employee employee) { return  bookingService.getBookingsByEmployee(employee); }
}
