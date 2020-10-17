package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Booking;
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
        List<Integer> availability = new ArrayList<>();
//        All employees have a default availability
        int startingTime = 9;
        int hoursWorked = 9;
        for (int i = startingTime; i < startingTime + hoursWorked; i++) {
        	availability.add(i);
        }
        int time;
//        Loop through each booking and remove the booked times from the availability list
        for (Booking next:bookings){
            if (next.getStartDateTime().getDay() == date.getDay() && next.getEmployee().getUsername().equals(employee)){
                time = next.getStartDateTime().getHours(); // getDay() and getHours() are deprecated
                int x = 0;
                for (Integer curr: availability){
                    if (curr == time){
                        break;
                    }
                    x++;
                }
                for (int i = 0; i < next.getDuration();i++)
                {
                    availability.remove(x);
                }

            }
        }
        return availability;
//        Return list of available times
    }    public List<Integer> getAvailabilityForService(String employee, Date date, int duration){
// Retrieve all bookings
        List<Booking> bookings = bookingService.getAllBookings();
        List<Integer> availability = new ArrayList<>();
//        All employees have a default availability
        int startingTime = 9;
        int hoursWorked = 9;
        for (int i = startingTime; i < startingTime + hoursWorked; i++) {
        	availability.add(i);
        }
        int time;
        boolean there = false;
//        Loop through each booking and remove the booked times from the availability list
        for (Booking next:bookings){
            if (next.getStartDateTime().getDay() == date.getDay() && next.getEmployee().getUsername().equals(employee)){
                time = next.getStartDateTime().getHours();
                int x = 0;
                for (Integer curr: availability){
                    if (curr == time){
                        there = true;
                        break;
                    }
                    x++;
                }
                if (there) {
                    for (int i = 0; i < next.getDuration(); i++) {
                        availability.remove(x);
                    }
                }

            }
        }
        int previous = 0;
        int[] a = new int[availability.size()];

        for (Integer next:availability){
            a[previous] = next;
            previous++;
        }
        availability.clear();
        for (int i = 0; i<a.length;i++){
            if (i+duration < a.length){
                if (a[i+duration] - a[i] == duration || duration == 1){
                    availability.add(a[i]);
                }
            }
        }
        return availability;
//        Return list of available times
    }
}
