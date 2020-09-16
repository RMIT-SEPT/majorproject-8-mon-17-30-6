package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController
{

    private final EmployeeService employeeService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    public EmployeeController(EmployeeService employeeService)
    {
        this.employeeService = employeeService;
    }

    @PostMapping("/employees")
    Employee newEmployee(@RequestBody Employee employee)
    {
        return employeeService.addEmployee(employee);
    }

    @GetMapping("/employees")
    List<Employee> getEmployees()
    {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(@RequestHeader("Authorisation") String authorisationHeader)
    {
        String username = "";
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")) {
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        List<Booking> bookings = new ArrayList<>();
        List<Booking> bookingsForCompany = new ArrayList<>();
        for (Booking next : bookings) {
            if (next.getCompany().getUsername().equals(username)) {
                bookingsForCompany.add(next);
            }
        }
        return new ResponseEntity<>(bookingsForCompany, HttpStatus.OK);
    }
}