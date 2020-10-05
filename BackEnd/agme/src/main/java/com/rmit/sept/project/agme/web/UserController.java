package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.CompanyService;
import com.rmit.sept.project.agme.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
//
//    inject User service
    @Autowired
    private BookingService bookingService;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private ServiceTypeService serviceTypeService;

    public UserController(BookingService bookingService, ServiceTypeService serviceTypeService, JwtUtil jwtUtil) {
        this.serviceTypeService = serviceTypeService;
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

    @GetMapping("/allservices")
        //returns all services
    ResponseEntity<?> getAllServices(@RequestHeader("Authorisation") String authorisationHeader) {
        String username = "";
        String role = "";
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        if (serviceTypeService.getAllServices().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        } else {
            return new ResponseEntity<>(serviceTypeService.getAllServices(),HttpStatus.OK);
        }
    }
    @GetMapping("/companies")
        //returns all services
    ResponseEntity<?> getAllCompanies() {
        companyService.getAll();
        if (companyService.getAll().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        } else {
            return new ResponseEntity<>(companyService.getAll(),HttpStatus.OK);
        }
    }

    //insecure but works
    @DeleteMapping("/bookings")
    public ResponseEntity<?> deleteBooking(@RequestHeader("Authorisation") String authorisationHeader, @RequestBody Long bookingId){
        String username = "";
//        Gets username from the jwt topken
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        try{
            bookingService.deleteById(bookingId);
            return new ResponseEntity<String>("resource deleted successfully", HttpStatus.valueOf(200));
        }catch(Exception e){
            return new ResponseEntity<String>("resource not found", HttpStatus.valueOf(404));
        }

    }
}
