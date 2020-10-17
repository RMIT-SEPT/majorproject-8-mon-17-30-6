package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.CompanyService;
import com.rmit.sept.project.agme.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
//
//    inject User service
    @Autowired
    private final BookingService bookingService;

    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private final ServiceTypeService serviceTypeService;

    public UserController(BookingService bookingService, ServiceTypeService serviceTypeService, JwtUtil jwtUtil) {
        this.serviceTypeService = serviceTypeService;
        this.bookingService = bookingService;
        this.jwtUtil = jwtUtil;
    }

    //  Gets all bookings for logged in user
    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(@RequestHeader("Authorisation") String authorisationHeader){
        try{
            String username = jwtUtil.extractUsername(authorisationHeader);
            List<Booking> bookings = bookingService.getAllBookings(username);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Invalid request", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/upcoming-bookings")
    public ResponseEntity<?> getUpcomingBookings(@RequestHeader("Authorisation") String authorisationHeader){
        try{
            String username = jwtUtil.extractUsername(authorisationHeader);
            return new ResponseEntity<>(bookingService.getUserUpcomingBookings(username), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Invalid request", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/allservices")
        //returns all services
    ResponseEntity<?> getAllServices(@RequestHeader("Authorisation") String authorisationHeader) {
        try{
            return new ResponseEntity<>(serviceTypeService.getAllServices(),HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
        try{
            bookingService.deleteById(bookingId);
            return new ResponseEntity<>("resource deleted successfully", HttpStatus.valueOf(200));
        }catch(Exception e){
            return new ResponseEntity<>("resource not found", HttpStatus.valueOf(404));
        }

    }

    @PutMapping("/bookings")
    public ResponseEntity<?> rescheduleBooking(@RequestBody Long bookingId, Date newTime) {
        try {
            Booking tempBooking = bookingService.getBookingById(bookingId);
            if (tempBooking.getStartDateTime() == null)
            {
                return new ResponseEntity<>("no existing time", HttpStatus.valueOf(204));
            }
            tempBooking.setStartDateTime(newTime);
            return new ResponseEntity<>("booking successfully moved", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("resource not found", HttpStatus.valueOf(404));
        }
    }
}
