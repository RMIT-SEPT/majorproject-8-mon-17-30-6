package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.services.AvailabilityService;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class AvailabilityController
{
    @Autowired
    private BookingService bookingService;
    @Autowired
    private AvailabilityService availabilityService;

    @PostMapping("/availability")
    public ResponseEntity<?> getAvailableDays(@RequestBody AvailabilityRequest availabilityRequest){
        List<Integer> availablility = availabilityService.getAvailabilityForService(availabilityRequest.getEmployeeUsername(), availabilityRequest.getDate());
//        Return list of available times
        return new ResponseEntity<>(availablility, HttpStatus.OK);
    }

    @Autowired
    ServiceTypeService serviceTypeService;
//    Returns the required data for the above post method
    @GetMapping("/availability")
    public ResponseEntity<?> getAvailableDaysPerService(@RequestBody AvailabilityRequest availabilityRequest){
        ServiceType service = serviceTypeService.loadServiceByName(availabilityRequest.getServiceName());
        HashMap<String, Object> maps = new HashMap<>();

        for (Company next: service.getCompany())
        {
            for (Employee employee:next.getEmployees())
            {
                HashMap<String, Object> map = new HashMap<>();

                map.put("name", employee.getName());
                map.put("availability", availabilityService.getAvailabilityForService(employee.getUsername(), availabilityRequest.getDate()));
                maps.put(employee.getUsername(), map);
            }
        }

        return new ResponseEntity<>(maps, HttpStatus.OK);

    }
}
