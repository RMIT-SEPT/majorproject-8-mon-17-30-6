package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.Repositories.BookingRepository;
import com.rmit.sept.project.agme.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    private BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Get arraylist of all users
    public List<Booking> getAllBookings() {
        Iterable<Booking> it = bookingRepository.findAll();
        List<Booking> bookings = new ArrayList<>();

        it.forEach(bookings::add);

        return bookings;
    }

    public Booking addBooking(Booking booking) { return bookingRepository.save(booking); }

    public Long count() {return bookingRepository.count();}

}
