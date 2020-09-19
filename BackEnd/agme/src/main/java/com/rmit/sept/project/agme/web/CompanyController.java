package com.rmit.sept.project.agme.web;

import com.rmit.sept.project.agme.model.Booking;
import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.model.ServiceType;
import com.rmit.sept.project.agme.repositories.CompanyRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.CompanyService;
import com.rmit.sept.project.agme.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
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
//        Gets username from the jwt topken
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        List<Booking> bookings = bookingService.getAllBookings();
        List<Booking> bookingsForCompany = new ArrayList<>();
//        Loops through bookings and retrieve the one needed for the company
        for (Booking next:bookings){
            if (next.getCompany().getUsername().equals(username)){
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
        if (serviceTypeService.getAllServices().size() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        } else {
            return new ResponseEntity<>(serviceTypeService.getAllServices(), HttpStatus.OK);
        }
    }
}
