package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.*;

import static com.rmit.sept.project.agme.model.Role.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class UserController {
//
//    inject User service
    @Autowired
    private UserService userService;

    @Autowired
    private LoginSignupService loginSignupService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private JwtUtil jwtUtil;
    //  Gets all bookings for logged in user
    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(@RequestHeader("Authorisation") String authorisationHeader){
        String username = "";
//        Gets username from the jwt topken
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        List<Booking> bookings = bookingService.getAllBookings();
        List<Booking> bookingsForUser = new ArrayList<>();
//        Loops through bookings and retrieve the one needed for the user
        for (Booking next:bookings){
            if (next.getUser().getUsername().equals(username)){
                next.getCompany().setEmployees(null);
                next.getServiceType().setCompany(null);
                bookingsForUser.add(next);
            }
        }
        if (bookingsForUser.size() == 0){
            return new ResponseEntity<>(bookingsForUser, HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity<>(bookingsForUser, HttpStatus.OK);
    }
}
