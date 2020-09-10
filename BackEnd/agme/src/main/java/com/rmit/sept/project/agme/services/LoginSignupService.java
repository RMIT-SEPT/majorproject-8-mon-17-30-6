package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.CompanyRepository;
import com.rmit.sept.project.agme.repositories.EmployeeRepository;
import com.rmit.sept.project.agme.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class LoginSignupService {
    @Autowired
    UserService userService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    CompanyService companyService;

    public UserDetails loadUserByUsername(String username){
        UserDetails user = null;
        if (userService.loadUserByUsername(username) != null){
            user = userService.loadUserByUsername(username);
        }else if (employeeService.loadUserByUsername(username) != null){
            user = employeeService.loadUserByUsername(username);
        }else if (companyService.loadUserByUsername(username) != null){
            user = companyService.loadUserByUsername(username);
        }
        return user;

    }
}
