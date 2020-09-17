package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class UserController {
//
//    inject User service

    private final BookingService bookingService;

    private final JwtUtil jwtUtil;

    public UserController(BookingService bookingService, JwtUtil jwtUtil) {
        this.bookingService = bookingService;
        this.jwtUtil = jwtUtil;
    }

    //  Gets all bookings for logged in user
    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(@RequestHeader("Authorisation") String authorisationHeader){
        String username = "";
//        Gets username from the jwt token
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
