package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.Repositories.EmployeeRepository;
import com.rmit.sept.project.agme.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        Iterable<Employee> it = employeeRepository.findAll();
        List<Employee> employees = new ArrayList<>();

        it.forEach(employees::add);

        return employees;
    }

    public Employee addEmployee(Employee employee) { return employeeRepository.save(employee); }
    public Long count() {return employeeRepository.count();}
}
