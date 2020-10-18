package com.rmit.sept.project.agme.security;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.services.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import static com.rmit.sept.project.agme.model.Role.ADMIN;
import static org.junit.jupiter.api.Assertions.*;


@RunWith(SpringRunner.class)
@WebMvcTest(JwtUtil.class)
public class JwtUtilTests {


    @MockBean
    UserRepository userRepository;

    @MockBean
    UserDetails userDetails;

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
    AdminService adminService;

    @Autowired
    JwtUtil jwt;

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
        User user2 = userService.saveOrUpdateUser(user);

        String token = jwt.generateToken((UserDetails)user);
        assertNotEquals(null,token);
    }

    @Test
    public void generateToken_canExtractUsername() {

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
        User user2 = userService.saveOrUpdateUser(user);

        System.out.println(user.getUsername());
        String token = jwt.generateToken((UserDetails)user);
        System.out.println(token);
        String extracted = jwt.extractUsername("Bearer " + token);
        System.out.println(extracted);
        assertEquals("alex",extracted);
    }

}

