package com.rmit.sept.project.agme.security;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.BookingRepository;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.LoginSignupService;
import com.rmit.sept.project.agme.services.UserService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

import static com.rmit.sept.project.agme.model.Role.ADMIN;
import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilTests {
    @Autowired
    JwtUtil jwt;

    @MockBean
    BookingRepository bookingRepository;

    @MockBean
    UserService userService;

    @MockBean
    BookingService bookingService;

    @MockBean
    LoginSignupService loginSignupService;




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
        Long id = new Long(1);
        user.setId(id);

        String token = jwt.generateToken(user);
        assertNotEquals("",token);
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
        Long id = new Long(1);
        user.setId(id);

        String token = jwt.generateToken(user);

        jwt.extractUsername(token);
        assertEquals("alex",token);
    }

}

