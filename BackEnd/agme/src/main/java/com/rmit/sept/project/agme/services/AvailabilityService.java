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
        int startingTime = 9;
        int hoursWorked = 9;
        for (int i = startingTime; i < startingTime + hoursWorked; i++) {
        	availablility.add(i);
        }
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

    public List<Integer> getAvailabilityForService(String employee, Date date, int duration){
// Retrieve all bookings
        List<Booking> bookings = bookingService.getAllBookings();
        List<Integer> availablility = new ArrayList<Integer>();
//        All employees have a default availability
        int startingTime = 9;
        int hoursWorked = 9;
        for (int i = startingTime; i < startingTime + hoursWorked; i++) {
        	availablility.add(i);
        }
        int time;
        boolean there = false;
//        Loop through each booking and remove the booked times from the availability list
        for (Booking next:bookings){
            if (next.getStartDateTime().getDay() == date.getDay() && next.getEmployee().getUsername().equals(employee)){
                time = next.getStartDateTime().getHours();
                int x = 0;
                for (Integer curr: availablility){
                    if (curr == time){
                        there = true;
                        break;
                    }
                    x++;
                }
                if (there) {
                    for (int i = 0; i < next.getDuration(); i++) {
                        availablility.remove(x);
                    }
                }

            }
        }
        int previous = 0;
        int[] a = new int[availablility.size()];

        for (Integer next:availablility){
            a[previous] = next;
            previous++;
        }
        availablility.clear();
        for (int i = 0; i<a.length;i++){
            if (i+duration < a.length){
                if (a[i+duration] - a[i] == duration || duration == 1){
                    availablility.add(a[i]);
                }
            }
        }
        return availablility;
//        Return list of available times
    }
}
