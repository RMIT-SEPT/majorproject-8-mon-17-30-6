package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.repositories.EmployeeRepository;
import com.rmit.sept.project.agme.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public Employee saveOrUpdate(Employee user) {
        return employeeRepository.save((Employee) user);
    }

    @Override
    public List<Employee> getAll() {
        List<Employee> employee = new ArrayList<>();
        Iterable<Employee> aa = employeeRepository.findAll();
        aa.forEach(employee::add);
        return employee;
    }

    @Override
    public Employee loadUserByUsername(String s) {
        //        Retrieve users
        List<Employee> users = getAll();
        Employee returnVal = null;
        s = s.toLowerCase();

//        Interate through users to check if the usr matches the username
        for (Employee next : users) {
            if (s.equals(next.getUsername().toLowerCase())) {
                returnVal = next;
            }
        }
        return returnVal;
    }

    @Override
    public boolean authenticateUser(String username, String passwordHash) {
        List<Employee> users = getAll();
//        Interate through users to check if the usr matches the username
        for (Employee next : users) {
            if (username.equals(next.getUsername())) {
//                If User is found, encode password with users salt
//                check if the passwords match, if so return true, else false
//                if (passwordEncoder.matches(passwordHash, next.getPassword())){
                if (BCrypt.checkpw(passwordHash, next.getPassword())) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    // Assumes unique Id for each Employee
    public Employee getEmployeeById(Long id) {
        Optional<Employee> temp = employeeRepository.findById(id);
        return temp.orElse(null);
    }

}

