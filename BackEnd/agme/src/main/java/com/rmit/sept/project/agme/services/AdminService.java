package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Admin;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.User;
import com.rmit.sept.project.agme.repositories.AdminRepository;
import com.rmit.sept.project.agme.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService implements UserInterface
{
    @Autowired
    CompanyService companyService;
    @Override
    public void saveOrUpdate(UserDetails user)
    {
        return;

    }

    @Override
    public List<?> getAll()
    {
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException
    {
///        Retrieve users
        List<Admin> users = getAllUsers();
        Admin returnVal = null;
        s = s.toLowerCase();

//        Interate through users to check if the usr matches the username
        for (Admin next : users) {
            if (s.equals(next.getUsername().toLowerCase())) {
                returnVal = next;
            }
        }
        return returnVal;    }
    //injecting user repository access
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    BookingService bookingService;
    public AdminService() {

    }

    public Admin saveOrUpdateUser(Admin user) {

        return adminRepository.save(user);
    }

    //    Retrieve list of users
    public List<Admin> getAllUsers() {
        List<Admin> users = new ArrayList<>();
        Iterable<Admin> aa = adminRepository.findAll();
        aa.forEach(users::add);
        return users;
    }
    public boolean authenticateUser(String username, String passwordHash) {
//        Retrieve users
        List<Admin> users = getAllUsers();
//        Interate through users to check if the usr matches the username
        for (Admin next : users) {
            if (username.equals(next.getUsername())) {
//                If User is found, encode password with users salt
//                check if the passwords match, if so return true, else false
//                if (passwordEncoder.matches(passwordHash, next.getPassword())){
                return BCrypt.checkpw(passwordHash, next.getPassword());
            }
        }
        return false;
    }
    public List<Company> getActiveCompanies(){
        List<Company> companies = companyService.getAll();
        List<Company> companies2 = new ArrayList<>();
        for (Company next:companies){
            if (next.isActive() == true){
                companies2.add(next);
            }
        }
        return companies2;
    }
    public void setInactive(String username){
        Company c = companyService.loadUserByUsername(username);
        c.setActive(false);
        companyService.saveOrUpdate(c);

    }

}

