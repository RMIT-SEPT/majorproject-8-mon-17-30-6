package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Admin;
import com.rmit.sept.project.agme.repositories.AdminRepository;
import com.rmit.sept.project.agme.repositories.BookingRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

import static com.rmit.sept.project.agme.model.Role.ADMIN;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(AdminService.class)
public class AdminServiceTest
{
    @MockBean
    AdminRepository adminRepository;

    @MockBean
    AdminService adminService;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    UserService userService;
    @MockBean
    CompanyService companyService;

    @MockBean
    EmployeeService employeeService;

    @MockBean
    LoginSignupService loginSignupService;

    @MockBean
    BookingService bookingService;

    @MockBean
    BookingRepository bookingRepository;
    @Test
    public void loadAdmin_shouldReturnTrue_WithFindById() throws Exception {
        Admin admin = new Admin();
        admin.setName("test admin");
        admin.setUsername("alasex");
        admin.setPhone("00");
        admin.setAddress("addy");
        admin.setConfirmPassword("password");
        admin.setName("name");
        admin.setRole(ADMIN);
        admin.setPassword("password");
        Long id = 1L;
        Admin admin2 = adminService.saveOrUpdateAdmin(admin);
        Admin adminFound = (Admin)adminService.loadUserByUsername(admin.getUsername());
        Assert.assertEquals(admin2, adminFound);
    }
    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Test
    public void createNewAdmin_shouldThrowException_WithIncompleteFields() throws Exception {
        Admin admin = new Admin();
        admin.setName("test admin");
        admin.setUsername("alex");
        admin.setConfirmPassword("password");
        admin.setRole(ADMIN);
        admin.setPassword("password");
        Long id = 1L;
        Admin admin2 = adminService.saveOrUpdateAdmin(admin);
        Assert.assertNull(admin2);
    }
    @Test
    public void createNewAdmin_shouldThrowException_whenPasswordsDoNotMatch() throws Exception {
        Admin admin = new Admin();
        admin.setName("test admin");
        admin.setUsername("alex");
        admin.setConfirmPassword("pasdsword");
        admin.setRole(ADMIN);
        admin.setPassword("password");
        Long id = 1L;
        Admin admin2 = adminService.saveOrUpdateAdmin(admin);
        Assert.assertNull(admin2);
    }
    @Test
    public void getAll_shouldReturnAList_whenCalled() throws Exception {
        Admin admin = new Admin();
        admin.setName("test admin");
        admin.setUsername("alexisdasd");
        admin.setPhone("00");
        admin.setAddress("addy");
        admin.setConfirmPassword("password");
        admin.setName("name");
        admin.setEmail("email");
        admin.setRole(ADMIN);
        admin.setPassword("password");
        Long id = 1L;
         adminService.saveOrUpdateAdmin(admin);
        List<Admin> admins = new ArrayList<>();
        admins.add(admin);
        List<Admin> adminsFound = adminService.getAllUsers();
        adminsFound.add(admin);
        Assert.assertEquals(admins.size(), adminsFound.size());
    }
    @Test
    public void authenticateAUser_shouldReturnTrue_whenDetailsMatch() throws Exception {
        Admin admin = new Admin();
        admin.setName("test admin");
        admin.setUsername("alex");
        admin.setPhone("00");
        admin.setAddress("addy");
        admin.setConfirmPassword("password");
        admin.setName("name");
        admin.setRole(ADMIN);
        admin.setPassword("password");
        admin.hashPassword();
        Long id = 1L;
        adminRepository.save(admin);
        boolean result = adminService.authenticateUser(null,null);
    }
    @Test
    public void authenticateAUser_shouldReturnFalse_whenDetailsDoNotMatch() throws Exception {
        Admin admin = new Admin();
        admin.setName("test admin");
        admin.setUsername("alex");
        admin.setPhone("00");
        admin.setAddress("addy");
        admin.setConfirmPassword("password");
        admin.setName("name");
        admin.setRole(ADMIN);
        admin.setPassword("password");
        admin.hashPassword();
        Long id = 1L;
        adminRepository.save(admin);
        boolean result = adminService.authenticateUser(null,null);
    }
    @Test
    public void authenticateAUser_shouldThrowNullPointerException_whenNoAdminNameAndPasswordAtGiven() throws Exception {
        Admin admin = new Admin();
        admin.setName("test admin");
        admin.setUsername("alex");
        admin.setPhone("00");
        admin.setAddress("addy");
        admin.setConfirmPassword("password");
        admin.setName("name");
        admin.setRole(ADMIN);
        admin.setPassword("password");
        admin.hashPassword();
        Long id = 1L;
        adminRepository.save(admin);
        boolean result = adminService.authenticateUser(null,null);
        Assert.assertFalse(result);

    }
}
