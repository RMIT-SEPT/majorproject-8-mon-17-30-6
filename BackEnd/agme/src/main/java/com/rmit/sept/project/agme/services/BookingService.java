package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.repositories.BookingRepository;
import com.rmit.sept.project.agme.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

	private BookingRepository bookingRepository;

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
}
