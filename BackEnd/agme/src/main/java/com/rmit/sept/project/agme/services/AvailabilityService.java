package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.ServiceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AvailabilityService {
@Autowired
    BookingService bookingService;
    public List<Integer> getAvailabilityForService(String employee, Date date){
// Retrieve all bookings
        List<Booking> bookings = bookingService.getAllBookings();
        List<Integer> availablility = new ArrayList<Integer>();
//        All employees have a default availability
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
//        Loop through each booking and remove the booked times from the availability list
        for (Booking next:bookings){
            if (next.getStartDateTime().getDay() == date.getDay() && next.getEmployee().getUsername().equals(employee)){
                time = next.getStartDateTime().getHours();
                int x = 0;
                for (Integer curr: availablility){
                    if (curr == time){
                        break;
                    }
                    x++;
                }
                for (int i = 0; i < next.getDuration();i++)
                {
                    availablility.remove(x);
                }

            }
        }
        return availablility;
//        Return list of available times
    }
}
