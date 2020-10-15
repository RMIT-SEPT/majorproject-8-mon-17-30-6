package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.rmit.sept.project.agme.model.Role.*;
@RestController
@RequestMapping("")
@CrossOrigin(origins = "*")
public class LoginSignupController {

    //    inject User service
    @Autowired
    private UserService userService;

    @Autowired
    private LoginSignupService loginSignupService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    AdminService adminService;
    @GetMapping("/signup")
    public ResponseEntity<?> getCompanies() {

        return new ResponseEntity<>(loginSignupService.getListOfActiveCompanies(), HttpStatus.OK);
    }
    //    signup authentication
    @PostMapping("/signup")
    public ResponseEntity<?> createdNewUser(@Valid @RequestBody SignUpRequest user, BindingResult result) {
        return loginSignupService.signup(user, result);
    }


    @Autowired
    JwtUtil jwtUtil;
    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationRequest(@RequestBody AuthenticationRequest authenticationRequest)
    {
        return loginSignupService.login(authenticationRequest);
    }
}
