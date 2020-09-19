//package com.rmit.sept.project.agme.service;
//
//import com.rmit.sept.project.agme.model.Booking;
//
//import com.rmit.sept.project.agme.repositories.BookingRepository;
//import com.rmit.sept.project.agme.security.JwtUtil;
//import com.rmit.sept.project.agme.services.*;
//
//import org.junit.jupiter.api.Test;
//
//import org.junit.runner.RunWith;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//
//import static org.junit.Assert.assertNotNull;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@WebMvcTest(BookingService.class)
//
//public class BookingServiceTests {
//    
//    @MockBean
//	BookingRepository bookingRepository;
//    
//    @MockBean
//    JwtUtil jwt;
//    
//    @MockBean
//    UserService userService;
//    
//    @MockBean
//    BookingService bookingService;
//    
//    @MockBean
//    LoginSignupService loginSignupService;
//   
//    
//    
//    @Test
//    public void getAll_shouldReturnAllBookings() {
//    	List<Booking> bookingTestList = new ArrayList<>();
//    	BookingService bookingService = new BookingService(bookingRepository);
//        Booking booking1 = new Booking();
//        booking1.setId((long) 1);
//        booking1.setDuration(20);
//        booking1.setServiceType("Real Booking Service");
//        Booking booking2 = new Booking();
//        booking2.setId((long) 2);
//        booking2.setDuration(10);
//        booking2.setServiceType("Fake Booking Service");
//        
//        bookingService.addBooking(booking1);
//        bookingService.addBooking(booking2);
//        
//        bookingTestList.add(booking1);
//        bookingTestList.add(booking2);
//    	
//    	List<Booking> checkList = bookingService.getAllBookings();
//    	
//    	assertEquals(bookingTestList, checkList);
//    }
//    
//    @Test
//    public void addBooking_shouldNotBeNull() {
//    	Booking newBooking = new Booking();
//    	newBooking.setId((long) 1);
//    	newBooking.setDuration(20);
//    	newBooking.setServiceType("Real Booking Service");
//    	Booking confirmBooking = bookingService.addBooking(newBooking);
//    	assertNotNull(confirmBooking);
//    }
//    
//    @Test
//    public void confirmCount_shouldBeZero() {
//    	BookingService emptyTester = new BookingService(bookingRepository);
//    	Long countOfBooks = emptyTester.count();
//    	Long expected = (long) 0;
//    	assertEquals(expected, countOfBooks);
//    }
//    
//    @Test
//    public void confirmCount_shouldBeTwo() {
//    	BookingService twoBookingTester = new BookingService(bookingRepository);
//    	
//    	Booking booking1 = new Booking();
//        booking1.setId((long) 1);
//        booking1.setDuration(20);
//        booking1.setServiceType("Real Booking Service");
//        Booking booking2 = new Booking();
//        booking2.setId((long) 2);
//        booking2.setDuration(10);
//        booking2.setServiceType("Fake Booking Service");
//    	
//        twoBookingTester.addBooking(booking1);
//        twoBookingTester.addBooking(booking2);
//        
//    	Long countOfBooks = twoBookingTester.count();
//    	Long expected = (long) 0;
//    	assertEquals(expected, countOfBooks);
//    }
//    
//}
