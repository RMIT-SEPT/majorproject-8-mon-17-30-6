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
        String username = "";
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")) {
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
//        If service exists add teh company as one that offers it, if not then create the service and add the company
        Company company = companyService.loadUserByUsername(username);
        ServiceType service = serviceTypeService.loadServiceByName(serviceType.getName());
        serviceType.addCompany(company);
        if (service == null){
            serviceTypeService.saveOrUpdateServiceType(serviceType);
        }else{
            service.addCompany(company);
            serviceTypeService.saveOrUpdateServiceType(service);
        }

        return new ResponseEntity<>(serviceType, HttpStatus.OK);

    }

//  Gets all bookings for logged in company
        @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(@RequestHeader("Authorisation") String authorisationHeader){
        String username = "";
//        Gets username from the jwt token
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        List<Booking> bookings = bookingService.getAllBookings();
        List<Booking> bookingsForCompany = new ArrayList<>();
//        Loops through bookings and retrieve the one needed for the company
        for (Booking next:bookings){
            if (next.getCompany().getUsername().equals(username) && next.getServiceType() != null){
                next.getCompany().setEmployees(null);
                next.getServiceType().setCompany(null);
                bookingsForCompany.add(next);
            }
        }
        return new ResponseEntity<>(bookingsForCompany, HttpStatus.OK);
    }

    @GetMapping("/allservices")
    //returns all services
    ResponseEntity<?> getAllServices(@RequestHeader("Authorisation") String authorisationHeader) {
        String username = "";
        String role = "";
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        if (serviceTypeService.getAllServices().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        } else {
            return new ResponseEntity<>(serviceTypeService.getAllServices(),HttpStatus.OK);
        }
    }

    @GetMapping("/employees")
    ResponseEntity<?> getEmployees(@RequestHeader("Authorisation") String authorisationHeader) {
        String username = "";
        String role = "";
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        if (employeeService.getAllEmployees().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        } else {
            List<Employee> employees = employeeService.getAllEmployees();
            List<Employee> employeesForCompany = new ArrayList<>();
            for (Employee next : employees) {
                if (next.getCompanyUsername().equals(username)) {
                    employeesForCompany.add(next);
                }
            }
            return new ResponseEntity<>(employeesForCompany,HttpStatus.OK);
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
