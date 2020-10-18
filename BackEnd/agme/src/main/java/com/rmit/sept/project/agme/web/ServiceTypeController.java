package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class ServiceTypeController {
    @Autowired
    private final ServiceTypeService serviceTypeService;

    public ServiceTypeController(ServiceTypeService serviceTypeService) {
        this.serviceTypeService = serviceTypeService;
    }

    @GetMapping("/services")
    ResponseEntity<?> getServices() {
        List<ServiceType> services = serviceTypeService.getAllServices();
        List<Object> map = new ArrayList<>();
        for (ServiceType next:services){
            HashMap<String, String> response = new HashMap<>();
            response.put("name", next.getName());
            response.put("description", next.getDescription());
            map.add(response);
        }
        try{

            return new ResponseEntity<>(map, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}