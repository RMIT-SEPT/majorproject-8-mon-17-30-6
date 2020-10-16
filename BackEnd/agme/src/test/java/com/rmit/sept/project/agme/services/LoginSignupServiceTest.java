package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.web.BookingController;

import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.*;

import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(BookingController.class)

public class LoginSignupServiceTest {

    @MockBean
    UserRepository userRepository;

    @MockBean
    UserDetails userDetails;

    @MockBean
    JwtUtil jwt;
    
    @MockBean
    UserService userService;
    
    @MockBean
    BookingService bookingService;
    
    @MockBean
    LoginSignupService loginSignupService;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    CompanyService companyService;

    @MockBean
    ServiceTypeService serviceTypeService;

    @MockBean
    AdminService adminService;

    @Test
    public void userDetails_requestUserNotInSystem_shouldReturnNull() {
        LoginSignupService loginSignupService = new LoginSignupService();

        loginSignupService.userService = userService;
        loginSignupService.companyService = companyService;
        loginSignupService.employeeService = employeeService;
        loginSignupService.adminService = adminService;

        UserDetails expectedResult = null;
        
        //this is an empty service, should not return
        UserDetails actualDetails = loginSignupService.loadUserByUsername("Bob");

        assertNull(actualDetails);
    }

}
