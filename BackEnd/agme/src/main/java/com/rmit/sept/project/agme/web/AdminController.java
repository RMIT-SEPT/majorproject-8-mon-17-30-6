package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.AvailabilityRequest;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController
{
    @Autowired
    CompanyService companyService;
    @PostMapping("/close-company")
    public ResponseEntity<?> closeCompanies(@RequestBody String username){
        Company company = companyService.loadUserByUsername(username);
        company.setActive(false);
        companyService.saveOrUpdate(company);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/close-company")
    public ResponseEntity<?> getCompanies(@RequestBody String username){
        List<Company> companies = companyService.getAll();
        List<Company> companies2 = new ArrayList<>();
        for (Company next:companies){
            if (next.isActive()){
                companies2.add(next);
            }
        }
        return new ResponseEntity<>(companies2, HttpStatus.OK);
    }

}
