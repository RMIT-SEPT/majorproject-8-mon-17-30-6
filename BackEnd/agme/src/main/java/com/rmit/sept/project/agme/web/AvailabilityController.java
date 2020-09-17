package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.AvailabilityRequest;
import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class AvailabilityController
{
    @Autowired
    private BookingService bookingService;

    @PostMapping("/availability")
    public ResponseEntity<?> getAvailableDays(@RequestBody AvailabilityRequest availabilityRequest){
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
            if (next.getStartDateTime().getDay() == availabilityRequest.getDate().getDay() && next.getCompany().getUsername().equals(availabilityRequest.getCompanyUsername())
                    && next.getEmployee().getUsername().equals(availabilityRequest.getEmployeeUsername())){
                time = next.getHour();
                int x = 0;
                for (Integer curr: availablility){
                    if (curr == next.getHour()){
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
//        Return list of available times
        return new ResponseEntity<>(availablility, HttpStatus.OK);
    }

    @Autowired
    ServiceTypeService serviceTypeService;
//    Returns the required data for the above post method
    @GetMapping("/availability")
    public ResponseEntity<?> getAvailableDays(){
        List<ServiceType> service = serviceTypeService.getAllServices();
        return new ResponseEntity<>(service, HttpStatus.OK);

    }
}
