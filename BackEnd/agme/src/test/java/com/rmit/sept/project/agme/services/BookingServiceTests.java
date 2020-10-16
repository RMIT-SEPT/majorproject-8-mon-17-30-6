package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Booking;

import com.rmit.sept.project.agme.repositories.BookingRepository;
import com.rmit.sept.project.agme.security.JwtUtil;

import org.junit.Test;

import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(BookingService.class)

public class BookingServiceTests {
    
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
    public void confirmCount_shouldBeZero() {
    	BookingService emptyTester = new BookingService(bookingRepository);
    	Long countOfBooks = emptyTester.count();
    	Long expected = (long) 0;
    	assertEquals(expected, countOfBooks);
    }
    
    @Test
    public void confirmCount_shouldBeTwo() {
    	BookingService twoBookingTester = new BookingService(bookingRepository);
    	
    	Booking booking1 = new Booking();
        booking1.setId((long) 1);
        booking1.setDuration(20);
        Booking booking2 = new Booking();
        booking2.setId((long) 2);
        booking2.setDuration(10);
        twoBookingTester.addBooking(booking1);
        twoBookingTester.addBooking(booking2);
        
    	Long countOfBooks = twoBookingTester.count();
    	Long expected = (long) 0;
    	assertEquals(expected, countOfBooks);
    }
    
}
