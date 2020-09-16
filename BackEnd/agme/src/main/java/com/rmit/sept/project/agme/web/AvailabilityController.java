package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.AvailabilityRequest;
import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class AvailabilityController
{
    @Autowired
    BookingService bookingService;

    @RequestMapping("/availability")
    @PostMapping
    public ResponseEntity<?> getAvailableDays(@RequestBody AvailabilityRequest availabilityRequest){
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
            if (next.getStartDateTime() == availabilityRequest.getDate() && next.getCompany().getUsername().equals(availabilityRequest.getCompanyUsername())
                    && next.getEmployee().getUsername().equals(availabilityRequest.getWorkerUsername())){
                time = next.getStartDateTime().getHours();
                for (int i = 0; i < next.getDuration();i++){
                    availablility.remove(time);
                    time++;
                }
            }
        }
        return new ResponseEntity<>(availablility, HttpStatus.OK);


    }
}
