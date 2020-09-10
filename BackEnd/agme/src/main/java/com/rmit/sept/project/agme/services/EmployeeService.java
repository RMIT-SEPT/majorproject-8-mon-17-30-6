package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.EmployeeRepository;
import com.rmit.sept.project.agme.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService implements UserInterface {

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

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Long count() {
        return employeeRepository.count();
    }

    @Override
    public UserDetails saveOrUpdate(UserDetails user) {
        return employeeRepository.save((Employee) user);
    }

    @Override
    public List<UserDetails> getAll() {
        List<UserDetails> employee = new ArrayList<>();
        Iterable<Employee> aa = employeeRepository.findAll();
        aa.forEach(employee::add);
        return employee;
    }

    @Override
    public UserDetails loadUserByUsername(String s) {
        //        Retrieve users
        List<UserDetails> users = getAll();
        UserDetails returnVal = null;
        s = s.toLowerCase();

//        Interate through users to check if the usr matches the username
        for (UserDetails next : users) {
            if (s.equals(next.getUsername())) {
                returnVal = next;
            }
        }
        return returnVal;
    }

}