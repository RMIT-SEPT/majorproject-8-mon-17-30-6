package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class ServiceTypeController {
    @Autowired
    private ServiceTypeService serviceTypeService;

    public ServiceTypeController(ServiceTypeService serviceTypeService) {
        this.serviceTypeService = serviceTypeService;
    }

//    Return available services for a user
//    @PostMapping("/services")
//    public ResponseEntity<ServiceType> createServiceType(@RequestBody ServiceType serviceType){
//        ServiceType response = serviceTypeService.saveOrUpdateServiceType(serviceType);
//        return new ResponseEntity<ServiceType>(response, HttpStatus.CREATED);
//    }

    //    Return available services for a user
    @GetMapping("/services")
    ResponseEntity<?> getServices() {
        if (serviceTypeService.getAllServices().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        } else {
            return new ResponseEntity<>(serviceTypeService.getAllServices(), HttpStatus.OK);
        }
    }

}