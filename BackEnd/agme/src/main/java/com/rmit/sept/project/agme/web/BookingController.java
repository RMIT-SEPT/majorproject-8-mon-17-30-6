package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    @Autowired
    BookingService bookingService;


    @PostMapping("/bookings")
    Booking newBooking(@RequestBody Booking booking) {
        return bookingService.addBooking(booking);
    }

    @GetMapping("/bookings")
    List<Booking> getBookings() {
        return bookingService.getAllBookings();
    }
    public BookingController(){

    }
}
