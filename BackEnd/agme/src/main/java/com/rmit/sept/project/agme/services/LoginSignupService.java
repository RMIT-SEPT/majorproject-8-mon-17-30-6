package com.rmit.sept.project.agme.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class LoginSignupService {
    @Autowired
    UserService userService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    CompanyService companyService;

    @Autowired
    AdminService adminService;
    public UserDetails loadUserByUsername(String username){
        UserDetails user = null;
        if (userService.loadUserByUsername(username) != null){
            user = userService.loadUserByUsername(username);
        }else if (employeeService.loadUserByUsername(username) != null){
            user = employeeService.loadUserByUsername(username);
        }else if (companyService.loadUserByUsername(username) != null){
            user = companyService.loadUserByUsername(username);
        }else if (companyService.loadUserByUsername(username) != null){
            user = companyService.loadUserByUsername(username);
        }else if (adminService.loadUserByUsername(username) != null){
            user = adminService.loadUserByUsername(username);
        }
        return user;

    }
}
