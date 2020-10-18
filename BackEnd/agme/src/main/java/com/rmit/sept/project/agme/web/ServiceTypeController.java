package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        try{
            return new ResponseEntity<>(serviceTypeService.getAllServices(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}