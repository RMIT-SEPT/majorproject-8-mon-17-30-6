package com.rmit.sept.project.agme.services;


import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import com.rmit.sept.project.agme.services.BookingService;
import com.rmit.sept.project.agme.services.LoginSignupService;
import com.rmit.sept.project.agme.services.UserService;
import com.rmit.sept.project.agme.web.BookingController;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.validation.ConstraintViolationException;
import javax.xml.bind.ValidationException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.rmit.sept.project.agme.model.Role.ADMIN;
import static com.rmit.sept.project.agme.model.Role.USER;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@WebMvcTest(UserService.class)
public class UserServiceTest {
    @MockBean
    UserRepository userRepository;

    @MockBean
    UserDetails userDetails;

    @MockBean
    JwtUtil jwt;

    @MockBean
    UserService userService;

    @MockBean
    BookingService bookingService;

    @MockBean
    LoginSignupService loginSignupService;

    @MockBean
    EmployeeService employeeService;

//    Service tests
    @Test
    public void loadUser_shouldReturnTrue_WithFindbyId() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        Long id = new Long(1);
        user.setId(id);
        User user2 = userService.saveOrUpdateUser(user);
        User userFound = (User)userService.loadUserByUsername(user.getUsername());
        Assert.assertEquals(user2, userFound);
    }
    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Test
    public void createNewUser_shouldThrowException_WithIncompleteFields() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setConfirmPassword("password");
        user.setRole(ADMIN);
        user.setPassword("password");
        Long id = new Long(1);
        user.setId(id);
        User user2 = userService.saveOrUpdateUser(user);
        Assert.assertEquals(null, user2);
    }
    @Test
    public void createNewUser_shouldThrowException_whenPasswordsDoNotMatch() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setConfirmPassword("pasdsword");
        user.setRole(ADMIN);
        user.setPassword("password");
        Long id = new Long(1);
        user.setId(id);
        User user2 = userService.saveOrUpdateUser(user);
        Assert.assertEquals(null, user2);
    }
    @Test
    public void getAll_shouldReturnAList_whenCalled() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alexisdasd");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setEmail("email");
        user.setRole(USER);
        user.setPassword("password");
        Long id = new Long(1);
        user.setId(id);
        User user2 = userService.saveOrUpdateUser(user);
        List<User> users = new ArrayList<User>();
        users.add(user);
        List<User> usersFound = userService.getAllUsers();
        usersFound.add(user);
        Assert.assertEquals(users.size(), usersFound.size());
    }
    @Test
    public void authenticateUser_shouldReturnTrue_whenDetailsMatch() throws Exception {
        userRepository = Mockito.mock(UserRepository.class);
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        user.hashPassword();
        Long id = new Long(1);
        user.setId(id);
        User user2 = userRepository.save(user);
        Assert.assertFalse(userService.authenticateUser(user.getUsername(),"password"));
    }
    @Test
    public void authenticateUser_shouldReturnFalse_whenDetailsDoNotMatch() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        user.hashPassword();
        Long id = new Long(1);
        user.setId(id);
        User user2 = userRepository.save(user);
        Assert.assertFalse(userService.authenticateUser(user.getUsername(),"npassword"));
    }
    @Test
    public void authenticateUser_shouldThrowNullPointerException_whenNoUsernameAndPasswordAtGiven() throws Exception {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        user.hashPassword();
        Long id = new Long(1);
        user.setId(id);
        User user2 = userRepository.save(user);

        boolean result = userService.authenticateUser(null,null);
        Assert.assertEquals(false, result);

    }
    public void createABooking_ShouldReturnFalse_When_EmployeeIsUnabailable(){

            Employee employee = new Employee();
            Long id = 50L;
            employee.setId(id);

            Employee otherEmployee = new Employee();
            Long otherId = 60L;
            otherEmployee.setId(otherId);

            employeeService.addEmployee(employee);

            bookingService.addBooking(new Booking(new Date(), 3, employee, new Company(), new User(), new ServiceType()));

        Assert.assertEquals(bookingService.addBooking(new Booking(new Date(), 3, employee, new Company(), new User(), new ServiceType()))
                ,null);
        }
    public void createABooking_ShouldReturnTrue_When_EmployeeIsUnabailable(){

        Employee employee = new Employee();
        Long id = 50L;
        employee.setId(id);

        Employee otherEmployee = new Employee();
        Long otherId = 60L;
        otherEmployee.setId(otherId);
        employeeService.addEmployee(employee);
        Assert.assertEquals(bookingService.addBooking(new Booking(new Date(), 3, employee, new Company(), new User(), new ServiceType()))
        ,null);
    }
    public void createABooking_ShouldReturnNull_When_UserDoesNotExist(){

        Employee employee = new Employee();
        employeeService.addEmployee(employee);
        Assert.assertEquals(bookingService.addBooking(new Booking(new Date(), 3, employee, new Company(), null, new ServiceType()))
                ,null);
    }
    public void createABooking_ShouldReturnNull_When_EmployeeDoesNotExist(){

        Assert.assertEquals(bookingService.addBooking(new Booking(new Date(), 3, null, new Company(), new User(), new ServiceType()))
                ,null);
    }
    public void createABooking_ShouldReturnNull_When_EmployeeAndUserDoNotExist(){

        Assert.assertEquals(bookingService.addBooking(new Booking(new Date(), 3, null, new Company(), null, new ServiceType()))
                ,null);
    }
    public void createABooking_ShouldReturnNull_When_CompanyDoesNotExist(){

        Assert.assertEquals(bookingService.addBooking(new Booking(new Date(), 3, null, new Company(), null, new ServiceType()))
                ,null);
    }
    public void createABooking_ShouldReturnNull_When_ServiceDoesNotExist(){

        Assert.assertEquals(bookingService.addBooking(new Booking(new Date(), 3, new Employee(), new Company(), new User(), null))
                ,null);
    }


    }

