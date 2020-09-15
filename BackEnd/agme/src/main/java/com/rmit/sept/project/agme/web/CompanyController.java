package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/git p")
public class CompanyController
{
    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    CompanyService companyService;

    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(@RequestHeader("Authorisation") String authorisationHeader){
        String username = "";
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        List<Booking> bookings = new ArrayList<>();
        List<Booking> bookingsForCompany = new ArrayList<>();
        for (Booking next:bookings){
            if (next.getCompany().getUsername().equals(username)){
                bookingsForCompany.add(next);
            }
        }
        return new ResponseEntity<>(bookingsForCompany, HttpStatus.OK);
    }

}
