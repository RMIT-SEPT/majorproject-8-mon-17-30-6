package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.Employee;
import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.repositories.CompanyRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletionException;

@Service
public class CompanyService implements UserInterface {

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


    @Override
    public void saveOrUpdate(UserDetails user) {
        companyRepository.save((Company) user);
    }

    public Company addCompany(Company company) { return companyRepository.save(company); }

    public List<Company> getAll() {
        List<Company> company = new ArrayList<>();
        Iterable<Company> aa = companyRepository.findAll();
        aa.forEach(company::add);
        return company;
    }

    @Override
    public Company loadUserByUsername(String s) {
        //        Retrieve users
        List<Company> users = getAll();
        Company returnVal = null;
        s = s.toLowerCase();

//        Interate through users to check if the usr matches the username
        for (Company next : users) {
            if (s.equals(next.getUsername())) {
                returnVal = next;
            }
        }
        return returnVal;
    }

    @Override
    public boolean authenticateUser(String username, String passwordHash) {
        List<Company> users = getAll();
//        Interate through users to check if the usr matches the username
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
    public ServiceType addANewService(String authorisationHeader, ServiceType serviceType){
        String username = jwtUtil.extractUsername(authorisationHeader);

//        If service exists add teh company as one that offers it, if not then create the service and add the company
        Company company = companyService.loadUserByUsername(username);
        ServiceType service = serviceTypeService.loadServiceByName(serviceType.getName());
        serviceType.addCompany(company);
        if (service == null){
        }else{
            service.addCompany(company);
        }
        return serviceTypeService.saveOrUpdateServiceType(service);

    }
    public List<Booking> getBookingsForLoggedInCompany(String authorisationHeader){
        String username = jwtUtil.extractUsername(authorisationHeader);

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
        return bookingsForCompany;
    }

    public List<Employee> getCompaniesEmployees(String username){

        if (employeeService.getAllEmployees().size() == 0) {
            return null;

        } else {
            List<Employee> employees = employeeService.getAllEmployees();
            List<Employee> employeesForCompany = new ArrayList<>();
            for (Employee next : employees) {
                if (next.getCompanyUsername().equals(username)) {
                    employeesForCompany.add(next);
                }
            }
            return employeesForCompany;
        }
    }
}
