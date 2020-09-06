package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/employees")
    Employee newEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    @GetMapping("/employees")
    List<Employee> getEmployees() {
        return employeeService.getAllEmployees();
    }
}
