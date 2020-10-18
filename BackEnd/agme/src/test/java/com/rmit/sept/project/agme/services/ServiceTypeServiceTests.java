package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.repositories.ServiceTypeRepository;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static com.rmit.sept.project.agme.model.Role.ADMIN;

@RunWith(SpringRunner.class)
@WebMvcTest(ServiceTypeService.class)
public class ServiceTypeServiceTests {

    @MockBean
    LoginSignupService loginSignupService;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    UserService userService;

    @MockBean
    ServiceTypeRepository serviceTypeRepository;

    @MockBean
    AvailabilityService availabilityService;

    @MockBean
    ServiceTypeService serviceTypeService;

    @Test
    public void loadServiceByName_willReturnService_whenValidServiceNameIsGivenAndServiceExists() {
        ServiceType service = new ServiceType();
        service.setId(1L);
        service.setName("Hairdressing");
        service.setDescription("Cut those curly locks!");

        Company user = new Company();
        String username = "test";
        user.setUsername(username);
        user.setPassword("password");
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        user.hashPassword();

        service.addCompany(user);

        ServiceType service2 = serviceTypeService.saveOrUpdateServiceType(service);
        ServiceType serviceTypeReceived = serviceTypeService.loadServiceByName("Hairdressing");

        Assert.assertEquals(service2,serviceTypeReceived);
    }

    @Test
    public void loadServiceByName_willReturnNull_whenInvalidServiceNameIsGivenAndServiceExists() {
        ServiceType serviceTypeReceived = serviceTypeService.loadServiceByName("Woo");

        Assert.assertNull(serviceTypeReceived);
    }

    @Test
    public void loadAllServices_willReturnEmptyList_whenNoServicesExist() {
        List<ServiceType> servicesList = serviceTypeService.getAllServices();
        List<ServiceType> expectedServicesList = new ArrayList<ServiceType>();

        Assert.assertEquals(expectedServicesList,servicesList);
    }

}
