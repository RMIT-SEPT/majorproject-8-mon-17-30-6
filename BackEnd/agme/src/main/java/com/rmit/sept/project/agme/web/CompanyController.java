package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/company")
@CrossOrigin("http://localhost:3000")
public class CompanyController
{
    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    CompanyService companyService;

    @Autowired
    BookingService bookingService;

    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(@RequestHeader("Authorisation") String authorisationHeader){
        String username = "";
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        List<Booking> bookings = bookingService.getAllBookings();
        List<Booking> bookingsForCompany = new ArrayList<>();
        for (Booking next:bookings) {
            if (next.getCompany() != null) {
                if (next.getCompany().getUsername().equals(username)) {
                    bookingsForCompany.add(next);
                }
            }
        }
        return new ResponseEntity<>(bookingsForCompany, HttpStatus.OK);
    }

}
