package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.Repositories.BookingRepository;
import com.rmit.sept.project.agme.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Get arraylist of all users
    public List<Booking> findAll() {
        Iterable<Booking> it = bookingRepository.findAll();
        List<Booking> users = new ArrayList<>();

        it.forEach(e -> users.add(e));

        return users;
    }

    public Long count() {return bookingRepository.count();}

}
