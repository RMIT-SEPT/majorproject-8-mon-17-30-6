package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
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
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class ServiceTypeController {
    @Autowired
    private ServiceTypeService serviceTypeService;

    public ServiceTypeController(ServiceTypeService serviceTypeService) {
        this.serviceTypeService = serviceTypeService;
    }

<<<<<<< HEAD
//    Return available services for a user
//    @PostMapping("/services")
//    public ResponseEntity<ServiceType> createServiceType(@RequestBody ServiceType serviceType){
//        ServiceType response = serviceTypeService.saveOrUpdateServiceType(serviceType);
//        return new ResponseEntity<ServiceType>(response, HttpStatus.CREATED);
//    }

    //    Return available services for a user
    @GetMapping("/services")ResponseEntity<?> getServices() {
        if (serviceTypeService.getAllServices().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        } else {
            List<ServiceType> services = serviceTypeService.getAllServices();
            List<ServiceType> servicesWithWorkers = new ArrayList<>();
            for (ServiceType next: services) {
                List<Company> companies = next.getCompany();
                for(Company cp : companies){
                    List<Employee> employees = cp.getEmployees();
                    if(employees.size()>0){
                        servicesWithWorkers.add(next);
                    }
                }
            }
            return new ResponseEntity<>(servicesWithWorkers, HttpStatus.OK);
=======
    @GetMapping("/services")
    ResponseEntity<?> getServices() {
        try{
            return new ResponseEntity<>(serviceTypeService.getAllServices(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
>>>>>>> development
        }
    }

}