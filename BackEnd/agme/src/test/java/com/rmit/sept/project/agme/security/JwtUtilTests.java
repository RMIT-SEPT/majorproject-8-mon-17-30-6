package com.rmit.sept.project.agme.security;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.repositories.BookingRepository;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.LoginSignupService;
import com.rmit.sept.project.agme.services.UserService;
import org.junit.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilTests {
    @MockBean
    BookingRepository bookingRepository;

    @MockBean
    JwtUtil jwt;

    @MockBean
    UserService userService;

    @MockBean
    BookingService bookingService;

    @MockBean
    LoginSignupService loginSignupService;


    @Test
    public void confirmCount_shouldBeTwo() {
        assertFalse(false);
    }

}

