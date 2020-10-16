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
@CrossOrigin(origins = "*")
public class AvailabilityController
{
    @Autowired
    private BookingService bookingService;
    @Autowired
    private AvailabilityService availabilityService;

    @Autowired
    ServiceTypeService serviceTypeService;
//    Returns the required data for the above post method

    @PostMapping("/availability")
    public ResponseEntity<?> getAvailableDaysPerService(@RequestBody AvailabilityRequest availabilityRequest){
<<<<<<< HEAD
        ServiceType service = serviceTypeService.loadServiceByName(availabilityRequest.getServiceName());
        List<Object> maps = new ArrayList<>();

        for (Company next: service.getCompany()) {
            for (Employee employee : next.getEmployees()) {
                HashMap<String, Object> map = new HashMap<>();
                map.put("name", employee.getName());
                map.put("username", employee.getUsername());
                map.put("availability", availabilityService.getAvailabilityForService(employee.getUsername(), availabilityRequest.getDate(), Integer.parseInt(availabilityRequest.getDuration())));
                maps.add(map);
            }
=======
        try{
            List<Object> availability = serviceTypeService.getServiceAvailability(availabilityRequest);
            return new ResponseEntity<>(availability, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Invalid Request", HttpStatus.BAD_REQUEST);
>>>>>>> development
        }
    }
}
