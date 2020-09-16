package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@RestController
@RequestMapping("")
@CrossOrigin("http://localhost:3000")
public class AvailabilityController
{
    @Autowired
    BookingService bookingService;

    @GetMapping
    public void getAvailableDays(){
        List<Booking> bookings = bookingService.getAllBookings();
        Date today = new Date(2);
        List<Integer> availablility = new ArrayList<>();
        availablility.add(9);
        availablility.add(10);
        availablility.add(11);
        availablility.add(12);
        availablility.add(13);
        availablility.add(14);
        availablility.add(15);
        availablility.add(16);
        availablility.add(17);
        int time;
        for (Booking next:bookings){
            if (next.getStartDateTime() == today){
                time = next.getStartDateTime().getHours();
                for (int i = 0; i < next.getDuration();i++){
                    availablility.remove(time);
                    time++;
                }
            }
        }


    }
}
