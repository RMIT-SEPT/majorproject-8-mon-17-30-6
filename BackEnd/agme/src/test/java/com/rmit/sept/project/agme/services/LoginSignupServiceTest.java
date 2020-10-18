package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.web.BookingController;

import org.junit.Test;
import org.junit.runner.RunWith;

import static com.rmit.sept.project.agme.model.Role.ADMIN;
import static org.junit.Assert.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import static org.junit.jupiter.api.Assertions.assertNull;

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
    EmployeeService employeeService;

    @MockBean
    CompanyService companyService;

    @MockBean
    ServiceTypeService serviceTypeService;

    @MockBean
    UserService userService;
    
    @MockBean
    BookingService bookingService;
    
    @MockBean
    LoginSignupService loginSignupService;

    @MockBean
    AdminService adminService;

    @Test

    public void generateToken_shouldReturnToken() {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        Long id = 1L;
        user.setId(id);
        String token = jwt.generateToken(user);
        System.out.println(token);
        assertNotNull(token);
    }

}
