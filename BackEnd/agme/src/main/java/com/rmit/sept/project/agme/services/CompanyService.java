package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;

public class CompanyService implements UserInterface {
    @Autowired
    CompanyRepository companyRepository;
    @Override
    public UserDetails saveOrUpdate(UserDetails user) {
        return companyRepository.save((Company) user);
    }

    @Override
    public List<UserDetails> getAll() {
        List<UserDetails> company = new ArrayList<>();
        Iterable<Company> aa = companyRepository.findAll();
        aa.forEach(company::add);
        return company;
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
