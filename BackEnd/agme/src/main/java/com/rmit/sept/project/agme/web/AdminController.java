package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.services.AdminService;
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
    AdminService adminService;
    @Autowired
    CompanyService companyService;
    @PostMapping("/close-company")
    public ResponseEntity<?> closeCompanies(@RequestBody AuthenticationRequest company){
        adminService.setInactive(company.getUsername());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/close-company")
    public ResponseEntity<?> getCompanies(){
        return new ResponseEntity<>(adminService.getActiveCompanies(), HttpStatus.OK);
    }

}
