package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyService implements UserInterface {
    @Autowired
    CompanyRepository companyRepository;
    public Company saveOrUpdate(Company user) {
        return companyRepository.save(user);
    }

    public Company addCompany(Company company) { return companyRepository.save(company); }

    public List<Company> getAll() {
        List<Company> company = new ArrayList<>();
        Iterable<Company> aa = companyRepository.findAll();
        aa.forEach(company::add);
        for (Company next:company){
            for (Employee emp:next.getEmployees()){
                emp.setCompany(null);
            }
        }
        return company;
    }

    @Override
    public Company loadUserByUsername(String s) {
        //        Retrieve users
        List<Company> users = getAll();
        Company returnVal = null;
        s = s.toLowerCase();

//        Iterate through users to check if the usr matches the username
        for (Company next : users) {
            if (s.equals(next.getUsername().toLowerCase())) {
                returnVal = next;
            }
        }
        return returnVal;
    }

    @Override
    public boolean authenticateUser(String username, String passwordHash) {
        List<Company> users = getAll();
//        Iterate through users to check if the usr matches the username
        for (Company next : users) {
            if (username.equals(next.getUsername())) {
//                If User is found, encode password with users salt
//                check if the passwords match, if so return true, else false
//                if (passwordEncoder.matches(passwordHash, next.getPassword())){
                return BCrypt.checkpw(passwordHash, next.getPassword());
            }
        }
        return false;
    }
}
