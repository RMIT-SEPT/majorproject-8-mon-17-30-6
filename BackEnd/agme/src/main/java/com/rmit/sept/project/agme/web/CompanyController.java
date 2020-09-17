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
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/company")
public class CompanyController
{
    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    CompanyService companyService;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    ServiceTypeService serviceTypeService;

    @Autowired
    BookingService bookingService;

    @PostMapping("/new-service")
    public ResponseEntity<?> newService(@RequestHeader("Authorisation") String authorisationHeader, @RequestBody ServiceType serviceType){
        String username = "";
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")) {
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
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


        @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(@RequestHeader("Authorisation") String authorisationHeader){
        String username = "";
        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")){
            String jwt = authorisationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        List<Booking> bookings = bookingService.getAllBookings();
        List<Booking> bookingsForCompany = new ArrayList<>();
        for (Booking next:bookings){
            if (next.getCompany().getUsername().equals(username)){
                next.getCompany().setEmployees(null);
                next.getServiceType().setCompany(null);
                bookingsForCompany.add(next);
            }
        }
        return new ResponseEntity<>(bookingsForCompany, HttpStatus.OK);
    }

}
