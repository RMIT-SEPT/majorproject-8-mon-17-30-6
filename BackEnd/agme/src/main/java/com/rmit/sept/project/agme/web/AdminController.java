package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController
{
    @Autowired
    CompanyService companyService;
    @PostMapping("/close-company")
    public ResponseEntity<?> closeCompanies(@RequestBody AuthenticationRequest company){
        Company c = companyService.loadUserByUsername(company.getUsername());
        c.setActive(false);
        companyService.saveOrUpdate(c);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/close-company")
    public ResponseEntity<?> getCompanies(){
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
