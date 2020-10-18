package com.rmit.sept.project.agme.services;

import com.rmit.sept.project.agme.model.Company;
import com.rmit.sept.project.agme.repositories.CompanyRepository;
import com.rmit.sept.project.agme.security.JwtUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

import static com.rmit.sept.project.agme.model.Role.ADMIN;
import static org.mockito.BDDMockito.given;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(CompanyService.class)
public class CompanyServiceTests {

    @MockBean
    CompanyService companyService;

    @MockBean
    CompanyRepository companyRepository;

    @MockBean
    JwtUtil jwt;

    @MockBean
    LoginSignupService loginSignupService;

    @MockBean
    UserService userService;

    @MockBean
    BookingService bookingService;

    @Test
    public void addCompany_shouldSucceed_ifCompanyIsAdded() {
        Company company = new Company();
        Company output = companyService.addCompany(company);
        given(company).willReturn(output);
    }

    @Test
    public void getAllCompanyTest_willReturn2_When2CompaniesAreAdded() {

        Company comp1 = new Company();
        Company comp2 = new Company();

        List<Company> list = new ArrayList<>();
        list.add(comp1);
        list.add(comp2);

        companyService.addCompany(comp1);
        companyService.addCompany(comp2);

        given(companyService.getAll()).willReturn(list);
    }
    @Test
    public void getAllCompanyTest_WillReturn0_WhenNoCompaniesAreAdded() {


        List<Company> list = new ArrayList<>();
        given(companyService.getAll()).willReturn(list);
    }
    @Test
    public void getAllCompanyTest_WillReturnNull_whenSavingANullUser() {


        List<Company> list = new ArrayList<>();
        given(companyRepository.save(null)).willReturn(null);
    }

    @Test
    public void loadUserByUsername_shouldReturnCompany_ifCompanyExists() {
        Company user = new Company();
        String username = "test";
        user.setUsername(username);

        companyService.saveOrUpdate(user);

        given(companyService.loadUserByUsername(username)).willReturn(user);
    }
    @Test
    public void AuthenticateUser_WillReturnTrue_WhenPasswordAreGiven() {
        Company user = new Company();
        String username = "test";
        user.setUsername(username);
        user.setPassword("passowrd");
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        user.hashPassword();
        companyService.saveOrUpdate(user);
        given(companyService.authenticateUser(username, user.getPassword())).willReturn(true);
    }
    @Test
    public void AuthenticateUser_WillReturnFalse_WhenWrongPasswordAreGiven() {
        Company user = new Company();
        String username = "test";
        user.setUsername(username);
        user.setPassword("passowrd");
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        user.hashPassword();
        companyService.saveOrUpdate(user);
        given(companyService.authenticateUser(username, user.getPassword())).willReturn(false);
    }
    @Test
    public void AuthenticateUser_WillReturnFalse_WhenNoPasswordAreGiven() {
        Company user = new Company();
        String username = "test";
        user.setUsername(username);
        user.setPassword("passowrd");
        user.setName("test user");
        user.setUsername("alex");
        user.setPhone("00");
        user.setAddress("addy");
        user.setConfirmPassword("password");
        user.setName("name");
        user.setRole(ADMIN);
        user.setPassword("password");
        user.hashPassword();
        companyService.saveOrUpdate(user);
        given(companyService.authenticateUser(null, null)).willReturn(false);
    }

}
