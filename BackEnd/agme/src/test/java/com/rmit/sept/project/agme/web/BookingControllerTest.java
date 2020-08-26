package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.services.BookingService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.BDDMockito.given;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(BookingController.class)
public class BookingControllerTest {

    @MockBean
    private BookingService bookingService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getBookings() throws Exception {

        List<Booking> bookingList = new ArrayList<>();

        Employee employee = new Employee();
        Company company = new Company();
        User user = new User();
        Date date = new Date();

        Booking booking = new Booking(date, "Test", 2, employee, company, user);
        booking.setVisible(2);
        booking.setId((long) 24);

        bookingList.add(booking);

        given(bookingService.findAll()).willReturn(bookingList);

    }
}
