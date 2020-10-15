package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class    BookingController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeService employeeService ;
    @Autowired
    private CompanyService companyService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ServiceTypeService serviceTypeService;

    @Autowired
    private BookingService bookingService;
    public BookingController(BookingService bookingService){

        this.bookingService = bookingService;
    }

//    Creates a new booking for a user based on the jwt token
    @PostMapping("/new-booking")
    public ResponseEntity<?> newBooking(@RequestBody BookingRequest booking, @RequestHeader("Authorisation") String authorisationHeader) {

        String username = jwtUtil.extractUsername(authorisationHeader);

//        Instantiates a user, service, employee and company for the bookings.
        User user = (User)userService.loadUserByUsername(username);
        Employee employee = employeeService.loadUserByUsername(booking.getEmployeeUsername());
        Company company = companyService.loadUserByUsername(employee.getCompanyUsername());
        ServiceType serviceType = serviceTypeService.loadServiceByName(booking.getServiceType());
//      Creates a new booking
        Booking newBooking = new Booking(booking.getDate(), booking.getDuration(), employee, company, user, serviceType);
//        Returns the booking
        return new ResponseEntity<>(bookingService.addBooking(newBooking), HttpStatus.OK);
    }


    @GetMapping("/bookings/find")
    Booking getBookingById(Long id) { return bookingService.getBookingById(id); }

    @GetMapping("/bookings/getbycompany")
    List<Booking> getBookingsByCompany(Company company) { return bookingService.getBookingsByCompany(company); }

    @GetMapping("/bookings/getbyemployee")
    List <Booking> getBookingsByEmployee(Employee employee) { return  bookingService.getBookingsByEmployee(employee); }
}
