package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    final BookingService bookingService;
    public BookingController(BookingService bookingService){

        this.bookingService = bookingService;
    }

    @PostMapping("/bookings")
    Booking newBooking(@RequestBody Booking booking) {
        return bookingService.addBooking(booking);
    }

    @GetMapping("/bookings")
    List<Booking> getBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/bookings/find")
    Booking getBookingById(Long id) { return bookingService.getBookingById(id); }

    @GetMapping("/bookings/getbycompany")
    List<Booking> getBookingsByCompany(Company company) { return bookingService.getBookingsByCompany(company); }

    @GetMapping("/bookings/getbyemployee")
    List <Booking> getBookingsByEmployee(Employee employee) { return  bookingService.getBookingsByEmployee(employee); }
}
