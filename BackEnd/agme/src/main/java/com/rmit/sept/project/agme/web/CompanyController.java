package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.repositories.CompanyRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.CompanyService;
import com.rmit.sept.project.agme.services.EmployeeService;
import com.rmit.sept.project.agme.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/company")
@CrossOrigin(origins = "*")
public class CompanyController
{
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private ServiceTypeService serviceTypeService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private EmployeeService employeeService;

    //    Creates a new service for a company
    @PostMapping("/new-service")
    public ResponseEntity<?> newService(@RequestHeader("Authorisation") String authorisationHeader, @RequestBody ServiceType serviceType){

        return new ResponseEntity<>(companyService.addANewService(authorisationHeader, serviceType), HttpStatus.OK);
    }

    //  Gets all bookings for logged in company
    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(@RequestHeader("Authorisation") String authorisationHeader){

        return new ResponseEntity<>(companyService.getBookingsForLoggedInCompany(authorisationHeader), HttpStatus.OK);
    }

    @GetMapping("/allservices")
        //returns all services
    ResponseEntity<?> getAllServices(@RequestHeader("Authorisation") String authorisationHeader) {

        if (serviceTypeService.getAllServices().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        } else {
            return new ResponseEntity<>(serviceTypeService.getAllServices(),HttpStatus.OK);
        }
    }

    @GetMapping("/employees")
    ResponseEntity<?> getEmployees(@RequestHeader("Authorisation") String authorisationHeader) {
        String username = jwtUtil.extractUsername(authorisationHeader);
        List<Employee> compEmp = companyService.getCompaniesEmployees(username);
        if (compEmp== null){

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(compEmp,HttpStatus.OK);

        }
    }

    // Assign booking to employee
    @PostMapping("/bookings/employee")
    public ResponseEntity<?> assignBookingEmployee(@RequestBody Long bookingId, @RequestBody Long employeeId) {
        try {
            Booking tempBooking = bookingService.getBookingById(bookingId);

            if (tempBooking.getEmployee() != null) {
                return new ResponseEntity<>("resource already exists", HttpStatus.valueOf(409));
            }

            Employee tempEmployee = employeeService.getEmployeeById(employeeId);
            tempBooking.setEmployee(tempEmployee);

            return new ResponseEntity<>("employee successfully assigned", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("resource not found", HttpStatus.valueOf(404));
        }
    }

    // Read current assigned Employee
    @GetMapping("/bookings/employee")
    public ResponseEntity<?> getBookingEmployee(@RequestBody Long bookingId, @RequestBody Long employeeId) {
        try {
            Booking tempBooking = bookingService.getBookingById(bookingId);
            Employee employee = tempBooking.getEmployee();
            return new ResponseEntity<>(employee, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("resource not found", HttpStatus.valueOf(404));
        }
    }

    // Set employee to null
    @DeleteMapping("/bookings/employee")
    public ResponseEntity<?> removeBookingEmployee(@RequestBody Long bookingId) {
        try {
            Booking tempBooking = bookingService.getBookingById(bookingId);
            tempBooking.setEmployee(null);
            return new ResponseEntity<>("employee successfully removed", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("resource not found", HttpStatus.valueOf(404));
        }
    }

    // Change assigned employee
    @PutMapping("/bookings/employee")
    public ResponseEntity<?> editBookingEmployee(@RequestBody Long bookingId, @RequestBody Long newEmployeeId) {
        try {
            Booking tempBooking = bookingService.getBookingById(bookingId);

            if (tempBooking.getEmployee() == null) {
                return new ResponseEntity<>("no existing employee", HttpStatus.valueOf(204));
            }

            Employee tempEmployee = employeeService.getEmployeeById(newEmployeeId);
            tempBooking.setEmployee(tempEmployee);
            return new ResponseEntity<>("employee successfully changed", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("resource not found", HttpStatus.valueOf(404));
        }
    }

    @DeleteMapping("/bookings")
    public ResponseEntity<?> deleteBooking(@RequestBody Long bookingId){
        try{
            bookingService.deleteById(bookingId);
            return new ResponseEntity<>("resource deleted successfully", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("resource not found", HttpStatus.valueOf(404));
        }

    }

}