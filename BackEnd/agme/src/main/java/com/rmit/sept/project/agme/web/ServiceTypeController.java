package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class ServiceTypeController {
    @Autowired
    private ServiceTypeService serviceTypeService;

    @PostMapping("/services")
    public ResponseEntity<ServiceType> createServiceType(@RequestBody ServiceType serviceType){
        ServiceType response = serviceTypeService.saveOrUpdateServiceType(serviceType);
        return new ResponseEntity<ServiceType>(response, HttpStatus.CREATED);
    }

}