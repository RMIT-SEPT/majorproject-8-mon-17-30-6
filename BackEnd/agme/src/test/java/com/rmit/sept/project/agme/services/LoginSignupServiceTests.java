package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.*;
import com.rmit.sept.project.agme.repositories.BookingRepository;
import com.rmit.sept.project.agme.repositories.UserRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import static com.rmit.sept.project.agme.model.Role.ADMIN;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@WebMvcTest(LoginSignupService.class)
public class LoginSignupServiceTests {
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

    @Autowired
    LoginSignupService loginSignupService;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    CompanyService companyService;

    @MockBean
    AdminService adminService;

    @Test
    public void loadUserByUsername_willLoadUser_whenValidUserIsRequested() {
        User user = new User();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        Long id = 1L;
        user.setId(id);
        User user2 = loginSignupService.userService.saveOrUpdateUser(user);
        User userFound = (User)loginSignupService.loadUserByUsername(user.getUsername());
        Assert.assertEquals(user2, userFound);
    }

    @Test
    public void loadEmployeeByUsername_willLoadEmployee_whenValidEmployeeIsRequested() {
        Employee user = new Employee();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        Long id = 1L;
        user.setId(id);
        Employee user2 = loginSignupService.employeeService.addEmployee(user);
        User userFound = (User)loginSignupService.loadUserByUsername(user.getUsername());
        Assert.assertEquals(user2, userFound);
    }

    @Test
    public void loadCompanyByUsername_willLoadCompany_whenValidCompanyIsRequested() {
        Company user = new Company();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        Long id = 1L;
        user.setId(id);
        Company user2 = loginSignupService.companyService.addCompany(user);
        User userFound = (User)loginSignupService.loadUserByUsername(user.getUsername());
        Assert.assertEquals(user2, userFound);
    }

    @Test
    public void loadAdminByUsername_willLoadAdmin_whenValidAdminIsRequested() {
        Admin user = new Admin();
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        Admin user2 = loginSignupService.adminService.saveOrUpdateAdmin(user);
        User userFound = (User)loginSignupService.loadUserByUsername(user.getUsername());
        Assert.assertEquals(user2, userFound);
    }

    @Test
    public void loadUserByUsername_willReturnNull_whenInvalidUserIsRequested() {
        loginSignupService.loadUserByUsername("alex");
    }

}
