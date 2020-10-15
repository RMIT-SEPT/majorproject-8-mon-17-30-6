package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.repositories.BookingRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

	private BookingRepository bookingRepository;
	@Autowired
	private UserService userService;

	@Autowired
	private EmployeeService employeeService ;
	@Autowired
	private CompanyService companyService;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private ServiceTypeService serviceTypeService;

	@Autowired
	private BookingService bookingService;
	@Autowired
	public BookingService(BookingRepository bookingRepository) {
		this.bookingRepository = bookingRepository;
	}

	public BookingService() {

	}

	// Get arraylist of all users
	public List<Booking> getAllBookings() {
		Iterable<Booking> it = bookingRepository.findAll();
		List<Booking> bookings = new ArrayList<>();

		it.forEach(bookings::add);

		return bookings;
	}

	//Retrieve bookings for a particular user
	public List<Booking> getAllBookings(String username){
		List<Booking> bookings = getAllBookings();
		List<Booking> bookingsForUser = new ArrayList<>();
		for (Booking next:bookings){
			if (next.getUser().getUsername().equals(username) && next.getServiceType() != null){
				next.getCompany().setEmployees(null);
				next.getServiceType().setCompany(null);
				bookingsForUser.add(next);
			}
		}
		return bookingsForUser;
	}

	//Retrieve an user upcoming bookings
	public List<Booking> getUserUpcomingBookings(String username){
		List<Booking> bookings = getAllBookings(username);
		List<Booking> upcomingBookings = new ArrayList<>();
		Date today = new Date();
		long currentDateMilliSec = today.getTime();
		long updateDateMilliSec;
		long diffDays;
		for (Booking next:bookings){
			next.getCompany().setEmployees(null);
			next.getServiceType().setCompany(null);
			updateDateMilliSec = next.getStartDateTime().getTime();
			diffDays = (updateDateMilliSec-currentDateMilliSec) / (24 * 60 * 60 * 1000);
			if (diffDays > -1 && diffDays <= 2) {
				upcomingBookings.add(next);
			}
		}
		return upcomingBookings;
	}

	public Booking addBooking(Booking booking) {
		return bookingRepository.save(booking);
	}

	public Long count() {
		return bookingRepository.count();
	}

	// Assumes unique id for each booking
	public Booking getBookingById(Long id) {
		Optional<Booking> temp = bookingRepository.findById(id);
		return temp.orElse(null);
	}

	public List<Booking> getBookingsByCompany(Company company) {

		Iterable<Booking> it = bookingRepository.findAll();
		List<Booking> list = new ArrayList<>();

		it.forEach(book -> {
			if (book.getCompany() == company) {
				list.add(book);
			}
		});

		return list;
	}

	public List<Booking> getBookingsByEmployee(Employee employee) {

		Iterable<Booking> it = bookingRepository.findAll();
		List<Booking> list = new ArrayList<>();

		it.forEach(book -> {
			if (book.getEmployee() == employee) {
				list.add(book);
			}
		});

		return list;
	}

	public void deleteById(Long bookingId) {
		bookingRepository.deleteById(bookingId);
	}

	public Booking createABooking(String authorisationHeader, BookingRequest booking){
		String username = jwtUtil.extractUsername(authorisationHeader);

//        Instantiates a user, service, employee and company for the bookings.
		User user = (User)userService.loadUserByUsername(username);
		Employee employee = employeeService.loadUserByUsername(booking.getEmployeeUsername());
		Company company = companyService.loadUserByUsername(employee.getCompanyUsername());
		ServiceType serviceType = serviceTypeService.loadServiceByName(booking.getServiceType());
//      Creates a new booking
		Booking newBooking = new Booking(booking.getDate(), booking.getDuration(), employee, company, user, serviceType);
		return bookingService.addBooking(newBooking);
	}

}
